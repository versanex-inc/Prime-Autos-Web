/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const [isHeroLoading, setIsHeroLoading] = useState(true);
  const carouselRef = useRef();

  // Carousel settings
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
    lazyLoad: "ondemand",
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-gray-500 hover:bg-red-600 transition-all duration-300" />
    ),
  };

  // Hero images array
  const heroImages = [
    "/imgs/home-slider/prime-autos-custom-car-seat-covers-upholstery-poshish-interior-1.webp",
    "/imgs/home-slider/prime-autos-custom-car-seat-covers-upholstery-poshish-interior-2.webp",
    "/imgs/home-slider/prime-autos-custom-car-seat-covers-upholstery-poshish-interior-3.webp",
    "/imgs/home-slider/prime-autos-custom-car-seat-covers-upholstery-poshish-interior-4.webp",
    "/imgs/home-slider/prime-autos-custom-car-seat-covers-upholstery-poshish-interior-5.webp",
    "/imgs/home-slider/prime-autos-custom-car-seat-covers-upholstery-poshish-interior-6.webp",
    "/imgs/home-slider/prime-autos-custom-car-seat-covers-upholstery-poshish-interior-7.webp",
    "/imgs/home-slider/prime-autos-custom-car-seat-covers-upholstery-poshish-interior-8.webp",
  ];

  // Simulate hero images loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeroLoading(false);
    }, 500);
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
            <div key={index} className="h-screen relative">
              <Image
                src={img}
                alt={`Custom car seat covers and poshish interior upholstery by Prime Autos ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/70 to-transparent">
                <div className="container mx-auto px-6 relative z-10 pt-24 pb-32 animate-fadeIn">
                  <div className="max-w-3xl">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                      <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                        Premium<br />
                      </span>{" "}
                      Custom Car Seat Covers
                    </h2>
                    <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-light">
                      Transform your car's interior with custom car seat covers and poshish. Luxury meets enduring style.
                    </p>
                    <div className="flex flex-wrap gap-6">
                      <a
                        href="https://wa.me/923049791616?text=Hi%20Prime%20Autos%20I%20am%20ready%20to%20book%20your%20custom%20car%20seat%20covers%20service%20but%20want%20to%20know%20some%20more%20details."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-full font-medium text-base transition-all duration-300 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-1"
                      >
                        Book Appointment
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
  );
};

export default Hero;