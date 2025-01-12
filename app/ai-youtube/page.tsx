"use client";

import { useState } from 'react';
import { useUserData } from '@nhost/nextjs';
import { nhost } from '@/lib/nhost';
import { generateSummary } from '@/lib/summarizer';
import { Button } from "@/components/ui/button";
import { YoutubeTranscript } from 'youtube-transcript';

export default function SummarizerPage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useUserData();

  const handleSummarize = async () => {
    if (!videoUrl) return;
    setLoading(true);
    try {
      const videoId = extractVideoId(videoUrl);
      if (!videoId) throw new Error('Invalid YouTube URL');

      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      const transcriptText = transcript.map(entry => entry.text).join(' ');

      const generatedSummary = await generateSummary(transcriptText);
      setSummary(generatedSummary);

      if (user) {
        // Store the summary in the database
        await nhost.graphql.request(`
          mutation($userId: uuid!, $originalText: String!, $summary: String!) {
            insert_summaries_one(object: {
              user_id: $userId,
              original_text: $originalText,
              summary: $summary
            }) {
              id
            }
          }
        `, {
          userId: user.id,
          originalText: transcriptText,
          summary: generatedSummary,
        });
      }
    } catch (error) {
      console.error('Error summarizing video:', error);
    } finally {
      setLoading(false);
    }
  };

  function extractVideoId(url: string): string | null {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    }
    if (urlObj.hostname.includes('youtube.com')) {
      return urlObj.searchParams.get('v');
    }
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI-Powered YouTube Summarizer</h1>
      <p className="mb-4">Extract key insights from any YouTube video in minutes with our advanced AI summarization tool.</p>
      <input
        type="text"
        className="w-full p-4 border rounded-lg mb-4"
        placeholder="Paste your YouTube video URL here..."
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <Button onClick={handleSummarize} disabled={loading} className="bg-red-600 hover:bg-red-700">
        {loading ? 'Summarizing...' : 'Summarize Now'}
      </Button>
      {summary && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="p-4 bg-gray-100 rounded-lg">{summary}</p>
        </div>
      )}
    </div>
  );
}

