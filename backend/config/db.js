import mongoose from "mongoose";

const dbURL = process.env.MONGODB_URI ;


export const connectDB = async () => {
  await mongoose.connect(dbURL).then(() => {
    console.log("MongoDB connected successfully");
  }).catch((error) => {
    console.error("MongoDB connection failed:", error);
  });
} 