<template>
  <div class="chat-container">
    <!-- Header -->

    <!-- Chat Display -->
    <div class="chat-box">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="message"
        :class="message.type"
      >
        <div v-if="message.type === 'bot'" class="avatar">
          <img
            v-if="containsOne"
            :src="profile_man_1"
            alt="User Avatar"
            class="avatar-image"
          />

          <!-- Else, use the dynamic image source -->
          <img
            v-else-if="containsTwo"
            :src="girl"
            alt="User Avatar"
            class="avatar-image"
          />
          <img
            v-else-if="containsTree"
            :src="female"
            alt="User Avatar"
            class="avatar-image"
          />
          <img v-else :src="boy" alt="User Avatar" class="avatar-image" />
        </div>
        <div class="content">
          <div class="sender">{{ message.sender }}</div>
          <div class="text">{{ message.text }}</div>
        </div>
      </div>
    </div>

    <!-- Input Section -->
    <div class="input-box">
      <input
        v-model="userInput"
        @keydown.enter="handleMessage"
        type="text"
        placeholder="Type your question..."
      />
      <button @click="handleMessage">Send</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useAllUsers } from "@/stores/allUsers";
import profile_man_1 from "./profile_man_1.png";
import girl from "./girl.png";
import boy from "./boy.png";
import female from "./female.png";
const user = useAllUsers();
const route = useRoute();

const userId = Number(route.params.id); // Convert to number
console.log(userId);

const userName = ref(user.getUser(userId)?.name || "Unknown User");
const userSurname = ref(user.getUser(userId)?.surname || "Unknown User");
const sender = `${userName.value} ${userSurname.value}`;
console.log(userName.value);
console.log(userName);
const getUserAvatar = ref(user.getUser(userId)?.avatarPath);
console.log(getUserAvatar);
const getUserImg = getUserAvatar.value.replace(".png", "");
const containsOne = getUserImg.includes("profile_man_1");
const containsTwo = getUserImg.includes("profile_woman_1");
const containsThree = getUserImg.includes("profile_woman_2.png");
console.log(containsOne);

const userInput = ref(""); // User's current input
const messages = ref([
  {
    sender: sender,
    text: "Hey! Thanks for following me!",
    type: "bot",
  },
]);

const handleMessage = () => {
  if (userInput.value.trim()) {
    // Add user's message
    messages.value.push({
      sender: "You",
      text: userInput.value,
      type: "user",
    });

    // Generate bot's response
    const botResponse = generateResponse(userInput.value);

    // Add bot's response
    messages.value.push({
      sender: sender,
      text: botResponse,
      type: "bot",
    });

    // Clear the input field
    userInput.value = "";
  }
};

const generateResponse = (input) => {
  // Basic logic for response (expand as needed)
  if (input.includes("Rick")) {
    return "No, he's not online. But, he is on my friends list.";
  } else if (input.toLowerCase().includes("hello")) {
    return "Hello! You're welcome!";
  } else {
    return "Sorry, I didn't understand that.";
  }
};
</script>
<style scoped>
.menu-icon,
.profile-icon {
  cursor: pointer;
}

/* Chat Container */
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Занимает всю высоту экрана */
  margin: 0;
  font-family: Arial, sans-serif;
  background: linear-gradient(180deg, #76c5e7 0%, #fbf3f3 100%);
  border: 1px solid #ccc;
}

/* Chat Box */
.chat-box {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: linear-gradient(180deg, #76c5e7 0%, #fbf3f3 100%);
  border-radius: 10px;
  max-height: calc(
    100vh - 120px
  ); /* Устанавливаем максимальную высоту для чата, чтобы не перекрывать header и input */
}

.message {
  display: flex;
  margin-bottom: 10px;
}

.message.bot {
  flex-direction: row;
}

.message.user {
  flex-direction: row-reverse;
}

.avatar {
  font-size: 24px;
  margin: 0 10px;
}

.content {
  max-width: 70%;
  background: white;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sender {
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 5px;
  color: #333;
}

.text {
  font-size: 14px;
  color: #444;
}

/* Input Section */
.input-box {
  display: flex;
  padding: 10px;
  background: #f0f9ff;
  border-top: 1px solid #ccc;
  margin-bottom: 10px;
}

input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 60px;
}

button {
  width: 80px;
  padding: 10px 15px;
  font-size: 16px;
  margin-left: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 60px;
}

button:hover {
  background-color: #0056b3;
}
</style>
