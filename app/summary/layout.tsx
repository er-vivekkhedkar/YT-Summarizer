import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      <p className="mt-4 text-lg text-gray-600">Loading...</p>
    </div>
  );
}

export default function SummaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  );
} 