import { useEffect, useState } from 'react';
import { Message } from '../types';

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    pod_id: '1',
    user_id: 'Alice',
    content: 'Excited for this week!',
    type: 'text',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    pod_id: '1',
    user_id: 'Bob',
    content: '',
    type: 'voice',
    audio_url: '',
    created_at: new Date().toISOString(),
  },
];

export function usePodChat(podId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setMessages(MOCK_MESSAGES);
      return;
    }
    if (!podId) return;
    // TODO: Add loading, error, and real-time updates
  }, [podId]);

  const sendMessage = async (userId: string, content: string, type: 'text' | 'voice', audio_url?: string) => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          pod_id: podId || '1',
          user_id: userId,
          content,
          type,
          audio_url,
          created_at: new Date().toISOString(),
        },
      ]);
      return;
    }
    // TODO: Optimistically update messages
  };

  return { messages, sendMessage };
} 