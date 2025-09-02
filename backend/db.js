import mongoose from 'mongoose';

const connectDB = async () => {
  console.log('Attempting to connect to MongoDB with URI:', process.env.MONGODB_URI);
  try {
  const conn = await mongoose.connect(process.env.MONGODB_URI);

    // Log a message to confirm a successful connection
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
    
  } catch (err) {
    // Log an error message if the connection fails
    console.error(`MongoDB connection error: ${err.message}`);
    
    // Exit the process with a failure code
    process.exit(1);
  }
};

export default connectDB;
