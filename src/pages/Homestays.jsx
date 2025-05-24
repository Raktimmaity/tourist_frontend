import { useState } from "react";
import taj from "../assets/img/taj.jpeg";
import oberoi from "../assets/img/oberoi.jpg";
import leela from "../assets/img/leela.jpeg";
import villa1 from "../assets/img/villa1.jpg";
import villa2 from "../assets/img/villa2.jpg";
import villa3 from "../assets/img/villa3.jpg";
import {X} from 'lucide-react';

// Sample homestay & villa data
const homestays = [
  {
    name: "Serene Hillside Villa",
    location: "Manali, Himachal Pradesh",
    price: 7000,
    image: villa1,
    details: "Escape to the tranquility of the hills with this beautiful villa.",
    rooms: ["Deluxe Room", "Honeymoon Suite"],
    services: ["Bonfire Setup", "Private Balcony", "Valley View"],
    offers: "Stay 2 nights, get 1 night free!",
    actualPrice: 10000,
  },
  {
    name: "Coastal Homestay Retreat",
    location: "Alleppey, Kerala",
    price: 8500,
    image: villa2,
    details: "Experience backwaters and peace in this cozy homestay.",
    rooms: ["Lake View Room", "Cottage Room"],
    services: ["Houseboat Rides", "Traditional Meals", "Bike Rentals"],
    offers: "Free houseboat ride with 3+ day stay!",
    actualPrice: 11000,
  },
  {
    name: "Luxury Forest Villa",
    location: "Coorg, Karnataka",
    price: 9500,
    image: villa3,
    details: "Stay amidst coffee plantations in this modern forest villa.",
    rooms: ["Forest View Room", "Luxury Bungalow"],
    services: ["Nature Walks", "In-House Chef", "Fireplace"],
    offers: "20% discount for early bookings!",
    actualPrice: 12000,
  },
];

export default function HomeStays() {
  const [showModal, setShowModal] = useState(false);
  const [selectedStay, setSelectedStay] = useState(null);

  const handleDetailsClick = (stay) => {
    setSelectedStay(stay);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStay(null);
  };

  const renderCards = (data) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.location}</p>
            <div className="flex justify-between mt-4 items-center">
              <span className="font-medium">Price:</span>
              <span className="text-xl font-semibold">
                ₹{item.price}{" "}
                <strike className="text-sm text-gray-500">
                  ₹{item.actualPrice}
                </strike>
              </span>
            </div>
            <div className="mt-2 text-sm text-teal-600">{item.offers}</div>
            <div className="mt-4 flex flex-wrap justify-around gap-2">
              <button
                onClick={() => handleDetailsClick(item)}
                className="w-full p-2 sm:w-auto bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 text-white font-semibold py-2 rounded"
              >
                Details
              </button>
              <button className="w-full p-2 sm:w-auto bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 text-white font-semibold py-2 rounded">
                Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold my-10 text-center text-transparent pb-3 bg-clip-text bg-gradient-to-r from-rose-600 via-pink-500 to-amber-400">
        Homestays & Villas
      </h2>
      {renderCards(homestays)}

      {/* Modal */}
      {showModal && selectedStay && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white w-11/12 md:w-3/4 lg:w-2/3 rounded-xl shadow-lg p-6 flex flex-col lg:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left - Image */}
            <div className="w-full lg:w-1/3">
              <img
                src={selectedStay.image}
                alt={selectedStay.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-center">
                {selectedStay.name}
              </h3>
              <div className="text-center mt-2">
                <span className="text-xl font-semibold">
                  ₹{selectedStay.price}
                </span>{" "}
                <strike className="text-gray-500 text-sm">
                  ₹{selectedStay.actualPrice}
                </strike>
              </div>
              <div className="text-sm text-teal-600 text-center mt-1">
                {selectedStay.offers}
              </div>
            </div>

            {/* Right - Details */}
            <div className="w-full lg:w-2/3 lg:pl-6">
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-red-500 text-2xl"
                >
                  <X size={24} className="bg-red-500 text-white p-1 rounded-full" />
                </button>
              </div>
              <p className="text-gray-700 mb-4">{selectedStay.details}</p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="mb-4">
                  <h4 className="font-semibold">Available Rooms:</h4>
                  <ul className="list-disc pl-5">
                    {selectedStay.rooms.map((room, i) => (
                      <li key={i} className="text-gray-700">
                        {room}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold">Services Offered:</h4>
                  <ul className="list-disc pl-5">
                    {selectedStay.services.map((service, i) => (
                      <li key={i} className="text-gray-700">
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 text-white font-semibold py-2 px-6 rounded">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
