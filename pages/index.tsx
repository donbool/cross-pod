import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-xl w-full px-6 py-12 bg-white rounded-xl shadow-lg flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 text-indigo-700">Cross-Pod</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          AI-powered global micro-learning pods. Learn anything, anywhere, with a small group and weekly AI-generated projects.
        </p>
        <Link href="/onboarding" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
          Get Started
        </Link>
        {/* TODO: Add marketing copy, testimonials, and feature highlights */}
      </div>
    </main>
  );
} 