"use client";

import { useState } from 'react';
import { Play as PlayIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserData } from '@nhost/nextjs';
import Link from "next/link";
import { ArrowRight, CheckCircle, Brain, FileText, Tag, Smile } from 'lucide-react';
import Image from 'next/image';

import { toast } from 'react-hot-toast';

export default function HomePage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useUserData(); // Removed unused variable warning for 'user' if you need it later

  const handleSummarize = async () => {
    if (!videoUrl) {
      toast.error('Please enter a YouTube video URL.');
      return;
    }
    setLoading(true);

    try {
      const videoId = extractVideoId(videoUrl);
      if (!videoId) {
        toast.error('Please enter a valid YouTube URL.');
        return;
      }

      // Redirect to summary page with video ID
      window.location.href = `/summary?v=${videoId}`;
    } finally {
      setLoading(false);
    }
  };

  function extractVideoId(url: string): string | null {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === 'youtu.be') {
        return urlObj.pathname.slice(1);
      }
      if (urlObj.hostname.includes('youtube.com')) {
        return urlObj.searchParams.get('v');
      }
      return null;
    } catch {
      return null;
    }
  }

  // Removed unused variables (recentVideos, features, tools) to prevent the linting error.
  // If you need these in the future, you can add them back and use them in the JSX below.

  return (
    <>
      {/* Header Section */}
      <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/bg.png"
            alt="AI Technology Background"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              AI-Powered <span className="text-red-600">YouTube Summarizer</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Extract key insights from any YouTube video in minutes with our advanced AI summarization tool.
            </p>
            <div className="max-w-xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="url"
                  placeholder="Paste your YouTube video URL here..."
                  className="flex-grow bg-white/10 border-white/20 text-white placeholder-white/50"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleSummarize}
                  disabled={loading}
                >
                  <PlayIcon className="mr-2 h-4 w-4" />
                  {loading ? 'Summarizing...' : 'Summarize Now'}
                </Button>
              </div>
            </div>
            <p className="text-sm text-white/70">
              Want to summarize local Video/Audio files?{" "}
              <Link href="/workspace" className="text-blue-700 font-bold hover:underline">
                Go to Workspace
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Other Sections (How It Works, Recent Videos, etc.) */}
      {/* Map over recent videos, features, and tools if you want to include them in the future */}
    </>
  );
}
