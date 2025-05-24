import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGlobe, FaUserFriends, FaPlaneDeparture, FaCameraRetro } from 'react-icons/fa';

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
          Our Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Service 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-6 bg-white rounded-xl shadow-lg transition-all duration-300"
          >
            <FaGlobe className="text-4xl text-indigo-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Global Travel</h3>
            <p className="text-gray-600">
              Explore worldwide destinations with tailored travel experiences and local insights.
            </p>
          </motion.div>

          {/* Service 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-6 bg-white rounded-xl shadow-lg transition-all duration-300"
          >
            <FaUserFriends className="text-4xl text-indigo-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Group Tours</h3>
            <p className="text-gray-600">
              Join our fun group tours and make new friends while exploring the world together.
            </p>
          </motion.div>

          {/* Service 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-6 bg-white rounded-xl shadow-lg transition-all duration-300"
          >
            <FaPlaneDeparture className="text-4xl text-indigo-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Adventure Travel</h3>
            <p className="text-gray-600">
              Feel the thrill of adventure with custom trips for those seeking a bit of excitement.
            </p>
          </motion.div>

          {/* Service 4 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-6 bg-white rounded-xl shadow-lg transition-all duration-300"
          >
            <FaCameraRetro className="text-4xl text-indigo-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Photography Tours</h3>
            <p className="text-gray-600">
              Capture breathtaking moments with expert photographers during your travels.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
