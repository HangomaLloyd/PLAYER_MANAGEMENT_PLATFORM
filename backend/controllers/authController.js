import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';


// JWT Secret validation function
const getJWTSecret = () => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  return JWT_SECRET;
};

// Handle user registration
export const signup = async (req, res) => {
  // For multipart/form-data, fields are in req.body, files in req.files
  const { email, password, clubName, adminName, adminRole, phoneNumber, province, clubDivision } = req.body;
  // File uploads
  const registrationDoc = req.files?.registrationDoc?.[0]?.filename || null;
  const logo = req.files?.logo?.[0]?.filename || null;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // Create a new user document (password will be hashed by pre-save hook)
    const newUser = new User({
      email,
      password,
      clubName,
      adminName,
      adminRole,
      phoneNumber,
      province,
      clubDivision,
      registrationDoc,
      logo
    });
    await newUser.save();


    // Generate a JWT token with user info for dashboard display
    const token = jwt.sign({
      userId: newUser._id,
      email: newUser.email,
      role: newUser.role,
      clubName: newUser.clubName,
      adminName: newUser.adminName,
      logo: newUser.logo
    }, JWT_SECRET, { expiresIn: '24h' });

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
    // Find the user by email and explicitly select the password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Compare the provided password with the stored hashed password
    // Handle both old (double-hashed) and new (single-hashed) passwords
    let isMatch = await bcrypt.compare(password, user.password);
    
    // If direct comparison fails, try comparing with manually hashed password
    // (for accounts created before the password hashing fix)
    if (!isMatch) {
      const manuallyHashedPassword = await bcrypt.hash(password, 10);
      isMatch = await bcrypt.compare(manuallyHashedPassword, user.password);
    }
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT token with user info for dashboard display
    const token = jwt.sign({
      userId: user._id,
      email: user.email,
      role: user.role,
      clubName: user.clubName || null,
      adminName: user.adminName || null,
      logo: user.logo || null
    }, getJWTSecret(), { expiresIn: '24h' });

    console.log(`User logged in: ${email}`);
    res.json({ message: 'Login successful.', token });
  } catch (err) {
    console.error('Login error details:', err.message);
    console.error('Login error stack:', err.stack);
    res.status(500).json({ message: 'An unexpected error occurred during login.' });
  }
};
