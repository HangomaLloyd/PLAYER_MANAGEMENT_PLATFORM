import mongoose from 'mongoose';

const transferSchema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  fromClub: { type: String, required: true },
  toClub: { type: String, required: true },
  amount: { type: String },
  type: { type: String, enum: ['Permanent', 'Loan'], default: 'Permanent' },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  requestDate: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Transfer = mongoose.model('Transfer', transferSchema);
export default Transfer;
