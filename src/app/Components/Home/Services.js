import React from 'react';

const Services = () => {
  const servicesData = [
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
  ];

  return (
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
          {servicesData.map((service, index) => (
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
  );
};

export default Services;