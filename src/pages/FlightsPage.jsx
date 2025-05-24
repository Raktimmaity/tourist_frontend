import { useState } from 'react';
import { motion } from 'framer-motion';  // Import framer-motion
import indigo from '../assets/img/indgo.jpg';
import airindia from '../assets/img/Air-India.jpg';
import spicejet from '../assets/img/spicejet.jpg';

const flights = [
  {
    airline: 'Air India',
    departureTime: '2025-05-10 09:00',
    arrivalTime: '2025-05-10 11:30',
    from: 'Delhi (DEL)',
    to: 'Mumbai (BOM)',
    price: 5000,
    image: airindia,
  },
  {
    airline: 'IndiGo',
    departureTime: '2025-05-10 14:00',
    arrivalTime: '2025-05-10 16:30',
    from: 'Delhi (DEL)',
    to: 'Bangalore (BLR)',
    price: 4500,
    image: indigo,
  },
  {
    airline: 'SpiceJet',
    departureTime: '2025-05-11 08:00',
    arrivalTime: '2025-05-11 10:15',
    from: 'Mumbai (BOM)',
    to: 'Chennai (MAA)',
    price: 4700,
    image: spicejet,
  },
];

export default function FlightsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  // Handle opening the modal and passing the selected flight details
  const handleDetailsClick = (flight) => {
    setSelectedFlight(flight);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFlight(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold mb-4 text-center text-transparent pb-3 bg-clip-text bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500">Available Flights</h2>

      {/* Flight Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flights.map((flight, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, type: 'spring', stiffness: 100 }}
          >
            {/* Flight Image */}
            <img
              src={flight.image}
              alt={flight.airline}
              className="w-full h-32 object-cover mb-4"
            />

            {/* Flight Info */}
            <h3 className="text-lg font-semibold">{flight.airline}</h3>
            <p className="text-sm text-gray-500">{flight.from} - {flight.to}</p>
            <p className="font-medium text-lg mt-2">{`₹${flight.price}`}</p>

            <div className="mt-4 flex flex-wrap justify-around">
              <button
                onClick={() => handleDetailsClick(flight)}
                className="w-1/3 bg-white border hover:bg-blue-700 font-semibold py-2 rounded"
              >
                Details
              </button>
              <button className="w-1/3 bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 hover:bg-blue-700 text-white font-semibold py-2 rounded">
                Book Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for Flight Details */}
      {isModalOpen && selectedFlight && (
        <motion.div
          className="fixed inset-0 bg-black/60 bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-white p-8 rounded-lg w-96 shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4">{selectedFlight.airline} - Details</h3>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">From:</span>
                <span>{selectedFlight.from}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">To:</span>
                <span>{selectedFlight.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Departure:</span>
                <span>{new Date(selectedFlight.departureTime).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Arrival:</span>
                <span>{new Date(selectedFlight.arrivalTime).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Price:</span>
                <span className="text-xl font-semibold">{`₹${selectedFlight.price}`}</span>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={handleCloseModal}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
