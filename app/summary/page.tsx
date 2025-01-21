'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Download, Plus } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';

function LoadingSpinnerComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <LoadingSpinner />
    </div>
  );
}

interface VideoSummary {
  videoInfo: {
    title: string;
    author: string;
    views: string;
    url: string;
  };
  content: {
    overview: string;
    mainPoints: string[];
    keyTakeaways: string[];
    conclusion: string;
  };
}

const SearchParamsContent = () => {
  const searchParams = useSearchParams();
  const videoId = searchParams.get('v');
  const [summary, setSummary] = useState<VideoSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (videoId) fetchSummary(videoId);
  }, [videoId]);

  const fetchSummary = async (videoId: string) => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setSummary(data.summary);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!videoId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-900">
        <div className="text-center">
          <p className="text-xl font-medium text-red-500">No video ID provided</p>
          <p className="mt-2 text-zinc-400">Please provide a valid YouTube video URL</p>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingSpinnerComponent />;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-900">
        <div className="text-center">
          <p className="text-xl font-medium text-red-500">{error}</p>
          <p className="mt-2 text-zinc-400">Please try again later</p>
        </div>
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-900">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Section - Video Player - Full width within container */}
        <div className="lg:w-2/5 p-4 lg:p-6 lg:sticky lg:top-0 lg:h-screen flex flex-col items-center justify-center">
          <div className="w-full space-y-4 lg:mt-8 mt-16">
            <div className="bg-zinc-800/50 rounded-xl overflow-hidden shadow-xl backdrop-blur-sm">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h1 className="text-xl font-bold text-white mb-1">
                  {summary.videoInfo.title}
                </h1>
                <p className="text-sm text-zinc-400">
                  Created by {summary.videoInfo.author}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const summaryText = `
${summary.videoInfo.title}
By: ${summary.videoInfo.author}

Overview:
${summary.content.overview}

Main Points:
${summary.content.mainPoints.map((point, index) => `${index + 1}. ${point}`).join('\n')}

Key Takeaways:
${summary.content.keyTakeaways.map((point, index) => `${index + 1}. ${point}`).join('\n')}

Conclusion:
${summary.content.conclusion}

Video URL: ${summary.videoInfo.url}
              `.trim();

                const blob = new Blob([summaryText], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${summary.videoInfo.title.slice(0, 30)}-summary.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
            >
              <Download className="w-4 h-4" />
              <span className="font-medium">Download Summary</span>
            </button>

            {/* New Generate Another Summary Button - Only visible on larger screens */}
            <div className="hidden lg:block pt-4 mt-4 border-t border-zinc-800">
              <Link
                href="/"
                className="w-full py-3 bg-zinc-800/50 hover:bg-zinc-800/70 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm"
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium">Generate Another Summary</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section - Summary Content */}
        <div className="lg:w-3/5 p-4 lg:p-6 lg:border-l lg:border-zinc-800">
          <div className="max-w-3xl mx-auto space-y-4 lg:mt-14">
            <Section
              title="Overview"
              content={summary.content.overview}
              icon="📝"
              bgColor="bg-zinc-800/50"
              textColor="text-white"
              subtextColor="text-zinc-300"
            />
            
            <Section
              title="Main Points"
              content={summary.content.mainPoints}
              icon="🎯"
              isList
              bgColor="bg-zinc-800/50"
              textColor="text-white"
              subtextColor="text-zinc-300"
            />
            
            <Section
              title="Key Takeaways"
              content={summary.content.keyTakeaways}
              icon="💡"
              isList
              bgColor="bg-zinc-800/50"
              textColor="text-white"
              subtextColor="text-zinc-300"
            />
            
            <Section
              title="Conclusion"
              content={summary.content.conclusion}
              icon="🎬"
              bgColor="bg-zinc-800/50"
              textColor="text-white"
              subtextColor="text-zinc-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchParamsWrapper = () => {
  return (
    <Suspense fallback={<LoadingSpinnerComponent />}>
      <SearchParamsContent />
    </Suspense>
  );
};

interface SectionProps {
  title: string;
  content: string | string[];
  isList?: boolean;
  icon?: string;
  bgColor?: string;
  textColor?: string;
  subtextColor?: string;
}

function Section({ 
  title, 
  content, 
  isList = false, 
  icon, 
  bgColor = 'bg-zinc-800/50',
  textColor = 'text-white',
  subtextColor = 'text-zinc-300'
}: SectionProps) {
  if (!content || (Array.isArray(content) && content.length === 0)) return null;

  return (
    <div className={`rounded-2xl shadow-lg overflow-hidden ${bgColor} backdrop-blur-sm`}>
      <div className="p-8">
        <div className="flex items-center gap-3 mb-6">
          {icon && (
            <div className="w-12 h-12 rounded-xl bg-zinc-700/50 flex items-center justify-center text-2xl">
              {icon}
            </div>
          )}
          <h2 className={`text-2xl font-bold ${textColor}`}>{title}</h2>
        </div>
        
        <div className={subtextColor}>
          {isList ? (
            <ul className="space-y-4">
              {(content as string[]).map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-700/50 flex items-center justify-center text-white text-sm">
                    {index + 1}
                  </span>
                  <span className="text-lg leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg leading-relaxed">{content as string}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <SearchParamsWrapper />
    </div>
  );
}
