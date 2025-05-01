'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch('/api/verifyAdminToken', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          throw new Error('Token verification failed');
        }

        setLoading(false);
      } catch (err) {
        console.error('Verification error:', err);
        setError(err.message);
        router.push('/adminLogin');
      }
    };

    verifyToken();
  }, [router]);

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    router.push('/adminLogin');
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return null; // Redirecting to /adminLogin, so no need to render anything
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/70 to-transparent"></div>

      {/* Header */}
      <header className="mt-20 relative z-10 bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-500">Prime Autos Dashboard</h1>
        <nav className="flex gap-4">
          <Link href="/dashboard/manageDesigns">
            <span className="text-white hover:text-red-500 transition-all duration-300 cursor-pointer">
              Manage Designs
            </span>
          </Link>
          <Link href="/dashboard/managePortfolio">
            <span className="text-white hover:text-red-500 transition-all duration-300 cursor-pointer">
              Manage Portfolio
            </span>
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-6 mt-8 container mx-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-800 p-4 text-center text-gray-400">
        <p>© 2025 Prime Autos. Crafted with Precision in Custom Car Seat Covers and Poshish Interiors.</p>
      </footer>
    </div>
  );
}