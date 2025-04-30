/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isGalleryLoading, setIsGalleryLoading] = useState(true);

  // Fetch gallery images
  useEffect(() => {
    async function fetchImages() {
      try {
        setIsGalleryLoading(true);
        const response = await fetch("/api/home-gallery");
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          throw new Error("Expected an array of image URLs");
        }
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Failed to load images. Please try again later.");
        setImages([]);
      } finally {
        setIsGalleryLoading(false);
      }
    }
    fetchImages();
  }, []);

  return (
    <section id="gallery" className="py-32 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-red-600 font-medium uppercase tracking-widest text-sm mb-6 inline-block">
            Our Masterpieces
          </span>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            <span className="text-red-600">Gallery</span> of Distinction
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light">
            Witness the artistry of our transformed interiors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {error ? (
            <p className="text-gray-300 text-center col-span-full">{error}</p>
          ) : isGalleryLoading ? (
            <div className="text-center col-span-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600 mx-auto"></div>
              <p className="text-gray-300 mt-4">Loading gallery...</p>
            </div>
          ) : images.length > 0 ? (
            images.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={image.url}
                  alt={image.title || `Gallery ${index + 1}`}
                  width={400}
                  height={400}
                  className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="text-white font-bold text-xl mb-1">{image.title}</h4>
                    <p className="text-red-600 text-sm">{image.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-300 text-center col-span-full">No images available.</p>
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3.5 rounded-full font-medium text-lg transition-all duration-300 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-1"
          >
            Full Portfolio
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;