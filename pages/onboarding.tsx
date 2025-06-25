import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    goal: '',
    timezone: '',
    languages: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { full_name: form.full_name } },
    });
    if (error) setError(error.message);
    else setStep(2);
    setLoading(false);
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleProfile = async () => {
    setLoading(true);
    setError('');
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setError('Could not get user.');
      setLoading(false);
      return;
    }
    // Save profile info
    const { error: profileError } = await supabase.from('profiles').upsert({
      id: user.id,
      full_name: form.full_name,
      goal: form.goal,
      timezone: form.timezone,
      languages: form.languages.split(',').map(l => l.trim()),
    });
    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }
    // Try to find a pod with same goal, language, timezone, and <8 members
    const { data: pods, error: podError } = await supabase
      .from('pods')
      .select('*, pod_members(count)')
      .eq('goal', form.goal)
      .eq('language', form.languages.split(',')[0].trim())
      .eq('timezone', form.timezone);
    let podId = null;
    if (podError) {
      setError(podError.message);
      setLoading(false);
      return;
    }
    if (pods && pods.length > 0) {
      // Find a pod with <8 members
      const pod = pods.find((p: any) => (p.pod_members?.length ?? 0) < 8);
      if (pod) podId = pod.id;
    }
    // If no pod found, create one
    if (!podId) {
      const { data: newPod, error: newPodError } = await supabase.from('pods').insert({
        goal: form.goal,
        language: form.languages.split(',')[0].trim(),
        timezone: form.timezone,
        created_by: user.id,
      }).select().single();
      if (newPodError || !newPod) {
        setError(newPodError?.message || 'Could not create pod.');
        setLoading(false);
        return;
      }
      podId = newPod.id;
    }
    // Add user to pod_members
    const { error: memberError } = await supabase.from('pod_members').insert({
      pod_id: podId,
      user_id: user.id,
    });
    if (memberError) {
      setError(memberError.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    window.location.href = '/dashboard';
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700">Get Started</h2>
        {step === 1 && (
          <>
            <input
              className="w-full mb-3 p-2 border rounded"
              name="full_name"
              placeholder="Full Name"
              value={form.full_name}
              onChange={handleChange}
            />
            <input
              className="w-full mb-3 p-2 border rounded"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              className="w-full mb-3 p-2 border rounded"
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <button
              className="w-full bg-indigo-600 text-white py-2 rounded mb-2 hover:bg-indigo-700"
              onClick={handleSignUp}
              disabled={loading}
            >
              Sign Up
            </button>
            <button
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
              onClick={handleGoogle}
              disabled={loading}
            >
              Sign in with Google
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {/* TODO: Add validation, error handling, and loading states */}
          </>
        )}
        {step === 2 && (
          <>
            <input
              className="w-full mb-3 p-2 border rounded"
              name="goal"
              placeholder="Learning Goal (e.g. Rust for robotics)"
              value={form.goal}
              onChange={handleChange}
            />
            <input
              className="w-full mb-3 p-2 border rounded"
              name="timezone"
              placeholder="Time Zone (e.g. UTC+2)"
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
              onClick={handleProfile}
              disabled={loading}
            >
              Continue
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {/* TODO: Save profile info to Supabase, add validation */}
          </>
        )}
      </div>
    </main>
  );
} 