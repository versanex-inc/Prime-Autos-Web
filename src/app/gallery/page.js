"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Gallery = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/gallery-images");
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          const items = data.map((item, index) => ({
            id: index + 1,
            src: item.url,
            title: item.title || `Project #${index + 1}`,
            category: item.description || "Bespoke Interior Design",
            width: 600,
            height: 400,
          }));
          setPortfolioItems(items);
        } else {
          throw new Error("Expected an array of image data");
        }
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Failed to load gallery images. Please try again later.");
        setPortfolioItems([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, []);

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen font-sans">
      {/* Gallery Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-6 text-center">
          <span className="text-red-600 font-medium uppercase tracking-widest text-sm mb-6 inline-block">
            Our Portfolio
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Masterworks
            </span>{" "}
            in Motion
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light">
            Explore our curated collection of automotive transformations, where craftsmanship meets passion.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-6">
          {error ? (
            <p className="text-gray-300 text-center">{error}</p>
          ) : isLoading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600 mx-auto"></div>
              <p className="text-gray-300 mt-4">Loading gallery images...</p>
            </div>
          ) : portfolioItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl shadow-lg"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={item.width}
                    height={item.height}
                    className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-110"
                    style={{ objectFit: "cover" }}
                    unoptimized // Fix: Bypass Next.js optimization
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white font-bold text-xl mb-1">{item.title}</h3>
                      <p className="text-red-600 text-sm">{item.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-300 text-center">No gallery images available.</p>
          )}

          <div className="text-center mt-16">
            <Link
              href="/"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3.5 rounded-full font-medium text-lg transition-all duration-300 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-1"
            >
              Back to Home
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Gallery;