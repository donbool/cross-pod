import Link from 'next/link';

export default function Navbar() {
  // TODO: Add user avatar, mobile menu
  return (
    <nav className="w-full bg-white shadow py-3 px-6 flex items-center justify-between">
      <div className="font-bold text-indigo-700 text-xl">
        <Link href="/dashboard">
          Cross-Pod
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/settings" className="hover:underline">
          Settings
        </Link>
        <button className="text-red-600 hover:underline">Sign Out</button>
      </div>
    </nav>
  );
} 