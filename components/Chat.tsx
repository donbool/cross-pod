import { useState } from 'react';
import { Message } from '../types';

type ChatProps = {
  messages: Message[];
  onSend: (content: string, type: 'text' | 'voice', audio_url?: string) => void;
  loading?: boolean;
};

export default function Chat({ messages, onSend, loading }: ChatProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input, 'text');
      setInput('');
    }
  };

  return (
    <div>
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
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={handleSend}
          disabled={loading}
        >
          Send
        </button>
        {/* TODO: Add voice upload button and playback */}
      </div>
    </div>
  );
} 