import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import aboutImg from '../assets/img/about.jpg';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id='about' className="w-full px-4 py-12 bg-gradient-to-br from-indigo-50 via-white to-teal-50">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col md:flex-row justify-center items-center gap-12 max-w-6xl mx-auto"
      >
        {/* Left: Image */}
        <div className="w-full md:w-1/2">
          <img
            src={aboutImg}
            alt="About us"
            className="rounded-2xl shadow-xl w-full h-auto object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </div>

        {/* Right: Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 mb-6">
            About Us
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed tracking-wide font-medium mb-4">
            At <span className="font-semibold text-indigo-600">ExploreMore</span>, we redefine how you travel.
            Whether you're planning a solo escape, a family adventure, or a destination wedding,
            we make it personal. From immersive city tours with local guides to custom travel packages
            and AR-powered historical journeys — your travel dreams come to life with us.
          </p>

          {/* New NAVAD section */}
          <div className="mt-6 space-y-4 text-gray-800 text-base leading-relaxed font-medium">
            <h3 className="text-2xl font-bold text-indigo-700">
              NAVAD – Redefining Travel with Culture at its Core
            </h3>
            <p>
              At <span className="font-semibold text-sky-700">NAVAD</span>, we believe travel should go beyond sightseeing — it should connect hearts, stories, and heritage.
              We're a next-gen tourism platform that bridges the gap between traditional online travel booking and authentic, culturally-rich travel experiences.
            </p>
            <p>
              Built for explorers who seek meaning in every journey, NAVAD empowers travelers with personalized itineraries,
              direct access to professional local guides, and a one-of-a-kind way to experience the soul of every destination.
            </p>
            <p>
              Whether you're wandering ancient ruins with AR-powered tours or sharing a meal with a rural artisan,
              NAVAD is here to make every moment unforgettable — and every travel choice impactful.
            </p>
            <p className="font-semibold italic text-teal-700">
              Let’s travel meaningfully. Let’s travel locally. Let’s NAVAD.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
