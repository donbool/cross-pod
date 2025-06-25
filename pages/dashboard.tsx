import Link from 'next/link';

export default function Dashboard() {
  // TODO: Fetch real user, pods, sessions, and badges from Supabase
  const pods = [
    { id: '1', goal: 'Rust for robotics', language: 'en', nextSession: '2024-06-10 18:00' },
  ];
  const streak = 3;
  const badges = ['🔥', '💡'];

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
                <div className="text-sm text-gray-500">Next session: {pod.nextSession}</div>
              </Link>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Streak</h2>
          <div className="flex items-center space-x-2 text-2xl">
            <span>{streak} days</span>
            {badges.map((badge, i) => (
              <span key={i}>{badge}</span>
            ))}
          </div>
        </div>
        {/* TODO: Add upcoming sessions, fetch real data, handle loading states */}
      </div>
    </main>
  );
} 