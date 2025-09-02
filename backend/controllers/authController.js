import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';


// A secret key for signing JWTs. In production, this should be
// an environment variable, not hardcoded.
const JWT_SECRET = 'your-very-secure-and-long-secret-key';

// Handle user registration
export const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

    console.log(`New user signed up: ${email}`);
    res.status(201).json({ message: 'User registered successfully.', token });
  } catch (err) {
    res.status(500).json({ message: 'An unexpected error occurred during signup.' });
  }
};

// Handle user login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    console.log(`User logged in: ${email}`);
    res.json({ message: 'Login successful.', token });
  } catch (err) {
    res.status(500).json({ message: 'An unexpected error occurred during login.' });
  }
};
