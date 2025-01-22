import { NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';
import ytdl from 'ytdl-core';

export async function POST(req: Request) {
  try {
    const { videoId } = await req.json();

    if (!videoId) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid YouTube video ID' },
        { status: 400 }
      );
    }

    // Validate video ID and fetch video info with retries and error handling
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    let videoInfo;
    try {
      videoInfo = await ytdl.getBasicInfo(videoUrl, {
        requestOptions: {
          headers: {
            // Add user-agent to avoid 410 errors
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
          }
        }
      });
    } catch (error) {
      console.error('YouTube info fetch error:', error);
      // Fallback to basic info
      videoInfo = {
        videoDetails: {
          title: 'YouTube Video',
          description: '',
          author: { name: 'Unknown' },
          viewCount: '0'
        }
      };
    }

    const { title, description, author, viewCount } = videoInfo.videoDetails;

    // Fetch transcript with better error handling
    let transcriptText = '';
    try {
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      transcriptText = transcript.map((item) => item.text).join(' ');
    } catch (error) {
      console.warn('Transcript fetch failed, using description as fallback:', error);
      transcriptText = description || 'No transcript or description available.';
    }

    // Generate summary using OpenAI API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'YouTube Summarizer',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Create a concise summary of this YouTube video:
              
Title: ${title}
Channel: ${author?.name || 'Unknown'}
Content: ${transcriptText}

Provide the summary in this format:
Overview: (2-3 sentences)
Main Points:
- (point 1)
- (point 2)
- (point 3)
Key Takeaways:
- (takeaway 1)
- (takeaway 2)
- (takeaway 3)
Conclusion: (1-2 sentences)`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate summary from OpenAI API');
    }

    const data = await response.json();
    const summaryText = data.choices?.[0]?.message?.content || 'No summary generated.';

    // Return structured summary
    return NextResponse.json({
      success: true,
      summary: {
        videoInfo: {
          title,
          author: author?.name || 'Unknown',
          views: viewCount,
          url: videoUrl,
        },
        content: {
          overview: extractSection(summaryText, 'Overview'),
          mainPoints: extractBulletPoints(summaryText, 'Main Points', 'Key Takeaways'),
          keyTakeaways: extractBulletPoints(summaryText, 'Key Takeaways', 'Conclusion'),
          conclusion: extractSection(summaryText, 'Conclusion'),
        },
      },
    });
  } catch (error) {
    console.error('Summarization error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unexpected error occurred while processing the video' 
      },
      { status: 500 }
    );
  }
}

function extractSection(text: string, section: string): string {
  const regex = new RegExp(`${section}:([^]*?)(?=Main Points:|Key Takeaways:|Conclusion:|$)`, 'i');
  return text.match(regex)?.[1]?.trim() || '';
}

function extractBulletPoints(text: string, startSection: string, endSection: string): string[] {
  const regex = new RegExp(`${startSection}:([^]*?)(?=${endSection}:|$)`, 'i');
  const section = text.match(regex)?.[1] || '';

  return section
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('-'))
    .map((line) => line.slice(1).trim());
}
