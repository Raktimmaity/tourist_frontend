const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const authenticateAdmin = require('../middleware/authenticateAdmin'); // Custom middleware for admin authentication

const router = express.Router();

// Update user route (admin only)
router.put('/admin/update-user/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, avatar } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Only allow admins to update other users (skip self-update for simplicity)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'You do not have permission to update user data' });
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) user.password = await bcrypt.hash(password, 10); // Hash password if updated
    user.role = role || user.role;
    user.avatar = avatar || user.avatar;

    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

module.exports = router;
