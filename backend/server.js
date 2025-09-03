import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import authRoutes from './routes/authRoutes.js';
import playerRoutes from './routes/playerRoutes.js';
import matchRoutes from './routes/matchRoutes.js';

// Load environment variables from a .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Serve static files for uploaded images
app.use('/lovable-uploads', express.static('public/lovable-uploads'));

// Use authentication routes
app.use('/api/auth', authRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/matches', matchRoutes);
import transferRoutes from './routes/transferRoutes.js';
app.use('/api/transfers', transferRoutes);

// Connect to the database
connectDB();

// Define a basic route to test if the server is working
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Set the port for the server
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(
  PORT,
  () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// ...existing code...
