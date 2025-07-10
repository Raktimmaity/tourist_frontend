import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaGlobe,
  FaUserFriends,
  FaPlaneDeparture,
  FaCameraRetro,
} from 'react-icons/fa';

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-teal-50">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-4"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 text-center mb-12">
          Your Journey. Our Expertise.
        </h2>

        <p className="text-center text-lg text-gray-700 font-medium max-w-3xl mx-auto mb-16">
          We offer more than just tours — we create curated cultural journeys designed for modern explorers and authentic storytellers. Here’s how <span className="text-sky-700 font-semibold">NAVAD</span> elevates your travel:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
          {/* Global Travel */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300"
          >
            <div className="text-center mb-4">
              <FaGlobe className="text-4xl text-indigo-600 mx-auto mb-2" />
              <h3 className="text-2xl font-semibold text-gray-800">Global Travels</h3>
              <p className="text-gray-600 mt-1">Wander the world with comfort and confidence.</p>
            </div>
            <p className="text-gray-700 text-sm mb-2">
              Our global travel network helps you discover top-rated destinations while staying connected with real-time updates, local support, and tailored itineraries.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-3">
              <li>Destination filtering by budget, interests & season</li>
              <li>Multilingual assistance (5 major languages)</li>
              <li>Seamless integration of local guide services</li>
            </ul>
          </motion.div>

          {/* Group Tours */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300"
          >
            <div className="text-center mb-4">
              <FaUserFriends className="text-4xl text-indigo-600 mx-auto mb-2" />
              <h3 className="text-2xl font-semibold text-gray-800">Group Tours</h3>
              <p className="text-gray-600 mt-1">Travel is better when shared.</p>
            </div>
            <p className="text-gray-700 text-sm mb-2">
              Our expertly curated group tours foster connections — not just with places, but with people. Perfect for families, friends, student groups, or solo travelers.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-3">
              <li>Customizable group itineraries</li>
              <li>Budget-friendly packages</li>
              <li>Cultural exchange activities & local events</li>
            </ul>
          </motion.div>

          {/* Adventure Travel */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300"
          >
            <div className="text-center mb-4">
              <FaPlaneDeparture className="text-4xl text-indigo-600 mx-auto mb-2" />
              <h3 className="text-2xl font-semibold text-gray-800">Adventure Travel</h3>
              <p className="text-gray-600 mt-1">Fuel your adrenaline with unforgettable experiences.</p>
            </div>
            <p className="text-gray-700 text-sm mb-2">
              From trekking unexplored trails to deep-sea diving, NAVAD partners with certified local experts to offer thrilling yet responsible adventures.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-3">
              <li>AR-enabled historic trail maps</li>
              <li>Safety-first certified local experts</li>
              <li>Eco-conscious, offbeat experiences</li>
            </ul>
          </motion.div>

          {/* Photography Tours */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300"
          >
            <div className="text-center mb-4">
              <FaCameraRetro className="text-4xl text-indigo-600 mx-auto mb-2" />
              <h3 className="text-2xl font-semibold text-gray-800">Photography Tours</h3>
              <p className="text-gray-600 mt-1">Every destination has a story — let your lens tell it.</p>
            </div>
            <p className="text-gray-700 text-sm mb-2">
              Perfect for amateurs and pros alike, NAVAD’s photo journeys are guided by storytellers who take you beyond tourist spots.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-3">
              <li>Golden hour guided tours</li>
              <li>Exclusive access to hidden cultural gems</li>
              <li>Mentor sessions with local photo experts</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
