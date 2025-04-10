import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientNav from "./Components/ClientNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Prime Autos",
  description: "Premium car poshish service in Pakistan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-gray-100`}>
        <ClientNav />
        {children}
        <footer className="bg-gray-950 border-t border-gray-900/50 py-12 relative">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,_var(--tw-gradient-stops))] from-red-600/5 via-transparent to-red-600/5" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12">
              {/* Logo and Description */}
              <div className="flex flex-col gap-4 pr-4 md:pr-8">
                <div className="text-4xl font-extrabold text-red-600 font-serif tracking-tight hover:scale-105 transition-transform duration-300">
                  Prime<span className="text-white">Autos</span>
                </div>
                <p className="text-gray-300 text-sm font-light leading-relaxed">
                  At Prime Autos, we redefine automotive luxury with bespoke upholstery craftsmanship.
                </p>
                <a
                  href="https://wa.me/923049791616?text=Hi%20Prime%20Autos,%20I%27m%20interested%20in%20your%20car%20upholstery%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-1 inline-block w-fit"
                >
                  Get a Quote
                </a>
              </div>

              {/* Company Links */}
              <div>
                <h4 className="text-red-600 font-medium uppercase tracking-widest text-sm mb-4">Company</h4>
                <ul className="space-y-2">
                  {['about', 'services', 'gallery', 'contact'].map((item) => (
                    <li key={item}>
                      <a
                        href={`#${item}`}
                        className="text-gray-300 hover:text-red-600 transition-all duration-300 font-light capitalize"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services Links */}
              <div>
                <h4 className="text-red-600 font-medium uppercase tracking-widest text-sm mb-4">Services</h4>
                <ul className="space-y-2">
                  {[
                    'Seat Upholstery',
                    'Dashboard Refinery',
                    'Roof Lining',
                    'Door Artistry',
                    'Floor Couture',
                    'Steering Elegance',
                  ].map((service, index) => (
                    <li key={index}>
                      <a
                        href="#services"
                        className="text-gray-300 hover:text-red-600 transition-all duration-300 font-light"
                      >
                        {service}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Details */}
              <div>
                <h4 className="text-red-600 font-medium uppercase tracking-widest text-sm mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-300 font-light">
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-600"
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
                    <a href="tel:03250607081" className="hover:text-red-600 transition-all duration-300">
                      0325 0607081
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.296-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <a
                      href="https://wa.me/923049791616?text=Hi%20Prime%20Autos,%20I%27m%20interested%20in%20your%20car%20upholstery%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-red-600 transition-all duration-300"
                    >
                      0304 9791616
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href="mailto:primeautos.buisness@gmail.com"
                      className="hover:text-red-600 transition-all duration-300"
                    >
                      primeautos.buisness@gmail.com
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <a
                      href="https://maps.google.com/?q=Sadar+Bazar,+Ghulam+Muhammad+Abad,+Faisalabad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-red-600 transition-all duration-300"
                    >
                      Sadar Bazar, Ghulam Muhammad Abad, Faisalabad
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Divider Line */}
            <div className="border-t border-gray-700/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm font-light">
              <div>
                © {new Date().getFullYear()} Prime Autos. Crafted with Precision.
              </div>
              <div className="flex gap-4 mt-4 md:mt-0">
                <a
                  href="https://facebook.com/primexautos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-red-600 transition-all duration-300 hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/primexautos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-red-600 transition-all duration-300 hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://tiktok.com/@primexautos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-red-600 transition-all duration-300 hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 3.163 6.33 6.33 0 0 0-.127 6.463 6.33 6.33 0 0 0 11.08.747V9.987a8.316 8.316 0 0 0 3.668 1V7.543a4.792 4.792 0 0 1-1.994-.857z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}