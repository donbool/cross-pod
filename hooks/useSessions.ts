import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Session } from '../types';

const MOCK_SESSIONS: Session[] = [
  {
    id: '1',
    pod_id: '1',
    scheduled_for: new Date(Date.now() + 86400000).toISOString(),
    calendar_event_id: null,
    created_at: new Date().toISOString(),
  },
];

export function useSessions(podId: string | null) {
  const [sessions, setSessions] = useState<Session[]>([]);
  // TODO: Add loading and error state, Google Calendar integration
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setSessions(MOCK_SESSIONS);
      return;
    }
    if (!podId) return;
    supabase
      .from('sessions')
      .select('*')
      .eq('pod_id', podId)
      .order('scheduled_for', { ascending: true })
      .then(({ data }) => {
        if (data) setSessions(data);
      });
  }, [podId]);
  return sessions;
} 