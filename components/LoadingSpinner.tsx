'use client';

import { Loader2 } from 'lucide-react';
const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
    <p className="mt-6 text-xl font-medium text-gray-700">Analyzing video content...</p>
    <p className="mt-2 text-sm text-gray-500">This may take a moment</p>
  </div>
  );
};

export default LoadingSpinner; 