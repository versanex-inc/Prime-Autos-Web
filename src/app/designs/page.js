/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Designs = () => {
  const [designs, setDesigns] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDesigns() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/getDesigns");
        if (!response.ok) {
          throw new Error("Failed to fetch designs");
        }
        const data = await response.json();
        if (Array.isArray(data.designs)) {
          const items = data.designs.map((item) => ({
            id: item._id,
            slug: item.slug,
            src: item.image.url,
            title: item.title || `Design #${item.designNumber}`,
            category: `${item.carName} - Design #${item.designNumber}`,
            width: 600,
            height: 400,
          }));
          setDesigns(items);
        } else {
          throw new Error("Expected an array of designs");
        }
      } catch (err) {
        console.error("Error fetching designs:", err);
        setError("Failed to load designs. Please try again later.");
        setDesigns([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDesigns();
  }, []);

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen font-sans">
      {/* Designs Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-6 text-center">
          <span className="text-red-600 font-medium uppercase tracking-widest text-sm mb-6 inline-block">
            Our Portfolio
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Prime Autos
            </span>{" "}
            Designs
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light">
            Explore Prime Autos' custom car seat covers, poshish, and interior designs for your vehicle.
          </p>
        </div>
      </section>

      {/* Designs Grid */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-6">
          {error ? (
            <p className="text-gray-300 text-center">{error}</p>
          ) : isLoading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600 mx-auto"></div>
              <p className="text-gray-300 mt-4">Loading designs...</p>
            </div>
          ) : designs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {designs.map((item) => (
                <Link href={`/designs/design/${item.slug}`} key={item.id}>
                  <div className="group relative overflow-hidden rounded-2xl shadow-lg">
                    <Image
                      src={item.src}
                      alt={`${item.title} - Custom Car Seat Covers by Prime Autos`}
                      width={item.width}
                      height={item.height}
                      className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-110"
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-white font-bold text-xl mb-1">{item.title}</h3>
                        <p className="text-red-600 text-sm">{item.category}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-300 text-center">No designs available.</p>
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

export default Designs;