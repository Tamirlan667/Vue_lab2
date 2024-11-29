import { connectToDatabase } from "~/server/db/connect";
import User from "~/models/User";

export default defineEventHandler(async (event) => {
  await connectToDatabase();

  const method = event.req.method;

  if (method === "GET") {
    const id = getQuery(event).id;
    const user = await User.findOne({ id });
    return { success: true, data: user };
  }

  if (method === "POST") {
    const body = await readBody(event);
    const user = new User(body);
    await user.save();
    return { success: true, data: user };
  }
});
