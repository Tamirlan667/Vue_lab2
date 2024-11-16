// server/api/users/create.js
import { connectToDatabase } from '../../db/connect.js';
import User from '../../db/models/User.js';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    await connectToDatabase();

    let result;

    if (Array.isArray(body)) {
      // If body is an array, perform bulk insert
      result = await User.insertMany(body);
    } else {
      // Single document insert
      const newUser = new User(body);
      result = await newUser.save();
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('Error creating user(s):', error);
    return {
      success: false,
      error: 'Failed to create user(s).',
    };
  }
});
