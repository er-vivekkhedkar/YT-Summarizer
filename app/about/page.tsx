"use client";

import { Button } from "@/components/ui/button"

import { PageHeader } from "@/components/page-header"

export default function AboutPage() {
  return (
    <>
      <PageHeader 
        title="About YT Summarizer" 
        description="Learn more about our mission and the team behind YT Summarizer."
      />
      <div className="container mx-auto px-4 py-16 ">
        <div className="grid gap-12  items-center">
          <div>
            <p className="text-lg mb-6">
              YT Summarizer is an AI-powered tool designed to help you save time and extract key insights from YouTube videos. We&apos;re passionate about making video content more accessible and efficient to consume.
            </p>
            <p className="text-lg mb-6">
              Founded in 2025, we&apos;ve already helped thousands of users across the globe to efficiently consume video content, whether for work, study, or personal interest.
            </p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white w-full">
              Learn More About Our Story
            </Button>
          </div>
          
        </div>
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
          <p className="text-lg text-center max-w-3xl mx-auto">
            We believe in the power of knowledge and the importance of time. Our mission is to bridge the gap between vast video content and busy schedules, making learning and information gathering more efficient than ever before. Let&apos;s make learning easier together!
          </p>
        </div>
      </div>
    </>
  )
}
