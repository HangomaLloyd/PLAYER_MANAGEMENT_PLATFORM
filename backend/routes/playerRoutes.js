import express from 'express';
import Player from '../models/Player.js';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';
import { validatePlayer } from '../middleware/validation.js';

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

// Get all players with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status = 'all',
      position = 'all',
      club = 'all'
    } = req.query;
    
    // Build filter query
    const filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { nrc: { $regex: search, $options: 'i' } },
        { club: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (status !== 'all') {
      filter.status = status;
    }
    
    if (position !== 'all') {
      filter.position = position;
    }
    
    if (club !== 'all') {
      filter.club = club;
    }

    const players = await Player.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Player.countDocuments(filter);

    res.json({
      message: 'Players fetched successfully',
      data: players,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (err) {
    console.error('Error fetching players:', err);
    res.status(500).json({
      message: 'Failed to fetch players.',
      error: err.message
    });
  }
});

// Create a player (admin only)
router.post('/', verifyToken, requireAdmin, upload.single('avatar'), validatePlayer, async (req, res) => {
  try {
    console.log('Add player request body:', req.body);
    let avatarPath = '';
    if (req.file) {
      avatarPath = `/lovable-uploads/${req.file.filename}`;
    }
    // Set createdBy from authenticated user (req.user.userId)
    const player = new Player({
      ...req.body,
      avatar: avatarPath,
      createdBy: req.user.userId
    });
    await player.save();
    res.status(201).json({
      message: 'Player created successfully',
      data: player
    });
  } catch (err) {
    console.error('Add player error:', err);
    res.status(400).json({
      message: 'Failed to create player.',
      error: err.message
    });
  }
});

// Update a player (admin only)
router.put('/:id', verifyToken, requireAdmin, validatePlayer, async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!player) {
      return res.status(404).json({ message: 'Player not found.' });
    }
    res.json({
      message: 'Player updated successfully',
      data: player
    });
  } catch (err) {
    res.status(400).json({
      message: 'Failed to update player.',
      error: err.message
    });
  }
});

// Delete a player (admin only)
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found.' });
    }
    res.json({
      message: 'Player deleted successfully.',
      data: { id: req.params.id }
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to delete player.',
      error: err.message
    });
  }
});

export default router;
