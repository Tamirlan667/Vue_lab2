<script setup>
import { ref, onMounted } from "vue";
import { createOrGetChat, fetchMessages } from "~/services/chatService";
import {
  joinChat,
  sendMessageToSocket,
  onNewMessage,
} from "~/services/socketService";

const chatId = ref(null);
const messages = ref([]);
const newMessage = ref("");

onMounted(async () => {
  const { chat } = await createOrGetChat(currentUser.id, friendId); // Укажите friendId
  chatId.value = chat._id;

  joinChat(chatId.value);

  const { messages: chatMessages } = await fetchMessages(chatId.value);
  messages.value = chatMessages;

  onNewMessage((message) => {
    messages.value.push(message);
  });
});

const sendMessage = () => {
  if (newMessage.value.trim() !== "") {
    sendMessageToSocket(chatId.value, currentUser.id, newMessage.value);
    newMessage.value = "";
  }
};
</script>

<template>
  <div class="chat">
    <div class="messages">
      <div v-for="msg in messages" :key="msg._id">
        <p>{{ msg.text }}</p>
      </div>
    </div>
    <input
      v-model="newMessage"
      @keyup.enter="sendMessage"
      placeholder="Type a message..."
    />
  </div>
</template>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 400px;
}
.messages {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
