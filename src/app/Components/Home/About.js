import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <section id="about" className="py-32 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/10 to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 relative group">
            <Image
              src="/imgs/prime-autos-custom-car-seat-covers-upholstery-poshish-interior-about.webp"
              alt="Prime Autos custom car seat covers and poshish interior"
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
              Crafting <span className="text-red-600">Prime Autos</span> Excellence Since 2005
            </h3>
            <p className="text-gray-200 mb-6 text-lg leading-relaxed font-light">
              At Prime Autos, we specialize in custom car seat covers and poshish interior designs, blending artisanal mastery with cutting-edge innovation to redefine automotive luxury.
            </p>
            <p className="text-gray-200 mb-8 text-lg leading-relaxed font-light">
              Every stitch and contour in our custom upholstery reflects our commitment to perfection, using the finest materials to transform your car's interior into a masterpiece of style and comfort.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "6000+", label: "Vehicles Transformed" },
                { value: "20+", label: "Years of Mastery" },
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
  );
};

export default About;