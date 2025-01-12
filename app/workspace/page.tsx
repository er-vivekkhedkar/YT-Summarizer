"use client";

import { useState } from 'react';
import { generateSummary } from '@/lib/summarizer';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'react-hot-toast';

export default function WorkspacePage() {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!input.trim()) {
      toast.error('Please enter some text to summarize');
      return;
    }

    setLoading(true);
    try {
      const result = await generateSummary(input);
      setSummary(result);
      toast.success('Summary generated!');
    } catch (error) {
      toast.error('Failed to generate summary');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">AI Workspace</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold mb-2">Input Text</h2>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to summarize..."
              className="h-[400px]"
            />
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-2">Summary</h2>
            <div className="bg-gray-50 p-4 rounded-lg h-[400px] overflow-auto">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                summary || 'Summary will appear here...'
              )}
            </div>
          </div>
        </div>

        <Button 
          onClick={handleSummarize} 
          disabled={loading || !input.trim()}
          className="w-full"
        >
          {loading ? 'Generating Summary...' : 'Generate Summary'}
        </Button>
      </div>
    </div>
  );
}

