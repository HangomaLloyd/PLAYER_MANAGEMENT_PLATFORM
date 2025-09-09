import mongoose from 'mongoose';

// Define the blueprint (schema) for a single football club
const ClubSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true,
    trim: true,
  },
  clubAbbreviation: {
    type: String,
    trim: true,
  },
  clubLogo: {
    // This would typically be a string URL to the uploaded image
    type: String,
  },
  homeStadium: {
    type: String,
    trim: true,
  },
  province: {
    type: String,
    required: true,
  },
  foundingYear: {
    type: Number,
  },
  league: {
    type: String,
    required: true,
  },
  currentLeaguePosition: {
    type: Number,
  },
  previousLeaguePosition: {
    type: Number,
  },
  leagueTitles: {
    type: Number,
    default: 0,
  },
  cupsWon: {
    type: Number,
    default: 0,
  },
  presidentName: {
    type: String,
    trim: true,
  },
  contactPerson: {
    type: String,
    trim: true,
  },
  contactPhone: {
    type: String,
    trim: true,
  },
  websiteUrl: {
    type: String,
    trim: true,
  },
  socialMediaLinks: {
    type: String,
    trim: true,
  },
  // We link the club to its admin user account
  adminUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('Club', ClubSchema);
