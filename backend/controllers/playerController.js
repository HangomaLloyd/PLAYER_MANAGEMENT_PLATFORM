const Player = require('../models/Player');

// Get all players for the logged-in club
exports.getPlayers = async (req, res) => {
  try {
    const players = await Player.find({ club: req.user.club });
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new player for the logged-in club
exports.createPlayer = async (req, res) => {
  try {
    const player = new Player({ ...req.body, club: req.user.club });
    await player.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a single player (must belong to the club)
exports.getPlayer = async (req, res) => {
  try {
    const player = await Player.findOne({ _id: req.params.id, club: req.user.club });
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a player (must belong to the club)
exports.updatePlayer = async (req, res) => {
  try {
    const player = await Player.findOneAndUpdate(
      { _id: req.params.id, club: req.user.club },
      req.body,
      { new: true }
    );
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a player (must belong to the club)
exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findOneAndDelete({ _id: req.params.id, club: req.user.club });
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json({ message: 'Player deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
