<script setup>

import ProfileHeader from '~/components/ProfileHeader.vue';
import ProfilePosts from '~/components/ProfilePosts.vue';
import ReviewCard from '~/components/ReviewCard.vue';

const currentUser = useCurrentUserStore();
const editMode = ref(false);
const currChanges = ref({});

const isOtherUserProfile = computed(() => {
    const router = useRoute();

    return router.params.id === currentUser.id;
});

const switchEditMode = () => {
    editMode.value = !editMode.value;
}

const handleFriends = () => {
    navigateTo('/friends');
}

</script>

<template>
    <div class="profile-page">
        <div class="profile-container">
            <ProfileHeader :user="currentUser.currentUser" title="My Profile" :edit-mode="editMode">
                <div class="profile-actions">
                    <button class="action-button">Statistic</button>
                    <button class="action-button" @click="handleFriends">FRIENDS</button>
                    <button v-if="editMode" class="action-button" @click="switchEditMode">SAVE</button>
                    <button v-else class="action-button" @click="switchEditMode">Edit</button>
                </div>
            </ProfileHeader>
            <div class="posts-container">
                <ProfilePosts :user="currentUser.currentUser" :edit-mode="true"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile-page {
    display: flex;
    justify-content: center;
    background: linear-gradient(180deg, #76C5E7 0%, #FBF3F3 100%);
    padding: 20px;
    width: 100%;
    height: 100vh;
    margin: auto;
}

.profile-container {
    position: relative;
    display: flex;
    flex-flow: column;
    width: 70%;
    height: 100vh;
}

.profile-header h1 {
    text-align: right;
    font-size: 2.5em;
    color: #333;
    margin-bottom: 20px;
}

.profile-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.info-box {
    background-color: #4ca0f9;
    color: white;
    padding: 5px;
    border-radius: 5px;
    font-weight: bold;
}

.activity {
    color: #00ff00;
}

.rating-stars {
    color: #ffd700;
}

.profile-actions {
    display: flex;
    flex-direction: column;
    text-align: right;
    gap: 15px;
}

.action-button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 80px;
    background: #6BEBFC;
    color: black;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    border: none;

    font-family: "Inknut Antiqua";
    font-size: 2rem;
    font-weight: 400;
    line-height: 82.53px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
}

.latest-posts {
    margin-top: 20px;
}

.posts-container {
    margin-top: 1%;
}
</style>