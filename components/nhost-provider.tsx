"use client";

import { NhostProvider } from '@nhost/nextjs';
import { nhost } from '@/lib/nhost';
import { ReactNode } from 'react';

export default function NhostClientProvider({ 
  children 
}: { 
  children: ReactNode 
}) {
  return (
    <NhostProvider nhost={nhost}>
      {children}
    </NhostProvider>
  );
} 