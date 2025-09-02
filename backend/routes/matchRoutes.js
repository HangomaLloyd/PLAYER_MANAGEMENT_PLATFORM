import express from 'express';
import Match from '../models/Match.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all matches
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch matches.' });
  }
});

// Create a match (admin only)
router.post('/', verifyToken, async (req, res) => {
  // You should check req.user.role === 'admin' in a real app
  try {
    const match = new Match({ ...req.body, createdBy: req.user.userId });
    await match.save();
    res.status(201).json(match);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create match.' });
  }
});

// Update a match (admin only)
router.put('/:id', verifyToken, async (req, res) => {
  // You should check req.user.role === 'admin' in a real app
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(match);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update match.' });
  }
});

// Delete a match (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  // You should check req.user.role === 'admin' in a real app
  try {
    await Match.findByIdAndDelete(req.params.id);
    res.json({ message: 'Match deleted.' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete match.' });
  }
});

export default router;
