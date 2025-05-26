import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  User,
  Users,
  Hotel,
  TicketPercent,
  Bed,
  Send,
  Reply,
  Trash2,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function ContactMessages() {
  const URL = "https://tourist-backend-5qoo.onrender.com";
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const stored = JSON.parse(localStorage.getItem("user"));
  const userId = stored?.user?.id;
  const userEmail = stored?.user?.email;
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(stored?.user || null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => stored !== null);
  const [greeting, setGreeting] = useState("");
  const isAdmin = userData?.role === "admin";
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // New states for Reply modal and delete confirmation
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [deletingId, setDeletingId] = useState(null);

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
        ]
      : []),
    ...(userData?.role === "hotel"
      ? [
          {
            label: "Rooms",
            path: "/hotel/rooms",
            icon: <Bed className="text-[16px]" />,
          },
        ]
      : []),
    ...(userData?.role === "restaurant"
      ? [
          {
            label: "Restaurant Dashboard",
            path: "/restaurant/dashboard",
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

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good Morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17 && hour < 21) setGreeting("Good Evening");
    else setGreeting("Good Night");
  }, []);

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

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMessages = filteredMessages.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  // Open Reply modal
  const openReplyModal = (msg) => {
    setSelectedMessage(msg);
    setReplyText("");
    setReplyModalOpen(true);
  };

  // Close Reply modal
  const closeReplyModal = () => {
    setReplyModalOpen(false);
    setSelectedMessage(null);
    setReplyText("");
  };

  // Send reply email (simulate)
  const sendReply = async () => {
    if (!replyText.trim()) {
      toast.error("Reply message cannot be empty.");
      return;
    }
    try {
      // Simulated API call to backend email endpoint
      await axios.post(`${URL}/api/contact/reply`, {
        toEmail: selectedMessage.email,
        subject: `Reply to your message`,
        message: replyText,
      });
      toast.success("Reply sent successfully!");
      closeReplyModal();
    } catch (error) {
      console.error("Failed to send reply:", error);
      toast.error("Failed to send reply. Please try again.");
    }
  };

  // Delete message with confirmation
  const deleteMessage = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`${URL}/api/contact/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      toast.success("Message deleted successfully.");
    } catch (error) {
      console.error("Failed to delete message:", error);
      toast.error("Failed to delete message.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    // Mark all messages as read when the component mounts
    const markMessagesRead = async () => {
      try {
        await axios.patch(`${URL}/api/contact/mark-read`);
      } catch (error) {
        console.error('Failed to mark messages as read:', error);
      }
    };

    markMessagesRead();
  }, []);

  if (!isLoggedIn)
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
        {isAdmin && (
          <div className="w-full bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-blue-100">
            {/* Header with Search */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-blue-700">
                  Contact Messages
                </h1>
                <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Total: {filteredMessages.length}
                </span>
              </div>
              <input
                type="text"
                placeholder="Search by name, email or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-72"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl shadow-inner bg-white/40 backdrop-blur-lg">
              <table className="min-w-full text-sm text-gray-900">
                <thead className="bg-blue-200/60 text-blue-800">
                  <tr>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Message</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentMessages.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-500 italic bg-white/60"
                      >
                        No messages are available.
                      </td>
                    </tr>
                  ) : (
                    currentMessages.map((msg) => (
                      <tr
                        key={msg._id}
                        className="border-b border-blue-100 hover:bg-blue-50/40"
                      >
                        <td className="py-3 px-4">{msg.name}</td>
                        <td className="py-3 px-4">{msg.email}</td>
                        <td className="py-3 px-4">{msg.message}</td>
                        <td className="py-3 px-4">
                          {new Date(msg.createdAt).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-center space-x-2">
                          <button
                            onClick={() => openReplyModal(msg)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition"
                            title="Reply"
                          >
                            <Reply size={14} className="inline text-sm" /> Reply
                          </button>
                          <button
                            onClick={() => {
                              setMessageToDelete(msg);
                              setShowConfirmModal(true);
                            }}
                            disabled={deletingId === msg._id}
                            className={`${
                              deletingId === msg._id
                                ? "bg-red-300 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-700"
                            } text-white px-3 py-1 rounded-lg transition`}
                            title="Delete"
                          >
                            <Trash2 size={14} className="mr-1 inline" />
                            {deletingId === msg._id ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-1 rounded-full border transition-all ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white font-semibold"
                      : "bg-white text-blue-600 border-blue-300 hover:bg-blue-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Reply Modal */}
      {replyModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50"
          onClick={closeReplyModal}
        >
          <div
            className="bg-white rounded-2xl p-8 w-11/12 max-w-lg shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Reply to {selectedMessage?.name}
            </h2>
            <p className="mb-4 text-gray-700">
              To:{" "}
              <span className="font-semibold bg-gray-500 text-white p-1 rounded-full">
                {selectedMessage?.email}
              </span>
            </p>
            <textarea
              rows={6}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full border border-blue-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write your reply message here..."
            ></textarea>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={closeReplyModal}
                className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={sendReply}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                <Reply className="inline" /> Reply
              </button>
            </div>
          </div>
        </div>
      )}
      {showConfirmModal && (
        <div
          className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowConfirmModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-blue-700 mb-4">
              Confirm Delete
            </h2>
            <p className="mb-6">
              Are you sure you want to delete the message from{" "}
              <span className="font-semibold">{messageToDelete?.name}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!messageToDelete) return;
                  deleteMessage(messageToDelete._id);
                  setShowConfirmModal(false);
                }}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                disabled={deletingId === messageToDelete?._id}
              >
                {deletingId === messageToDelete?._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
