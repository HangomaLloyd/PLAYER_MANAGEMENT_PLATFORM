const express = require('express');
const { signup, login } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes for authentication
router.post('/signup', signup);
router.post('/login', login);

// A simple protected route that uses the middleware
router.get('/protected', verifyToken, (req, res) => {
  res.json({
    message: 'This is a protected route.',
    user: req.user
  });
});

module.exports = router;
