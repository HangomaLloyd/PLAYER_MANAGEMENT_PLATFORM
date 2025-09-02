import express from 'express';
import Player from '../models/Player.js';
import { verifyToken } from '../middleware/authMiddleware.js';

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
router.post('/', verifyToken, async (req, res) => {
  // You should check req.user.role === 'admin' in a real app
  try {
    const player = new Player({ ...req.body, createdBy: req.user.userId });
    await player.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create player.' });
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
router.delete('/:id', verifyToken, async (req, res) => {
  // You should check req.user.role === 'admin' in a real app
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.json({ message: 'Player deleted.' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete player.' });
  }
});

export default router;
