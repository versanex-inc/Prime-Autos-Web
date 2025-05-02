'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import EditDesignForm from '@/app/Components/Dashboard/EditDesignForm';

export default function EditDesign() {
  const router = useRouter();
  const { id } = useParams();
  const [design, setDesign] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const res = await fetch(`/api/getDesignById?id=${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Design not found');
          }
          throw new Error('Failed to fetch design');
        }

        const data = await res.json();

        if (!data.design) {
          throw new Error('Design data not available');
        }

        setDesign({
          _id: data.design._id || '',
          image: data.design.image || { url: '' },
          slug: data.design.slug || '',
          title: data.design.title || '',
          designNumber: data.design.designNumber || '',
          carName: data.design.carName || '',
        });
        setLoading(false);
      } catch (err) {
        setFetchError(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchDesign();
    }
  }, [id]);

  const handleDesignUpdated = () => {
    setMessage({ type: 'success', text: 'Design updated successfully!' });
    setTimeout(() => router.push('/dashboard/manageDesigns'), 1500);
  };

  if (loading) {
    return <p className="text-gray-300">Loading design...</p>;
  }

  if (fetchError) {
    return (
      <div>
        <p className="text-red-500">{fetchError}</p>
        <Link href="/dashboard/manageDesigns">
          <span className="mt-4 inline-block text-white hover:text-red-500 transition-all duration-300 cursor-pointer">
            Back to Manage Designs
          </span>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">
          <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            Edit Design
          </span>
        </h2>
        <Link href="/dashboard/manageDesigns">
          <span className="text-white hover:text-red-500 transition-all duration-300 cursor-pointer">
            Back to Manage Designs
          </span>
        </Link>
      </div>

      <div className="bg-gray-900/80 p-6 rounded-lg shadow-xl border border-gray-700">
        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.type === 'success' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
            }`}
          >
            {message.text}
          </div>
        )}
        <EditDesignForm design={design} onDesignUpdated={handleDesignUpdated} />
      </div>
    </>
  );
}