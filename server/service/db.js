import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://tamirlan650:510149361Karim@cluster0.jx8g3.mongodb.net/mydata?retryWrites=true&w=majority"
);

export async function connectToDatabase() {
  if (!client.isConnected()) {
    await client.connect(); // Ensure connection is established
  }
  return client.db("reviews");
}
