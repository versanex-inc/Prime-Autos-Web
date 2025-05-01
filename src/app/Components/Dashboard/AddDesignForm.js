'use client';

import { useState } from 'react';

export default function AddDesignForm() {
  const [formData, setFormData] = useState({
    imageUrl: '',
    slug: '',
    title: '',
    designNumber: '',
    carName: '',
  });
  const [message, setMessage] = useState(null); // For success/error messages
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch('/api/addDesign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to add design');
      }

      setMessage({ type: 'success', text: 'Design added successfully!' });
      setFormData({
        imageUrl: '',
        slug: '',
        title: '',
        designNumber: '',
        carName: '',
      });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900/80 p-6 rounded-lg shadow-xl border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-4">Add New Design</h3>
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
        <button
          type="submit"
          className={`w-full p-3 rounded font-medium text-base text-white transition-all duration-300 ${
            loading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-1'
          }`}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Design'}
        </button>
      </form>
    </div>
  );
}