import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePods } from '../hooks/usePods';
import { supabase } from '../lib/supabaseClient';
import { UserProfile } from '../types';

export default function Dashboard() {
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const pods = usePods(userId);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        setError('Not logged in.');
        setLoading(false);
        return;
      }
      setUserId(user.id);
      // Fetch profile
      const { data: profile, error: profileError } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (profileError) {
        setError('Could not fetch profile.');
        setLoading(false);
        return;
      }
      setProfile(profile);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-indigo-700">Dashboard</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Your Pods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pods.map((pod) => (
              <Link key={pod.id} href={`/pod/${pod.id}`} className="block p-4 bg-white rounded shadow hover:bg-indigo-50">
                <div className="font-bold text-lg">{pod.goal}</div>
                <div className="text-sm text-gray-500">Language: {pod.language}</div>
                <div className="text-sm text-gray-500">Timezone: {pod.timezone}</div>
              </Link>
            ))}
            {pods.length === 0 && <div className="text-gray-500">No pods yet.</div>}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Streak</h2>
          <div className="flex items-center space-x-2 text-2xl">
            <span>{profile?.streak ?? 0} days</span>
            {(profile?.badges ?? []).map((badge, i) => (
              <span key={i}>{badge}</span>
            ))}
          </div>
        </div>
        {/* TODO: Add upcoming sessions, fetch real data, handle loading states */}
      </div>
    </main>
  );
} 