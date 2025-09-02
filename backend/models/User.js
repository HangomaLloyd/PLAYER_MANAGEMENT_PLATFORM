import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add more fields as needed (e.g., name, role)
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
