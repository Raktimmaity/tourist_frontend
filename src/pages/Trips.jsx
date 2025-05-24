import { useState } from 'react';
import { Plus, X } from 'lucide-react'

const availableDestinations = [
  'Paris',
  'Tokyo',
  'New York',
  'Rome',
  'Cape Town',
  'Sydney',
  'Dubai',
];

export default function Trips() {
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [days, setDays] = useState(1);

  const addDestination = (dest) => {
    if (!selectedDestinations.includes(dest)) {
      setSelectedDestinations([...selectedDestinations, dest]);
    }
  };

  const removeDestination = (dest) => {
    setSelectedDestinations(selectedDestinations.filter(d => d !== dest));
  };

  const handleSubmit = () => {
    // Handle form submission logic
    alert('Your trip is submitted!');
  };

  return (
    <div className="p-8 py-28 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 mb-6 text-center">
        Customize Your Trip
      </h1>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Trip Duration (Days)</label>
        <input
          type="number"
          value={days}
          min="1"
          onChange={(e) => setDays(parseInt(e.target.value))}
          className="border border-indigo-500 p-3 rounded-md w-full md:w-48 outline-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Available Destinations */}
        <div>
          <h2 className="text-xl font-semibold text-indigo-700 mb-3">Available Destinations</h2>
          <ul className="space-y-2">
            {availableDestinations.map(dest => (
              <li key={dest}>
                <button
                  onClick={() => addDestination(dest)}
                  className="w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium px-4 py-2 rounded text-left"
                >
                  <Plus className='inline p-1 rounded-full font-bold bg-indigo-600 text-white'/> {dest}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Selected Destinations */}
        <div>
          <h2 className="text-xl font-semibold text-indigo-700 mb-3">Your Itinerary</h2>
          {selectedDestinations.length === 0 ? (
            <p className="text-gray-500">No destinations added yet.</p>
          ) : (
            <ul className="space-y-2">
              {selectedDestinations.map((dest, index) => (
                <li
                  key={dest}
                  className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition duration-200"
                >
                  <span>
                    Day {index + 1}: <strong>{dest}</strong>
                  </span>
                  <button
                    onClick={() => removeDestination(dest)}
                    className="text-red-500 font-bold hover:text-red-700"
                  >
                    <X className='inline rounded-full font-bold  text-red-500 border'/>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Submit Button (only shown when more than 1 destination is selected) */}
      {selectedDestinations.length > 1 && (
        <div className="mt-6 text-center">
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-semibold py-2 px-6 rounded-lg hover:from-indigo-700 hover:to-teal-600 transition duration-300"
          >
            Submit Your Trip
          </button>
        </div>
      )}
    </div>
  );
}
