// server/api/users/read.js
// get all users
import { connectToDatabase } from '../../db/connect.js';
import User from '../../db/models/User.js';

export default defineEventHandler(async (event) => {
  try {
    await connectToDatabase();

    const users = await User.find();

    return {
      success: true,
      data: users,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Failed to fetch users.' })
    );
  }
});
