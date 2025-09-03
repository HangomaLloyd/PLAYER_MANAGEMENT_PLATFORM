import express from 'express';
import { signup, login } from '../controllers/authController.js';
import upload from '../middleware/multerSignup.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes for authentication
router.post('/signup', upload.fields([
  { name: 'registrationDoc', maxCount: 1 },
  { name: 'logo', maxCount: 1 }
]), signup);
router.post('/login', login);

// A simple protected route that uses the middleware
router.get('/protected', verifyToken, (req, res) => {
  res.json({
    message: 'This is a protected route.',
    user: req.user
  });
});

export default router;
