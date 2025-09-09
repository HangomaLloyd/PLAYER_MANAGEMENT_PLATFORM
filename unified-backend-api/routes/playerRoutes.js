import express from 'express';
import Player from '../models/Player.js';
import { verifyToken } from '../middleware/authMiddleware.js';

import multer from 'multer';
import path from 'path';

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'public', 'lovable-uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

const router = express.Router();

// Get all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch players.' });
  }
});

// Create a player (admin only)
router.post('/', verifyToken, upload.single('avatar'), async (req, res) => {
  // You should check req.user.role === 'admin' in a real app
  try {
    console.log('Add player request body:', req.body);
    let avatarPath = '';
    if (req.file) {
      avatarPath = `/lovable-uploads/${req.file.filename}`;
    }
    // Set createdBy from authenticated user (req.user._id)
    const player = new Player({
      ...req.body,
      avatar: avatarPath,
      createdBy: req.user._id
    });
    await player.save();
    res.status(201).json(player);
  } catch (err) {
    console.error('Add player error:', err);
    res.status(400).json({ message: 'Failed to create player.', error: err.message });
  }
});

// Update a player (admin only)
router.put('/:id', verifyToken, async (req, res) => {
  // You should check req.user.role === 'admin' in a real app
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(player);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update player.' });
  }
});

// Delete a player (admin only)
import User from '../models/User.js';
import Club from '../models/Club.js';
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(403).json({ message: 'User not found.' });
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found.' });

    if (user.role === 'super-admin') {
      // Super admin can delete any player
      await player.deleteOne();
      return res.json({ message: 'Player deleted by super admin.' });
    }

    // Club admin: must only delete their own club's players and only if not Active
    // Find club for this admin
    const club = await Club.findOne({ adminUser: user._id });
    if (!club) return res.status(403).json({ message: 'Club not found for this admin.' });
    if (player.club !== club.clubName) {
      return res.status(403).json({ message: 'You can only delete players from your own club.' });
    }
    if (player.status === 'Active') {
      return res.status(403).json({ message: 'Cannot delete active players. Change status first.' });
    }
    await player.deleteOne();
    res.json({ message: 'Player deleted by club admin.' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete player.', error: err.message });
  }
});

export default router;
