<script setup>
import { ref } from 'vue';
import userService from '~/services/userService';

const emit = defineEmits(['clickClose']);

const props = defineProps({
    showPopover: Boolean,
});

const username = ref('');
const password = ref('');
const currentUser = useCurrentUserStore(); // Adjust if you have a store

const email = ref('');
const forgotPassword = ref(false);
const verified = ref(false);

const forgotPasswordToggle = () => {
    forgotPassword.value = !forgotPassword.value;
}

const sendActivityChange = async () => {
  const currentTime = new Date().toISOString(); // Get current time in ISO format

  const operations = [
    {
      updateOne: {
        filter: { id: currentUser.currentUser.id },
        update: {
          $set: {
            activity: currentTime,
          },
        },
      },
    },
  ];

  try {
    await userService.bulkUpdate(operations, false);
    // Update the local currentUser store
    currentUser.setCurrentUser({
      ...currentUser.currentUser,
      activity: currentTime,
    });
    console.log('User activity updated!');
  } catch (error) {
    console.error('Error updating user activity:', error);
  }
};


const handleLogin = async () => {
    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username.value, password: password.value }),
        });

        const result = await response.json();

        if (result.success) {
            // Save user data to the store or handle it as needed
            currentUser.setCurrentUser(result.data); // If using a store
            alert('Login successful!');
            navigateTo(`/profile`);
            verified.value = false;
            forgotPasswordToggle();
            await sendActivityChange();
            closeLogin();
            // Redirect or update UI as needed
        } else {
            alert('Invalid username or password.');
        }
    } catch (err) {
        console.error('Network error during login:', err);
        alert('Network error. Please try again later.');
    }
};

const closeLogin = () => {
    emit('clickClose');
};

const handleCheckEmail = async () => {
    const users = await userService.readAll();
    for(const user of users){
        if(user?.email === email.value && user?.username === username.value){
            password.value = user?.password;
            verified.value = true;
        }else if(user?.email === email.value && user?.username !== username.value){
            alert("Email and username doesn't match!");
        }
    }

    if(!verified.value){
        alert("Please try again.")
    }
}

</script>


<template>
    <div v-if="showPopover" class="login-overlay" @click="closeLogin">
        <div class="login-popup" @click.stop>
            <div class="login-popup-container">
                <h2 class="login-header">LOGIN</h2>
                <div class="login-form">
                    <label class="login-label">ENTER USERNAME</label>
                    <input type="text" class="login-input" placeholder="Username" v-model="username" />

                    <label class="login-label">ENTER PASSWORD</label>
                    <input type="password" class="login-input" placeholder="Password" v-model="password" />

                    <a v-if="!forgotPassword" href="#" class="forgot-password" @click="forgotPasswordToggle">FORGOT PASSWORD?</a>
                    <div v-else>
                        <label>Enter your email you've registered the account and press enter to submit:</label>
                        <input type="text" placeholder="user@gmail.com" v-model="email"
                         @keyup.enter="handleCheckEmail"
                        />
                        <p v-if="verified" :style="{color:'green'}">Verified! Please click authorize</p>
                    </div>
                    <button class="authorize-button" @click="handleLogin">
                        AUTHORIZE
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.login-popup {
    width: 50%;
    height: 70%;
    background-color: #f0f0f0;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}

.login-popup-container {
    position: relative;
    display: flex;
    flex-flow: column;
    width: 100%;
}

.login-header {
    background-color: #4ca0f9;
    color: white;
    font-size: 1.5em;
    margin: 0;
    padding: 10px 0;
    border-radius: 10px 10px 0 0;

    font-family: Inknut Antiqua;
    font-weight: 800;
    line-height: 43.84px;
    letter-spacing: 0.58em;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
}

.login-form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 80%;
    align-self: center;
}

.login-label {
    font-family: Inknut Antiqua;
    font-size: 1.1rem;
    font-weight: 800;
    line-height: 43.84px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
}

.login-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: Inknut Antiqua;
    font-size: 17px;
    font-weight: 800;
    line-height: 43.84px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
}

.forgot-password {
    font-size: 0.9em;
    color: #333;
    text-decoration: underline;
    cursor: pointer;
}

.authorize-button {
    text-align: center;
    background-color: #32cd32;
    color: black;
    font-weight: bold;
    padding: 15px;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    font-size: 1.1em;
    font-family: Jersey 15;
    line-height: 20px;
    letter-spacing: 0.5em;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    margin-top: 50px;
}
</style>
