// server/api/users/delete.js
import { connectToDatabase } from '../../db/connect.js';
import User from '../../db/models/User.js';

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);

  try {
    await connectToDatabase();

    const deletedUser = await User.findOneAndDelete({ id });

    if (!deletedUser) {
      return sendError(
        event,
        createError({ statusCode: 404, statusMessage: 'User not found.' })
      );
    }

    return {
      success: true,
      data: deletedUser,
    };
  } catch (error) {
    console.error('Error deleting user:', error);
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Failed to delete user.' })
    );
  }
});
