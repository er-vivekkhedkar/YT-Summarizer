"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast';

export default function WorkspacePage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Workspace</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 mb-4">
              Your workspace content will appear here.
            </p>
            <Button 
              disabled={loading}
              onClick={() => toast.success('Feature coming soon!')}
            >
              {loading ? 'Loading...' : 'Get Started'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

