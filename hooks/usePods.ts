import { useEffect, useState } from 'react';
import { Pod } from '../types';

const MOCK_PODS: Pod[] = [
  {
    id: '1',
    goal: 'Rust for robotics',
    language: 'en',
    timezone: 'UTC+2',
    created_by: 'user1',
    created_at: new Date().toISOString(),
  },
];

export function usePods(userId: string | null) {
  const [pods, setPods] = useState<Pod[]>([]);
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setPods(MOCK_PODS);
      return;
    }
    if (!userId) return;
    // TODO: Add loading and error state
    // ... existing code ...
  }, [userId]);
  return pods;
} 