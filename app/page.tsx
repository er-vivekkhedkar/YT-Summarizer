"use client";

import { useState } from 'react';
import { Play as PlayIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserData } from '@nhost/nextjs';
import { nhost } from '@/lib/nhost';
import { generateSummary, extractVideoTranscript } from '@/lib/summarizer';
import Link from "next/link"
import { ArrowRight, CheckCircle, Brain, Share2, LinkIcon, FileText, Tag, Smile, Play } from 'lucide-react'
import Image from 'next/image'
import { VideoCard } from "@/components/video-card"
import { FeatureCard } from "@/components/feature-card"
import { ToolCard } from "@/components/tool-card"
import { toast } from 'react-hot-toast';

export default function HomePage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const user = useUserData();

  const handleSummarize = async () => {
    if (!videoUrl) return;
    setLoading(true);
    setSummary(''); // Reset summary before new request
    
    try {
      const videoId = extractVideoId(videoUrl);
      if (!videoId) {
        toast.error('Please enter a valid YouTube URL');
        return;
      }

      // First try to get cached summary if user is logged in
      if (user) {
        // ... your existing user data handling ...
      }

      // Redirect to summary page with video ID
      window.location.href = `/summary?v=${videoId}`;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to process video. Please try again.');
      setSummary(''); // Clear summary on error
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
    } catch (error) {
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
    { title: "Sentiment Analysis", description: "Understand the emotional tone of your video content.", icon: <Smile className="w-12 h-12 text-primary" /> },
  ];

  return (
    <>
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              AI-Powered <span className="text-primary text-red-600">YouTube Summarizer</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-up animation-delay-200">
              Extract key insights from any YouTube video in minutes with our advanced AI summarization tool.
            </p>
            <div className="max-w-xl mx-auto mb-8 animate-fade-in-up animation-delay-400">
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
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white bg-red-600 hover:bg-red-700"
                  onClick={handleSummarize}
                  disabled={loading}
                >
                  <PlayIcon className="mr-2 h-4 w-4" /> 
                  {loading ? 'Summarizing...' : 'Summarize Now'}
                </Button>
              </div>
            </div>
            <p className="text-sm text-white/70 animate-fade-in-up animation-delay-600">
              Want to summarize local Video/Audio files?{" "}
              <Link href="/workspace" className="text-primary hover:underline text-blue-700 font-bold">
                Go to Workspace
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "Paste Video URL", description: "Simply copy and paste your YouTube video URL into our input field.", icon: <LinkIcon className="w-12 h-12 text-primary" /> },
              { title: "AI Processing", description: "Our advanced AI analyzes the video content and generates a concise summary.", icon: <Brain className="w-12 h-12 text-primary" /> },
              { title: "Get Your Summary", description: "Review the generated summary and easily share it with others.", icon: <Share2 className="w-12 h-12 text-primary" /> }
            ].map((step, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105">
                <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recently Summarized Videos</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recentVideos.map((video, index) => (
              <VideoCard key={index} {...video} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View More Summaries
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose YT Summarizer?</h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Related Tools</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, index) => (
              <ToolCard key={index} {...tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Save Time?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already benefiting from our AI-powered YouTube summarizer.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
            Get Started for Free
          </Button>
        </div>
      </section>
    </>
  )
}

