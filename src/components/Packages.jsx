import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';

import thailand from '../assets/img/thailand.jpg';
import indonesia from '../assets/img/indonesia.jpg';
import malaysia from '../assets/img/malaysia.jpg';

const packages = [
  { image: thailand, country: 'Thailand', days: '3 days', persons: '2 Person', price: '$149.00' },
  { image: indonesia, country: 'Indonesia', days: '3 days', persons: '2 Person', price: '$139.00' },
  { image: malaysia, country: 'Malaysia', days: '3 days', persons: '2 Person', price: '$189.00' },
  { image: thailand, country: 'Thailand Deluxe', days: '5 days', persons: '4 Person', price: '$249.00' },
  { image: indonesia, country: 'Bali Honeymoon', days: '6 days', persons: '2 Person', price: '$299.00' },
  { image: malaysia, country: 'Malaysia Explorer', days: '7 days', persons: '2 Person', price: '$279.00' },
];

export default function Packages() {
  const location = useLocation();
  const isPackagePage = location.pathname === '/package';
  const displayedPackages = isPackagePage ? packages : packages.slice(0, 3);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section className="py-28 bg-gradient-to-br from-indigo-50 via-white to-teal-50">
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto px-4"
      >
        <h2 className="text-4xl pb-2 md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 text-center mb-12">
          Travel Packages
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {displayedPackages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <img src={pkg.image} alt={pkg.country} className="w-full h-56 object-cover" />

              <div className="p-6">
                <div className="flex items-center justify-between text-gray-500 text-sm mb-4 border border-gray-200 p-2 rounded-full">
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-indigo-600" />
                    {pkg.country}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-indigo-600" />
                    {pkg.days}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUser className="text-indigo-600" />
                    {pkg.persons}
                  </div>
                </div>

                <div className="text-2xl font-bold text-indigo-700 mb-2">{pkg.price}</div>
                <div className="text-yellow-500 mb-4">★★★★★</div>
                <p className="text-gray-600 mb-6">
                  Tempor erat elitr rebun at clita. Diam dolor diam ipsum sit diam amet diam eos.
                </p>
                <div className="flex gap-3">
                  <button className="bg-lime-500 hover:bg-lime-600 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300">
                    Read More
                  </button>
                  <button className="bg-lime-600 hover:bg-lime-700 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
