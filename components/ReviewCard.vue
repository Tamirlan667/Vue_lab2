<script setup>
import { defineEmits } from "vue";
import { dateToStrParser } from "@/utils/dateParser";

const clickEmit = defineEmits(["clicked"]);
const reviews = blogReviews();

const props = defineProps({
  id: Number,
  name: String,
  surname: String,
  date: Date,
  avatar: String,
  rating: Number,
  text: String,
  unqiuePeopleLiked: Number,
  editMode: Boolean,
});

const liked = () => {
  clickEmit("clicked", props.id);
};

const deleted = () => {
  reviews.deleteReview(props.id);
};

const redirectToUser = () => {
  if (props.id) navigateTo(`/users/${props.id}`);
};

const isClickable = ref(!!props.id);
</script>
<template>
  <div class="card-container">
    <div class="card-top">
      <div class="card-top__general-info">
        <p>{{ (name ?? "") + (surname ?? "") }}</p>
        <p>{{ dateToStrParser(date) }}</p>
      </div>
      <div class="card-top__rating">
        <p>Rating</p>
        <div class="card-top__rating-stars">
          <!-- First Star -->
          <img v-if="rating < 0.5" src="./../assets/star_empty.svg" />
          <img v-else-if="rating < 1" src="./../assets/star_half.svg" />
          <img v-else src="./../assets/star_solid.svg" />

          <!-- Second Star -->
          <img v-if="rating < 1.5" src="./../assets/star_empty.svg" />
          <img v-else-if="rating < 2" src="./../assets/star_half.svg" />
          <img v-else src="./../assets/star_solid.svg" />

          <!-- Third Star -->
          <img v-if="rating < 2.5" src="./../assets/star_empty.svg" />
          <img v-else-if="rating < 3" src="./../assets/star_half.svg" />
          <img v-else src="./../assets/star_solid.svg" />

          <!-- Fourth Star -->
          <img v-if="rating < 3.5" src="./../assets/star_empty.svg" />
          <img v-else-if="rating < 4" src="./../assets/star_half.svg" />
          <img v-else src="./../assets/star_solid.svg" />

          <!-- Fifth Star -->
          <img v-if="rating < 4.5" src="./../assets/star_empty.svg" />
          <img v-else-if="rating < 5" src="./../assets/star_half.svg" />
          <img v-else src="./../assets/star_solid.svg" />
        </div>
      </div>
      <div class="card-top__avatar">
        <img
          :src="`/avatars/${avatar}`"
          alt="Avatar"
          :class="{ pointer_cursor: isClickable }"
          @click="redirectToUser"
        />
      </div>
    </div>
    <div class="card-bottom">
      <p>{{ text }}</p>
      <input
        class="delete"
        v-if="editMode"
        type="button"
        value="DELETE"
        @click="deleted"
      />
      <input v-else type="button" value="LIKE" @click="liked" />
    </div>
  </div>
</template>
<style scoped>
.card-container {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background: rgba(91, 185, 205, 1);
  border-radius: 10px;
  padding: 5px;
  height: 170px;
}

.card-container p {
  color: rgba(255, 255, 255, 1);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 99%;
}

.card-top__general-info {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  height: 69px;
  min-width: 110px;
  padding: 5px;
  border-radius: 10px;
  background: rgba(255, 255, 245, 0.15);
}

.card-top__general-info p {
  font-family: "Jersey 15";
  font-size: 20px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
}

.card-top__rating {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  margin-left: 30px;
  margin-top: 10px;
  height: 59px;
}

.card-top__rating p {
  font-family: "Jersey 15";
  font-size: 20px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
}

.card-top__rating-stars {
  display: flex;
  gap: 10px;
  align-items: center;
}

.card-top__avatar {
}

.pointer_cursor {
  cursor: pointer;
}

.card-bottom {
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 99%;
}

.card-bottom p {
  font-family: "Jersey 15";
  font-size: 20px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
}

.card-bottom input {
  display: flex;
  justify-content: center;
  align-items: center;

  justify-self: end;
  align-self: flex-end;
  background: rgba(67, 239, 39, 1);
  width: 70px;
  height: 25px;
  font-family: "Jersey 15";
  font-size: 20px;
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  border: none;
  cursor: pointer;
}

.card-bottom .delete {
  display: flex;
  justify-content: center;
  align-items: center;

  justify-self: end;
  align-self: flex-end;
  background: rgba(67, 239, 39, 1);
  width: 70px;
  height: 25px;
  font-family: "Jersey 15";
  font-size: 20px;
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background: #ef2757;
}
</style>
