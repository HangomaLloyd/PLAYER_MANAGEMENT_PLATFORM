import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js'; // Import the database connection function

// Load environment variables from a .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

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
