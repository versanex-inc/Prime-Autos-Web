/* eslint-disable react/no-unescaped-entities */
"use client";
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const testimonialsData = [
    {
      quote: "Prime Autos transformed my classic car with custom car seat covers and poshish interior - pure artistry!",
      name: "Ahmed Khan",
      role: "Classic Car Collector",
    },
    {
      quote: "Flawless custom poshish interior and car seat covers, with unmatched service from Prime Autos.",
      name: "Fatima Ali",
      role: "Luxury Vehicle Owner",
    },
    {
      quote: "Prime Autos sets the gold standard in custom car seat covers and poshish interior craftsmanship.",
      name: "Bilal Ahmed",
      role: "Auto Enthusiast",
    },
    {
      quote: "My car's interior is now a masterpiece thanks to Prime Autos' custom poshish and car seat covers.",
      name: "Sara Malik",
      role: "Car Owner",
    },
    {
      quote: "Prime Autos delivered stunning custom car seat covers and poshish interior with incredible attention to detail.",
      name: "Hassan Raza",
      role: "Automotive Blogger",
    },
    {
      quote: "The best in custom car seat covers and poshish interior - Prime Autos exceeded all expectations!",
      name: "Ayesha Siddiqui",
      role: "Luxury Car Enthusiast",
    },
  ];

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    lazyLoad: "ondemand",
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="testimonials" className="py-32 bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-red-600 font-medium uppercase tracking-widest text-sm mb-6 inline-block">
            Client Voices
          </span>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            <span className="text-red-600">Prime Autos</span> Testimonials of Excellence
          </h3>
        </div>

        <div className="relative pt-8">
          <Slider {...settings}>
            {testimonialsData.map((testimonial, index) => (
              <div key={index} className="px-4">
                <div
                  className="bg-gray-900 rounded-2xl p-8 border border-gray-800/50 hover:border-red-600/40 transition-all duration-300 hover:shadow-xl hover:shadow-red-600/10 hover:-translate-y-2 relative z-10"
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
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;