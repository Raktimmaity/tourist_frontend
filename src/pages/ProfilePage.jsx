import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  User,
  Users,
  Settings,
  BarChart,
  Hotel,
  TicketPercent,
  Send
} from "lucide-react";
import avator from "../assets/img/avator.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const URL = "https://tourist-backend-5qoo.onrender.com";
  const stored = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [userData, setUserData] = useState(stored?.user || null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => stored !== null);
  const [activeTab, setActiveTab] = useState("basic");
  const [greeting, setGreeting] = useState("");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  // const [userData, setUserData] = useState(storedUser?.user || {});
  const [userData, setUserData] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    return stored?.user || {};
  });

  const isAdmin = userData?.role === "admin";
  const isHotel = userData?.role === "hotel";

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
                    }
         
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

  const [details, setDetails] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    address: userData?.address || "",
    paymentMethod: userData?.paymentMethod || "",
    password: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    const userId = stored?.user?.id; // Use 'id' instead of '_id'

    if (userId) {
      console.log("User ID:", userId);
    } else {
      console.warn("User ID not found in localStorage");
    }
  }, []);

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

  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    // Fetch user from localStorage as fallback if not passed as prop
    const stored = JSON.parse(localStorage.getItem("user"));
    const userId = stored?.user?.id;
    // const userId = stored?._id;
    const id = userData?.id;

    if (!userId) {
      toast.error("User ID not found. Please log in again.");
      console.error("Missing user ID. Stored user:", stored);
      return;
    }

    try {
      const updatedDetails = { ...details };

      if (!updatedDetails.password) {
        delete updatedDetails.password;
      }

      const response = await fetch(
        `${URL}/api/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedDetails),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully!");
        const updatedUser = { ...stored.user, ...updatedDetails };
        // localStorage.setItem("user", JSON.stringify({ user: updatedUser }));
        localStorage.setItem("user", JSON.stringify(updatedUser));

        setUserData(updatedUser);
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong!");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800">
        <div className="animate-blink bg-white/80 backdrop-blur-md border border-blue-200 shadow-xl rounded-xl p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-700 mb-4">
            Access Denied !!!
          </h2>
          <p className="text-gray-700 text-lg">
            Please log in to access your dashboard.
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
    <div className="mt-20 min-h-screen flex flex-col md:flex-row relative bg-gradient-to-br from-blue-50 to-white">
      {/* Mobile Navbar */}
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
        className={`bg-white shadow-md fixed top-0 left-0 h-screen w-64 z-20 transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-blue-700">{greeting}</h2>
          <p className="text-gray-600 text-sm mt-1">
            <strong>Welcome,</strong>{" "}
            <span className="text-lg">{userData?.name || "Guest"}</span>
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
              <span className="mr-2">{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col lg:flex-row items-start gap-8">
        {/* Profile Card */}
        <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-xl p-6 text-center border border-blue-100">
          <div className="text-6xl mb-4 flex flex-wrap justify-center items-center">
            <img
              src={avator}
              alt="profile-image"
              className="w-32 h-32 rounded-full p-1 border-2 border-blue-700"
            />
          </div>
          <h2 className="text-xl font-bold text-blue-700 mb-1">
            {details.name}
          </h2>
          <p className="text-gray-600 mb-2">{details.email}</p>
          {/* <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${isAdmin ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            {isAdmin ? "Admin" : "User"}
          </span> */}
          {userData?.role && (
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                userData.role === "admin"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : userData.role === "restaurant"
                  ? "bg-purple-100 text-purple-600"
                  : userData.role === "hotel"
                  ? "bg-orange-100 text-orange-600"
                  : userData.role === "tourGuide"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {userData.role === "tourGuide"
                ? "Tour Guide"
                : userData.role.charAt(0).toUpperCase() +
                  userData.role.slice(1)}
            </span>
          )}
        </div>

        {/* Profile Form */}
{/*         <div className="w-full lg:w-2/3 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-blue-100">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">
            Update Profile
          </h1> */}

          {/* Tabs */}
{/*           <div className="flex gap-4 mb-6 border-b border-white/30"> */}
            {/* {["basic", "password", "address", "payment"].map((tab) => ( */}
{/*             {["basic", "password"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 font-medium capitalize transition text-black ${
                  activeTab === tab
                    ? "border-blue-600 text-white bg-blue-700 rounded-full"
                    : "border-transparent text-black hover:text-blue-600"
                }`}
              >
                {tab === "basic" ? "Basic Details" : "Change Password"} */}
                {/* {tab === "basic"
                  ? "Basic Details"
                  : tab === "password"
                  ? "Change Password"
                  : tab === "address"
                  ? "Address"
                  : "Payment Details"} */}
{/*               </button>
            ))}
          </div> */}

          {/* Form Fields */}
{/*           <div className="space-y-4 text-black">
            {activeTab === "basic" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={details.name}
                    onChange={handleChange}
                    className="p-3 w-full rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={details.email}
                    onChange={handleChange}
                    className="p-3 w-full rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </>
            )}

            {activeTab === "password" && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={details.password}
                  onChange={handleChange}
                  className="p-3 w-full rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter new password"
                />
              </div>
            )} */}

            {/* {activeTab === "address" && (
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <textarea
                  name="address"
                  value={details.address}
                  onChange={handleChange}
                  className="p-3 w-full rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows="4"
                  placeholder="Enter your address"
                />
              </div>
            )}

            {activeTab === "payment" && (
              <div>
                <label className="block text-sm font-medium mb-1">Payment Method</label>
                <input
                  type="text"
                  name="paymentMethod"
                  value={details.paymentMethod}
                  onChange={handleChange}
                  placeholder="Card / UPI / PayPal"
                  className="p-3 w-full rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            )} */}
{/*           </div>

          <div className="mt-6 text-right">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Update Profile
            </button>
          </div>
        </div> */}
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProfilePage;
