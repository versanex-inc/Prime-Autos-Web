"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function DesignPage() {
  const { slug } = useParams();
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        setLoading(true);
        const apiUrl = `${window.location.origin}/api/getDesignBySlug?slug=${slug}`;
        console.log("Fetching design from:", apiUrl);
        const res = await fetch(apiUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });

        console.log("Response status:", res.status);
        if (!res.ok) {
          const errorData = await res.json();
          console.log("Error response:", errorData);
          throw new Error(errorData.error || "Failed to fetch design");
        }

        const data = await res.json();
        console.log("Fetched data:", data);

        if (!data.design) {
          throw new Error("Design data not available");
        }

        setDesign({
          _id: data.design._id || "",
          image: data.design.image || { url: "" },
          slug: data.design.slug || "",
          title: data.design.title || "",
          designNumber: data.design.designNumber || "",
          carName: data.design.carName || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err.message);
        setFetchError(err.message);
        setLoading(false);
      }
    };

    if (slug) {
      fetchDesign();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600 mx-auto"></div>
          <p className="text-gray-300 mt-4">Loading design...</p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{fetchError}</p>
          <Link
            href="/designs"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3.5 rounded-full font-medium text-lg transition-all duration-300 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-1"
          >
            Back to Designs
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
    );
  }

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen font-sans">
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-6 text-center">
          <span className="text-red-600 font-medium uppercase tracking-widest text-sm mb-6 inline-block">
            Design Details
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            {design.title}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light">
            Custom car seat covers and poshish for {design.carName} by Prime Autos.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="rounded-2xl shadow-lg overflow-hidden">
              <Image
                src={design.image.url}
                alt={`${design.title} - Custom Car Seat Covers by Prime Autos`}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                unoptimized
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white mb-4">{design.title}</h2>
              <p className="text-gray-300 mb-4">
                <span className="font-semibold">Car:</span> {design.carName}
              </p>
              <p className="text-gray-300 mb-4">
                <span className="font-semibold">Design Number:</span> #{design.designNumber}
              </p>
              <p className="text-gray-300 mb-6">
                Elevate your vehicle's interior with this stunning design by Prime Autos. Our custom car seat covers and poshish are crafted to perfection, ensuring a luxurious and stylish look for your {design.carName}.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3.5 rounded-full font-medium text-lg transition-all duration-300 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-1"
              >
                Inquire About This Design
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

          <div className="text-center mt-16">
            <Link
              href="/designs"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3.5 rounded-full font-medium text-lg transition-all duration-300 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-1"
            >
              Back to Designs
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
}