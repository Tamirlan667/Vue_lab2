import { MongoClient } from "mongodb";
import mongoose from "mongoose";

export default defineNitroPlugin(() => {
  mongoose.connect(useRuntimeConfig().MONGODB_URI);

  console.log("MongoDB connected successfully");
});
