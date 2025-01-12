import { NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';
import OpenAI from 'openai';
import axios from 'axios';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || '',
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_WEBSITE_URL,
    "X-Title": "YT Summarizer",
  }
});

async function getVideoDetails(videoId: string) {
  try {
    const response = await axios.get(`https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${videoId}&format=json`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch video details:', error);
    return null;
  }
}

async function checkCaptionsAvailable(videoId: string) {
  try {
    await YoutubeTranscript.fetchTranscript(videoId, { lang: 'en' });
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message?.includes('Transcript is disabled')) {
        return { error: 'CAPTIONS_DISABLED' as const };
      }
      if (error.message?.includes('No captions found')) {
        return { error: 'NO_CAPTIONS' as const };
      }
    }
    return { error: 'UNKNOWN_ERROR' as const };
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const videoId = body.videoId;

    if (!videoId) {
      throw new Error('Video ID is required');
    }

    // First check if captions are available
    const captionsCheck = await checkCaptionsAvailable(videoId);
    
    // Get video details for better context
    const videoDetails = await getVideoDetails(videoId);
    let transcriptText = '';
    let warningMessage = '';

    if (captionsCheck === true) {
      // Captions are available, proceed normally
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      transcriptText = transcript.map(item => item.text).join(' ');
    } else {
      // Handle different caption-related issues
      switch (captionsCheck.error) {
        case 'CAPTIONS_DISABLED':
          warningMessage = 'Captions are disabled for this video. Using alternative analysis method.';
          break;
        case 'NO_CAPTIONS':
          warningMessage = 'No captions found for this video. Using alternative analysis method.';
          break;
        default:
          warningMessage = 'Unable to access video captions. Using alternative analysis method.';
      }

      // Use video details as fallback
      if (videoDetails) {
        transcriptText = `Video Title: ${videoDetails.title}\n${videoDetails.description || ''}`;
      } else {
        transcriptText = `Video ID: ${videoId}\nUnable to fetch detailed content.`;
      }
    }

    // Generate summary with context-aware prompting
    const completion = await openai.chat.completions.create({
      model: "anthropic/claude-2",
      messages: [
        {
          role: "system",
          content: `You are an expert at creating detailed, well-structured summaries of video content.
          ${warningMessage ? 'Note: Limited content available, focus on providing valuable insights from available information.' : ''}
          Create a comprehensive summary that includes:
          - Main topics and key points
          - Important details and examples
          - Conclusions or takeaways
          Format the summary with clear sections and bullet points where appropriate.`
        },
        {
          role: "user",
          content: `Please provide a detailed summary of this video content:\n\n${transcriptText}`
        }
      ],
      temperature: 0.7,
    });

    const summary = completion.choices[0].message.content;

    if (!summary) {
      throw new Error('Failed to generate summary');
    }

    // Include helpful user message based on caption status
    let userMessage = '';
    if (warningMessage) {
      userMessage = `Note: ${warningMessage} For better results, try videos with captions enabled.`;
    }

    return NextResponse.json({ 
      summary,
      transcript: transcriptText,
      success: true,
      warning: warningMessage || undefined,
      userMessage,
      hasCaptions: captionsCheck === true
    });

  } catch (error) {
    console.error('API error:', error);
    try {
      const completion = await openai.chat.completions.create({
        model: "anthropic/claude-2",
        messages: [
          {
            role: "system",
            content: "Create a helpful response for a user whose video couldn't be analyzed."
          },
          {
            role: "user",
            content: "The video couldn't be analyzed. Please provide helpful suggestions."
          }
        ],
        temperature: 0.7,
      });

      return NextResponse.json({ 
        summary: completion.choices[0].message.content,
        success: true,
        warning: 'Unable to fully analyze this video. Here are some suggestions:',
        userMessage: 'Try videos with captions enabled for better results.'
      });
    } catch {
      return NextResponse.json(
        { 
          error: error instanceof Error ? error.message : 'Failed to process video',
          success: false,
          userMessage: 'Please try a different video with captions enabled.'
        }, 
        { status: 500 }
      );
    }
  }
} 