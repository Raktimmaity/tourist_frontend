import { Link } from 'react-router-dom';

const trains = [
  {
    name: 'Express Train to Delhi',
    number: '12345',
    price: '₹1200',
    offer: '20% off on booking 2 or more tickets!',
    description: 'Comfortable train with free Wi-Fi, meals, and reclining seats.',
    departureTime: '10:00 AM',
    arrivalTime: '4:00 PM',
    coach: 'AC Chair Car',
    departure: 'New Delhi Station - 10:00 AM',
    arrival: 'Old Delhi Station - 4:00 PM',
  },
  {
    name: 'Superfast Train to Mumbai',
    number: '23456',
    price: '₹1500',
    offer: 'Book a return ticket and get 15% off!',
    description: 'Superfast with air conditioning, food service, and power outlets.',
    departureTime: '12:00 PM',
    arrivalTime: '7:00 PM',
    coach: '2nd AC',
    departure: 'Mumbai Central - 12:00 PM',
    arrival: 'Mumbai Suburban - 7:00 PM',
  },
  {
    name: 'Scenic Train to Manali',
    number: '34567',
    price: '₹2000',
    offer: 'Get free sightseeing tickets for your journey!',
    description: 'Enjoy the scenic beauty of the mountains with large windows and cozy seats.',
    departureTime: '6:00 AM',
    arrivalTime: '12:00 PM',
    coach: 'First Class',
    departure: 'Chandigarh - 6:00 AM',
    arrival: 'Manali Station - 12:00 PM',
  },
  {
    name: 'Night Train to Bangalore',
    number: '45678',
    price: '₹1000',
    offer: 'Get 10% off on group bookings of 4 or more!',
    description: 'Perfect for overnight travel, with sleeper coaches and a dining car.',
    departureTime: '9:00 PM',
    arrivalTime: '7:00 AM',
    coach: 'Sleeper Class',
    departure: 'Hyderabad - 9:00 PM',
    arrival: 'Bangalore - 7:00 AM',
  },
];

export default function Trains() {
  return (
    <div className="bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Train List</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trains.map((train, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{train.name}</h2>
              <p className="text-sm text-gray-600 mb-4">{train.description}</p>

              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-indigo-700">{train.price}</span>
                <span className="text-sm text-gray-500">
                  {train.departureTime} - {train.arrivalTime}
                </span>
              </div>

              <div className="text-sm text-green-600 mb-4">{train.offer}</div>

              <Link
                to="/train-booking"
                state={{ train }}
                className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
