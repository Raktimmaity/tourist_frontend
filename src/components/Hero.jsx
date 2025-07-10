import { useEffect, useState } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import hero1 from "../assets/img/hero1.jpg";
import hero2 from "../assets/img/hero2.jpg";
import hero3 from "../assets/img/hero3.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

const images = [hero1, hero2, hero3];

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
  const [checkOutDate, setCheckOutDate] = useState("");
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const allImagesLoaded = Object.keys(loadedImages).length === images.length;

  return (
    <div className="relative h-[100vh] md:h-[90vh] overflow-hidden">
      {/* Background Images with Skeleton Loaders */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <div key={index} className="absolute inset-0 w-full h-full">
            {!loadedImages[index] && (
              <div className="absolute inset-0 w-full h-full bg-gray-800 animate-pulse z-0" />
            )}
            <img
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
          </div>
        ))}
      </div>

      {/* Overlay Content */}
      <div className="pt-32 pb-0 md:pb-0 md:pt-10 absolute inset-0 z-20 bg-black/70 flex flex-col items-center justify-center text-white text-center px-4 backdrop-blur-sm">
        <div className="p-4 md:p-8 w-full max-w-6xl">
          {!allImagesLoaded ? (
            <>
              <div className="h-10 md:h-16 w-3/4 md:w-1/2 bg-gray-600 rounded animate-pulse mx-auto mb-4" />
              <div className="h-6 md:h-8 w-1/2 md:w-1/3 bg-gray-600 rounded animate-pulse mx-auto mb-6" />
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-gradient-text">
                Travel Deeper. Live the Culture
              </h1>
              <p className="text-lg md:text-xl text-gray-200 animate-fade-in-delayed mb-8 max-w-2xl mx-auto">
                Your Personal Gateway to Authentic Destinations, Local Guides & Cultural Immersion
              </p>
              <NavLink
                to="/tours"
                className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 
                  text-black font-semibold px-8 py-3 rounded-lg shadow-lg
                  hover:brightness-110 transition duration-300 ease-in-out
                  animate-fade-in-delayed"
                // onClick={() => alert("CTA button clicked!")}
              >
                Explore Tours
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Gradient Fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
    </div>
  );
}
