import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  PencilLine,
  Trash2,
  ArrowLeft,
  ArrowRight,
  LayoutDashboard,
  User,
  Users,
  Hotel,
  PlusCircle,
} from "lucide-react";

const HotelList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hotelData, setHotelData] = useState([
    { id: 1, name: "Hotel Sunrise", location: "Paris", price: 150 },
    { id: 2, name: "Grand View Hotel", location: "New York", price: 200 },
    { id: 3, name: "Beach Resort", location: "Miami", price: 250 },
  ]);
  const [addHotelModalOpen, setAddHotelModalOpen] = useState(false);
  const [newHotel, setNewHotel] = useState({ name: "", location: "", price: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHotels = hotelData.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };
  

  const handleAddHotel = () => {
    setHotelData((prev) => [
      ...prev,
      { id: hotelData.length + 1, ...newHotel },
    ]);
    setAddHotelModalOpen(false);
    setNewHotel({ name: "", location: "", price: "" });
  };

  return (
    <div className="mt-20 min-h-screen flex flex-col md:flex-row relative bg-gradient-to-br from-blue-50 to-white">
      {/* Mobile Navbar */}
      <div className="md:hidden bg-white shadow-md flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-blue-700">Traveler Panel</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-700">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md fixed top-0 left-0 h-screen w-64 z-20 transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-blue-700">Hello, Admin</h2>
        </div>
        <nav className="flex flex-col gap-2 p-6 text-gray-700">
          <button
            onClick={() => handleNavigation("/dashboard")}
            className={`flex items-center gap-2 px-4 py-2 rounded-tl-lg rounded-bl-full rounded-tr-full rounded-br-full transition-all duration-200 text-left ${
              location.pathname === "/dashboard" ? "bg-blue-600 text-white font-semibold" : "hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <LayoutDashboard className="text-[16px]" /> Dashboard
          </button>
          <button
            onClick={() => handleNavigation("/profile")}
            className={`flex items-center gap-2 px-4 py-2 rounded-tl-lg rounded-bl-full rounded-tr-full rounded-br-full transition-all duration-200 text-left ${
              location.pathname === "/profile" ? "bg-blue-600 text-white font-semibold" : "hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <User className="text-[16px]" /> Profile
          </button>
          <button
            onClick={() => handleNavigation("/hotel")}
            className={`flex items-center gap-2 px-4 py-2 rounded-tl-lg rounded-bl-full rounded-tr-full rounded-br-full transition-all duration-200 text-left ${
              location.pathname === "/hotel" ? "bg-blue-600 text-white font-semibold" : "hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <Hotel className="text-[16px]" /> Hotels
          </button>
        </nav>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="w-full bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-blue-100">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-blue-700">Hotels List</h1>
              <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Total: {hotelData.length}
              </span>
            </div>
            <input
              type="text"
              placeholder="Search by name or location..."
              className="px-4 py-2 border border-blue-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl shadow-inner bg-white/40 backdrop-blur-lg">
            <table className="min-w-full text-sm text-gray-900">
              <thead className="bg-blue-200/60 text-blue-800">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Location</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentHotels.map((hotel) => (
                  <tr key={hotel.id} className="border-b border-blue-100 hover:bg-blue-50/40">
                    <td className="py-3 px-4">{hotel.name}</td>
                    <td className="py-3 px-4">{hotel.location}</td>
                    <td className="py-3 px-4">${hotel.price}</td>
                    <td className="py-3 px-4 space-x-2">
                      <button className="inline-flex items-center bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                        <PencilLine size={14} className="mr-1" /> Edit
                      </button>
                      <button className="inline-flex items-center bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                        <Trash2 size={14} className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:bg-gray-300"
              disabled={currentPage === 1}
            >
              <ArrowLeft size={14} />
            </button>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage * hotelsPerPage >= filteredHotels.length}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:bg-gray-300"
            >
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Add Hotel Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setAddHotelModalOpen(true)}
              className="bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow hover:bg-green-700 transition"
            >
              <PlusCircle size={14} className="mr-1 inline" />
              Add Hotel
            </button>
          </div>
        </div>
      </main>

      {/* Add Hotel Modal */}
      {addHotelModalOpen && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Add Hotel</h2>
            <input
              type="text"
              className="w-full p-2 mb-3 rounded outline-none border border-blue-600 focus:border-blue-500"
              value={newHotel.name}
              onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
              placeholder="Hotel Name"
            />
            <input
              type="text"
              className="w-full p-2 mb-3 rounded outline-none border border-blue-600 focus:border-blue-500"
              value={newHotel.location}
              onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
              placeholder="Location"
            />
            <input
              type="number"
              className="w-full p-2 mb-3 rounded outline-none border border-blue-600 focus:border-blue-500"
              value={newHotel.price}
              onChange={(e) => setNewHotel({ ...newHotel, price: e.target.value })}
              placeholder="Price per night"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setAddHotelModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddHotel}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Add Hotel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelList;
