import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

export default function PodPage() {
  const router = useRouter();
  const { id } = router.query;
  // TODO: Fetch real pod, chat, sessions, and project data from Supabase
  const pod = { goal: 'Rust for robotics', language: 'en', timezone: 'UTC+2' };
  const project = { prompt: 'Build a simple robot arm controller in Rust.' };
  const messages = [
    { user: 'Alice', type: 'text', content: 'Excited for this week!' },
    { user: 'Bob', type: 'voice', audio_url: '', content: '' },
  ];
  const [chatInput, setChatInput] = useState('');

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
          <div className="text-gray-800">{project.prompt}</div>
          {/* TODO: Generate prompt with OpenAI API */}
        </div>
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="font-semibold mb-2">Group Chat</h2>
          <div className="h-40 overflow-y-auto mb-2 bg-gray-50 p-2 rounded">
            {messages.map((msg, i) => (
              <div key={i} className="mb-1">
                <span className="font-bold text-indigo-700">{msg.user}: </span>
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
            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Send</button>
            {/* TODO: Add voice upload button */}
          </div>
          {/* TODO: Implement real-time chat, voice upload, and translation/playback */}
        </div>
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="font-semibold mb-2">Session Schedule</h2>
          <div className="text-gray-800">Next session: 2024-06-10 18:00</div>
          <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Sync to Google Calendar</button>
          {/* TODO: Integrate Google Calendar API */}
        </div>
      </div>
    </main>
  );
} 