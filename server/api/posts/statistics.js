import { MongoClient } from "mongodb";

export default async (req, res) => {
  try {
    const userId = parseInt(req.query.userId); // Get user ID from query params
    const client = await MongoClient.connect(
      "mongodb+srv://tamirlan650:510149361Karim@cluster0.jx8g3.mongodb.net/mydata?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const db = client.db("yourDatabaseName");

    // Group posts by date for the given user
    const posts = await db
      .collection("posts")
      .aggregate([
        { $match: { userId } }, // Filter posts by userId
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } }, // Sort by date ascending
      ])
      .toArray();

    client.close();

    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
