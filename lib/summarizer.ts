import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || '',
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "YT Summarizer",
  }
});

export async function generateSummary(text: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "anthropic/claude-2",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates detailed summaries of content."
        },
        {
          role: "user",
          content: `Please provide a comprehensive summary of this content:\n\n${text}`
        }
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('Summarization error:', error);
    throw new Error('Failed to generate summary');
  }
}

export async function extractVideoTranscript(videoId: string): Promise<string> {
  try {
    const response = await fetch(`https://transcribetube.com/api/transcript/${videoId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer h@bOQbX326kPnjRwmQMRRslrbumCJCWF`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch transcript');
    }

    const data = await response.json();
    return data.transcript.map((item: any) => item.text).join(' ');
  } catch (error) {
    console.error('Error extracting transcript:', error);
    throw new Error('Failed to extract video transcript');
  }
} 