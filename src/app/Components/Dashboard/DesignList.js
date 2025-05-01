'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DeleteDesignButton from './DeleteDesignButton';

export default function DesignList() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDesigns = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/getDesigns', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch designs');
      }

      setDesigns(data.designs || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  const handleDesignUpdated = () => {
    fetchDesigns(); // Refresh the list after an update
  };

  const handleDesignDeleted = () => {
    fetchDesigns(); // Refresh the list after a deletion
  };

  if (loading) {
    return <p className="text-gray-300">Loading designs...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-gray-900/80 p-6 rounded-lg shadow-xl border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-4">Designs List</h3>
      {designs.length === 0 ? (
        <p className="text-gray-300">No designs found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-200">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3">Image</th>
                <th className="p-3">Title</th>
                <th className="p-3">Slug</th>
                <th className="p-3">Design Number</th>
                <th className="p-3">Car Name</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {designs.map((design) => (
                <tr key={design._id} className="border-t border-gray-700 hover:bg-gray-800">
                  <td className="p-3">
                    <img
                      src={design.image.url}
                      alt={design.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{design.title}</td>
                  <td className="p-3">{design.slug}</td>
                  <td className="p-3">{design.designNumber}</td>
                  <td className="p-3">{design.carName}</td>
                  <td className="p-3 flex gap-2">
                    <Link href={`/dashboard/manageDesigns/editDesign/${design._id}`}>
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-all duration-300 cursor-pointer">
                        Edit
                      </span>
                    </Link>
                    <DeleteDesignButton designId={design._id} onDesignDeleted={handleDesignDeleted} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}