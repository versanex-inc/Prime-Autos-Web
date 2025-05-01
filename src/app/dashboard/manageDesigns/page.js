'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AddDesignForm from '@/app/Components/Dashboard/AddDesignForm';
import DesignList from '@/app/Components/Dashboard/DesignList';

export default function ManageDesigns() {
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

      {/* Main Content */}
      <main className="relative z-10 p-6 mt-8 container mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">
          <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            Manage Designs
          </span>
        </h2>

        {/* Add Design Form */}
        <div className="mb-12">
          <AddDesignForm />
        </div>

        {/* Design List */}
        <div>
          <DesignList />
        </div>
      </main>
    </div>
  );
}