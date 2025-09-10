const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  nrc: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  nationality: { type: String },
  phone: { type: String },
  email: { type: String },
  joined: { type: Date, default: Date.now },
  status: { type: String, default: 'Active' },
  avatar: { type: String },
});

module.exports = mongoose.model('Player', playerSchema);
