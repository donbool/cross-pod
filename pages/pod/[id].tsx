import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePodChat } from '../../hooks/usePodChat';
import { useSessions } from '../../hooks/useSessions';
import { useProjects } from '../../hooks/useProjects';
import { supabase } from '../../lib/supabaseClient';
import { Pod, UserProfile } from '../../types';

export default function PodPage() {
  const router = useRouter();
  const { id } = router.query;
  const [pod, setPod] = useState<Pod | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { messages, sendMessage } = usePodChat(typeof id === 'string' ? id : null);
  const sessions = useSessions(typeof id === 'string' ? id : null);
  const project = useProjects(typeof id === 'string' ? id : null, 1); // week 1 for now
  const [chatInput, setChatInput] = useState('');
  const [sessionLoading, setSessionLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id || typeof id !== 'string') return;
      setLoading(true);
      // Fetch pod info
      const { data: pod, error: podError } = await supabase.from('pods').select('*').eq('id', id).single();
      if (podError) {
        setError('Could not fetch pod.');
        setLoading(false);
        return;
      }
      setPod(pod);
      // Fetch user profile
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        setError('Not logged in.');
        setLoading(false);
        return;
      }
      const { data: profile, error: profileError } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (profileError) {
        setError('Could not fetch profile.');
        setLoading(false);
        return;
      }
      setProfile(profile);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleSend = async () => {
    if (!profile || !id || !chatInput.trim()) return;
    await sendMessage(profile.id, chatInput, 'text');
    setChatInput('');
  };

  const handleSchedule = async (start: string) => {
    if (!id) return;
    setSessionLoading(true);
    await supabase.from('sessions').insert({
      pod_id: id,
      scheduled_for: start,
    });
    setSessionLoading(false);
    // Optionally, refresh sessions
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!pod) return <div className="p-8 text-center text-gray-500">Pod not found.</div>;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard" className="text-indigo-600 hover:underline">
          ← Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold mt-2 mb-2 text-indigo-700">Pod: {pod.goal}</h1>
        <div className="mb-4 text-gray-600">Language: {pod.language} | Timezone: {pod.timezone}</div>
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="font-semibold mb-2">This Week's Project</h2>
          <div className="text-gray-800">{project?.prompt || 'No project yet.'}</div>
        </div>
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="font-semibold mb-2">Group Chat</h2>
          <div className="h-40 overflow-y-auto mb-2 bg-gray-50 p-2 rounded">
            {messages.map((msg, i) => (
              <div key={i} className="mb-1">
                <span className="font-bold text-indigo-700">{msg.user_id}: </span>
                {msg.type === 'text' ? (
                  <span>{msg.content}</span>
                ) : (
                  <span className="italic text-gray-500">[Voice message]</span>
                )}
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              className="flex-1 p-2 border rounded"
              placeholder="Type a message..."
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
            />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="font-semibold mb-2">Session Schedule</h2>
          <ul className="mb-2">
            {sessions.map((s) => (
              <li key={s.id} className="text-gray-800">
                {new Date(s.scheduled_for).toLocaleString()}
              </li>
            ))}
            {sessions.length === 0 && <li className="text-gray-500">No sessions yet.</li>}
          </ul>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => handleSchedule(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString())}
            disabled={sessionLoading}
          >
            Schedule New Session
          </button>
        </div>
      </div>
    </main>
  );
} 