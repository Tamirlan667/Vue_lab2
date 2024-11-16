const baseUrl = "http://localhost:3000/api/users";

/**
 * Service to handle user-related CRUD operations
 */
const userService = {
  /**
   * Create a new user or multiple users
   * @param {Object|Array} userData - Single user object or array of users
   * @returns {Promise<Object>} Response from the server
   */
  create: async (userData) => {
    try {
      const { data, error } = await fetch(`${baseUrl}/create`, {
        method: "POST",
        body: userData,
      });
      if (error.value) throw error.value;
      return data.value;
    } catch (err) {
      console.error("Error creating user(s):", err);
      throw err;
    }
  },

  /**
   * Read a single user by ID
   * @param {String} id - User ID
   * @returns {Promise<Object>} User data
   */
  readById: async (id) => {
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const res = await response.json();

      if (!res.success) {
        throw new Error(res.message || "Failed to fetch user.");
      }

      console.log(res.data);
      return res.data; // Return the `data` field containing the user
    } catch (err) {
      console.error("Error fetching user:", err);
      throw err;
    }
  },

  /**
   * Read all users
   * @returns {Promise<Array>} Array of user objects
   */
  readAll: async () => {
    try {
      const response = await fetch(`${baseUrl}/read`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const res = await response.json();

      if (!res.success) {
        throw new Error(res.message || "Failed to fetch users.");
      }

      console.log(res.data);
      return res.data; // Return the `data` field containing the users
    } catch (err) {
      console.error("Error fetching users:", err);
      throw err;
    }
  },

  /**
   * Update users in bulk
   * @param {Array} operations - Bulk update operations
   * @returns {Promise<Object>} Response from the server
   */
  bulkUpdate: async (
    operations,
    showAlert = true,
    successMessage = "Changes saved!"
  ) => {
    try {
      const response = await fetch(`${baseUrl}/bulkUpdate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(operations),
      });

      const res = await response.json();

      console.log("result: ", res);
      if (res.success) {
        console.log("Bulk update successful:", res.result);
        showAlert && alert(successMessage);
      } else {
        console.error("Bulk update failed:", res.error, res.message);
      }
    } catch (e) {
      console.error("Network error:", e);
    }
  },

  /**
   * Delete a user by ID
   * @param {String} id - User ID
   * @returns {Promise<Object>} Response from the server
   */
  delete: async (id) => {
    try {
      const { data, error } = await fetch(`${baseUrl}/delete`, {
        method: "POST",
        body: { id },
      });
      if (error.value) throw error.value;
      return data.value;
    } catch (err) {
      console.error("Error deleting user:", err);
      throw err;
    }
  },

  /**
   * @param {Object} currentUser
   * @returns {Array<Object>}
   */

  // Get the current user's friends as an array of objects
  getFriends: async (currentUser) => {
    try {
        
      // Fetch all users
      const users = await userService.readAll();

      // Filter users whose IDs are in currentUser.friendsId
      const friends = users.filter((user) =>
        currentUser.friendsId.includes(user.id)
      );

      return friends; // Return the array of friend objects
    } catch (err) {
      console.error("Error fetching friends:", err);
      throw err;
    }
  },
};

export default userService;
