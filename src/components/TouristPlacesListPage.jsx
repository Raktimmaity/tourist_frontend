import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";

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
  Download,
  TicketPercent,
  Send,
} from "lucide-react";

const HotelList = () => {
  const URL = "https://tourist-backend-5qoo.onrender.com";
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const stored = JSON.parse(localStorage.getItem("user"));
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = storedUser?.user?.id;
  const userId = stored?.user?.id;

  const [userData, setUserData] = useState(stored?.user || null);
  const [addHotelModalOpen, setAddHotelModalOpen] = useState(false);
  // const [userId, setUserId] = useState(null);
  const [newHotel, setNewHotel] = useState({
    name: "",
    location: "",
    price: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelsPerPage] = useState(5);
  const [greeting, setGreeting] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [touristPlaces, setTouristPlaces] = useState([]);
  const [editPlace, setEditPlace] = useState(null);
  const [deleteConfirmPlace, setDeleteConfirmPlace] = useState(null);
  const [deletePlaceId, setDeletePlaceId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const isAdmin = userData?.role === "admin";
  const isGuide = userData?.role === "tour_guide";
  // const isGuideName = userData?._id;
  // const userId = user?.id;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      setUserId(storedUser.id);
      console.log("User ID:", storedUser.id);
    }
  }, []);

  useEffect(() => {
    // Fetch the logged-in user data using the JWT token (from localStorage or cookies)
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assume token is stored in localStorage
        if (token) {
          const response = await axios.get(`${URL}/api/user/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data); // Assuming response contains user data

          // Print the user ID to the console
          console.log("Logged-in User ID:", response.data._id);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredHotels.map((place) => ({
        Name: place.placeName,
        Location: place.location,
        Languages: place.languagesSpoken.join(", "),
        TourTime: place.tourTime,
        Duration: place.duration,
        Price: place.price,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TouristPlaces");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "TouristPlaces.xlsx");
  };

  const filteredHotels = touristPlaces.filter(
    (hotel) =>
      hotel.placeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (place) => {
    setEditPlace(place);
  };

  const confirmDeletePlace = (place) => {
    setSelectedPlace(place);
    setDeleteModalOpen(true);
  };

  // const handleEditSave = () => {
  //   axios
  //     .put(`http://localhost:5000/api/places/${editPlace._id}`, editPlace)
  //     .then((res) => {
  //       // Update local state with new place details
  //       setTouristPlaces((prev) =>
  //         prev.map((place) => (place._id === editPlace._id ? res.data : place))
  //       );

  //       setEditPlace(null); // Close the modal
  //       toast.success("Place updated successfully!");
  //     })
  //     .catch(() => {
  //       toast.error("Failed to update place.");
  //     });
  // };

  const handleEditSave = () => {
    const updatedPlace = {
      ...editPlace,
      tourDate: new Date(editPlace.tourDate), // Ensure date is in Date format
    };

    axios
      .put(`${URL}/api/places/${editPlace._id}`, updatedPlace)
      .then((res) => {
        setTouristPlaces((prev) =>
          prev.map((place) => (place._id === editPlace._id ? res.data : place))
        );
        setEditPlace(null);
        toast.success("Place updated successfully!");
      })
      .catch(() => {
        toast.error("Failed to update place.");
      });
  };

  const handleDeletePlace = () => {
    axios
      .delete(`${URL}/api/places/${selectedPlace._id}`)
      .then(() => {
        setTouristPlaces((prev) =>
          prev.filter((p) => p._id !== selectedPlace._id)
        );
        toast.success("Tourist place deleted successfully.");
        setDeleteModalOpen(false);
      })
      .catch(() => toast.error("Failed to delete tourist place."));
  };

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="text-[16px]" />,
    },
    {
      label: "Profile",
      path: "/profile",
      icon: <User className="text-[16px]" />,
    },
    {
      label: "Bookings",
      path: "/bookings",
      icon: <TicketPercent className="text-[16px]" />,
    },
    ...(isAdmin
      ? [
          {
            label: "Manage Users",
            path: "/users",
            icon: <Users className="text-[16px]" />,
          },
          // {
          //   label: "Hotels",
          //   path: "/hotel",
          //   icon: <Hotel className="text-[16px]" />,
          // },
          {
            label: "Tourist Places",
            path: "/tourist-place-list",
            icon: <Hotel className="text-[16px]" />,
          },
          {
            label: "Contact",
            path: "/contact-messages",
            icon: <Send className="text-[16px]" />,
          },
          // Add more admin-specific items here
        ]
      : []),
    ...(userData?.role === "hotel"
      ? [
          {
            label: "Rooms",
            path: "/hotel/rooms",
            icon: <Bed className="text-[16px]" />,
          },
          // Add hotel-specific items here (e.g., for restaurant or tour guide)
        ]
      : []),
    // Add conditions for more roles
    ...(userData?.role === "restaurant"
      ? [
          {
            label: "Restaurant Dashboard",
            path: "/restaurant/dashboard",
            // icon: <Restaurant className="text-[16px]" />,
          },
          {
            label: "Menu",
            path: "/restaurant/menu",
            icon: <User className="text-[16px]" />,
          },
        ]
      : []),
    ...(userData?.role === "tour_guide"
      ? [
          {
            label: "Add Tourist Place",
            path: "/add-tourist-place",
            icon: <User className="text-[16px]" />,
          },
          {
            label: "Tourist Place List",
            path: "/tourist-place-list",
            icon: <User className="text-[16px]" />,
          },
        ]
      : []),
  ];

  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(
    indexOfFirstHotel,
    indexOfLastHotel
  );

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good Morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17 && hour < 21) setGreeting("Good Evening");
    else setGreeting("Good Night");
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  useEffect(() => {
    if (isAdmin || isGuide) {
      axios
        .get(`${URL}/api/places`)
        .then((res) => setTouristPlaces(res.data))
        .catch(() => toast.error("Failed to fetch tourist places."));
    }
  }, [isAdmin, isGuide]);

  const handleAddHotel = () => {
    setTouristPlaces((prev) => [
      ...prev,
      { id: touristPlaces.length + 1, ...newHotel },
    ]);
    setAddHotelModalOpen(false);
    setNewHotel({ name: "", location: "", price: "" });
  };

  return (
    <div className="mt-20 min-h-screen flex flex-col md:flex-row relative bg-gradient-to-br from-blue-50 to-white">
      {/* Mobile Navbar */}
      <div className="md:hidden bg-white shadow-md flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-blue-700">Traveler Panel</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-700"
        >
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
          <h2 className="text-2xl font-bold text-blue-700">{greeting}</h2>
          <p className="text-gray-600 text-sm mt-1">
            <strong>Welcome,</strong>{" "}
            <span className="text-lg">{userData?.name || "Guest"} </span>
          </p>
        </div>
        <nav className="flex flex-col gap-2 p-6 text-gray-700">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center gap-2 px-4 py-2 rounded-tl-lg rounded-bl-full rounded-tr-full rounded-br-full transition-all duration-200 text-left ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white font-semibold"
                  : "hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <span className="mr-4">{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Tourist Places List */}
        <div className="w-full bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-blue-100 mt-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div className="flex items-center gap-4 mb-6">
              <h1 className="text-3xl font-bold text-blue-700">
                Tourist Places
              </h1>
              {(() => {
                const storedUser = JSON.parse(localStorage.getItem("user"));
                const loggedInUserId = storedUser?.user?.id;
                const filteredPlaces = currentHotels.filter(
                  (place) => place.addedBy?._id === loggedInUserId
                );

                return (
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Total: {filteredPlaces.length}
                  </span>
                );
              })()}

              {/* <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Total: {touristPlaces.length}
              </span> */}
            </div>
            <input
              type="text"
              placeholder="Search by place name or location..."
              className="px-4 py-2 border border-blue-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto rounded-xl shadow-inner bg-white/40 backdrop-blur-lg">
            <table className="min-w-full text-sm text-gray-900">
              <thead>
                <tr className="bg-blue-100 text-blue-800 text-sm">
                  <th>Image</th>
                  <th className="py-2 px-4">Place Name</th>
                  <th className="py-2 px-4">Location</th>
                  {/* <th className="py-2 px-4">Languages</th> */}
                  <th className="py-2 px-4">Tour Time</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Price</th>
                  {storedUser?.user?.role === "admin" && (
                    <th className="py-2 px-4">Added By</th>
                  )}
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {(() => {
                  const storedUser = JSON.parse(localStorage.getItem("user"));
                  const loggedInUserId = storedUser?.user?.id;
                  const role = storedUser?.user?.role;

                  const filteredPlaces =
                    role === "admin"
                      ? currentHotels
                      : currentHotels.filter(
                          (place) => place.addedBy?._id === loggedInUserId
                        );

                  if (filteredPlaces.length === 0) {
                    return (
                      <tr>
                        <td
                          colSpan={role === "admin" ? 8 : 7}
                          className="text-center text-gray-500 py-4 italic"
                        >
                          {role === "admin"
                            ? "No tourist places found"
                            : "No data added by you"}
                        </td>
                      </tr>
                    );
                  }

                  return filteredPlaces.map((place) => {
                    // Determine status display and color
                    const status = place.status?.toLowerCase();
                    const displayStatus =
                      status === "pending"
                        ? "Finished"
                        : status?.charAt(0).toUpperCase() + status?.slice(1);
                    let badgeClass =
                      status === "active"
                        ? "from-green-400 to-green-600"
                        : status === "upcoming"
                        ? "from-blue-400 to-blue-600"
                        : "from-red-400 to-red-600";

                    return (
                      <tr
                        key={place._id}
                        className="border-b border-blue-100 hover:bg-blue-50/40"
                      >
                        <td className="py-3 px-4">
                          <img
                            src={place.imageUrl}
                            alt="{place.placeName}"
                            width={90}
                            className="border-1 border-blue-300 bg-blue-300 p-1 rounded-md"
                          />
                        </td>
                        <td className="py-3 px-4">{place.placeName}</td>
                        <td className="py-3 px-4">{place.location}</td>
                        {/* <td className="py-3 px-4">
                          {place.languagesSpoken.join(", ")}
                        </td> */}
                        <td className="py-3 px-4">{place.tourTime}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-3 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r ${badgeClass}`}
                          >
                            {displayStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4">₹{place.price}</td>
                        {role === "admin" && (
                          <td className="py-3 px-4">
                            {place.addedBy?.name || "Unknown"}
                          </td>
                        )}
                        <td className="py-3 px-4 space-x-2">
                          <button
                            onClick={() => handleEdit(place)}
                            className="inline-flex items-center bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold"
                          >
                            <PencilLine size={14} className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => confirmDeletePlace(place)}
                            className="inline-flex items-center bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-semibold"
                          >
                            <Trash2 size={14} className="mr-1" /> Delete
                          </button>
                        </td>
                      </tr>
                    );
                  });
                })()}
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
              onClick={() =>
                setCurrentPage((prev) =>
                  prev * hotelsPerPage < filteredHotels.length ? prev + 1 : prev
                )
              }
              disabled={currentPage * hotelsPerPage >= filteredHotels.length}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:bg-gray-300"
            >
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Export Button */}
          {/* <div className="flex justify-center items-center mt-6">
            <button
              onClick={exportToExcel}
              className="bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow hover:bg-green-700 transition"
            >
              <Download size={14} className="mr-1 inline" />
              Export to Excel
            </button>
          </div> */}
        </div>
        {/* <Modal show={!!deletePlaceId} onHide={() => setDeletePlaceId(null)}>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Delete</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Are you sure you want to delete this tourist place?
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setDeletePlaceId(null)}>
      Cancel
    </Button>
    <Button variant="danger" onClick={handleDeletePlace}>
      Delete
    </Button>
  </Modal.Footer>
</Modal> */}
      </main>

      {/* Add Hotel Modal */}
      {editPlace && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm">
          <div
            className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-white border-opacity-30 rounded-xl shadow-lg p-6 max-w-4xl w-[90%]"
            style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
          >
            <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
              Edit Tourist Place
            </h2>

            <div className="flex flex-col gap-5">
              {/* Row 1 */}
              <div className="flex gap-6">
                <div className="flex-1 flex flex-col">
                  <label className="text-white font-medium mb-1">
                    Place Name:
                  </label>
                  <input
                    type="text"
                    className="p-2 rounded border border-blue-600 bg-white bg-opacity-40 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editPlace.placeName}
                    onChange={(e) =>
                      setEditPlace({ ...editPlace, placeName: e.target.value })
                    }
                    placeholder="Place Name"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="text-white font-medium mb-1">
                    Location:
                  </label>
                  <input
                    type="text"
                    className="p-2 rounded border border-blue-600 bg-white bg-opacity-40 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editPlace.location}
                    onChange={(e) =>
                      setEditPlace({ ...editPlace, location: e.target.value })
                    }
                    placeholder="Location"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex gap-6">
                <div className="flex-1 flex flex-col">
                  <label className="text-white font-medium mb-1">
                    Tour Time:
                  </label>
                  <input
                    type="text"
                    className="p-2 rounded border border-blue-600 bg-white bg-opacity-40 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editPlace.tourTime}
                    onChange={(e) =>
                      setEditPlace({ ...editPlace, tourTime: e.target.value })
                    }
                    placeholder="Tour Time"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="text-white font-medium mb-1">
                    Duration:
                  </label>
                  <input
                    type="text"
                    className="p-2 rounded border border-blue-600 bg-white bg-opacity-40 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editPlace.duration}
                    onChange={(e) =>
                      setEditPlace({ ...editPlace, duration: e.target.value })
                    }
                    placeholder="Duration"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex gap-6">
                <div className="flex-1 flex flex-col">
                  <label className="text-white font-medium mb-1">Price:</label>
                  <input
                    type="number"
                    className="p-2 rounded border border-blue-600 bg-white bg-opacity-40 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editPlace.price}
                    onChange={(e) =>
                      setEditPlace({ ...editPlace, price: e.target.value })
                    }
                    placeholder="Price"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="text-white font-medium mb-1">
                    Languages:
                  </label>
                  <input
                    type="text"
                    className="p-2 rounded border border-blue-600 bg-white bg-opacity-40 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editPlace.languagesSpoken.join(", ")}
                    onChange={(e) =>
                      setEditPlace({
                        ...editPlace,
                        languagesSpoken: e.target.value
                          .split(",")
                          .map((lang) => lang.trim()),
                      })
                    }
                    placeholder="Languages (comma-separated)"
                  />
                </div>
              </div>

              {/* Row 4 */}
              <div className="flex gap-6">
                <div className="flex-1 flex flex-col">
                  <label className="text-white font-medium mb-1">
                    Tour Date:
                  </label>
                  <input
                    type="date"
                    className="p-2 rounded border border-blue-600 bg-white bg-opacity-40 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editPlace.date ? editPlace.date.split("T")[0] : ""}
                    onChange={(e) =>
                      setEditPlace({ ...editPlace, date: e.target.value })
                    }
                    placeholder="Tour Date"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="text-white font-medium mb-1">Status:</label>
                  <select
                    className="p-2 rounded border border-blue-600 bg-white bg-opacity-40 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editPlace.status || "active"}
                    onChange={(e) =>
                      setEditPlace({ ...editPlace, status: e.target.value })
                    }
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setEditPlace(null)}
                className="px-5 py-2 bg-gray-300 rounded hover:bg-gray-400 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Confirm Deletion
            </h2>
            <p className="mb-4">
              Are you sure you want to delete{" "}
              <strong>{selectedPlace.title}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePlace}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default HotelList;
