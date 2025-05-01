'use client';

import { useState } from 'react';

export default function EditDesignForm({ design, onDesignUpdated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: design._id,
    imageUrl: design.image.url,
    slug: design.slug,
    title: design.title,
    designNumber: design.designNumber,
    carName: design.carName,
  });
  const [message, setMessage] = useState(null);
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
      const res = await fetch('/api/editDesign', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update design');
      }

      setMessage({ type: 'success', text: 'Design updated successfully!' });
      onDesignUpdated();
      setTimeout(() => setIsOpen(false), 1500); // Close drawer after 1.5s
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-all duration-300"
      >
        Edit
      </button>

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Edit Design</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
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
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 p-3 rounded font-medium text-base text-white bg-gray-600 hover:bg-gray-700 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}