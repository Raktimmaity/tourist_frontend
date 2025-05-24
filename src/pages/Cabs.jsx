import { useState } from 'react';
import sedan from '../assets/img/sedan.jpg';
import suv from '../assets/img/suv.jpg';
import minivan from '../assets/img/minivan.jpeg';
import luxury from '../assets/img/luxury.jpg';


const cabs = [
  { 
    id: 1, 
    name: "Sedan", 
    type: "Standard", 
    price: 30, 
    availability: "Available", 
    image: sedan
  },
  { 
    id: 2, 
    name: "SUV", 
    type: "Premium", 
    price: 50, 
    availability: "Available", 
    image: suv 
  },
  { 
    id: 3, 
    name: "Minivan", 
    type: "Family", 
    price: 60, 
    availability: "Available", 
    image: minivan 
  },
  { 
    id: 4, 
    name: "Luxury", 
    type: "Luxury", 
    price: 100, 
    availability: "Available", 
    image: luxury
  },
];

export default function Cabs() {
  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 text-center mb-12">
          Available Cabs and Packages
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cabs.map((cab) => (
            <div key={cab.id} className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              {/* Cab Image */}
              <img 
                src={cab.image} 
                alt={cab.name} 
                className="w-full h-48 object-cover rounded-t-2xl"
              />

              {/* Cab Info */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-indigo-700">{cab.name}</h3>
                <p className="text-lg text-gray-500 mb-4">{cab.type} Cab</p>

                {/* Pricing and Availability */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-indigo-600">${cab.price} / Hour</span>
                  <span className={`text-sm font-semibold ${cab.availability === "Available" ? 'text-green-500' : 'text-red-500'}`}>
                    {cab.availability}
                  </span>
                </div>

                <div className="flex justify-between items-center">
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
