import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  Download,
  TicketPercent,
  Send
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as XLSX from "xlsx";

const UserPage = () => {
  const URL = "https://tourist-backend-5qoo.onrender.com";
  const stored = JSON.parse(localStorage.getItem("user"));
  const userId = stored?.user?.id;
  const userEmail = stored?.user?.email;
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(stored?.user || null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => stored !== null);
  const [greeting, setGreeting] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "" });

  const isAdmin = userData?.role === "admin";

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

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good Morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17 && hour < 21) setGreeting("Good Evening");
    else setGreeting("Good Night");
  }, []);

  useEffect(() => {
    if (isAdmin) {
      axios
        .get(`${URL}/api/users`)
        .then((res) => setUsers(res.data))
        .catch(() => toast.error("Failed to fetch users."));
    }
  }, [isAdmin]);

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditForm({ name: user.name, email: user.email, role: user.role });
    setEditModalOpen(true);
  };

  const handleEditSubmit = () => {
    axios
      .put(`${URL}/api/users/${selectedUser._id}`, editForm)
      .then(() => {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === selectedUser._id ? { ...u, ...editForm } : u
          )
        );
        toast.success("User updated successfully.");
        setEditModalOpen(false);
      })
      .catch(() => toast.error("Failed to update user."));
  };

  const confirmDelete = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    axios
      .delete(`${URL}/api/users/${selectedUser._id}`)
      .then(() => {
        setUsers((prev) => prev.filter((u) => u._id !== selectedUser._id));
        toast.success("User deleted successfully.");
        setDeleteModalOpen(false);
      })
      .catch(() => toast.error("Failed to delete user."));
  };

  const exportToExcel = () => {
    const filteredUsers = users.map(({ _id, __v, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(filteredUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users_list.xlsx");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

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
                <h1 className="text-3xl font-bold text-blue-700">Users List</h1>
                <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Total: {users.length}
                </span>
              </div>
              <input
                type="text"
                placeholder="Search by name or email..."
                className="px-4 py-2 border border-blue-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl shadow-inner bg-white/40 backdrop-blur-lg">
              <table className="min-w-full text-sm text-gray-900">
                <thead className="bg-blue-200/60 text-blue-800">
                  <tr>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Role</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-blue-100 hover:bg-blue-50/40"
                    >
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4 capitalize">
                        {user.role === "admin" && (
                          <span className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                            Admin
                          </span>
                        )}
                        {user.role === "user" && (
                          <span className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
                            User
                          </span>
                        )}
                        {user.role === "tour_guide" && (
                          <span className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-green-500 to-lime-500">
                            Tourist Guide
                          </span>
                        )}
                        {user.role === "hotel" && (
                          <span className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-yellow-500 to-orange-500">
                            Hotel
                          </span>
                        )}
                        {user.role === "restaurant" && (
                          <span className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-red-500 to-pink-500">
                            Restaurant
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 space-x-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="inline-flex items-center bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold"
                        >
                          <PencilLine size={14} className="mr-1" /> Edit
                        </button>
                        {!(userId === userData.id && user.role === "admin") && (
                          <button
                            onClick={() => confirmDelete(user)}
                            className="inline-flex items-center bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-semibold"
                          >
                            <Trash2 size={14} className="mr-1" /> Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
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
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage * usersPerPage >= filteredUsers.length}
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
        )}
      </main>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Edit User</h2>
            <input
              type="text"
              className="w-full p-2 mb-3 rounded outline-none border border-blue-600 focus:border-blue-500"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
              placeholder="Name"
            />
            <input
              type="email"
              className="w-full p-2 mb-3 rounded outline-none border border-blue-600 focus:border-blue-500"
              value={editForm.email}
              onChange={(e) =>
                setEditForm({ ...editForm, email: e.target.value })
              }
              placeholder="Email"
            />
            <select
              className="w-full p-2 mb-3 rounded outline-none border border-blue-600 focus:border-blue-500"
              value={editForm.role}
              onChange={(e) =>
                setEditForm({ ...editForm, role: e.target.value })
              }
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="tour_guide">Tour Guide</option>
            </select>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Confirm Deletion
            </h2>
            <p className="mb-4">
              Are you sure you want to delete{" "}
              <strong>{selectedUser.name}</strong>?
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

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UserPage;
