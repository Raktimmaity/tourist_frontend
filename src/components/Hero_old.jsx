import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import hero1 from "../assets/img/hero1.jpg";
import hero2 from "../assets/img/hero2.jpg";
import hero3 from "../assets/img/hero3.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const images = [hero1, hero2, hero3];

const tabs = [
  { name: "Flights", route: "/flights" },
  { name: "Hotels", route: "/hotels" },
  { name: "Homestays & Villas", route: "/homestays" },
  { name: "Holiday Packages", route: "/holiday" },
  { name: "Trains", route: "/trains" },
  { name: "Buses", route: "/buses" },
  { name: "Cabs", route: "/cabs" },
  // { name: 'Travel Insurance', route: '/insurance' },
];

const airports = [
  { code: "DEL", name: "Indira Gandhi International Airport, Delhi" },
  {
    code: "BOM",
    name: "Chhatrapati Shivaji Maharaj International Airport, Mumbai",
  },
  { code: "BLR", name: "Kempegowda International Airport, Bangalore" },
  { code: "MAA", name: "Chennai International Airport, Chennai" },
  {
    code: "CCU",
    name: "Netaji Subhas Chandra Bose International Airport, Kolkata",
  },
];
const trains = [
  { code: "HWH", name: "Hawrah" },
  { code: "CSMT", name: "Mubai Central" },
  { code: "SDH", name: "Sealdah" },
  { code: "KGP", name: "Kharagpur" },
  { code: "SST", name: "Santragachi" },
];

const hotels = [
  "Taj Mahal Palace, Mumbai",
  "The Oberoi, Delhi",
  "Leela Palace, Bangalore",
  "ITC Maurya, Delhi",
  "The Park, Kolkata",
];

const homestays = [
  "Cozy Cottage, Manali",
  "Luxury Villa, Goa",
  "Heritage Homestay, Udaipur",
  "Sea View House, Kochi",
  "Mountain Retreat, Mussoorie",
];

// const trains = [
//   'Rajdhani Express',
//   'Shatabdi Express',
//   'Duronto Express',
//   'Jan Shatabdi Express',
//   'Garib Rath Express'
// ]

const holidayOffers = [
  {
    title: "Goa Beach Escape",
    description:
      "3 nights, 4 days with breakfast, sightseeing & flight tickets included.",
    price: "₹18,999",
  },
  {
    title: "Romantic Manali Getaway",
    description: "2 nights stay in deluxe cottage with candlelight dinner.",
    price: "₹12,499",
  },
  {
    title: "Kerala Backwaters Tour",
    description: "Houseboat experience + guided cultural tour.",
    price: "₹21,999",
  },
];

export default function Hero() {
  const location = useLocation();
  const [currentImage, setCurrentImage] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [activeTab, setActiveTab] = useState("Flights");

  const [fromAirport, setFromAirport] = useState("");
  const [toAirport, setToAirport] = useState("");
  const [fromTrain, setFromTrain] = useState("");
  const [toTrain, setToTrain] = useState("");
  const [hotelDestination, setHotelDestination] = useState("");
  // const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [checkInDate, setCheckInDate] = useState(new Date());
const [loading, setLoading] = useState(false); // Set true initially if needed
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const matchingTab = tabs.find((tab) => tab.route === location.pathname);
    if (matchingTab) {
      setActiveTab(matchingTab.name);
    }
  }, [location]);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  // const renderForm = () => {
  //   switch (activeTab) {
  //     case "Flights":
  //       return (
  //         <>
  //           {/* FROM Field */}
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-indigo-700 mb-1">
  //               From
  //             </label>
  //             <select
  //               value={fromAirport}
  //               onChange={(e) => setFromAirport(e.target.value)}
  //               className="w-full appearance-none bg-white border border-indigo-300 text-gray-700 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 shadow-sm"
  //             >
  //               <option value="">Select Airport</option>
  //               {airports.map((airport) => (
  //                 <option key={airport.code} value={airport.code}>
  //                   {airport.name} ({airport.code})
  //                 </option>
  //               ))}
  //             </select>
  //           </div>

  //           {/* TO Field */}
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-indigo-700 mb-1">
  //               To
  //             </label>
  //             <select
  //               value={toAirport}
  //               onChange={(e) => setToAirport(e.target.value)}
  //               className="w-full appearance-none bg-white border border-indigo-300 text-gray-700 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 shadow-sm"
  //             >
  //               <option value="">Select Airport</option>
  //               {airports.map((airport) => (
  //                 <option key={airport.code} value={airport.code}>
  //                   {airport.name} ({airport.code})
  //                 </option>
  //               ))}
  //             </select>
  //           </div>

  //           {/* DEPARTURE Field */}
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-indigo-700 mb-1">
  //               Departure
  //             </label>
  //             <DatePicker
  //               selected={checkInDate}
  //               onChange={(date) => setCheckInDate(date)}
  //               placeholderText="Select check-in date"
  //               className="w-full border border-indigo-300 px-4 py-2 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 shadow-sm"
  //               dateFormat="yyyy-MM-dd"
  //             />
  //           </div>

  //           {/* TRAVELLERS Field */}
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-indigo-700 mb-1">
  //               Travellers
  //             </label>
  //             <input
  //               type="number"
  //               defaultValue={1}
  //               min={1}
  //               className="w-full border border-indigo-300 px-4 py-2 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 shadow-sm"
  //             />
  //           </div>
  //         </>
  //       );
  //     case "Hotels":
  //       return (
  //         <>
  //           {/* Destination Field */}
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-indigo-700 mb-1">
  //               Destination
  //             </label>
  //             <select
  //               value={hotelDestination}
  //               onChange={(e) => setHotelDestination(e.target.value)}
  //               className="w-full appearance-none bg-white border border-indigo-300 text-gray-700 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 shadow-sm"
  //             >
  //               <option value="">Select Hotel</option>
  //               {hotels.map((hotel, index) => (
  //                 <option key={index} value={hotel}>
  //                   {hotel}
  //                 </option>
  //               ))}
  //             </select>
  //           </div>

  //           {/* Check-In Field */}
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-indigo-700 mb-1">
  //               Check-In
  //             </label>
  //             {/* <input
  //               type="date"
  //               value={checkInDate}
  //               onChange={(e) => setCheckInDate(e.target.value)}
  //               className="w-full border border-indigo-300 px-4 py-2 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 shadow-sm"
  //             /> */}
  //             <DatePicker
  //               selected={checkInDate}
  //               onChange={(date) => setCheckInDate(date)}
  //               placeholderText="Select check-in date"
  //               className="w-full border border-indigo-300 px-4 py-2 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 shadow-sm"
  //               dateFormat="yyyy-MM-dd"
  //             />
  //           </div>

  //           {/* Check-Out Field */}
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-indigo-700 mb-1">
  //               Check-Out
  //             </label>
  //             {/* <input
  //               type="date"
  //               value={checkOutDate}
  //               onChange={(e) => setCheckOutDate(e.target.value)}
  //               className="w-full border border-indigo-300 px-4 py-2 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 shadow-sm"
  //             /> */}
  //             <DatePicker
  //               selected={checkOutDate}
  //               onChange={(date) => setCheckOutDate(date)}
  //               placeholderText="Select check-out date"
  //               className="w-full border border-indigo-300 px-4 py-2 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 shadow-sm"
  //               dateFormat="yyyy-MM-dd"
  //             />
  //           </div>

  //           {/* Guests Field */}
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-indigo-700 mb-1">
  //               Guests
  //             </label>
  //             <input
  //               type="number"
  //               defaultValue={2}
  //               min={1}
  //               className="w-full border border-indigo-300 px-4 py-2 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 shadow-sm"
  //             />
  //           </div>
  //         </>
  //       );
  //     case "Homestays & Villas":
  //       return (
  //         <>
  //           {/* Destination Field */}
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-indigo-700 mb-1">
  //               Destination
  //             </label>
  //             <select
  //               value={hotelDestination}
  //               onChange={(e) => setHotelDestination(e.target.value)}
  //               className="w-full bg-white border border-indigo-300 px-4 py-2 rounded-xl shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
  //             >
  //               <option value="">Select Homestay or Villa</option>
  //               {homestays.map((place, index) => (
  //                 <option key={index} value={place}>
  //                   {place}
  //                 </option>
  //               ))}
  //             </select>
  //           </div>

  //           {/* Check-In Date */}
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-indigo-700 mb-1">
  //               Check-In
  //             </label>
  //             <input
  //               type="date"
  //               value={checkInDate}
  //               onChange={(e) => setCheckInDate(e.target.value)}
  //               className="w-full border border-indigo-300 px-4 py-2 rounded-xl shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
  //             />
  //           </div>

  //           {/* Check-Out Date */}
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-indigo-700 mb-1">
  //               Check-Out
  //             </label>
  //             <input
  //               type="date"
  //               value={checkOutDate}
  //               onChange={(e) => setCheckOutDate(e.target.value)}
  //               className="w-full border border-indigo-300 px-4 py-2 rounded-xl shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
  //             />
  //           </div>

  //           {/* Guests */}
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-indigo-700 mb-1">
  //               Guests
  //             </label>
  //             <input
  //               type="number"
  //               defaultValue={2}
  //               min={1}
  //               className="w-full border border-indigo-300 px-4 py-2 rounded-xl shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
  //             />
  //           </div>
  //         </>
  //       );
  //     case "Trains":
  //       return (
  //         <>
  //           {/* From Station */}
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-indigo-700 mb-1">
  //               From
  //             </label>
  //             <select
  //               value={fromTrain}
  //               onChange={(e) => setFromTrain(e.target.value)}
  //               className="w-full bg-white border border-indigo-300 px-4 py-2 rounded-xl shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
  //             >
  //               <option value="">Select Station</option>
  //               {trains.map((train) => (
  //                 <option key={train.code} value={train.code}>
  //                   {train.name} ({train.code})
  //                 </option>
  //               ))}
  //             </select>
  //           </div>

  //           {/* To Station */}
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-indigo-700 mb-1">
  //               To
  //             </label>
  //             <select
  //               value={toTrain}
  //               onChange={(e) => setToTrain(e.target.value)}
  //               className="w-full bg-white border border-indigo-300 px-4 py-2 rounded-xl shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
  //             >
  //               <option value="">Select Train</option>
  //               {trains.map((train) => (
  //                 <option key={train.code} value={train.code}>
  //                   {train.name} ({train.code})
  //                 </option>
  //               ))}
  //             </select>
  //           </div>

  //           {/* Departure Date */}
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-indigo-700 mb-1">
  //               Departure
  //             </label>
  //             <input
  //               type="date"
  //               value={checkInDate}
  //               onChange={(e) => setCheckInDate(e.target.value)}
  //               className="w-full border border-indigo-300 px-4 py-2 rounded-xl shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
  //             />
  //           </div>

  //           {/* Travellers */}
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-indigo-700 mb-1">
  //               Travellers
  //             </label>
  //             <input
  //               type="number"
  //               defaultValue={1}
  //               min={1}
  //               className="w-full border border-indigo-300 px-4 py-2 rounded-xl shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
  //             />
  //           </div>
  //         </>
  //       );
  //     case "Holiday Packages":
  //       return (
  //         <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  //           {holidayOffers.map((offer, index) => (
  //             <div
  //               key={index}
  //               className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition"
  //             >
  //               <h3 className="text-lg font-semibold mb-2">{offer.title}</h3>
  //               <p className="text-gray-700 mb-2">{offer.description}</p>
  //               <div className="text-indigo-700 font-bold">{offer.price}</div>
  //             </div>
  //           ))}
  //         </div>
  //       );
  //     default:
  //       return (
  //         <div className="col-span-full text-center text-sm text-gray-600">
  //           Booking form for <strong>{activeTab}</strong> coming soon.
  //         </div>
  //       );
  //   }
  // };

  return (
    <div className="relative h-[100vh] md:h-[90vh] overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            onLoad={() => handleImageLoad(index)}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out
              ${
                index === currentImage
                  ? "opacity-100 scale-100 z-10"
                  : "opacity-0 scale-105 z-0"
              }
              ${loadedImages[index] ? "blur-0" : "blur-md"}`}
            style={{
              transition:
                "opacity 1s ease-in-out, transform 5s ease-in-out, filter 1s ease-in-out",
              transform: index === currentImage ? "scale(1)" : "scale(1.05)",
            }}
            alt={`Hero ${index}`}
          />
        ))}
      </div>

      {/* Overlay Content */}
      <div className="pt-32 pb-0 md:pb-0 md:pt-10 absolute inset-0 z-20 bg-black/60 flex flex-col items-center justify-center text-white text-center px-4">
        <div className="p-4 md:p-8 w-full max-w-7xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Explore the World with Us
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Unique experiences, personalized trips, local guides, and more.
          </p>

          {/* Tabs */}
          {/* <div className="flex flex-wrap justify-center gap-2 mb-4">
            {tabs.map(({ name, route }) => (
              <NavLink
                key={name}
                to={route}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium ${
                    isActive
                      ? "bg-white text-black"
                      : "bg-black/40 text-white border border-white"
                  }`
                }
              >
                {name}
              </NavLink>
            ))}
          </div> */}

          {/* Booking Form / Offers */}
          {/* <form className="bg-white text-black rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {renderForm()}
            {activeTab !== "Holiday Packages" && (
              <div className="col-span-full lg:col-span-6 flex items-end">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 hover:bg-blue-700 text-white font-semibold py-2 rounded"
                >
                  Search
                </button>
              </div>
            )}
          </form> */}
        </div>
      </div>

      {/* Gradient Fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
    </div>
  );
}
