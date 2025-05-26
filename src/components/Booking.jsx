import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";
import { Eye } from "lucide-react";

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
  Ban,
  Send,
} from "lucide-react";

const Booking = () => {
  const URL = "https://tourist-backend-5qoo.onrender.com";
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const stored = JSON.parse(localStorage.getItem("user"));
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
  const [touristbookings, setTouristbookings] = useState([]);
  const [editbooking, setEditbooking] = useState(null);
  const [deleteConfirmbooking, setDeleteConfirmbooking] = useState(null);
  const [deletebookingId, setDeletebookingId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedbooking, setSelectedbooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  // const loggedInUserId = storedUser?.user?.id;
  const loggedInUserId = storedUser?.user?._id || storedUser?.user?.id;
  // const sampleVideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";

  const userRole = storedUser?.user?.role;
  // fix the casing at the top level state
  const [selectedBooking, setSelectedBooking] = useState(null); // use PascalCase consistently

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
          const response = await axios.get(
            `${URL}/api/user/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
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
      filteredHotels.map((booking) => ({
        Name: booking.bookingName,
        Location: booking.location,
        Languages: booking.languagesSpoken.join(", "),
        TourTime: booking.tourTime,
        Duration: booking.duration,
        Price: booking.price,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Touristbookings");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Touristbookings.xlsx");
  };

  const filteredHotels = touristbookings.filter(
    (hotel) =>
      hotel.bookingName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCancelBooking = async (bookingId) => {
    try {
      const res = await axios.put(
        `${URL}/api/bookings/cancel/${bookingId}`
      );
      if (res.status === 200) {
        toast.success("Booking cancelled successfully");
        // Refresh or update bookings state
        // setBookings();
        window.location.reload();
      }
    } catch (err) {
      toast.error("Failed to cancel booking");
    }
  };

  const handleEdit = (booking) => {
    setEditbooking(booking);
  };

  // const confirmDeletebooking = (booking) => {
  //   setSelectedbooking(booking);
  //   setDeleteModalOpen(true);
  // };

  const confirmDeletebooking = (booking) => {
    setSelectedBooking(booking); // fix here too
    setDeleteModalOpen(true);
  };

  const handleEditSave = () => {
    axios
      .put(`${URL}/api/bookings/${editbooking._id}`, editbooking)
      .then((res) => {
        // Update local state with new booking details
        setTouristbookings((prev) =>
          prev.map((booking) =>
            booking._id === editbooking._id ? res.data : booking
          )
        );

        setEditbooking(null); // Close the modal
        toast.success("booking updated successfully!");
      })
      .catch(() => {
        toast.error("Failed to update booking.");
      });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${URL}/api/bookings/${selectedBooking._id}`
      );
      setBookings((prev) => prev.filter((b) => b._id !== selectedBooking._id));
      toast.success("Booking deleted");
      setDeleteModalOpen(false);
    } catch {
      toast.error("Failed to delete");
    }
  };

  // const navigate = useNavigate();

  // const handleVisitVirtualTour = () => {
  //   navigate("/virtual-tour", {
  //     // state: { videoUrl: tour.virtualTourVideoUrl },
  //   });
  // };

  // const handleVisitVirtualTour = () => {
  //   setVideoUrl(sampleVideoUrl); // Set video url dynamically if needed
  //   setIsModalOpen(true);
  // };

  const handleVisitVirtualTour = async () => {
    try {
      // Fetch video URL from backend
      const response = await axios.get(`${URL}/api/bookings`);
      setVideoUrl(response.data.videoUrl);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch video URL:", error);
      alert("Video not available.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVideoUrl("");
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
          {
            label: "Bookings",
            path: "/hotel/bookings",
            icon: <Profile className="text-[16px]" />,
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
            label: "Tourist Places",
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
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${URL}/api/bookings`);
        console.log("Bookings API response:", res.data);
        setBookings(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load bookings");
      }
    };

    fetchBookings();
  }, []);

  const handleAddHotel = () => {
    setTouristbookings((prev) => [
      ...prev,
      { id: touristbookings.length + 1, ...newHotel },
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
        {/* Tourist bookings List */}
        <div className="w-full bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-blue-100 mt-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div className="flex items-center gap-4 mb-6">
              {storedUser?.user?.role === "user" && (
                <h1 className="text-3xl font-bold text-blue-700">
                  My bookings
                </h1>
              )}
              {storedUser?.user?.role === "admin" && (
                <h1 className="text-3xl font-bold text-blue-700">
                  All Bookings
                </h1>
              )}
              {storedUser?.user?.role === "tour_guide" && (
                <h1 className="text-3xl font-bold text-blue-700">
                  All Bookings
                </h1>
              )}
              {/* <h1 className="text-3xl font-bold text-blue-700">
                Booking Details
                {storedUser?.user?.role === "admin" && (
        <th className="py-2 px-4">Added By</th>
      )}
              </h1> */}
              <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Total:{" "}
                {
                  bookings.filter((booking) => {
                    const matchesSearch =
                      booking.placeName
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      booking.location
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      booking.userId?.name
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase());

                    if (userRole === "admin") {
                      return matchesSearch;
                    }
                    if (userRole === "tour_guide") {
                      return (
                        booking.guideId?._id === loggedInUserId && matchesSearch
                      );
                    }

                    return (
                      booking.userId?._id === loggedInUserId && matchesSearch
                    );
                  }).length
                }
              </span>
            </div>
            <input
              type="text"
              placeholder="Search by place name, location, or user name..."
              className="px-4 py-2 border border-blue-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {bookings
              .filter((booking) => {
                const matchesSearch =
                  booking.placeName
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  booking.location
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  booking.userId?.name
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase());

                if (userRole === "admin") return matchesSearch;

                if (userData?.role === "tour_guide")
                  return (
                    booking.guideId?._id === loggedInUserId && matchesSearch
                  );
                if (userData?.role === "user")
                  return (
                    booking.userId?._id === loggedInUserId && matchesSearch
                  );
              })
              .slice(indexOfFirstHotel, indexOfLastHotel)
              .map((booking) => {
                const isCancelledByUser =
                  booking.status === "cancelled" &&
                  loggedInUserId === booking.userId?._id;

                return (
                  <div
                    key={booking._id}
                    className={`bg-white shadow-lg rounded-xl p-6 border transition ${
                      isCancelledByUser
                        ? "border-red-400 bg-red-50 opacity-80"
                        : "border-blue-100 hover:shadow-2xl"
                    }`}
                  >
                    <h3 className="text-xl font-bold text-blue-700 mb-2">
                      {booking.placeName || "Unknown"}
                    </h3>
                    <p className="text-gray-700">
                      <strong>User:</strong> {booking.userId?.name || "Unknown"}
                    </p>
                    <p className="text-gray-700">
                      <strong>Tour Guide:</strong>{" "}
                      {booking.guideId?.name || "Unknown"}
                    </p>
                    <p className="text-gray-700">
                      <strong>Location:</strong> {booking.location}
                    </p>
                    <p className="text-gray-700">
                      <strong>Tour Time:</strong> {booking.tourTime}
                    </p>
                    <p className="text-gray-700">
                      <strong>Booking Time:</strong>{" "}
                      {new Date(booking.bookingTime).toLocaleString()}
                    </p>

                    {isCancelledByUser && (
                      <p className="text-red-600 font-semibold mt-2">
                        Booking Cancelled by You
                      </p>
                    )}
                    {storedUser?.user?.role === "admin" &&
                      booking.status === "cancelled" && (
                        <p className="text-red-600 font-semibold mt-2">
                          This booking was cancelled by the user
                        </p>
                      )}

                    <div className="flex gap-2 mt-4">
                      {storedUser?.user?.role === "user" ? (
                        <>
                          {booking.videoUrl && (
                            <button
                              onClick={() => {
                                setVideoUrl(booking.videoUrl);
                                setIsModalOpen(true);
                              }}
                              className={`flex items-center px-4 py-2 rounded-lg text-sm ${
                                isCancelledByUser
                                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                  : "bg-blue-600 text-white hover:bg-blue-700"
                              }`}
                              disabled={isCancelledByUser}
                            >
                              <Eye size={16} className="mr-2" />
                              Visit Virtual Tour
                            </button>
                          )}

                          {!isCancelledByUser && (
                            <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to cancel this booking? If you cancel your money is not refunded !!"
                                  )
                                ) {
                                  handleCancelBooking(booking._id);
                                }
                              }}
                              className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
                            >
                              <Ban size={16} className="mr-2" />
                              Cancel
                            </button>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={() => confirmDeletebooking(booking)}
                          className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
                        >
                          <Trash2 size={16} className="mr-2" />
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
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
        {/* <Modal show={!!deletebookingId} onHide={() => setDeletebookingId(null)}>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Delete</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Are you sure you want to delete this tourist booking?
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setDeletebookingId(null)}>
      Cancel
    </Button>
    <Button variant="danger" onClick={handleDeletebooking}>
      Delete
    </Button>
  </Modal.Footer>
</Modal> */}
      </main>

      {/* Add Hotel Modal */}
      {editbooking && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-lg">
            <h2 className="text-xl font-bold text-blue-700 mb-4">
              Edit Tourist booking
            </h2>
            <label htmlFor="">booking Name:</label>
            <input
              type="text"
              className="w-full p-2 mb-3 rounded border border-blue-600"
              value={editbooking.bookingName}
              onChange={(e) =>
                setEditbooking({ ...editbooking, bookingName: e.target.value })
              }
              bookingholder="booking Name"
            />
            <label htmlFor="">Location:</label>
            <input
              type="text"
              className="w-full p-2 mb-3 rounded border border-blue-600"
              value={editbooking.location}
              onChange={(e) =>
                setEditbooking({ ...editbooking, location: e.target.value })
              }
              bookingholder="Location"
            />
            <label htmlFor="">Tour Time:</label>
            <input
              type="text"
              className="w-full p-2 mb-3 rounded border border-blue-600"
              value={editbooking.tourTime}
              onChange={(e) =>
                setEditbooking({ ...editbooking, tourTime: e.target.value })
              }
              bookingholder="Tour Time"
            />
            <label htmlFor="">Duration:</label>
            <input
              type="text"
              className="w-full p-2 mb-3 rounded border border-blue-600"
              value={editbooking.duration}
              onChange={(e) =>
                setEditbooking({ ...editbooking, duration: e.target.value })
              }
              bookingholder="Duration"
            />

            <label htmlFor="">Price:</label>
            <input
              type="number"
              className="w-full p-2 mb-3 rounded border border-blue-600"
              value={editbooking.price}
              onChange={(e) =>
                setEditbooking({ ...editbooking, price: e.target.value })
              }
              bookingholder="Price"
            />

            <label htmlFor="">Language:</label>
            <input
              type="text"
              className="w-full p-2 mb-3 rounded border border-blue-600"
              value={editbooking.languagesSpoken.join(", ")}
              onChange={(e) =>
                setEditbooking({
                  ...editbooking,
                  languagesSpoken: e.target.value
                    .split(",")
                    .map((lang) => lang.trim()),
                })
              }
              bookingholder="Languages (comma-separated)"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditbooking(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
              <strong>{selectedBooking?.title}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg overflow-hidden max-w-3xl w-full aspect-video relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white font-bold text-3xl bg-red-600 p-1 rounded-full z-10"
            >
              &times;
            </button>
            <iframe
              src={videoUrl}
              title="Virtual Tour Video"
              allow="autoplay; fullscreen"
              allowFullScreen
              frameBorder="0"
              className="w-full h-full"
            />
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Booking;
