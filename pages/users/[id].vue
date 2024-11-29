<script setup>
import ProfileHeader from "~/components/ProfileHeader.vue";
import ProfilePosts from "~/components/ProfilePosts.vue";
import ReviewCard from "~/components/ReviewCard.vue";
import userService from "~/services/userService";

const currentUser = useCurrentUserStore();
const otherUser = useGotUser();
const editMode = ref(false);
const router = useRoute();

const getUser = async () => {
  try {
    if (otherUser.otherUser?.id === parseInt(router.params.id)) {
      console.log("Got the other user from localstorage!");
      return;
    }
    const response = await fetch(`/api/users/${router.params.id}`, {
      method: "GET",
    });

    const result = await response.json();

    if (result.success) {
      console.log("User found!", result.data);
      otherUser.setOtherUser(result.data);
    } else {
      console.error("User get failed!", result.event);
    }
  } catch (e) {
    console.error("Network error: ", e);
  }
};

getUser();

const switchEditMode = () => {
  editMode.value = !editMode.value;
};

const handleFollow = async () => {
  const operations = [
    {
      updateOne: {
        filter: { id: currentUser.currentUser.id },
        update: {
          $set: {
            friendsId: [
              ...currentUser.currentUser?.friendsId,
              otherUser.otherUser?.id,
            ],
          },
        },
      },
    },
  ];

  await userService.bulkUpdate(operations, false);
  currentUser.setCurrentUser({
    ...currentUser.currentUser,
    friendsId: [...currentUser.currentUser.friendsId, otherUser.otherUser.id],
  });
  console.log("Added to the friends list!");
};

const handleUnfollow = async () => {
  const updatedFriendsList = currentUser.currentUser?.friendsId.filter(
    (friendId) => {
      return friendId !== otherUser.otherUser?.id;
    }
  );
  console.log("Updated list: ", updatedFriendsList);

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
};

const handleFriends = () => {};

const handleChat = () => {};
</script>

<template>
  <div class="profile-page">
    <div class="profile-container">
      <ProfileHeader :user="otherUser.otherUser" title="Profile">
        <div class="profile-actions">
          <button
            v-if="
              currentUser.currentUser &&
              !currentUser.currentUser.friendsId.includes(
                otherUser.otherUser.id
              )
            "
            class="action-button"
            @click="handleFollow"
          >
            FOLLOW
          </button>
          <button
            v-else-if="
              currentUser.currentUser &&
              currentUser.currentUser.friendsId.includes(otherUser.otherUser.id)
            "
            class="action-button"
            @click="handleUnfollow"
          >
            FOLLOWING
          </button>
          <button class="action-button" @click="handleFriends">FRIENDS</button>
          <button
            v-if="currentUser.currentUser"
            class="action-button"
            @click="handleChat"
          >
            CHAT NOW
          </button>
        </div>
      </ProfileHeader>
      <div class="posts-container">
        <ProfilePosts :user="otherUser.otherUser" :edit-mode="false" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  display: flex;
  justify-content: center;
  background: linear-gradient(180deg, #76c5e7 0%, #fbf3f3 100%);
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
  background: #6bebfc;
  color: black;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;

  font-family: "Inknut Antiqua";
  font-size: 1.7rem;
  font-weight: 400;
  line-height: 82.53px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  text-wrap: nowrap;
}

.latest-posts {
  margin-top: 20px;
}

.posts-container {
  margin-top: 1%;
}
</style>
