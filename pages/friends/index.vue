<script setup>
import { ref } from "vue";
import userService from "~/services/userService";
import { useRouter } from "vue-router";
import { blogReviews } from "@/stores/reviews";
const currentUser = useCurrentUserStore();
const friends = useState("friends", () => []);
const isUnfollowed = ref(false); // Добавляем состояние для отслеживания, скрыт ли пользователь
const changedName = ref(""); // Состояние для изменения имени
const editMode = ref(false); // Инициализация состояния для редактирования
// Функция обработки unfollow
const handleUnfollow = async (id) => {
  // Обновляем список друзей, исключив unfollowed пользователя
  const updatedFriendsList = currentUser.currentUser?.friendsId.filter(
    (friendId) => friendId !== id
  );

  console.log("Updated list: ", updatedFriendsList);

  // Обновление друзей в текущем пользовательском объекте
  const updatedFriends = await userService.getFriends(currentUser.currentUser);

  // Обновляем список друзей на фронтенде
  friends.value = updatedFriends.filter((friend) =>
    updatedFriendsList.includes(friend.id)
  );

  // Обновляем данные пользователя на сервере
  const operations = [
    {
      updateOne: {
        filter: { id: currentUser.currentUser.id },
        update: {
          $set: {
            friendsId: updatedFriendsList,
          },
        },
      },
    },
  ];

  await userService.bulkUpdate(operations, false);
  currentUser.setCurrentUser({
    ...currentUser.currentUser,
    friendsId: updatedFriendsList,
  });
  console.log("Removed from the friends list!");

  // Скрываем пользователя из списка на странице
  isUnfollowed.value = true;
};

const toggleEditMode = () => {
  editMode.value = !editMode.value; // Переключение состояния редактирования
};
const reviewsStore = blogReviews(); // Access the store instance
const handleRename = (userId) => {
  console.log("Entered name:", changedName.value); // Проверим, что имя обновляется
  try {
    reviewsStore.updateReviewerName({
      userId,
      newName: changedName.value.trim(),
      newSurname: "",
    });
    currentUser.setRenamedUser(userId, changedName);
    toggleEditMode(); // Закрываем редактирование
  } catch (error) {
    console.error("Error during rename:", error);
  }
};

function getFriendName(friend) {
  return currentUser.renamedFriends[friend.id] || friend.username;
}

const router = useRouter();

const navigateToChat = (userId) => {
  router.push(`/chat/${userId}`); // Переход по маршруту с передачей ID
};
onMounted(async () => {
  friends.value = await userService.getFriends(currentUser.currentUser);
  console.log(friends.value);
});
</script>

<template>
  <div class="friends-page">
    <h1>My Friends</h1>
    <div class="friend-item" v-for="(friend, index) in friends" :key="index">
      <img
        :src="`/avatars/${friend.avatarPath}`"
        alt="Avatar"
        class="friend-avatar"
      />
      <div class="friend-info">
        <h2>{{ getFriendName(friend) }}</h2>
        <p>
          Activity:
          {{
            friend.activity ? dateToStrParser(friend.activity) : "No activity"
          }}
        </p>
      </div>
      <div class="friend-actions">
        <button class="unfollow-button" @click="handleUnfollow(friend.id)">
          UNFOLLOW
        </button>
        <button v-if="!editMode" class="rename-button" @click="toggleEditMode">
          RENAME
        </button>
        <input
          v-else
          type="text"
          :placeholder="friend.username"
          v-model="changedName"
          @keyup.enter="handleRename(friend.id)"
        />
        <button class="chat-button" @click="navigateToChat(friend.id)">
          CHAT
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.friends-page {
  background: linear-gradient(180deg, #76c5e7 0%, #fbf3f3 100%);
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
