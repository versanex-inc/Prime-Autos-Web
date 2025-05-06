"use client";

import { useState, useEffect } from 'react';

export default function AddDesignForm() {
  const [formData, setFormData] = useState({
    imageUrl: '',
    slug: '',
    title: '',
    designNumber: '',
    carName: '',
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Auto-generate title and slug from image filename
  useEffect(() => {
    if (file) {
      const fileName = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
      setFormData((prev) => ({
        ...prev,
        title: fileName,
        slug: fileName
          .toLowerCase()
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/[^a-z0-9-]/g, '') // Remove special characters
          .replace(/-+/g, '-'), // Replace multiple hyphens with a single hyphen
      }));
    } else if (!file && !formData.imageUrl) {
      setFormData((prev) => ({ ...prev, title: '', slug: '' }));
    }
  }, [file, formData.imageUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      if (file) {
        const data = new FormData();
        data.append('image', file);
        data.append('slug', formData.slug);
        data.append('title', formData.title);
        data.append('designNumber', formData.designNumber);
        data.append('carName', formData.carName);

        console.log('Sending FormData:');
        for (let pair of data.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }

        const res = await fetch('/api/addDesign', { method: 'POST', body: data });
        const dataRes = await res.json();
        if (!res.ok) throw new Error(dataRes.error || 'Failed to add design');
        setMessage({ type: 'success', text: 'Design added successfully!' });
      } else {
        const res = await fetch('/api/addDesign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const dataRes = await res.json();
        if (!res.ok) throw new Error(dataRes.error || 'Failed to add design');
        setMessage({ type: 'success', text: 'Design added successfully!' });
      }

      setFormData({ imageUrl: '', slug: '', title: '', designNumber: '', carName: '' });
      setFile(null);
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
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-200 mb-2">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            onChange={handleFileChange}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-200 mb-2">
            Or Enter Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Enter image URL"
            disabled={loading || file}
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-200 mb-2">
            Title (Auto-generated from image, editable)
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Title will auto-generate from image"
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
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-200 mb-2">
            Slug (Auto-generated from image, editable)
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Slug will auto-generate from image"
            required
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className={`w-full p-3 rounded font-medium text-base text-white transition-all duration-300 ${
            loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-1'
          }`}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Design'}
        </button>
      </form>
    </div>
  );
}