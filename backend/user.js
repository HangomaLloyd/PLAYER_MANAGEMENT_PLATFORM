const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    // The select: false option prevents the password from being returned in query results by default.
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Pre-save middleware to hash the password before saving a new user.
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified.
  if (!this.isModified('password')) {
    return next();
  }
  // Hash the password
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  // 'this' refers to the user document. The select: false in the schema for password
  // means we need to explicitly include it here.
  const user = await this.model('User').findOne({ email: this.email }).select('+password');
  if (!user) {
    return false;
  }
  return await bcrypt.compare(candidatePassword, user.password);
};

module.exports = mongoose.model('User', userSchema);
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const dbConnect = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
dbConnect();

// Middleware
app.use(cors());
app.use(express.json());

// Main welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the FAZ Backend API!');
});

// Use the authentication routes
app.use('/api', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
