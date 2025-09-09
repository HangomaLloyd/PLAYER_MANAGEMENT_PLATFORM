import express from 'express';
import Club from '../models/Club.js'; // Assuming you have this model created
import User from '../models/User.js'; // Assuming you have this model created
import bcrypt from 'bcryptjs';

const router = express.Router();

// Get club info by admin email (for login/Sidebar)
router.get('/by-email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found.' });
    // Find the club where this user is the admin
    const club = await Club.findOne({ adminUser: user._id });
    if (!club) return res.status(404).json({ message: 'Club not found for this user.' });
    res.json(club);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch club info.' });
  }
});

// Route to handle new club registration
router.post('/register', async (req, res) => {
  try {
    // Destructure all the fields from the request body
    const {
      clubName,
      clubAbbreviation,
      homeStadium,
      province,
      foundingYear,
      league,
      currentLeaguePosition,
      previousLeaguePosition,
      leagueTitles,
      cupsWon,
      presidentName,
      contactPerson,
      contactPhone,
      websiteUrl,
      socialMediaLinks,
      email,
      password,
    } = req.body;
    
    // Simple validation to ensure required fields are present
    if (!clubName || !email || !password || !province || !league) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Check if an admin user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Admin email already in use.' });
    }

    // Hash the password before saving the admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new admin user account
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Check if a club with this name already exists
    let existingClub = await Club.findOne({ clubName });
    if (existingClub) {
      if (!existingClub.adminUser) {
        // Assign this new user as admin
        existingClub.adminUser = newUser._id;
        await existingClub.save();
        return res.status(200).json({ message: 'Club admin registered and linked to existing club.', clubId: existingClub._id });
      } else {
        return res.status(409).json({ message: 'Club name already registered and has an admin.' });
      }
    }

    // Create a new club instance with the data from the form
    const newClub = new Club({
      clubName,
      clubAbbreviation,
      homeStadium,
      province,
      foundingYear,
      league,
      currentLeaguePosition,
      previousLeaguePosition,
      leagueTitles,
      cupsWon,
      presidentName,
      contactPerson,
      contactPhone,
      websiteUrl,
      socialMediaLinks,
      adminUser: newUser._id,
    });
    await newClub.save();
    res.status(201).json({ message: 'Club registered successfully.', clubId: newClub._id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

export default router;
