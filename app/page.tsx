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
  const user = useUserData();

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

  const recentVideos = [
    { title: "The Future of AI in 2023", image: "https://img.youtube.com/vi/b9GtjIw-afo/maxresdefault.jpg", duration: "10:23" },
    { title: "How to Learn Programming: Full Beginner's Guide", image: "https://img.youtube.com/vi/eWRfhZUzrAc/maxresdefault.jpg", duration: "15:45" },
    { title: "Understanding Blockchain in 10 Minutes", image: "https://img.youtube.com/vi/SSo_EIwHSd4/maxresdefault.jpg", duration: "9:58" },
    { title: "The Science of Productivity: How to Get More Done", image: "https://img.youtube.com/vi/Oo0lCZyuF6k/maxresdefault.jpg", duration: "12:34" }
  ];

  const features = [
    { title: "Save Time", description: "Get the key points of any video in minutes, not hours.", icon: <CheckCircle className="h-12 w-12 text-primary" /> },
    { title: "Improve Comprehension", description: "Understand complex topics with clear, concise summaries.", icon: <Brain className="h-12 w-12 text-primary" /> },
    { title: "Boost Productivity", description: "Focus on what matters most in your video content.", icon: <ArrowRight className="h-12 w-12 text-primary" /> }
  ];

  const tools = [
    { title: "Video Transcription", description: "Get accurate transcripts for your YouTube videos.", icon: <FileText className="w-12 h-12 text-primary" /> },
    { title: "Keyword Extraction", description: "Identify key topics and themes from your videos.", icon: <Tag className="w-12 h-12 text-primary" /> },
    { title: "Sentiment Analysis", description: "Understand the emotional tone of your video content.", icon: <Smile className="w-12 h-12 text-primary" /> }
  ];

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
      {/* Map over recent videos, features, and tools as in the previous version */}
    </>
  );
}
