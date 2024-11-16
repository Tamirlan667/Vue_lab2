// server/api/users/[id].js
import { connectToDatabase } from '../../db/connect.js';
import User from '../../db/models/User.js';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  try {
    await connectToDatabase();

    const user = await User.findOne({ id });

    if (!user) {
      return sendError(
        event,
        createError({ statusCode: 404, statusMessage: 'User not found.' })
      );
    }

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Failed to fetch user.' })
    );
  }
});
