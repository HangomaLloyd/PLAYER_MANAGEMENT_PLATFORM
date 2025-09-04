import express from 'express';
import { signup, login } from '../controllers/authController.js';
import upload from '../middleware/multerSignup.js';
import { verifyToken, requireSuperAdmin } from '../middleware/authMiddleware.js';
import { validateSignup, validateLogin, validateClubUpdate } from '../middleware/validation.js';
import User from '../models/User.js';

const router = express.Router();

// Public routes for authentication
router.post('/signup', upload.fields([
  { name: 'registrationDoc', maxCount: 1 },
  { name: 'logo', maxCount: 1 }
]), validateSignup, signup);
router.post('/login', validateLogin, login);

// A simple protected route that uses the middleware
router.get('/protected', verifyToken, (req, res) => {
  res.json({
    message: 'This is a protected route.',
    user: req.user
  });
});

// Clubs management routes (Super Admin only)
router.get('/clubs', verifyToken, requireSuperAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = 'all', division = 'all', province = 'all' } = req.query;
    
    // Build filter query
    const filter = { role: 'clubadmin' };
    
    if (search) {
      filter.$or = [
        { clubName: { $regex: search, $options: 'i' } },
        { adminName: { $regex: search, $options: 'i' } },
        { province: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (status !== 'all') {
      filter.status = status;
    }
    
    if (division !== 'all') {
      filter.clubDivision = division;
    }
    
    if (province !== 'all') {
      filter.province = province;
    }

    const clubs = await User.find(filter)
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);

    res.json({
      clubs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (err) {
    console.error('Error fetching clubs:', err);
    res.status(500).json({ message: 'Failed to fetch clubs.' });
  }
});

// Get single club
router.get('/clubs/:id', verifyToken, requireSuperAdmin, async (req, res) => {
  try {
    const club = await User.findById(req.params.id).select('-password');
    if (!club || club.role !== 'clubadmin') {
      return res.status(404).json({ message: 'Club not found.' });
    }
    res.json(club);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch club.' });
  }
});

// Update club
router.put('/clubs/:id', verifyToken, requireSuperAdmin, validateClubUpdate, async (req, res) => {
  try {
    const club = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!club || club.role !== 'clubadmin') {
      return res.status(404).json({ message: 'Club not found.' });
    }
    
    res.json(club);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update club.' });
  }
});

// Delete club
router.delete('/clubs/:id', verifyToken, requireSuperAdmin, async (req, res) => {
  try {
    const club = await User.findById(req.params.id);
    if (!club || club.role !== 'clubadmin') {
      return res.status(404).json({ message: 'Club not found.' });
    }
    
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Club deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete club.' });
  }
});

export default router;
