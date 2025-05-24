import React from 'react';

const packages = [
  {
    title: 'Goa Beach Escape',
    description: '3 nights, 4 days with breakfast, sightseeing, and return flight tickets.',
    features: ['Beachside hotel stay', 'Daily breakfast', 'Flight tickets', 'Sightseeing tour'],
    originalPrice: 23999,
    offerPrice: 18999,
  },
  {
    title: 'Romantic Manali Getaway',
    description: '2 nights stay in deluxe cottage with candlelight dinner and snow activities.',
    features: ['Deluxe cottage', 'Candlelight dinner', 'Snow adventure', 'Local guide'],
    originalPrice: 16499,
    offerPrice: 12499,
  },
  {
    title: 'Kerala Backwaters Tour',
    description: 'Houseboat cruise, cultural show and local cuisine experience for 3 days.',
    features: ['Houseboat stay', 'Local cuisine', 'Cultural show', 'Guided tour'],
    originalPrice: 25999,
    offerPrice: 21999,
  },
];

export default function Holiday() {
  return (
    <div className="bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 min-h-screen py-12 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Holiday Packages</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div key={index} className="bg-white text-black rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <h2 className="text-2xl font-semibold mb-2 text-indigo-700">{pkg.title}</h2>
              <p className="mb-3 text-gray-700">{pkg.description}</p>
              <ul className="mb-4 text-sm text-gray-600 list-disc pl-5">
                {pkg.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <div className="text-lg font-bold">
                <span className="line-through text-red-500 mr-2">₹{pkg.originalPrice}</span>
                <span className="text-green-600">₹{pkg.offerPrice}</span>
              </div>
              <button className="mt-4 w-full bg-indigo-700 text-white py-2 rounded hover:bg-indigo-800 transition">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
