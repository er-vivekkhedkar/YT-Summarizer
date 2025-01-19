"use server";

import { NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';
import ytdl from 'ytdl-core';

export async function POST(req: Request) {
  try {
    const { videoId } = await req.json();

    if (!videoId) {
      throw new Error('Please provide a valid YouTube video ID');
    }

    // 1. Validate video ID and get info
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const videoInfo = await ytdl.getBasicInfo(videoUrl);

    const { title, description, author, viewCount } = videoInfo.videoDetails;

    // 2. Get transcript
    let transcriptText = '';
    try {
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      transcriptText = transcript.map(item => item.text).join(' ');
    } catch (error) {
      console.log('Using description as fallback:', error);
      transcriptText = description || 'Transcript unavailable.';
    }

    // 3. Generate summary using OpenAI API
    const apiEndpoint = 'https://api.openai.com/v1/chat/completions'; // Updated endpoint
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Ensure your API key is valid
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Use a supported model
        messages: [
          {
            role: 'user',
            content: `Create a concise summary of this YouTube video:
          
Title: ${title}
Channel: ${author.name}
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
      // Handle specific errors like 410
      if (response.status === 410) {
        throw new Error(
          'The requested resource is no longer available. Please update the API endpoint or model being used.'
        );
      }
      throw new Error(`Failed to generate summary. Status code: ${response.status}`);
    }

    const data = await response.json();
    const summaryText = data.choices[0].message.content;

    // 4. Parse and structure the summary
    return NextResponse.json({
      success: true,
      summary: {
        videoInfo: {
          title,
          author: author.name,
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Summarization error:', error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
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
    .map(line => line.trim())
    .filter(line => line.startsWith('-'))
    .map(line => line.slice(1).trim());
}
