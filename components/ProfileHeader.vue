<script setup>
import ProfileInfo from "./ProfileInfo.vue";
const props = defineProps({
  title: String,
  user: Object,
  editMode: Boolean,
});

// fields
const age = ref(props.user.age);
const location = ref(props.user.location);
const dataHolder = useDataHolder();
const currentUser = useCurrentUserStore();

const changedFields = computed(() => ({
  age: age.value,
  location: location.value,
}));

const saveChanges = async (changes) => {
  console.log("Changes to be saved: ", changes);
  const operations = [
    {
      updateOne: {
        filter: { id: currentUser.currentUser.id },
        update: { $set: changes },
      },
    },
  ];

  try {
    const response = await fetch("/api/users/bulkUpdate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(operations),
    });

    const res = await response.json();

    console.log("result: ", res);
    if (res.success) {
      console.log("Bulk update successful:", res.result);
      currentUser.setCurrentUser({
        ...currentUser.currentUser,
        ...changes,
      });
      alert("Changes saved!");
      switchEditMode();
    } else {
      console.error("Bulk update failed:", res.error, res.message);
    }
  } catch (e) {
    console.error("Network error:", e);
  }
};

watch(
  () => props.editMode,
  (newVal) => {
    if (newVal) {
      return;
    } else {
      console.log(changedFields.value.age !== props.user.age);
      console.log(changedFields.value.location !== props.user.location);
      if (
        changedFields.value.age !== props.user.age ||
        changedFields.value.location !== props.user.location
      ) {
        saveChanges(changedFields.value);
      }
    }
  }
);

dataHolder.addData({ changedFields: changedFields.value });

console.log("User from ProfileHeader: ", props.user);
</script>
<template>
  <div class="profile-header">
    <h1>{{ props.title }}</h1>
    <div class="profile-info">
      <div class="profile-avatar-container">
        <img
          :src="`/avatars/${props.user?.avatarPath}`"
          alt="Profile Avatar"
          class="profile-avatar"
        />
      </div>
      <div class="profile-details">
        <template v-if="props.editMode">
          <h2>{{ props.user?.username }}</h2>
          <span>Age:</span
          ><input type="text" v-model="age" :placeholder="props.user?.age" />
          <input
            type="text"
            v-model="location"
            :placeholder="props.user?.location"
          />
        </template>
        <template v-else>
          <h2>{{ props.user?.username }}</h2>
          <p>Age: {{ props.user?.age }}</p>
          <p>{{ props.user?.location }}</p>
        </template>
        <p>Activity: {{ dateToStrParser(props.user?.activity) }}</p>
        <ProfileInfo :user="user" />
      </div>
      <div class="buttons">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style scoped>
.profile-header {
  width: 100%;
  height: 50%;
  text-align: right;
}

.profile-header {
  font-family: "Inknut Antiqua";
  font-size: 2rem;
  font-weight: 400;
  line-height: 165.06px;
  text-align: right;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

.profile-details {
  display: flex;
  flex-flow: column;
  max-height: 30vh;
  font-family: Inknut Antiqua;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 41.26px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  gap: 15px;
}

.profile-details input {
  background: #45d2ff;
  border: none;
  padding: 10px 15px;
}

.profile-avatar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
}

.profile-info {
  display: flex;
  gap: 7vw;
}

.profile-avatar {
  width: 100%;
}

.buttons {
  width: 20%;
  height: 30px;
}
</style>
