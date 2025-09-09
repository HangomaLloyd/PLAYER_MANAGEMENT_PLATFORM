// Script to delete all players from the database
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Player from '../models/Player.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/zam-foot-central';

async function deleteAllPlayers() {
  await mongoose.connect(MONGO_URI);
  const result = await Player.deleteMany({});
  console.log(`Deleted ${result.deletedCount} players.`);
  await mongoose.disconnect();
}

deleteAllPlayers().catch(err => {
  console.error('Error deleting players:', err);
  process.exit(1);
});
