import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
    select: false // Prevents password from being returned in queries by default
  },
  role: {
    type: String,
    enum: ['clubadmin', 'superadmin'],
    default: 'clubadmin'
  },
  // Club-specific fields (only for clubadmin role)
  clubName: { type: String },
  adminName: { type: String },
  adminRole: { type: String },
  phoneNumber: { type: String },
  province: { type: String },
  clubDivision: { type: String },
  registrationDoc: { type: String },
  logo: { type: String },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'active'
  }
}, { timestamps: true });

// Pre-save middleware to hash the password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  const user = await this.model('User').findOne({ email: this.email }).select('+password');
  if (!user) {
    return false;
  }
  return await bcrypt.compare(candidatePassword, user.password);
};

const User = mongoose.model('User', userSchema);
export default User;
