import { useState } from 'react';

const buses = [
  { id: 1, name: "Bus 101", route: "New York to Boston", availableSeats: 30, price: 50, package: "Standard" },
  { id: 2, name: "Bus 102", route: "San Francisco to Los Angeles", availableSeats: 25, price: 75, package: "Premium" },
  { id: 3, name: "Bus 103", route: "Chicago to Miami", availableSeats: 20, price: 65, package: "Standard" },
  { id: 4, name: "Bus 104", route: "Dallas to Austin", availableSeats: 15, price: 40, package: "Budget" },
];

export default function Buses() {
  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="pb-8 text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 text-center mb-12">
          Available Bus Packages
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {buses.map((bus) => (
            <div key={bus.id} className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              {/* Bus Info */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-indigo-700">{bus.name}</h3>
                <p className="text-lg text-gray-500 mb-4">{bus.route}</p>

                {/* Package Information */}
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-teal-500 text-white text-sm px-3 py-1 rounded-full shadow-md">
                    {bus.package} Package
                  </span>
                  <span className="text-xl font-bold text-indigo-600">${bus.price}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Available Seats: {bus.availableSeats}</span>
                  <br />
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-indigo-700">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
