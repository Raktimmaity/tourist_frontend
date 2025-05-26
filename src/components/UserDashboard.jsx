import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LayoutDashboard,
  User,
  Users,
  Settings,
  BarChart as BarChartIcon,
  Hotel,
  Bed,
  BookIcon,
  HotelIcon,
  UserIcon,
  TicketPercent,
  Send,
  MessageSquareDot,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import axios from "axios";

const UserDashboard = () => {
  const URL = "https://tourist-backend-5qoo.onrender.com";
  const stored = JSON.parse(localStorage.getItem("user"));
  // const stored = JSON.parse(localStorage.getItem("user"));
  const userData = stored?.user || null;
  const navigate = useNavigate();
  const [recentBookings, setRecentBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const location = useLocation();

  const [greeting, setGreeting] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() => stored !== null);
  // const [userData, setUserData] = useState(stored?.user || null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const isAdmin = userData?.role === "admin";
  const isHotel = userData?.role === "hotel";

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserData(null);
    navigate("/");
  };
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalUsers: 0,
    totalPlaces: 0,
  });

  const [guideStats, setGuideStats] = useState({
    guideBookings: 0,
    guidePlaces: 0,
  });

  const [userStats, setUserStats] = useState({
    userBookings: 0,
    totalPlaces: 0,
  });

  const chartData = [
    {
      name: "Bookings",
      value: isAdmin
        ? stats.totalBookings
        : guideStats.guideBookings || userStats.userBookings || 0,
    },
    { name: "Users", value: isAdmin ? stats.totalUsers : 0 },
    {
      name: "Places",
      value: isAdmin
        ? stats.totalPlaces
        : guideStats.guidePlaces || userStats.availablePlaces || 0,
    },
  ];

  useEffect(() => {
    const fetchUnreadContacts = async () => {
      try {
        if (userData?.role === "admin") {
          const res = await axios.get(
            `${URL}/api/contact/unread-count`
          ); // Adjust this endpoint
          if (res.data.unread > 0) {
            setUnreadCount(res.data.unread);
            setShowAlert(true);
          }
        }
      } catch (err) {
        console.error("Failed to fetch unread contacts:", err);
      }
    };

    fetchUnreadContacts();
  }, [userData]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good Afternoon");
    } else if (hour >= 17 && hour < 21) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }
  }, []);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/stats") // Replace with deployed URL if needed
  //     .then((res) => {
  //       console.log("Fetched stats inside effect:", res.data); // ✅ this will show the real value
  //       setStats(res.data);
  //     })
  //     .catch((err) => console.error("Failed to fetch stats", err));
  // }, []);

  useEffect(() => {
    if (!userData) return;

    const fetchStats = async () => {
      try {
        if (userData.role === "admin") {
          const res = await axios.get(`${URL}/api/stats/admin`);
          setStats(res.data);
        } else if (userData.role === "tour_guide") {
          const res = await axios.get(
            `${URL}/api/stats/tour_guide/${userData._id}`
          );
          setGuideStats(res.data);
        } else if (userData.role === "user") {
          const res = await axios.get(
            `${URL}/api/stats/user/${userData._id}`
          );
          setUserStats(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch role-based stats", err);
      }
    };

    fetchStats();
  }, [userData]);

  // Fetch role-based stats & recent bookings
  useEffect(() => {
    if (!userData) return;

    const fetchStatsAndBookings = async () => {
      try {
        if (userData.role === "admin") {
          const [statsRes, bookingsRes] = await Promise.all([
            axios.get(`${URL}/api/stats/admin`),
            axios.get(`${URL}/api/bookings/recent`),
          ]);
          setStats(statsRes.data);
          setRecentBookings(bookingsRes.data);
        } else if (userData.role === "tour_guide") {
          const [guideStatsRes, bookingsRes] = await Promise.all([
            axios.get(
              `${URL}/api/stats/tour_guide/${userData._id}`
            ),
            axios.get(
              `${URL}/api/bookings/recent/tour_guide/${userData._id}`
            ),
          ]);
          setGuideStats(guideStatsRes.data);
          setRecentBookings(bookingsRes.data);
        } else if (userData.role === "user") {
          const [userStatsRes, bookingsRes] = await Promise.all([
            axios.get(`${URL}/api/stats/user/${userData._id}`),
            axios.get(
              `${URL}/api/bookings/recent/user/${userData._id}`
            ),
          ]);
          setUserStats(userStatsRes.data);
          setRecentBookings(bookingsRes.data);
        }
      } catch (err) {
        console.error("Failed to fetch stats or recent bookings", err);
      }
    };

    fetchStatsAndBookings();
  }, [userData]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${URL}/api/contact`);
        setMessages(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to fetch messages", error);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  console.log("Total Bookings:", stats.totalBookings);
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
          //
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
    ...(isHotel
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
            label: "Tourist Place List",
            path: "/tourist-place-list",
            icon: <User className="text-[16px]" />,
          },
        ]
      : []),
  ];

  const handleNavigation = (path, action) => {
    if (action) {
      action();
    } else {
      navigate(path);
    }
    setSidebarOpen(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800">
        <div className="animate-blink bg-white/80 backdrop-blur-md border border-blue-200 shadow-xl rounded-xl p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-700 mb-4">
            Access Denied !!!
          </h2>
          <p className="text-gray-700 text-lg">
            Please log in to access your dashboard
          </p>
        </div>

        <style>
          {`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
  
        .animate-blink {
          animation: blink 1.5s infinite;
        }
      `}
        </style>
      </div>
    );
  }

  return (
    <div className="mt-20 min-h-screen flex flex-col md:flex-row relative">
      {/* Mobile navbar */}
      <div className="md:hidden bg-white shadow-md flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-blue-700">Traveler Panel</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-700 focus:outline-none"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md fixed top-0 left-0 w-64 z-20 transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-blue-700">{greeting}</h2>
          <p className="text-gray-600 text-sm mt-1">
            <strong> Welcome, </strong>
            <span className="text-lg">{userData?.name || "Guest"}</span>
          </p>
        </div>
        <nav className="flex flex-col gap-2 p-6 text-gray-700">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path, item.action)}
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

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gradient-to-br from-blue-50 to-white text-gray-800 transition-all duration-300">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Dashboard</h1>
        <p className="mb-6">
          Welcome to the dashboard,{" "}
          <strong> {userData?.name || "Guest"}!</strong>
        </p>

        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative px-6 py-4 mb-6 rounded-lg shadow-lg cursor-pointer
                 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500
                 text-yellow-900
                 backdrop-blur-sm bg-opacity-30 border border-yellow-200
                 flex items-center justify-between"
            >
              {/* <button
                onClick={() => setShowAlert(false)}
                className="absolute top-2 right-3 text-2xl text-yellow-900 hover:text-red-600 transition-colors"
                aria-label="Close alert"
              >
                <FaTimes className="inline" />
              </button> */}
              <Link
                to="/contact-messages"
                className="font-semibold hover:underline text-yellow-900"
              >
                <div className="flex items-center gap-2">
                  <span className="relative inline-flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
                  </span>
                  {/* <MessageSquareDot className="inline text-red-600" /> */}
                  <span>
                    {unreadCount} New unread Message
                    {unreadCount > 1 ? "s" : ""}
                  </span>
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glassmorphism Cards with Color Gradients */}
        {/* <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 bg-opacity-80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-4">
              <span className="text-white text-3xl">
                <BookIcon size={32} />{" "}
              </span>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Total Bookings
                </h2>
                <p className="text-white text-3xl font-semibold">
                  {stats.totalBookings}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-400 to-green-600 bg-opacity-80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-4">
              <span className="text-white text-3xl">
                <HotelIcon size={32} />{" "}
              </span>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Total Tourist Places
                </h2>
                <p className="text-white text-3xl font-semibold">
                  {stats.totalPlaces}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-400 to-purple-600 bg-opacity-80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-4">
              <span className="text-white text-3xl">
                <UserIcon size={32} />{" "}
              </span>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Users</h2>
                <p className="text-white text-3xl font-semibold">
                  {stats.totalUsers}
                </p>
              </div>
            </div>
          </div>
        </div> */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* ADMIN View */}
          {isAdmin && (
            <>
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 bg-opacity-80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <span className="text-white text-3xl">
                    <BookIcon size={32} />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      Total Bookings
                    </h2>
                    <p className="text-white text-3xl font-semibold">
                      {stats.totalBookings}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-400 to-green-600 bg-opacity-80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <span className="text-white text-3xl">
                    <HotelIcon size={32} />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      Tourist Places
                    </h2>
                    <p className="text-white text-3xl font-semibold">
                      {stats.totalPlaces}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-400 to-purple-600 bg-opacity-80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <span className="text-white text-3xl">
                    <UserIcon size={32} />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      Total Users
                    </h2>
                    <p className="text-white text-3xl font-semibold">
                      {stats.totalUsers}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-400 to-pink-600 bg-opacity-80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <span className="text-white text-3xl">
                    <UserIcon size={32} />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      Messages
                    </h2>
                    <p className="text-white text-3xl font-semibold">
                      {messages.length}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TOUR GUIDE View */}
          {userData?.role === "tour_guide" && (
            <>
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 bg-opacity-80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <span className="text-white text-3xl">
                    <BookIcon size={32} />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      Your Tour Bookings
                    </h2>
                    <p className="text-white text-3xl font-semibold">
                      {guideStats.guideBookings}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-400 to-green-600 bg-opacity-80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <span className="text-white text-3xl">
                    <HotelIcon size={32} />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      Your Tourist Places
                    </h2>
                    <p className="text-white text-3xl font-semibold">
                      {guideStats.guidePlaces}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* USER View */}
          {userData?.role === "user" && (
            <>
              {/* <div className="bg-gradient-to-br from-blue-400 to-blue-600 bg-opacity-80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <span className="text-white text-3xl">
                    <BookIcon size={32} />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      Your Bookings
                    </h2>
                    <p className="text-white text-3xl font-semibold">
                      {userStats.userBookings}
                    </p>
                  </div>
                </div>
              </div> */}

              <div className="bg-gradient-to-br from-green-400 to-green-600 bg-opacity-80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <span className="text-white text-3xl">
                    <HotelIcon size={32} />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      Total Available Places
                    </h2>
                    <p className="text-white text-3xl font-semibold">
                      {userStats.availablePlaces}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {userData?.role === "admin" && (
          <section className="mt-10">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* ===== VISUAL STATS ===== */}
              <div className="lg:w-1/2 w-full">
                <h2 className="text-2xl font-semibold mb-4 text-blue-700">
                  Visual Stats
                </h2>
                <div className="rounded-2xl shadow-xl backdrop-blur-md bg-white/30 border border-white/20 p-4">
                  <div style={{ width: "100%", height: 200 }}>
                    <ResponsiveContainer>
                      <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient
                            id="barGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#f97316"
                              stopOpacity={1}
                            />
                            <stop
                              offset="100%"
                              stopColor="#ec4899"
                              stopOpacity={1}
                            />
                          </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                        <XAxis dataKey="name" stroke="#333" />
                        <YAxis allowDecimals={false} stroke="#333" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255,255,255,0.85)",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            fontSize: "0.9rem",
                            color: "#333",
                          }}
                        />
                        <Bar
                          dataKey="value"
                          fill="url(#barGradient)"
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* ===== RECENT ACTIVITY / BOOKINGS ===== */}
              <div className="lg:w-1/2 w-full">
                <h2 className="text-2xl font-semibold mb-4 text-blue-700">
                  Recent Activity / Bookings
                </h2>
                {recentBookings.length === 0 ? (
                  <p className="text-gray-600">
                    <marquee behavior="" direction="">
                      {" "}
                      No recent bookings found{" "}
                    </marquee>
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {recentBookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl shadow-xl p-4 transition hover:shadow-2xl"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-semibold text-gray-700">
                            Booking ID:
                          </span>
                          <span className="text-sm font-bold text-blue-800">
                            {booking._id.slice(-6).toUpperCase()}
                          </span>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-semibold text-gray-700">
                            Place:
                          </span>
                          <span className="text-sm text-gray-800">
                            {booking.placeName ||
                              booking.touristPlaceName ||
                              "N/A"}
                          </span>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-semibold text-gray-700">
                            Date:
                          </span>
                          <span className="text-sm text-gray-800">
                            {new Date(
                              booking.date || booking.bookingDate
                            ).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-700">
                            Status:
                          </span>
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full capitalize text-white ${
                              booking.status === "active"
                                ? "bg-gradient-to-r from-green-400 to-green-600"
                                : "bg-gradient-to-r from-red-400 to-red-600"
                            }`}
                          >
                            {booking.status || "pending"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
