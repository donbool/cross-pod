import { Session } from '../types';

type SessionSchedulerProps = {
  sessions: Session[];
  onSchedule: (start: string) => void;
};

export default function SessionScheduler({ sessions, onSchedule }: SessionSchedulerProps) {
  return (
    <div>
      <h2 className="font-semibold mb-2">Session Schedule</h2>
      <ul className="mb-2">
        {sessions.map((s) => (
          <li key={s.id} className="text-gray-800">
            {new Date(s.scheduled_for).toLocaleString()}
          </li>
        ))}
      </ul>
      <button
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={() => onSchedule(new Date().toISOString())}
      >
        Schedule New Session
      </button>
      {/* TODO: Add Google Calendar sync */}
    </div>
  );
} 