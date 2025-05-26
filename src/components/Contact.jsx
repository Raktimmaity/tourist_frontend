import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const URL = "http://localhost:5000";
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    message: "",
  });
  

  const handleChange = (e) => {
    setFormdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form", formData);

    try {
      const res = await axios.post(
        `${URL}/api/contact`,
        formData
      ); // Use full URL during dev
      console.log("Response:", res.data);

      toast.success("Message sent successfully!");
      setFormdata({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 bg-gradient-to-br from-indigo-50 via-white to-teal-50 overflow-hidden"
    >
      {/* Decorative Background Circles */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-indigo-100 rounded-full opacity-20 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-teal-100 rounded-full opacity-30 blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-sky-100 rounded-full opacity-20 blur-2xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-sky-600 to-teal-500 text-center mb-20">
          Get In Touch
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Contact Info */}
          <div className="space-y-8 text-gray-700">
            <h3 className="text-3xl font-bold text-indigo-700">
              We’d love to hear from you
            </h3>
            <p className="text-lg leading-relaxed">
              Have questions or ideas? Let’s talk. Whether you're ready to book
              or simply exploring, our team is happy to assist you.
            </p>

            <div className="space-y-4 text-base">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-indigo-500 text-lg" />
                <span>support@exploremore.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-sky-500 text-lg" />
                <span>+00000000000</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-teal-500 text-lg" />
                <span>Address</span>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="backdrop-blur-md bg-white/80 border border-gray-200 shadow-2xl rounded-3xl p-10 space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Name
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Your message..."
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none resize-none transition"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 via-sky-500 to-teal-500 text-white font-semibold text-lg px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}
