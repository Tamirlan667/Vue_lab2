// server/api/users/update.js
import { connectToDatabase } from '../../db/connect.js';
import User from '../../db/models/User.js';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id, ...updateData } = body;

  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ id }, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return sendError(
        event,
        createError({ statusCode: 404, statusMessage: 'User not found.' })
      );
    }

    return {
      success: true,
      data: updatedUser,
    };
  } catch (error) {
    console.error('Error updating user:', error);
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Failed to update user.' })
    );
  }
});
