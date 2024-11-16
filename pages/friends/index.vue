<script setup>
import { ref } from 'vue'

import userService from '~/services/userService';

const otherUser = useGotUser();
const currentUser = useCurrentUserStore();
const editMode = ref(false);

const friends = useState('friends',() => []);
const changedName = ref("");

const handleUnfollow = async (id) => {
    const updatedFriendsList = currentUser.currentUser?.friendsId.filter((friendId) => {
        return friendId !== id;
    });
    console.log("Updated list: ", updatedFriendsList);

    const operations = [
        {
            updateOne: {
                filter: { id: currentUser.currentUser.id },
                update: {
                    $set: {
                        friendsId: updatedFriendsList
                    }
                },
            },
        },
    ]

    await userService.bulkUpdate(operations,false);
    currentUser.setCurrentUser({
        ...currentUser.currentUser,
        friendsId: updatedFriendsList
    });
    friends = updatedFriendsList;
    console.log("Removed from the friends list!");
}

const toggleEditMode = () => {
  editMode.value = !editMode.value;
}

const handleRename = (userId) => {
  currentUser.setRenamedUser(userId,changedName);
  toggleEditMode();  
}

function getFriendName(friend) {
  return currentUser.renamedFriends[friend.id] || friend.username;
}

onMounted(async () => {
  friends.value = await userService.getFriends(currentUser.currentUser);
  console.log(friends.value);
});

</script>

<template>
  <div class="friends-page">
    <h1>My Friends</h1>
    <div class="friend-item" v-for="(friend, index) in friends" :key="index">
      <img :src="`/avatars/${friend.avatarPath}`" alt="Avatar" class="friend-avatar" />
      <div class="friend-info">
        <h2>{{ getFriendName(friend) }}</h2>
        <p>Activity: {{ dateToStrParser(friend.activity) }}</p>
      </div>
      <div class="friend-actions">
        <button class="unfollow-button" @click="handleUnfollow(friend.id)">UNFOLLOW</button>
        <button v-if="!editMode" class="rename-button" @click="toggleEditMode">RENAME</button>
        <input v-else type="text" :placeholder="friend.username" v-model="changedName" @keyup.enter="handleRename(friend.id)">
        <button class="chat-button">CHAT</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.friends-page {
  background: linear-gradient(180deg, #76C5E7 0%, #FBF3F3 100%);
  height: 100vh;
  padding: 20px;
  margin: auto;
  text-align: left;
}

h1 {
  text-align: right;
  font-size: 2.5em;
  color: #333;

  font-family: "Inknut Antiqua";
  font-weight: 400;
  line-height: 165.06px;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

.friend-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f0f0f0;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
}

.friend-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px;
}

.friend-info {
  flex-grow: 1;
}

.friend-info h2 {
  font-weight: bold;
  margin: 0;
}

.friend-info p {
  margin: 5px 0;
}

.friend-actions {
  display: flex;
  gap: 10px;
}

.unfollow-button {
  background-color: #ff4c4c;
  color: white;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.rename-button {
  background-color: #4ca0f9;
  color: white;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.chat-button {
  background-color: #32cd32;
  color: white;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
</style>