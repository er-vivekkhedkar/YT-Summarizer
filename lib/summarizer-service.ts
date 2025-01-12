import OpenAI from "openai";
import { YoutubeTranscript } from 'youtube-transcript';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://ytsummarizer.com",
    "X-Title": "YT Summarizer",
  }
});

export const summarizerService = {
  async getTranscript(videoUrl: string) {
    try {
      const videoId = new URL(videoUrl).searchParams.get('v');
      if (!videoId) throw new Error('Invalid YouTube URL');
      
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      return transcript.map(item => item.text).join(' ');
    } catch (error) {
      console.error('Transcript error:', error);
      throw new Error('Failed to get video transcript');
    }
  },

  async summarizeContent(transcript: string) {
    try {
      const completion = await openai.chat.completions.create({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional content summarizer. Create a concise but comprehensive summary of the YouTube video transcript."
          },
          {
            role: "user",
            content: `Please summarize this video transcript: ${transcript}`
          }
        ]
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI error:', error);
      throw new Error('Failed to generate summary');
    }
  }
}; 