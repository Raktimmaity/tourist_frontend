import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ResetPassword() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
  e.preventDefault();
  setError(null);
  setMessage(null);

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  setLoading(true);
  try {
    const response = await fetch("http://localhost:5000/api/users/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, confirmPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }

    setMessage(data.message);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  } catch (err) {
    setError(err.message || "Failed to reset password. Try again later.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-500 via-pink-300 to-yellow-100">
  <motion.div
    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-w-md w-full p-8"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
  >
    <h2 className="text-3xl font-extrabold text-white text-center mb-8 drop-shadow-md">
      🔐 Reset Password
    </h2>

    <form onSubmit={handleReset} className="space-y-5">
      {message && (
        <p className="text-green-300 bg-green-900/30 p-3 rounded-md text-center font-medium">
          {message}
        </p>
      )}
      {error && (
        <p className="text-red-300 bg-red-900/30 p-3 rounded-md text-center font-medium">
          {error}
        </p>
      )}

      <input
        type="email"
        required
        placeholder="Your registered email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-200"
      />

      <input
        type="password"
        required
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-200"
      />

      <input
        type="password"
        required
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-200"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-md hover:scale-105 transition disabled:opacity-50"
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  </motion.div>
</div>

  );
}
