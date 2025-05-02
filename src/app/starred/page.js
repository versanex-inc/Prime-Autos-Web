'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Designs() {
  const [starredDesigns, setStarredDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStarredDesigns = async () => {
      try {
        const res = await fetch('/api/getStarredDesigns', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch starred designs');
        }

        setStarredDesigns(data.designs || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStarredDesigns();
  }, []);

  if (loading) {
    return <p className="text-gray-300 text-center">Loading designs...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <section className="py-12 bg-gray-950">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            Featured Designs
          </span>
        </h2>
        {starredDesigns.length === 0 ? (
          <p className="text-gray-300 text-center">No featured designs available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {starredDesigns.map((design) => (
              <div key={design._id} className="bg-gray-900/80 p-4 rounded-lg shadow-xl border border-gray-700">
                <img
                  src={design.image.url}
                  alt={design.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="text-xl font-semibold text-white mb-2">{design.title}</h3>
                <p className="text-gray-400 mb-2">Design #{design.designNumber}</p>
                <p className="text-gray-400 mb-4">{design.carName}</p>
                <Link href={`/designs#${design.slug}`}>
                  <span className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded hover:from-red-700 hover:to-red-800 transition-all duration-300">
                    View Details
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}