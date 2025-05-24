import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import parisImage from "../assets/img/paris.jpg";
import "react-toastify/dist/ReactToastify.css";

export default function Tours() {
  const URL = "http://localhost:5000";
  const [filterCity, setFilterCity] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [booked, setBooked] = useState(null);
  const [touristPlaces, setTouristPlaces] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = storedUser?.user || null;

  // Fetch tourist places
  useEffect(() => {
    axios
      .get(`${URL}/api/places`)
      .then((res) => setTouristPlaces(res.data))
      .catch(() => toast.error("Error fetching tourist places"));
  }, []);

  // Extract unique languages and locations for filters
  const uniqueLanguages = Array.from(
    new Set(touristPlaces.flatMap((place) => place.languagesSpoken || []))
  ).sort();

  const uniqueLocations = Array.from(
    new Set(touristPlaces.map((place) => place.location).filter(Boolean))
  ).sort();

  // Clear all filters
  const clearFilters = () => {
    setFilterCity("");
    setDateFilter("all");
    setSelectedDate("");
    setLanguageFilter("");
    setLocationFilter("");
    setPriceFilter("all");
  };

  // Filter places based on all filters
  const filteredPlaces = touristPlaces
    // Filter by city search input
    .filter((place) =>
      filterCity
        ? place.placeName?.toLowerCase().includes(filterCity.toLowerCase())
        : true
    )
    // Filter by date filter dropdown
    .filter((place) => {
      if (dateFilter === "all") return true;
      const placeDate = new Date(place.date);
      const today = new Date();
      if (dateFilter === "today") {
        return placeDate.toDateString() === today.toDateString();
      }
      if (dateFilter === "week") {
        const weekFromNow = new Date();
        weekFromNow.setDate(today.getDate() + 7);
        return placeDate >= today && placeDate <= weekFromNow;
      }
      if (dateFilter === "month") {
        const monthFromNow = new Date();
        monthFromNow.setMonth(today.getMonth() + 1);
        return placeDate >= today && placeDate <= monthFromNow;
      }
      return true;
    })
    // Filter by selectedDate picker
    .filter((place) => {
      if (!selectedDate) return true;
      const placeDateStr = new Date(place.date).toISOString().slice(0, 10);
      return placeDateStr === selectedDate;
    })
    // Filter by language
    .filter((place) =>
      languageFilter ? place.languagesSpoken?.includes(languageFilter) : true
    )
    // Filter by location
    .filter((place) =>
      locationFilter ? place.location === locationFilter : true
    )
    // Filter by price range
    .filter((place) => {
      switch (priceFilter) {
        case "below500":
          return place.price <= 500;
        case "500to1000":
          return place.price > 500 && place.price <= 1000;
        case "1000to2000":
          return place.price > 1000 && place.price <= 2000;
        case "above2000":
          return place.price > 2000;
        default:
          return true; // "all"
      }
    })
    // Exclude pending status
    .filter((place) => place.status !== "pending");

  // Simulated Payment and Booking
  const handleBook = async (place) => {
    if (!user) {
      toast.error("You need to log in to book a tour.");
      return;
    }

    try {
      // Simulate Payment Process
      const paymentConfirmed = window.confirm(
        `You are about to pay ₹${place.price} for "${place.placeName}". Confirm payment?`
      );
      if (!paymentConfirmed) {
        toast.info("Payment cancelled.");
        return;
      }

      // After payment confirmed, create booking
      const bookingData = {
        userId: user.id,
        guideId: place.addedBy, // guide id
        tourId: place._id,
        bookingTime: new Date().toISOString(),
        location: place.location,
        tourTime: place.tourTime,
        placeName: place.placeName,
        videoUrl: place.videoUrl,
        paymentStatus: "Paid",
      };

      await axios.post(`${URL}/api/bookings/book`, bookingData);
      toast.success("Payment successful! Your tour is booked.");
      setBooked(place._id);
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Error booking the tour");
    }
  };

  // Paypal payment gateway
  // const handleBook = async (place) => {
  //   if (!user) {
  //     toast.error("You need to log in to book a tour.");
  //     return;
  //   }

  //   const containerId = `paypal-button-container-${place._id}`;

  //   // Prevent duplicate modals
  //   if (document.getElementById("paypalModal")) return;

  //   const modal = document.createElement("div");
  //   modal.innerHTML = `
  //   <div id="paypalModal" style="position: fixed; top: 0; left: 0; z-index: 9999; background: rgba(0,0,0,0.6); width: 100vw; height: 100vh; display: flex; justify-content: center; align-items: center;">
  //     <div style="background: white; padding: 20px; border-radius: 10px; max-width: 400px;">
  //       <div id="${containerId}">Loading PayPal...</div>
  //       <button id="cancelPayBtn" style="margin-top: 10px; padding: 8px 16px; background: red; color: white; border: none; border-radius: 5px;">Cancel</button>
  //     </div>
  //   </div>
  // `;
  //   document.body.appendChild(modal);

  //   document.getElementById("cancelPayBtn").onclick = () => modal.remove();

  //   // ✅ Wait until PayPal is ready
  //   const waitForPayPal = (retries = 10) => {
  //     if (window.paypal) {
  //       window.paypal
  //         .Buttons({
  //           createOrder: (data, actions) => {
  //             return actions.order.create({
  //               purchase_units: [
  //                 {
  //                   amount: {
  //                     value: place.price.toString(),
  //                     currency_code: "USD",
  //                   },
  //                   description: `Booking for ${place.placeName}`,
  //                 },
  //               ],
  //             });
  //           },
  //           onApprove: async (data, actions) => {
  //             const details = await actions.order.capture();

  //             const bookingData = {
  //               userId: user.id,
  //               guideId: place.addedBy,
  //               tourId: place._id,
  //               bookingTime: new Date().toISOString(),
  //               location: place.location,
  //               tourTime: place.tourTime,
  //               placeName: place.placeName,
  //               videoUrl: place.videoUrl,
  //               paymentStatus: "Paid",
  //               transactionId: details.id,
  //             };

  //             try {
  //               await axios.post(
  //                 "http://localhost:5000/api/bookings/book",
  //                 bookingData
  //               );
  //               toast.success("Payment successful! Your tour is booked.");
  //               setBooked(place._id);
  //             } catch (err) {
  //               toast.error(
  //                 err.response?.data?.error || "Error booking the tour"
  //               );
  //             }

  //             modal.remove();
  //           },
  //           onCancel: () => {
  //             toast.info("Payment cancelled.");
  //             modal.remove();
  //           },
  //           onError: (err) => {
  //             toast.error("PayPal error. Try again.");
  //             console.error(err);
  //             modal.remove();
  //           },
  //         })
  //         .render(`#${containerId}`);
  //     } else if (retries > 0) {
  //       setTimeout(() => waitForPayPal(retries - 1), 500); // Retry after 0.5 sec
  //     } else {
  //       document.getElementById(containerId).innerHTML =
  //         "Failed to load PayPal. Please try again.";
  //     }
  //   };

  //   waitForPayPal();
  // };

  // Razorpay booking
  //   const handleBook = async (place) => {
  //   if (!user) {
  //     toast.error("You need to log in to book a tour.");
  //     return;
  //   }

  //   try {
  //     // 1. Create Razorpay order on backend with tour price (in paise)
  //     const { data: orderData } = await axios.post("http://localhost:5000/api/payment/order", {
  //       amount: place.price * 100, // convert to paise
  //       tourId: place._id,
  //       userId: user.id,
  //     });

  //     const options = {
  //       key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
  //       amount: orderData.amount, // amount in paise
  //       currency: "INR",
  //       name: "Your Company/Tour Name",
  //       description: `Booking for ${place.placeName}`,
  //       order_id: orderData.id,
  //       handler: async function (response) {
  //         // Payment successful
  //         try {
  //           const bookingData = {
  //             userId: user.id,
  //             guideId: place.addedBy,
  //             tourId: place._id,
  //             bookingTime: new Date().toISOString(),
  //             location: place.location,
  //             tourTime: place.tourTime,
  //             placeName: place.placeName,
  //             videoUrl: place.videoUrl,
  //             paymentStatus: "Paid",
  //             transactionId: response.razorpay_payment_id,
  //           };

  //           await axios.post("http://localhost:5000/api/bookings/book", bookingData);
  //           toast.success("Payment successful! Your tour is booked.");
  //           setBooked(place._id);
  //         } catch (err) {
  //           toast.error(err.response?.data?.error || "Error booking the tour");
  //         }
  //       },
  //       prefill: {
  //         name: user.name,
  //         email: user.email,
  //       },
  //       theme: {
  //         color: "#3399cc",
  //       },
  //       modal: {
  //         ondismiss: function () {
  //           toast.info("Payment cancelled.");
  //         },
  //       },
  //     };

  //     // 2. Load Razorpay script if not already loaded
  //     const loadRazorpayScript = () =>
  //       new Promise((resolve) => {
  //         if (window.Razorpay) {
  //           resolve(true);
  //         } else {
  //           const script = document.createElement("script");
  //           script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //           script.onload = () => resolve(true);
  //           script.onerror = () => resolve(false);
  //           document.body.appendChild(script);
  //         }
  //       });

  //     const isScriptLoaded = await loadRazorpayScript();

  //     if (!isScriptLoaded) {
  //       toast.error("Failed to load Razorpay SDK. Please try again.");
  //       return;
  //     }

  //     // 3. Open Razorpay checkout
  //     const rzp = new window.Razorpay(options);
  //     rzp.open();
  //   } catch (err) {
  //     toast.error("Error processing payment. Please try again.");
  //     console.error(err);
  //   }
  // };

  return (
    <section className="py-28 px-4 bg-gradient-to-br from-indigo-50 via-white to-teal-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl pb-3 md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 text-center mb-10">
          Walk-In City Tours
        </h1>
        {/* Search Input */}
        <div className="relative max-w-xl mx-auto mb-6">
          <input
            type="text"
            placeholder="Search by city..."
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="w-full py-3 px-4 pl-10 rounded-full border-gray-300 border focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md"
          />
          <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
        </div>

        {/* Filters */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8  p-6 rounded-lg shadow-lg">
          {/* Date range filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="py-2 px-4 rounded-full border-gray-300 border focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm bg-white"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          {/* Date Picker */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="py-2 px-4 rounded-full border-gray-300 border focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm bg-white"
          />

          {/* Language Filter */}
          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="py-2 px-4 rounded-full border-gray-300 border focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm bg-white"
          >
            <option value="">All Languages</option>
            {uniqueLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>

          {/* Location Filter */}
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="py-2 px-4 rounded-full border-gray-300 border focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm bg-white"
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          {/* Price Filter Dropdown */}
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="py-2 px-4 rounded-full border-gray-300 border focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm bg-white"
          >
            <option value="all">All Prices</option>
            <option value="below500">Below ₹500</option>
            <option value="500to1000">₹500 - ₹1000</option>
            <option value="1000to2000">₹1000 - ₹2000</option>
            <option value="above2000">Above ₹2000</option>
          </select>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="py-2 px-4 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Clear Filters
          </button>
        </div>

        {/* Tour Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlaces.map((place) => (
            <div
              key={place._id}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:border-indigo-500 transition duration-300"
            >
              {/* Status Tag */}
              <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                {place.status}
              </div>

              <img
                src={place.imageUrl ? place.imageUrl : parisImage}
                alt={place.placeName}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-bold text-indigo-700">
                  {place.placeName}
                </h2>
                <p className="mt-2 text-gray-600"> <strong> Location: </strong> {place.location}</p>
                <p className="mt-2 text-gray-600">
                  <strong> Languages: </strong> {place.languagesSpoken.join(", ")}
                </p>
                <p className="mt-2 text-gray-600">
                 <strong> Tour Time:</strong> {place.tourTime}
                </p>
                <p className="mt-2 text-gray-600"><strong> Duration: </strong>{place.duration}</p>
                <p className="mt-2 text-gray-600"><strong>Price:</strong> ₹{place.price}</p>
                <p className="mt-2 text-gray-600">
                  <strong>Date:</strong>{" "}
                  {new Date(place.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                {place.addedBy && (
                  <p className="mt-2 text-gray-600">
                   <strong> Tour Guide: </strong>{place.addedBy.name}
                  </p>
                )}
                <p>
                  <strong>Payment Mode: </strong>In Hand cash
                </p>

                <button
                  onClick={() => handleBook(place)}
                  disabled={booked === place._id}
                  className={`mt-4 w-full py-2 rounded-lg font-semibold ${
                    booked === place._id
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-teal-500 text-white hover:from-indigo-700 hover:to-teal-600"
                  }`}
                >
                  {booked === place._id ? "Booked" : "Pay & Book"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </section>
  );
}
