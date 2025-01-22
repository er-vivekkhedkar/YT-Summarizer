"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowRight, CheckCircle, Brain, FileText, Tag, Smile, Play } from 'lucide-react'
import { VideoCard } from "@/components/video-card"
import { FeatureCard } from "@/components/feature-card"
import { ToolCard } from "@/components/tool-card"
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { motion } from "framer-motion"
import HowItWorks from "@/components/how-it-works";

export default function HomePage() {
  const recentVideos = [
    { title: "The Future of AI in 2024", image: "https://img.youtube.com/vi/SSo_EIwHSd4/maxresdefault.jpg", duration: "10:23" },
    { title: "How to Learn Programming: Full Beginner's Guide", image: "https://img.youtube.com/vi/eWRfhZUzrAc/maxresdefault.jpg", duration: "15:45" },
    { title: "Understanding Blockchain in 10 Minutes", image: "https://img.youtube.com/vi/SSo_EIwHSd4/maxresdefault.jpg", duration: "9:58"  },
  ];

  const features = [
    { title: "Save Time", description: "Get the key points of any video in minutes, not hours.", icon: <CheckCircle className="h-12 w-12 text-primary" /> },
    { title: "Improve Comprehension", description: "Understand complex topics with clear, concise summaries.", icon: <Brain className="h-12 w-12 text-primary" /> },
    { title: "Boost Productivity", description: "Focus on what matters most in your video content.", icon: <ArrowRight className="h-12 w-12 text-primary " /> }
  ];

  const tools = [
    { title: "Video Transcription", description: "Get accurate transcripts for your YouTube videos.", icon: <FileText className="w-12 h-12 text-primary dark:text-white" /> },
    { title: "Keyword Extraction", description: "Identify key topics and themes from your videos.", icon: <Tag className="w-12 h-12 text-primary dark:text-white" /> },
    { title: "Sentiment Analysis", description: "Understand the emotional tone of your video content.", icon: <Smile className="w-12 h-12 text-primary dark:text-white" /> },
  ];

  const [loading, setLoading] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')

  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSummarize = async () => {
    try {
      setLoading(true);
      const videoId = extractVideoId(videoUrl);
      
      if (!videoId) {
        toast.error('Please enter a valid YouTube URL');
        return;
      }

      window.location.href = `/summary?v=${videoId}`;
    } catch {
      toast.error('Failed to process video URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-zinc-900 to-zinc-900 pt-16 sm:pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#4f46e5_0%,_transparent_50%)] opacity-30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#e11d48_0%,_transparent_50%)] opacity-30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#3b82f6_0%,_transparent_25%)] opacity-20"></div>
        <div className="absolute inset-0 backdrop-blur-[120px]"></div>
        
        <div className="container mx-auto px-4 relative z-10 pb-8 sm:pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-300 to-white leading-tight">
                AI-Powered{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-600 to-red-500">
                  YouTube
                </span>{" "}
                Summarizer
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-base sm:text-xl md:text-2xl text-zinc-400 mb-8 sm:mb-12 px-4"
              >
                Extract key insights from any YouTube video in minutes with our advanced AI summarization tool.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="max-w-2xl mx-auto mb-8 sm:mb-12 px-4"
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Input 
                  type="url" 
                  placeholder="Paste your YouTube video URL here..." 
                  className="h-12 sm:h-14 text-base sm:text-lg bg-white/10 border-white/20 text-white placeholder-zinc-500 backdrop-blur-sm"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
                <Button 
                  size="lg" 
                  className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-medium bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white border-0 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 whitespace-nowrap"
                  onClick={handleSummarize}
                  disabled={loading || !videoUrl}
                >
                  {loading ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> 
                      Summarize Now
                    </>
                  )}
                </Button>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xs sm:text-sm text-zinc-500 px-4"
            >
              Want to summarize local Video/Audio files?{" "}
              <Link href="/workspace" className="text-red-500 hover:text-red-400 font-medium transition-colors">
                Go to Workspace
              </Link>
            </motion.p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-900 to-transparent"></div>
      </section>

      {/* <section className="py-20 bg-gray-50">
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
      </section> */}

      <HowItWorks />

      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Recently Summarized Videos</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {recentVideos.slice(0, 3).map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <VideoCard {...video} />
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="hover:scale-105 hover:text-white transition-transform text-black border-white/20 hover:bg-white/10"
            >
              View More Summaries
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-zinc-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-zinc-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#4f46e5_0%,_transparent_50%)] opacity-30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#e11d48_0%,_transparent_50%)] opacity-30"></div>
        <div className="absolute inset-0 backdrop-blur-[120px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-300 to-white">Why Choose YT Summarizer?</h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#3b82f6_0%,_transparent_25%)] opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#4f46e5_0%,_transparent_50%)] opacity-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#e11d48_0%,_transparent_50%)] opacity-10"></div>
        <div className="absolute inset-0 backdrop-blur-[100px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-300 to-white">Related Tools</h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <ToolCard {...tool} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-zinc-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#4f46e5_0%,_transparent_50%)] opacity-30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#e11d48_0%,_transparent_50%)] opacity-30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#3b82f6_0%,_transparent_25%)] opacity-20"></div>
        <div className="absolute inset-0 backdrop-blur-[120px]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-300 to-white">Ready to Save Time?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Join thousands of users who are already benefiting from our AI-powered YouTube summarizer.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white border-0 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 hover:scale-105"
            >
              Get Started for Free
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}

