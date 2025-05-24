import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import destination1 from '../assets/img/destination1.jpg';
import destination2 from '../assets/img/destination2.jpg';
import destination3 from '../assets/img/destination3.jpg';
import destination4 from '../assets/img/destination4.jpg';

const destinations = [
  { image: destination1, name: "Paris", offer: "20%" },
  { image: destination2, name: "New York", offer: "15%" },
  { image: destination3, name: "Tokyo", offer: "10%" },
  { image: destination4, name: "Rome", offer: "25%" },
];

export default function Destination() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-teal-50">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 text-center mb-12">
          Popular Destinations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              className="relative w-full h-80 overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeInOut' }}
            >
              {/* Background Image */}
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover rounded-2xl"
              />

              {/* Offer Percentage */}
              <div className="absolute top-4 left-4 bg-indigo-600 text-white text-sm md:text-base font-semibold px-3 py-1 rounded-full shadow-md">
                {destination.offer} OFF
              </div>

              {/* Place Name */}
              <div className="absolute bottom-4 right-4 bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 text-white text-base md:text-lg font-semibold px-4 py-1 rounded-xl shadow-md">
                {destination.name}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
