import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import authRoutes from './routes/authRoutes.js';
import playerRoutes from './routes/playerRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import transferRoutes from './routes/transferRoutes.js';
import clubRoutes from './routes/clubRoutes.js';
import multer from 'multer'; // Import multer

// Load environment variables from a .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where uploaded files will be stored
    cb(null, 'public/lovable-uploads');
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


// Use multer middleware for club registration only
app.use('/api/club', upload.single('clubLogo'), clubRoutes);
// Mount clubRoutes for all club endpoints (including /by-email)
app.use('/api/clubs', clubRoutes);

// Serve static files for uploaded images
app.use('/lovable-uploads', express.static('public/lovable-uploads'));

// Use authentication routes
app.use('/api/auth', authRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/matches', matchRoutes);
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
