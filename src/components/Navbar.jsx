import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import avator from "../assets/img/avator.jpg";
import "../assets/style/style.css";
import { LayoutDashboard, User, LogOut } from "lucide-react";
import CustomDropdown from "./CustomDropdown";

export default function Navbar() {
  const URL = "https://tourist-backend-5qoo.onrender.com";
  const stored = JSON.parse(localStorage.getItem("user"));
  const userName = stored?.user?.name;
  const [userData, setUserData] = useState(stored?.user || null);
  const [open, setOpen] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userRole, setUserRole] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("user") !== null
  );
  // const [userData, setUserData] = useState(
  //   () => JSON.parse(localStorage.getItem("user")) || null
  // );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay or fetch real data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5s delay to simulate loading

    return () => clearTimeout(timer);
  }, []);
  const Skeleton = ({ className }) => (
    <div className={`bg-gray-300 animate-pulse rounded ${className}`}></div>
  );

  const handleForgotPassword = () => {
     setShowLoginModal(false);
    navigate("/forgot-password");
  };
  const linkClass =
    "text-white hover:text-yellow-300 transition-colors duration-300 font-medium";
  const mobileLinkClass =
    "block text-gray-800 hover:text-indigo-600 py-2 transition duration-300";
  const linkClass2 =
    "text-white font-medium py-2 px-4 relative overflow-hidden rounded-lg";
  const sparkleAnimation =
    "sparkle-animation bg-yellow-500 hover:bg-yellow-600 transition duration-300";

  const isArVisionActive = location.pathname === "/camera.html";
  const navigate = useNavigate();

  function generateCaptcha() {
    const a = Math.floor(Math.random() * 10 + 1);
    const b = Math.floor(Math.random() * 10 + 1);
    return { question: `${a} + ${b}`, answer: (a + b).toString() };
  }

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
    setOpen(false);
  };

  const handleLoginClick = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
    setCaptchaError("");
    setShowLoginModal(true);
    setOpen(false);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !userRole) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await axios.post(`${URL}/api/users/register`, {
        name,
        email,
        password,
        role: userRole,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({ name, email, role: userRole })
      );

      setShowRegisterModal(false);
      setName("");
      setEmail("");
      setPassword("");
      setUserRole("");
      alert("Registration successful!");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (captchaInput !== captcha.answer) {
      setCaptchaError("Captcha does not match");
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
      return;
    }

    setCaptchaError("");

    try {
      const res = await axios.post(`${URL}/api/users/login`, {
        email: loginEmail,
        password: loginPassword,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      // localStorage.setItem('user', JSON.stringify(userResponse.user)); // assumes userResponse is res.data from login
      // localStorage.setItem('user', JSON.stringify({ user: { _id: res._id, name: res.name, email: res.email, role: res.role } }));
      setUserData(res.data);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginEmail("");
      setLoginPassword("");
      setCaptchaInput("");
    } catch (err) {
      setLoginError(err.response?.data?.error || "Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserData(null);
    navigate("/");
  };

  return (
    <>
      {loading ? (
        <nav className="bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 w-full fixed top-0 z-50 p-2">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
            <Skeleton className="h-8 w-32" />
            <div className="hidden md:flex space-x-8 items-center">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-8 w-28 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
            <Skeleton className="h-8 w-8" />
          </div>
        </nav>
      ) : (
        <>
          <nav className="bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 shadow-lg w-full fixed top-0 z-50 p-2">
            <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
              <h1 className="text-3xl font-extrabold italic text-white tracking-wide">
                <NavLink
                  to="/"
                  className="hover:text-yellow-300 transition-colors duration-300"
                >
                  ExploreMore
                </NavLink>
              </h1>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-8 items-center">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${linkClass} ${
                      isActive
                        ? "border-b-2 border-yellow-300 font-semibold"
                        : ""
                    }`
                  }
                >
                  Home
                </NavLink>
                <ScrollLink
                  to="about"
                  smooth
                  duration={600}
                  offset={-80}
                  spy
                  activeClass="text-yellow-300 font-semibold"
                  className={linkClass}
                  style={{ cursor: "pointer" }}
                >
                  About
                </ScrollLink>
                {/* <NavLink
                  to="/package"
                  className={({ isActive }) =>
                    `${linkClass} ${
                      isActive
                        ? "border-b-2 border-yellow-300 font-semibold"
                        : ""
                    }`
                  }
                >
                  Package
                </NavLink> */}
                <NavLink
                  to="/tours"
                  className={({ isActive }) =>
                    `${linkClass} ${
                      isActive
                        ? "border-b-2 border-yellow-300 font-semibold"
                        : ""
                    }`
                  }
                >
                  Tours
                </NavLink>
                {/* <NavLink to="/trips" className={({ isActive }) => `${linkClass} ${isActive ? 'border-b-2 border-yellow-300 font-semibold' : ''}`}> Customized Trip </NavLink> */}
                <ScrollLink
                  to="contact"
                  smooth
                  duration={600}
                  offset={-80}
                  spy
                  activeClass="text-yellow-300 font-semibold"
                  className={linkClass}
                  style={{ cursor: "pointer" }}
                >
                  Contact
                </ScrollLink>
                {/* <NavLink to="/ar" className={({ isActive }) => `${linkClass} ${isActive ? 'border-b-2 border-yellow-300 font-semibold' : ''}`}>AR Vision</NavLink> */}
                {/* <a href="/camera.html" className={({ isActive }) => `${linkClass} ${isActive ? 'border-b-2 border-yellow-300 font-semibold' : ''}`}>AR Vision</a> */}
                {/* <a
                  href="/camera.html"
                  className={`${linkClass2} ${sparkleAnimation} ${
                    isArVisionActive
                      ? "border-b-2 border-yellow-300 font-semibold"
                      : ""
                  }`}
                >
                  AR Vision
                </a> */}
                {/* <a
        href="https://lens.google.com/" target='_blank'
        className={`${linkClass2} ${sparkleAnimation} ${isArVisionActive ? 'border-b-2 border-yellow-300 font-semibold' : ''}`}
      >
        AR Vision
      </a> */}

                {!isLoggedIn ? (
                  <>
                    <button
                      onClick={handleRegisterClick}
                      className="ml-4 px-5 py-1.5 rounded-full bg-white text-indigo-700 font-semibold shadow hover:bg-yellow-300 hover:text-gray-900 transition duration-300"
                    >
                      Register
                    </button>
                    <button
                      onClick={handleLoginClick}
                      className="ml-2 px-5 py-1.5 rounded-full bg-white text-indigo-700 font-semibold shadow hover:bg-yellow-300 hover:text-gray-900 transition duration-300"
                    >
                      Login
                    </button>
                  </>
                ) : (
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center space-x-3 focus:outline-none px-2 rounded-md hover:bg-white/10 transition"
                    >
                      {/* Avatar with gradient border */}
                      <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500">
                        <img
                          src={avator}
                          alt="Avatar"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>

                      {/* Username */}
                      <span className="text-white font-semibold">
                        {userName}
                      </span>

                      {/* Arrow icon */}
                      <svg
                        className={`w-4 h-4 text-white transition-transform duration-200 ${
                          dropdownOpen ? "rotate-180" : "rotate-0"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown menu */}
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg z-50">
                        <NavLink
                          to="/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <LayoutDashboard className="inline text-sm text-zinc-400" />
                          <span>Dashboard</span>
                        </NavLink>
                        <NavLink
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <User className="inline text-sm text-zinc-400" />
                          <span>Profile</span>
                        </NavLink>
                        <button
                          onClick={() => {
                            handleLogout();
                            setDropdownOpen(false);
                          }}
                          className="flex items-center space-x-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut className="inline text-sm text-zinc-400" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Hamburger Menu */}
              <div className="md:hidden">
                <button onClick={() => setOpen(!open)} className="text-white">
                  {open ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>

            {/* Mobile Dropdown */}
            {open && (
              <div className="md:hidden bg-white px-4 pb-4 pt-2 shadow-lg rounded-b-md space-y-2">
                <NavLink
                  to="/"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `${mobileLinkClass} ${
                      isActive ? "text-indigo-600 font-semibold" : ""
                    }`
                  }
                >
                  Home
                </NavLink>
                <ScrollLink
                  to="about"
                  smooth
                  duration={600}
                  offset={-80}
                  spy
                  activeClass="text-indigo-600 font-semibold"
                  onClick={() => setOpen(false)}
                  className={mobileLinkClass}
                  style={{ cursor: "pointer" }}
                >
                  About
                </ScrollLink>
                {/* <NavLink
                  to="/package"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `${mobileLinkClass} ${
                      isActive ? "text-indigo-600 font-semibold" : ""
                    }`
                  }
                >
                  Package
                </NavLink> */}
                <NavLink
                  to="/tours"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `${mobileLinkClass} ${
                      isActive ? "text-indigo-600 font-semibold" : ""
                    }`
                  }
                >
                  Tours
                </NavLink>
                {/* <NavLink to="/trips" onClick={() => setOpen(false)} className={({ isActive }) => `${mobileLinkClass} ${isActive ? 'text-indigo-600 font-semibold' : ''}`}>Customized Trip</NavLink> */}
                <ScrollLink
                  to="contact"
                  smooth
                  duration={600}
                  offset={-80}
                  spy
                  activeClass="text-indigo-600 font-semibold"
                  onClick={() => setOpen(false)}
                  className={mobileLinkClass}
                  style={{ cursor: "pointer" }}
                >
                  Contact
                </ScrollLink>
                {/* <a
                  href="/camera.html"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `${mobileLinkClass} ${
                      isActive ? "text-indigo-600 font-semibold" : ""
                    }`
                  }
                >
                  AR Vision
                </a> */}
                {/* <a href="https://lens.google.com/" target='_blank' onClick={() => setOpen(false)} className={({ isActive }) => `${mobileLinkClass} ${isActive ? 'text-indigo-600 font-semibold' : ''}`}>AR Vision</a> */}
                {!isLoggedIn ? (
                  <>
                    <button
                      onClick={handleRegisterClick}
                      className="w-full mt-2 bg-indigo-600 text-white py-2 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition"
                    >
                      Register
                    </button>
                    <button
                      onClick={handleLoginClick}
                      className="w-full mt-2 bg-indigo-600 text-white py-2 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition"
                    >
                      Login
                    </button>
                  </>
                ) : (
                  <div className="text-center mt-3">
                    <img
                      src={avator}
                      alt="Avatar"
                      className="mx-auto w-12 h-12 rounded-full border"
                    />
                    <NavLink
                      to="/dashboard"
                      className="block mt-2 text-indigo-600"
                    >
                      Dashboard
                    </NavLink>
                    <NavLink to="/profile" className="block text-indigo-600">
                      Profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="block mt-2 w-full text-red-600 hover:text-red-800"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Register Modal */}
          <AnimatePresence>
            {showRegisterModal && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white/10 backdrop-blur-lg border border-white/20 w-[90%] max-w-md p-8 rounded-2xl shadow-2xl relative"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={() => setShowRegisterModal(false)}
                    className="absolute top-3 right-3 text-gray-300 hover:text-red-500"
                  >
                    <X size={24} />
                  </button>
                  <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-md">
                    Register
                  </h2>
                  <form className="space-y-4" onSubmit={handleRegisterSubmit}>
                    {error && (
                      <div className="text-red-400 text-center font-medium">
                        {error}
                      </div>
                    )}
                    <CustomDropdown value={userRole} onChange={setUserRole} />

                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      className="outline-none w-full px-4 py-2 border border-white/30 bg-white/10 text-white rounded-lg focus:ring-2 focus:ring-indigo-400 placeholder:text-gray-300"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="outline-none w-full px-4 py-2 border border-white/30 bg-white/10 text-white rounded-lg focus:ring-2 focus:ring-indigo-400 placeholder:text-gray-300"
                    />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="outline-none w-full px-4 py-2 border border-white/30 bg-white/10 text-white rounded-lg focus:ring-2 focus:ring-indigo-400 placeholder:text-gray-300"
                    />
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 text-white py-2 rounded-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition"
                    >
                      Sign Up
                    </button>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Modal */}
          <AnimatePresence>
            {showLoginModal && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="w-[90%] max-w-md p-8 rounded-2xl shadow-2xl relative glassmorphic"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <button
                    onClick={() => setShowLoginModal(false)}
                    className="absolute top-3 right-3 text-white hover:text-red-400"
                  >
                    <X size={24} />
                  </button>

                  <h2 className="text-3xl font-bold text-white mb-6 text-center">
                    Login
                  </h2>

                  <form className="space-y-4" onSubmit={handleLogin}>
                    {loginError && (
                      <div className="text-red-300 text-center text-sm">
                        {loginError}
                      </div>
                    )}

                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="Email"
                      className="outline-none w-full px-4 py-2 bg-white/20 border border-white/30 text-white placeholder-white/70 rounded-xl focus:ring-2 focus:ring-indigo-300 backdrop-blur-sm"
                    />

                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Password"
                      className="outline-none w-full px-4 py-2 bg-white/20 border border-white/30 text-white placeholder-white/70 rounded-xl focus:ring-2 focus:ring-indigo-300 backdrop-blur-sm"
                    />

                    <div className="flex items-center space-x-2">
                      <span className="font-semibold bg-white p-1">
                        {captcha.question} =
                      </span>
                      <input
                        type="text"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        placeholder="Enter CAPTCHA"
                        className="outline-none flex-1 px-3 py-1.5 bg-white/20 border border-white/30 text-white placeholder-white/60 rounded-md focus:ring-2 focus:ring-indigo-400 backdrop-blur-sm"
                      />
                    </div>

                    {captchaError && (
                      <div className="text-red-300 text-center text-sm">
                        {captchaError}
                      </div>
                    )}

                    {/* Forgot Password Link */}
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleForgotPassword} // you can define this
                        className="text-sm text-indigo-300 hover:underline transition"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-500 via-sky-500 to-teal-400 text-white py-2 rounded-xl font-semibold hover:from-yellow-400 hover:to-yellow-500 transition shadow-md"
                    >
                      Login
                    </button>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}
