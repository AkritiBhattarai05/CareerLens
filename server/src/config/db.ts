import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(mongoURI, {
      dbName: "ai-career",
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    });

    console.log("✓ Connected to MongoDB successfully");
  } catch (error) {
    console.error("✗ MongoDB connection failed:");
    console.error(error);
    throw error; // Re-throw to prevent server from starting
  }
};

export default connectDB;