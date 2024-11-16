// server/api/users/login.js
import { connectToDatabase } from '../../db/connect.js';
import User from '../../db/models/User.js';

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Read the request body
  const { username, password } = body;

  try {
    await connectToDatabase();

    // Find the user by username and password
    const user = await User.findOne({ username, password });

    if (!user) {
      return {
        success: false,
        error: 'Invalid username or password.',
      };
    }

    // Authentication successful
    // Return user data (you may exclude sensitive fields if desired)
    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error('Error during login:', error);
    return {
      success: false,
      error: 'Server error during login.',
    };
  }
});
