import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCurrentUserStore = defineStore("userStore", () => {
  let currentUser = ref(null);
  // Use an object to map friend IDs to their renamed names
  let renamedFriends = ref({}); 

  if (import.meta.client) {
    const storeUser = localStorage.getItem("currentUser");
    const storeRenamedFriends = localStorage.getItem("renamedUsers");

    if (storeUser) {
      currentUser.value = JSON.parse(storeUser);
    }
    if (storeRenamedFriends) {
      renamedFriends.value = JSON.parse(storeRenamedFriends);
    }
  }

  function setCurrentUser(user) {
    currentUser.value = user;
    if (import.meta.client) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    }
  }

  /**
   * Sets the renamed name for a friend.
   * @param {string|number} friendId - The ID of the friend.
   * @param {string} newName - The new name for the friend.
   */
  function setRenamedUser(friendId, newName) {
    // Update the renamedFriends object
    renamedFriends.value = {
      ...renamedFriends.value,
      [friendId]: newName,
    };

    // Save to localStorage
    if (import.meta.client) {
      localStorage.setItem('renamedUsers', JSON.stringify(renamedFriends.value));
    }
  }

  function logout() {
    currentUser.value = null;
    renamedFriends.value = {};

    if (import.meta.client) {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("renamedUsers");
    }
  }

  return { currentUser, setCurrentUser, logout, renamedFriends, setRenamedUser };
});
