import { useState } from "react";
import taj from "../assets/img/taj.jpeg";
import oberoi from "../assets/img/oberoi.jpg";
import leela from "../assets/img/leela.jpeg";
import { X } from 'lucide-react';

// Sample hotel data
const hotels = [
  {
    name: "Taj Mahal Palace, Mumbai",
    location: "Mumbai, Maharashtra",
    price: 12000,
    image: taj,
    details: "Experience luxury and royal comfort at the Taj Mahal Palace.",
    rooms: ["Luxury Suite", "Ocean View Room", "Presidential Suite"],
    services: ["24/7 Room Service", "Spa and Wellness Center", "Swimming Pool"],
    offers: "Get 15% off on your first booking!",
  },
  {
    name: "The Oberoi, Delhi",
    location: "Delhi, India",
    price: 15000,
    image: oberoi,
    details: "A luxury hotel with modern amenities and world-class services.",
    rooms: ["Superior Room", "Premium Suite", "Executive Room"],
    services: [
      "Free Airport Pickup",
      "Concierge Service",
      "24-Hour Fitness Center",
    ],
    offers: "Special 10% discount on bookings for 3+ nights!",
  },
  {
    name: "Leela Palace, Bangalore",
    location: "Bangalore, Karnataka",
    price: 18000,
    image: leela,
    details:
      "A majestic hotel offering exquisite services and a grand atmosphere.",
    rooms: ["Palace Room", "Garden View Room", "Royal Suite"],
    services: ["Luxury Dining", "Private Events Venue", "Valet Parking"],
    offers: "Book now and enjoy a complimentary breakfast during your stay!",
  },
];

export default function Hotels() {
  const [showModal, setShowModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleDetailsClick = (hotel) => {
    setSelectedHotel(hotel);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedHotel(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 pb-3">
        Available Hotels
      </h2>

      {/* Hotel Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hotels.map((hotel, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{hotel.name}</h3>
              <p className="text-sm text-gray-600">{hotel.location}</p>
              <div className="flex justify-between mt-4">
                <span className="font-medium">Price:</span>
                <span className="text-xl font-semibold">₹{hotel.price}</span>
              </div>
              <div className="mt-4 flex flex-wrap justify-around gap-2">
                <button
                  onClick={() => handleDetailsClick(hotel)}
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 hover:brightness-110 text-white font-semibold py-2 px-4 rounded"
                >
                  Details
                </button>
                <button className="w-full sm:w-auto bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 hover:brightness-110 text-white font-semibold py-2 px-4 rounded">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedHotel && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl shadow-xl p-6 w-11/12 md:w-3/4 lg:w-2/3 flex flex-col lg:flex-row transition-transform transform scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image and summary */}
            <div className="w-full lg:w-1/3 flex flex-col justify-center items-center mb-4 lg:mb-0">
              <img
                src={selectedHotel.image}
                alt={selectedHotel.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-center">
                {selectedHotel.name}
              </h3>
              <span className="text-lg font-semibold mt-2">
                ₹{selectedHotel.price}{" "}
                <strike className="text-sm text-gray-500">₹15000</strike>{" "}
                <span className="text-sm bg-gradient-to-b from-blue-400 to-green-300 p-1 rounded-full">
                  60% Off
                </span>
              </span>
            </div>

            {/* Details */}
            <div className="w-full lg:w-2/3 lg:pl-6">
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-red-500 text-2xl"
                >
                  <X className="inline bg-red-500 text-white rounded-full p-1" />
                </button>
              </div>
              <p className="text-gray-700 mb-4">{selectedHotel.details}</p>

              <div className="bg-gray-100 p-4 rounded-lg">
                {/* Rooms */}
                <div className="mb-4">
                  <h4 className="font-semibold">Available Rooms:</h4>
                  <ul className="list-disc pl-5">
                    {selectedHotel.rooms.map((room, i) => (
                      <li key={i} className="text-gray-700">
                        {room}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <h4 className="font-semibold">Services Offered:</h4>
                  <ul className="list-disc pl-5">
                    {selectedHotel.services.map((service, i) => (
                      <li key={i} className="text-gray-700">
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Offers */}
                {selectedHotel.offers && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-teal-600">Current Offers:</h4>
                    <p>{selectedHotel.offers}</p>
                  </div>
                )}
              </div>

              {/* Book Now */}
              <div className="mt-4 flex justify-end">
                <button className="bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 hover:brightness-110 text-white font-semibold py-2 px-6 rounded">
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
