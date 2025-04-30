import React from 'react';

const Testimonials = () => {
  const testimonialsData = [
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
  ];

  return (
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
          {testimonialsData.map((testimonial, index) => (
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
  );
};

export default Testimonials;