import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['club-admin', 'super-admin'], default: 'club-admin' },
  // Add more fields as needed (e.g., name, clubId)
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
