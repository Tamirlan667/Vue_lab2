<script setup>
import { ref, watch, onUnmounted } from 'vue';

const props = defineProps({
    showPop: Boolean,
});

const emit = defineEmits(['clicked', 'clickedClose']);
const emailConfirmed = ref(false);

const createUser = () => {
    if (!emailConfirmed.value) {
        alert('Confirm the email first!');
        return;
    }
    emit('clicked');
};

const closePopup = () => {
    emit('clickedClose');
};

const confirmEmail = () => {
    emailConfirmed.value = true;
};

// Function to handle clicks outside the popup content
const handleClickOutside = (event) => {
    const popupContent = document.querySelector('.popup-content-container');
    if (popupContent && !popupContent.contains(event.target)) {
        closePopup();
    }
};

// Watcher on the showPop prop
watch(
    () => props.showPop,
    (newVal) => {
        if (newVal) {
            // When showPop becomes true, add the event listener
            document.addEventListener('click', handleClickOutside);
        } else {
            // When showPop becomes false, remove the event listener
            document.removeEventListener('click', handleClickOutside);
        }
    }
);

// Clean up the event listener when the component is unmounted
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>


<template>
    <div class="popover-container">
        <div v-if="showPop" class="popup-overlay">
            <div class="popup-content-container">
                <div class="popup-content">
                    <h2 class="popup-header">TO CREATE ACCOUNT DO NEXT STEPS</h2>
                    <div class="popup-body">
                        <div class="fields-container">
                            <div class="field-container">
                                <label class="label">CONFIRM YOUR EMAIL</label>
                                <button class="confirm-button" v-if="!emailConfirmed" @click="confirmEmail">
                                    CLICK TO CONFIRM
                                </button>
                                <p v-else>Confirmed!</p>
                            </div>
                            <div class="field-container">
                                <label class="label">ENTER THE SECRET PHRASE</label>
                                <input type="password" class="secret-phrase-input" placeholder="************" />
                            </div>
                        </div>
                        <button class="create-user-button" @click="createUser">
                            CREATE USER
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.popover-container {
    width: 100%;
    height: 100vh;

}

.popup-content-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 85vw;
    height: 85vh;
    background: linear-gradient(to bottom, #a8e7e7, #7fe2d4);
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}

.popup-overlay {
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

.popup-content {
    display: flex;
    flex-flow: column;
    width: 85%;
    height: 100%;
    gap: 10%;
}

.popup-header {
    font-size: 1.2em;
    margin-bottom: 20px;
    font-weight: bold;
    color: #333;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px 10px;
    font-family: 'Inknut Antiqua';
    width: 70%;
    align-self: center;
}

.popup-body {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 100px;
}

.fields-container {
    display: flex;
    flex-flow: column;
    width: 80%;
    gap: 25px;
}

.field-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5%;
}

.field-container p {
    font-size: 1.5rem;
    text-align: center;
}

.confirm-button,
.secret-phrase-input {
    flex: 1;
}

.label {
    flex: 1;
    font-size: 1.1em;
    font-weight: bold;
    color: #333;
    font-family: 'Inknut Antiqua';
    text-align: left;
}

.confirm-button {
    background-color: #d1ff5a;
    color: black;
    font-weight: bold;
    padding: 8px;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    font-size: 1.1em;
    font-family: 'Inknut Antiqua';
}

.secret-phrase-input {
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1.5rem;
    height: 55px;
}

.create-user-button {
    width: 30%;
    background-color: #4ca0f9;
    color: white;
    font-weight: bold;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    font-size: 1.5rem;
    font-family: 'Inknut Antiqua';
}
</style>
