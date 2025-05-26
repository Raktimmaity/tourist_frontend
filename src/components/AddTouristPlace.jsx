// AddTouristPlacePage.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LayoutDashboard, BarChart, Hotel, User } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import avator from "../assets/img/avator.jpg";

const AddTouristPlacePage = () => {
  const URL = "https://tourist-backend-5qoo.onrender.com";
  const stored = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  //   const navigate = useNavigate();
  //   const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [languagesSpoken, setLanguagesSpoken] = useState([]);
  const [tourTime, setTourTime] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");        // new state for tour date
  const [status, setStatus] = useState("upcoming"); // new state for status with default 'upcoming'
  const [videoUrl, setVideoUrl] = useState(""); // new state for video URL
  const [imageUrl, setImageUrl] = useState(""); // new state for video URL
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
    ...(isAdmin
      ? [
          {
            label: "Manage Users",
            path: "/users",
            icon: <Users className="text-[16px]" />,
          },
          {
            label: "Hotels",
            path: "/hotel",
            icon: <Hotel className="text-[16px]" />,
          },
          {
            label: "Tourist Places",
            path: "/tourist-place-list",
            icon: <Hotel className="text-[16px]" />,
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
          {
            label: "Bookings",
            path: "/tour-guide/bookings",
            icon: <User className="text-[16px]" />,
          },
        ]
      : []),
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good Morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17 && hour < 21) setGreeting("Good Evening");
    else setGreeting("Good Night");
  }, []);

  const handleLanguageChange = (e) => {
    const { value } = e.target;
    setLanguagesSpoken((prev) =>
      prev.includes(value) ? prev : [...prev, value]
    );
  };

  const handleTourTimeChange = (e) => {
    const input = e.target.value;
    setTourTime(input);

    // Match format like "10:00 AM - 2:30 PM"
    const timeRegex =
      /(\d{1,2}:\d{2}\s?[APMapm]{2})\s*-\s*(\d{1,2}:\d{2}\s?[APMapm]{2})/;
    const match = input.match(timeRegex);

    if (match) {
      const [_, startTimeStr, endTimeStr] = match;

      const parseTime = (str) => {
        const [time, period] = str.trim().split(" ");
        let [hours, minutes] = time.split(":").map(Number);
        if (period.toUpperCase() === "PM" && hours !== 12) hours += 12;
        if (period.toUpperCase() === "AM" && hours === 12) hours = 0;
        return hours * 60 + minutes;
      };

      const startMinutes = parseTime(startTimeStr);
      const endMinutes = parseTime(endTimeStr);

      if (!isNaN(startMinutes) && !isNaN(endMinutes)) {
        let diff = endMinutes - startMinutes;
        if (diff < 0) diff += 24 * 60; // handle overnight tours

        const hours = Math.floor(diff / 60);
        const mins = diff % 60;

        const formattedDuration = mins
          ? `${hours} hour${hours !== 1 ? "s" : ""} ${mins} min${
              mins !== 1 ? "s" : ""
            }`
          : `${hours} hour${hours !== 1 ? "s" : ""}`;

        setDuration(formattedDuration);
      }
    }
  };

  const handleAddPlace = async () => {
    if (
      !placeName ||
      !location ||
      !languagesSpoken.length ||
      !tourTime ||
      !packagePrice ||
      !description ||
      !duration ||
      !date ||           // add date to validation
      !status ||           // add status to validation
      !videoUrl ||
      !imageUrl
    ) {
      toast.error("All fields are required!");
      return;
    }
    const userData = JSON.parse(localStorage.getItem("user")); // 👈 Get the logged-in user's data
    const userId = userData?.user?.id; // 👈 Extract the ID

    if (!userId) {
      toast.error("User not authenticated.");
      return;
    }

    const newPlace = {
      placeName,
      location,
      languagesSpoken,
      tourTime,
      price: packagePrice,
      description,
      duration,
      date,
      status,
      videoUrl,
      imageUrl,
      addedBy: userId, // 👈 Add the user ID to the new place
    };

    try {
      const response = await fetch(`${URL}/api/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newPlace),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to add tourist place");
      } else {
        toast.success("Tourist place added successfully");
        setPlaceName("");
        setLocation("");
        setLanguagesSpoken([]);
        setTourTime("");
        setPackagePrice("");
        setDescription("");
        setDuration("");
        setVideoUrl("");
        setImageUrl("");
      }
    } catch (error) {
      toast.error("Error while adding tourist place");
    }
  };

  return (
    <div className="mt-20 min-h-screen flex flex-col md:flex-row relative bg-gradient-to-br from-blue-50 to-white">
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
            <span className="text-lg">{stored?.user?.name}</span>
          </p>
        </div>
        <nav className="flex flex-col gap-2 p-6 text-gray-700">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-700"
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-6 flex justify-center items-center min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-200">
        <div className="w-full max-w-2xl bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/40">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6 text-center drop-shadow-md">
            Add a Tourist Place
          </h2>

          <div className="space-y-5 text-blue-900">
            {/* Place Name & Location side by side */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  className="p-3 w-full rounded-xl border border-blue-300 bg-white/60 backdrop-blur-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Enter image URL"
                />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">
                  Video URL
                </label>
                <input
                  type="text"
                  className="p-3 w-full rounded-xl border border-blue-300 bg-white/60 backdrop-blur-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Enter video URL"
                />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  Place Name
                </label>
                <input
                  type="text"
                  className="p-3 w-full rounded-xl border border-blue-300 bg-white/60 backdrop-blur-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  placeholder="Enter place name"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  className="p-3 w-full rounded-xl border border-blue-300 bg-white/60 backdrop-blur-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location"
                />
              </div>
            </div>

            {/* Duration & Tour Time side by side */}
            <div className="flex gap-4">
              

              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  Tour Time
                </label>
                <input
                  type="text"
                  className="p-3 w-full rounded-xl border border-blue-300 bg-white/60 backdrop-blur-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={tourTime}
                  onChange={handleTourTimeChange}
                  placeholder="e.g., 10:00 AM - 2:30 PM"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  className="p-3 w-full rounded-xl border border-blue-300 bg-white/60 backdrop-blur-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 4 hours"
                />
              </div>
            </div>

            {/* Package Price & Languages Spoken side by side */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  Package Price
                </label>
                <input
                  type="number"
                  className="p-3 w-full rounded-xl border border-blue-300 bg-white/60 backdrop-blur-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={packagePrice}
                  onChange={(e) => setPackagePrice(e.target.value)}
                  placeholder="Enter price"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  Languages Spoken
                </label>
                <select
                  className="p-3 w-full rounded-xl border border-blue-300 bg-white/60 backdrop-blur-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={languagesSpoken}
                  onChange={(e) => setLanguagesSpoken(e.target.value)}
                >
                  <option value="">Select Language</option>
                  <option value="Bengali">Bengali</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Tour Date</label>
                <input
                  type="date"
                  className="p-3 w-full rounded-xl border border-blue-300 bg-white/60 backdrop-blur-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  className="p-3 w-full rounded-xl border border-blue-300 bg-white/60 backdrop-blur-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                className="p-3 w-full rounded-xl border border-blue-300 bg-white/60 backdrop-blur-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a brief description of the place"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                onClick={handleAddPlace}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-200"
              >
                Add Tourist Place
              </button>
            </div>
          </div>
        </div>
      </main>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddTouristPlacePage;
