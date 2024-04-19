import mongoose from "mongoose";

export default async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connection established.");
  } catch (error) {
    console.log("database connection failed : " + error.message);
  }
}
