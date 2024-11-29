// server/db/connect.js
import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://tamirlan650:510149361Karim@cluster0.jx8g3.mongodb.net/mydata?retryWrites=true&w=majority" ||
  "your_mongo_connection_string";

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
