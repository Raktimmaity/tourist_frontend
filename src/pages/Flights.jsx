import { useState } from 'react';

const plans = [
  {
    id: 'monthly',
    name: 'Monthly Plan',
    price: 49,
    perks: [
      '2 Free Domestic Flights',
      'Priority Check-in',
      '5% Off on All Bookings',
    ],
    tag: 'Beginner', // Add "Beginner" tag
    color: 'bg-blue-100', // Default color
  },
  {
    id: 'quarterly',
    name: 'Quarterly Plan',
    price: 129,
    perks: [
      '5 Free Domestic Flights',
      '1 International Ticket (Discounted)',
      '10% Off on All Bookings',
      'Free Airport Lounge Access',
    ],
    tag: 'Popular', // Add "Popular" tag
    color: 'bg-indigo-200', // Blue color for the middle card
  },
  {
    id: 'yearly',
    name: 'Yearly Plan',
    price: 399,
    perks: [
      'Unlimited Domestic Flights',
      '2 Free International Flights',
      '20% Off All Bookings',
      'Dedicated Travel Concierge',
    ],
    tag: 'Premium 👑', // Add "Premium" tag
    color: 'bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300', // Gold color for the premium card
  },
];

export default function Flights() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const subscribe = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="p-8 py-24 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 mb-12">
        Flight Subscription Plans
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className={`${
              index === 1 ? 'h-[450px]' : 'h-[350px]'
            } ${plan.color} shadow-lg border border-indigo-100 p-6 rounded-2xl hover:shadow-xl transition duration-300 flex flex-col justify-between`} // Conditional size and color
          >
            <div>
              {/* Add a tag for the card */}
              <div className="flex justify-end">
                <span className="bg-teal-500 text-white text-xs px-3 py-1 rounded-full">
                  {plan.tag}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-indigo-700 mb-2">{plan.name}</h2>
              <p className="text-gray-700 text-lg font-semibold mb-4">
                ${plan.price} <span className="text-sm font-normal text-gray-500">/ plan</span>
              </p>
              <ul className="mb-6 text-sm text-gray-600 space-y-2">
                {plan.perks.map((perk, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-2">✔</span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => subscribe(plan)}
              className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-medium py-2 rounded-lg hover:from-indigo-700 hover:to-teal-600 transition"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-40 backdrop-blur-sm z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 text-center">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Subscription Confirmed!</h2>
            <p className="text-gray-700 mb-6">
              You have successfully subscribed to the{' '}
              <span className="font-semibold text-teal-600">{selectedPlan.name}</span>.
            </p>
            <button
              onClick={() => setSelectedPlan(null)}
              className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white px-6 py-2 rounded hover:from-indigo-700 hover:to-teal-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
