"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Youtube } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AIYoutubePage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      // Add your AI analysis logic here
      toast.success('Analysis feature coming soon!');
    } catch {
      toast.error('Failed to analyze video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">AI YouTube Analysis</h1>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-4">
              <Input
                type="url"
                placeholder="Paste YouTube URL here"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              
              <Button 
                className="w-full"
                disabled={loading || !videoUrl}
                onClick={handleAnalyze}
              >
                {loading ? (
                  <span className="animate-pulse">Analyzing...</span>
                ) : (
                  <>
                    <Youtube className="w-4 h-4 mr-2" />
                    Analyze Video
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

