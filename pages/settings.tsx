import { useState } from 'react';

export default function Settings() {
  // TODO: Fetch real user profile from Supabase
  const [form, setForm] = useState({
    goal: 'Rust for robotics',
    timezone: 'UTC+2',
    languages: 'en,es',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    // TODO: Save profile info to Supabase
    setSaving(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700">Settings</h2>
        <input
          className="w-full mb-3 p-2 border rounded"
          name="goal"
          placeholder="Learning Goal"
          value={form.goal}
          onChange={handleChange}
        />
        <input
          className="w-full mb-3 p-2 border rounded"
          name="timezone"
          placeholder="Time Zone"
          value={form.timezone}
          onChange={handleChange}
        />
        <input
          className="w-full mb-3 p-2 border rounded"
          name="languages"
          placeholder="Languages (comma separated)"
          value={form.languages}
          onChange={handleChange}
        />
        <button
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          onClick={handleSave}
          disabled={saving}
        >
          Save
        </button>
        {/* TODO: Add account actions (sign out, delete account), fetch/save real data */}
      </div>
    </main>
  );
} 