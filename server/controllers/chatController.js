// /server/controllers/chatController.js
import Chat from "../models/Chat.js";

// Функция для создания нового чата
const createChat = async () => {
  try {
    const newChat = new Chat({
      messages: [
        {
          content: "Hello, how are you?",
          sender: "User1",
        },
        {
          content: "I'm good, thanks!",
          sender: "User2",
        },
      ],
    });

    await newChat.save();
    console.log("Chat created:", newChat);
  } catch (error) {
    console.error("Error creating chat:", error);
  }
};

// Пример вызова функции
createChat();
