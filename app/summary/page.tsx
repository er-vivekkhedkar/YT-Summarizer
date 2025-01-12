"use client";

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUserData } from '@nhost/nextjs';
import { nhost } from '@/lib/nhost';
import { Button } from "@/components/ui/button";
import { Share2, Copy, Download, Clock, Book, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SummaryPage() {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [readingTime, setReadingTime] = useState('');
  const [warning, setWarning] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const searchParams = useSearchParams();
  const videoId = searchParams.get('v');
  const user = useUserData();

  const storeSummaryInNhost = useCallback(async (videoId: string, summary: string, title: string) => {
    if (!user) return;

    try {
      await nhost.graphql.request(`
        mutation InsertSummary($videoId: String!, $userId: uuid!, $summary: String!, $title: String!) {
          insert_summaries_one(object: {
            video_id: $videoId,
            user_id: $userId,
            summary: $summary,
            video_title: $title
          }) {
            id
          }
        }
      `, {
        videoId,
        userId: user.id,
        summary,
        title: title || 'Untitled Video'
      });
    } catch (error) {
      console.error('Failed to store summary:', error);
    }
  }, [user]);

  const fetchSummary = useCallback(async (videoId: string) => {
    try {
      setLoading(true);
      setWarning('');

      // First try to get video details
      let videoDetails;
      try {
        const detailsResponse = await fetch(`https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${videoId}&format=json`);
        videoDetails = await detailsResponse.json();
        setVideoTitle(videoDetails.title);
      } catch (error) {
        console.error('Failed to fetch video details:', error);
      }

      // Get summary with retries
      let attempts = 0;
      const maxAttempts = 3;
      
      while (attempts < maxAttempts) {
        try {
          const response = await fetch('/api/transcript', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              videoId,
              attempt: attempts + 1,
              maxAttempts 
            }),
          });

          const data = await response.json();

          if (data.success && data.summary) {
            setSummary(data.summary);
            calculateReadingTime(data.summary);

            // Store in Nhost if user is logged in
            if (user && videoDetails?.title) {
              await storeSummaryInNhost(videoId, data.summary, videoDetails.title);
            }

            if (data.warning) {
              setWarning(data.warning);
              toast(data.warning, {
                icon: '⚠️',
              });
            }

            toast.success('Summary generated successfully!');
            break;
          }

          attempts++;
          if (attempts === maxAttempts) {
            throw new Error('Maximum attempts reached');
          }
        } catch (error) {
          if (attempts === maxAttempts - 1) {
            throw error;
          }
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait before retry
        }
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate summary');
    } finally {
      setLoading(false);
    }
  }, [user, storeSummaryInNhost]);

  const checkExistingSummary = useCallback(async (videoId: string) => {
    if (user) {
      try {
        // Check if summary exists in Nhost
        const { data } = await nhost.graphql.request(`
          query GetSummary($videoId: String!, $userId: uuid!) {
            summaries(where: { video_id: { _eq: $videoId }, user_id: { _eq: $userId } }) {
              id
              summary
              video_title
              created_at
            }
          }
        `, {
          videoId,
          userId: user.id
        });

        if (data?.summaries?.[0]) {
          setSummary(data.summaries[0].summary);
          setVideoTitle(data.summaries[0].video_title);
          calculateReadingTime(data.summaries[0].summary);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Failed to fetch existing summary:', error);
      }
    }
    
    // If no existing summary or not logged in, fetch new one
    fetchSummary(videoId);
  }, [user, fetchSummary]);

  useEffect(() => {
    if (videoId) {
      checkExistingSummary(videoId);
    }
  }, [videoId, checkExistingSummary]);

  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    setReadingTime(`${minutes} min read`);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      toast.success('Copied to clipboard!');
    } catch {
      toast.error('Failed to copy text');
    }
  };

  const downloadSummary = () => {
    try {
      const element = document.createElement('a');
      const file = new Blob([`Summary of YouTube Video: ${videoId}\n\n${summary}`], {
        type: 'text/plain;charset=utf-8'
      });
      element.href = URL.createObjectURL(file);
      element.download = `youtube-summary-${videoId}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success('Summary downloaded!');
    } catch (error) {
      toast.error('Failed to download summary');
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'YouTube Video Summary',
          text: summary,
          url: window.location.href,
        });
        toast.success('Shared successfully!');
      } else {
        await copyToClipboard();
      }
    } catch {
      toast.error('Failed to share');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Analyzing video content...</p>
              <p className="text-sm text-gray-500">This may take a moment</p>
            </div>
          ) : warning ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Warning</h2>
              <p className="text-gray-600 mb-4">{warning}</p>
            </div>
          ) : (
            <div className="grid gap-8">
              {videoId && (
                <>
                  <div className="aspect-video w-full">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg shadow-lg"
                    ></iframe>
                  </div>
                  {videoTitle && (
                    <h1 className="text-2xl font-bold">{videoTitle}</h1>
                  )}
                </>
              )}

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-2xl font-bold">AI Summary</h2>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={copyToClipboard}
                      className="hover:bg-gray-100"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={downloadSummary}
                      className="hover:bg-gray-100"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleShare}
                      className="hover:bg-gray-100"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {readingTime}
                  </span>
                  <span className="flex items-center">
                    <Book className="h-4 w-4 mr-1" />
                    {summary.split(' ').length} words
                  </span>
                </div>

                <div className="prose max-w-none">
                  {summary.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-800">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
