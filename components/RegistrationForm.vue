<script setup>
import { ref, reactive } from "vue";
import { generateUUID } from "./../utils/idGenerator.js";

// Store
const currentUser = useCurrentUserStore();

// Reactive variables
const popupShow = ref(false);
const savedUser = ref({});

// Form data
const formData = reactive({
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
});

// Functions
const togglePopover = () => {
  popupShow.value = !popupShow.value;
};

const handleConfirmedUserCreate = async () => {
  try {
    const response = await fetch("/api/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(savedUser.value),
    });

    const result = await response.json();

    if (result.success) {
      currentUser.setCurrentUser(savedUser.value);
      alert("User created!");
      togglePopover();
      navigateTo(`/profile`);
    } else {
      console.error("Error creating user:", result.error);
    }
  } catch (err) {
    console.error("Network error:", err);
  }
};

const handleSubmit = async () => {
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords don't match!");
    return;
  }
  if (!formData.email || !formData.username || !formData.password) {
    alert("Please, fill all the fields!");
    return;
  }

  savedUser.value = {
    id: generateUUID(),
    name: "",
    surname: "",
    username: formData.username,
    password: formData.password,
    email: formData.email,
    age: 0,
    avatarPath: "profile_man_1.png",
    location: "Missouri, USA",
    activity: new Date(),
    followersId: [],
    friendsId: [],
    postsId: [],
    chatsId: [],
    rating: 0,
  };

  togglePopover();
};
</script>

<template>
  <div class="registration-container">
    <form @submit.prevent="handleSubmit" class="form-container">
      <div class="registration-form">
        <div class="tabs"><span>PROFILE</span> | <span>REGISTRATION</span></div>
        <label>Enter your email</label>
        <input
          type="email"
          v-model="formData.email"
          placeholder="user@example.com"
        />

        <label>Create username</label>
        <input type="text" v-model="formData.username" placeholder="user" />

        <label>Create password</label>
        <input
          type="password"
          v-model="formData.password"
          placeholder="********"
        />

        <label>Confirm password</label>
        <input
          type="password"
          v-model="formData.confirmPassword"
          placeholder="********"
        />
      </div>
      <button type="submit" class="button">CREATE USER</button>
    </form>
    <PopoverReg
      :showPop="popupShow"
      @clicked="handleConfirmedUserCreate"
      @clickedClose="togglePopover"
    />
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 50px;
  gap: 10%;
}

/* General container styling */
.registration-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(180deg, #76c5e7 0%, #fbf3f3 100%);
  height: 100vh;
}

/* Tabs styling */
.tabs {
  display: flex;
  gap: 10px;
  font-weight: bold;
  color: #ffffff;
  background-color: #5ee4e4;
  padding: 20px 30px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

/* Form styling */
.registration-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
}

.registration-form label {
  font-weight: bold;
  color: #ffffff;
  font-family: "Inknut Antiqua";
}

.registration-form input {
  padding: 10px 10px;
  border: none;
  border-radius: 20px;
  background: #74f0f0;
  color: #ffffff;
  font-weight: bold;
  text-align: left;
  font-size: 0.8rem;
  font-family: "Inknut Antiqua";
}

.registration-form input::placeholder {
  color: #ffffff;
  opacity: 0.5;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 50px;
  padding: 10px;
  background: #49f364;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-family: Inknut Antiqua;
  font-size: 17px;
  font-weight: 700;
  line-height: 43.84px;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 36%;
}

.registration-form button:hover {
  background-color: #28c58a;
}
</style>
