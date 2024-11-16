// server/api/users/updateMany.js
import { connectToDatabase } from '../../db/connect.js';
import User from '../../db/models/User.js';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { filter, updateData } = body;

  try {
    await connectToDatabase();

    const result = await User.updateMany(filter, updateData);

    return {
      success: true,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    };
  } catch (error) {
    console.error('Error updating users:', error);
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Failed to update users.' })
    );
  }
});
