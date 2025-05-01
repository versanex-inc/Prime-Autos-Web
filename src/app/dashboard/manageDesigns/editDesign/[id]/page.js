'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditDesign() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: '',
    imageUrl: '',
    slug: '',
    title: '',
    designNumber: '',
    carName: '',
  });
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

        setFormData({
          id: data.design._id,
          imageUrl: data.design.image?.url || '',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch('/api/editDesign', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update design');
      }

      setMessage({ type: 'success', text: 'Design updated successfully!' });
      setTimeout(() => router.push('/dashboard/manageDesigns'), 1500); // Redirect after 1.5s
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
      setLoading(false);
    }
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-200 mb-2">
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter image URL"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-200 mb-2">
              Slug
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter slug"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-200 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter title"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="designNumber" className="block text-sm font-medium text-gray-200 mb-2">
              Design Number
            </label>
            <input
              type="number"
              id="designNumber"
              name="designNumber"
              value={formData.designNumber}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter design number"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="carName" className="block text-sm font-medium text-gray-200 mb-2">
              Car Name
            </label>
            <input
              type="text"
              id="carName"
              name="carName"
              value={formData.carName}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter car name"
              required
              disabled={loading}
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className={`flex-1 p-3 rounded font-medium text-base text-white transition-all duration-300 ${
                loading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-1'
              }`}
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Design'}
            </button>
            <Link href="/dashboard/manageDesigns">
              <span className="flex-1 p-3 rounded font-medium text-base text-white bg-gray-600 hover:bg-gray-700 transition-all duration-300 text-center block">
                Cancel
              </span>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}