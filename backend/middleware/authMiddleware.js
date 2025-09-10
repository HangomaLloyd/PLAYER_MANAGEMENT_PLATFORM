const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Club = require('../models/Club');

// Protect middleware: verifies JWT and attaches user and club to req
exports.protect = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}
	if (!token) {
		return res.status(401).json({ message: 'Not authorized, no token' });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
		const user = await User.findById(decoded.id);
		if (!user) return res.status(401).json({ message: 'User not found' });
		req.user = user;
		// Attach club if user is a club admin
		if (user.role === 'club-admin') {
			const club = await Club.findOne({ adminUser: user._id });
			if (!club) return res.status(401).json({ message: 'Club not found for user' });
			req.user.club = club._id;
		}
		next();
	} catch (err) {
		res.status(401).json({ message: 'Not authorized, token failed' });
	}
};
