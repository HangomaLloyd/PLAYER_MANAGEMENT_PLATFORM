import express from 'express';
import Transfer from '../models/Transfer.js';
import Player from '../models/Player.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all transfers
router.get('/', async (req, res) => {
  try {
    const transfers = await Transfer.find().populate('player');
    res.json(transfers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch transfers.' });
  }
});

// Create a transfer request
router.post('/', verifyToken, async (req, res) => {
  try {
    const { playerId, fromClub, toClub, amount, type } = req.body;
    const player = await Player.findById(playerId);
    if (!player) return res.status(404).json({ message: 'Player not found.' });
    const transfer = new Transfer({
      player: playerId,
      fromClub,
      toClub,
      amount,
      type,
      createdBy: req.user._id
    });
    await transfer.save();
    res.status(201).json(transfer);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create transfer.', error: err.message });
  }
});

// Approve or reject a transfer
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const transfer = await Transfer.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (status === 'Approved' && transfer) {
      // Update player's club
      await Player.findByIdAndUpdate(transfer.player, { club: transfer.toClub });
    }
    res.json(transfer);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update transfer.' });
  }
});

export default router;
