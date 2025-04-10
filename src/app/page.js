/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";

export default function Home() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isGalleryLoading, setIsGalleryLoading] = useState(true);
  const [isHeroLoading, setIsHeroLoading] = useState(true);

  const carouselRef = useRef();
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    autoplaySpeed: 3000,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-gray-500 hover:bg-red-600 transition-all duration-300" />
    ),
  };

  // Hero images array
  const heroImages = [
    "https://i.imgur.com/45riBBl.jpg",
    "https://i.imgur.com/DkUSBTE.jpg",
    "https://i.imgur.com/0TXJKJA.jpg",
    "https://i.imgur.com/WqXRn64.jpg",
    "https://i.imgur.com/PCVVOfZ.jpg",
    "https://i.imgur.com/LLqoQ9I.jpg",
    "https://i.imgur.com/yxwT8tb.jpg",
  ];

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

  // Simulate hero images loading (you can modify this based on actual image loading)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeroLoading(false);
    }, 1000); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-950 text-gray-100 overflow-x-hidden font-sans">
      {/* Hero Carousel */}
      <section className="relative pt-20">
        {isHeroLoading ? (
          <div className="h-screen flex items-center justify-center bg-gray-950">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600 mx-auto"></div>
              <p className="text-gray-300 mt-4">Loading...</p>
            </div>
          </div>
        ) : (
          <Slider {...settings} ref={carouselRef}>
            {heroImages.map((img, index) => (
              <div key={index}>
                <div
                  className="h-screen bg-cover bg-center flex items-center relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-gray-950/95 after:via-gray-950/70 after:to-transparent"
                  style={{ backgroundImage: `url(${img})` }}
                >
                  <div className="container mx-auto px-6 relative z-10 pt-24 pb-32 animate-fadeIn">
                    <div className="max-w-3xl">
                      <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                        <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                          Premium
                        </span>{" "}
                        Automotive Upholstery
                      </h2>
                      <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-light">
                        Elevate your vehicle's interior with our bespoke craftsmanship. Unrivaled luxury meets timeless
                        design.
                      </p>
                      <div className="flex flex-wrap gap-6">
                        <a
                          href="https://wa.me/923049791616?text=Hi%20Prime%20Autos,%20I%27m%20interested%20in%20your%20car%20upholstery%20services."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-full font-medium text-base transition-all duration-300 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-1"
                        >
                          WhatsApp Now
                        </a>
                        <button
                          onClick={() => scrollToSection("gallery")}
                          className="border-2 border-red-600 text-red-600 hover:bg-red-600/10 px-6 py-3 rounded-full font-medium text-base transition-all duration-300 hover:-translate-y-1"
                        >
                          Explore Gallery
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/10 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative group">
              <Image
                src="https://i.imgur.com/X3yOezj.jpg"
                alt="About Prime Autos"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl w-full transform group-hover:scale-105 transition-all duration-500 object-cover"
              />
              <div className="absolute -bottom-8 -right-8 bg-red-600/20 w-40 h-40 rounded-full blur-3xl animate-pulse" />
            </div>
            <div className="lg:w-1/2">
              <span className="text-red-600 font-medium uppercase tracking-widest text-sm mb-6 inline-block">
                Our Legacy
              </span>
              <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight tracking-tight">
                Crafting <span className="text-red-600">Excellence</span> Since 2010
              </h3>
              <p className="text-gray-200 mb-6 text-lg leading-relaxed font-light">
                At Prime Autos, we fuse artisanal mastery with cutting-edge innovation to redefine automotive luxury.
              </p>
              <p className="text-gray-200 mb-8 text-lg leading-relaxed font-light">
                Every stitch, every contour reflects our commitment to perfection, using only the world's finest
                materials.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "1500+", label: "Vehicles Transformed" },
                  { value: "14+", label: "Years of Mastery" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:border-red-600/50 transition-all duration-300"
                  >
                    <h4 className="text-red-600 font-extrabold text-2xl mb-2">{stat.value}</h4>
                    <p className="text-gray-300 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-red-600 font-medium uppercase tracking-widest text-sm mb-6 inline-block">
              Our Expertise
            </span>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              <span className="text-red-600">Bespoke</span> Upholstery Artistry
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light">
              Tailored solutions for the most discerning automotive connoisseurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Seat Upholstery",
                desc: "Precision-stitched luxury in leather, Alcantara, or custom fabrics.",
                bgImage: "https://i.imgur.com/uN4LQ2W.jpg",
              },
              {
                title: "Dashboard Refinery",
                desc: "Elevate your cockpit with premium material wrapping.",
                bgImage: "https://i.imgur.com/IRPtQmU.jpg",
              },
              {
                title: "Roof Lining",
                desc: "Impeccable headliner craftsmanship in elite fabrics.",
                bgImage: "https://i.imgur.com/gYnyRFA.jpg",
              },
              {
                title: "Door Artistry",
                desc: "Bespoke panels with seamless feature integration.",
                bgImage: "https://i.imgur.com/Q6Sg22J.jpg",
              },
              {
                title: "Floor Couture",
                desc: "Luxury carpets with acoustic enhancement.",
                bgImage: "https://i.imgur.com/SzNaKQs.jpg",
              },
              {
                title: "Steering Elegance",
                desc: "Hand-stitched leather for supreme control.",
                bgImage: "https://i.imgur.com/6DStsx5.jpg",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="relative rounded-2xl border border-gray-800/50 hover:border-red-600/40 transition-all duration-500 hover:shadow-2xl hover:shadow-red-600/10 group hover:-translate-y-2 overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.bgImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950/25 to-gray-950/0 transition-all duration-500" />
                <div className="relative z-10 p-8 min-h-[400px] flex flex-col justify-between">
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-red-600 transition-all duration-300 drop-shadow-xl">
                      {service.title}
                    </h4>
                    <p className="text-gray-200 font-light text-lg drop-shadow-xl">{service.desc}</p>
                  </div>
                  <a
                    href="https://wa.me/923049791616?text=Hi%20Prime%20Autos,%20I%27m%20interested%20in%20your%20car%20upholstery%20services."
                    className="mt-6 inline-flex items-center gap-2 text-red-600 hover:text-red-500 text-sm font-medium transition-all duration-300 group-hover:gap-3 drop-shadow-xl"
                  >
                    Discover More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
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

      {/* Testimonials */}
      <section className="py-32 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-red-600 font-medium uppercase tracking-widest text-sm mb-6 inline-block">
              Client Voices
            </span>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              <span className="text-red-600">Testimonials</span> of Excellence
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "A transformative experience for my classic car - pure artistry!",
                name: "Ahmed Khan",
                role: "Classic Car Collector",
              },
              {
                quote: "Flawless execution, premium quality, and unmatched service.",
                name: "Fatima Ali",
                role: "Luxury Vehicle Owner",
              },
              {
                quote: "Prime Autos sets the gold standard in upholstery craftsmanship.",
                name: "Bilal Ahmed",
                role: "Auto Enthusiast",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-2xl p-8 border border-gray-800/50 hover:border-red-600/40 transition-all duration-300 hover:shadow-xl hover:shadow-red-600/10 hover:-translate-y-2"
              >
                <div className="text-red-600 text-4xl mb-4 font-serif">“</div>
                <p className="text-gray-200 mb-6 italic font-light leading-relaxed">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-white font-medium">{testimonial.name}</h5>
                    <p className="text-red-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 bg-gradient-to-br from-gray-900 to-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-red-600/10 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-red-600 font-medium uppercase tracking-widest text-sm mb-6 inline-block">
              Connect With Us
            </span>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              <span className="text-red-600">Redefine</span> Your Drive
            </h3>
            <p className="text-gray-200 max-w-2xl mx-auto text-lg mb-10 font-light">
              Begin your journey to automotive perfection with a complimentary consultation.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="https://wa.me/923049791616?text=Hi%20Prime%20Autos,%20I%27m%20interested%20in%20your%20car%20upholstery%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-1 flex items-center gap-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.296-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Start Chat
              </a>
              <a
                href="tel:+923049791616"
                className="border-2 border-red-600 text-red-600 hover:bg-red-600/10 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:-translate-y-1 flex items-center gap-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}