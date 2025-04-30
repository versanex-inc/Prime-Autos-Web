import React from 'react';

const Services = () => {
  const servicesData = [
    {
      title: "Custom Car Seat Covers",
      desc: "Precision-stitched custom car seat covers in leather, Alcantara, or poshish fabrics for a luxurious interior.",
      bgImage: "/imgs/services/prime-autos-custom-car-seat-covers-upholstery-poshish-interior-seats.webp",
      alt: "Prime Autos custom car seat covers and poshish interior upholstery",
    },
    {
      title: "Dashboard Poshish Refinery",
      desc: "Elevate your car's interior with premium poshish material wrapping for a refined dashboard.",
      bgImage: "/imgs/services/prime-autos-custom-car-seat-covers-upholstery-poshish-interior-about-dashboard.webp",
      alt: "Prime Autos custom dashboard poshish interior refinement",
    },
    {
      title: "Roof Lining Poshish",
      desc: "Impeccable headliner craftsmanship with elite poshish fabrics for a stunning car interior.",
      bgImage: "/imgs/services/prime-autos-custom-car-seat-covers-upholstery-poshish-interior-roof.webp",
      alt: "Prime Autos custom roof lining poshish interior",
    },
    {
      title: "Door Poshish Artistry",
      desc: "Bespoke door panels with seamless poshish integration for a cohesive car interior.",
      bgImage: "/imgs/services/prime-autos-custom-car-seat-covers-upholstery-poshish-interior-doors.webp",
      alt: "Prime Autos custom door poshish interior artistry",
    },
    {
      title: "Floor Poshish Couture",
      desc: "Luxury carpets with poshish detailing and acoustic enhancement for a premium car interior.",
      bgImage: "/imgs/services/prime-autos-custom-car-seat-covers-upholstery-poshish-interior-floor.webp",
      alt: "Prime Autos custom floor poshish interior couture",
    },
    {
      title: "Steering Poshish Elegance",
      desc: "Hand-stitched leather and poshish steering wheels for supreme control and interior elegance.",
      bgImage: "/imgs/services/prime-autos-custom-car-seat-covers-upholstery-poshish-interior-steering.webp",
      alt: "Prime Autos custom steering poshish interior elegance",
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
            <span className="text-red-600">Prime Autos</span> Custom Upholstery Artistry
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light">
            Tailored custom car seat covers and poshish interiors for discerning automotive enthusiasts.
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
                   href="https://wa.me/923049791616?text=Hi%20Prime%20Autos%20I%20am%20ready%20to%20book%20your%20custom%20car%20seat%20covers%20service%20but%20want%20to%20know%20some%20more%20details."
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