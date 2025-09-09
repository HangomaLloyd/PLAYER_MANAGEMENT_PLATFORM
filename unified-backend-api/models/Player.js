import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  nrc: { type: String, required: true },
  position: { type: String, required: true },
  status: { type: String, default: 'Active' },
  joined: { type: Date, required: true },
  club: { type: String },
  nationality: { type: String },
  phone: { type: String },
  email: { type: String },
  avatar: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Player = mongoose.model('Player', playerSchema);
export default Player;
