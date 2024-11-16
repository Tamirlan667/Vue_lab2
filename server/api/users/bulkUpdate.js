// server/api/users/bulkUpdate.js
import { connectToDatabase } from '../../db/connect.js';
import User from '../../db/models/User.js';

export default defineEventHandler(async (event) => {
  const operations = await readBody(event);

  try {
    await connectToDatabase();

    const result = await User.bulkWrite(operations);

    // Check if any documents were modified or matched
    if (result.modifiedCount > 0 || result.matchedCount > 0) {
      return {
        success: true,
        result,
      };
    } else {
      // No documents were modified or matched
      return {
        success: false,
        message: 'No documents were modified.',
      };
    }
  } catch (error) {
    console.error('Error performing bulk update:', error);
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Bulk update failed.' })
    );
  }
});
