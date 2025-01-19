"use client"

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, Download } from 'lucide-react';

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      <p className="mt-4 text-lg text-gray-600">Generating summary...</p>
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

export default function SummaryPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SummaryContent />
    </Suspense>
  );
}

function SummaryContent() {
  const searchParams = useSearchParams();
  const videoId = searchParams?.get('v');
  const [summary, setSummary] = useState<VideoSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (videoId) fetchSummary(videoId);
  }, [videoId]);

  const fetchSummary = async (videoId: string) => {
    try {
      setLoading(true);
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <p className="text-xl font-medium text-red-500">No video ID provided</p>
          <p className="mt-2 text-gray-600">Please provide a valid YouTube video URL</p>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <p className="text-xl font-medium text-red-500">{error}</p>
          <p className="mt-2 text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Video Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {summary.videoInfo.title}
              </h1>
              <p className="text-lg text-gray-600">
                Created by {summary.videoInfo.author}
              </p>
            </div>
          </div>

          {/* Summary Content */}
          <div className="grid gap-8 mb-8">
            <Section
              title="Overview"
              content={summary.content.overview}
              icon="📝"
              bgColor="bg-blue-50"
              iconBg="bg-blue-100"
            />
            
            <Section
              title="Main Points"
              content={summary.content.mainPoints}
              icon="🎯"
              isList
              bgColor="bg-purple-50"
              iconBg="bg-purple-100"
            />
            
            <Section
              title="Key Takeaways"
              content={summary.content.keyTakeaways}
              icon="💡"
              isList
              bgColor="bg-amber-50"
              iconBg="bg-amber-100"
            />
            
            <Section
              title="Conclusion"
              content={summary.content.conclusion}
              icon="🎬"
              bgColor="bg-green-50"
              iconBg="bg-green-100"
            />
          </div>

          {/* Download Button */}
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
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <Download className="w-5 h-5" />
            <span className="font-medium">Download Summary</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface SectionProps {
  title: string;
  content: string | string[];
  isList?: boolean;
  icon?: string;
  bgColor?: string;
  iconBg?: string;
}

function Section({ title, content, isList = false, icon, bgColor = 'bg-gray-50', iconBg = 'bg-gray-100' }: SectionProps) {
  if (!content || (Array.isArray(content) && content.length === 0)) return null;

  return (
    <div className={`rounded-2xl shadow-lg overflow-hidden ${bgColor}`}>
      <div className="p-8">
        <div className="flex items-center gap-3 mb-6">
          {icon && (
            <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center text-2xl`}>
              {icon}
            </div>
          )}
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        
        <div className="text-gray-700">
          {isList ? (
            <ul className="space-y-4">
              {(content as string[]).map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
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
