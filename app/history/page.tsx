"use client";

import { useEffect, useState } from 'react';
import { nhost } from '@/lib/nhost';
import { useUserData } from '@nhost/nextjs';
import { Button } from "@/components/ui/button";

interface Summary {
  id: string;
  summary: string;
  created_at: string;
  original_text: string;
}

export default function HistoryPage() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const user = useUserData();

  useEffect(() => {
    if (user) {
      nhost.graphql.request(`
        query($userId: uuid!) {
          summaries(where: { user_id: { _eq: $userId } }) {
            id
            original_text
            summary
            created_at
          }
        }
      `, { userId: user.id }).then(({ data }) => {
        setSummaries(data.summaries);
      }).catch(error => {
        console.error('Error fetching summaries:', error);
      });
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Summary History</h1>
      {summaries.length > 0 ? (
        <div className="space-y-4">
          {summaries.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Summary from {new Date(item.created_at).toLocaleDateString()}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.summary}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No summaries found</p>
        </div>
      )}
    </div>
  );
} 