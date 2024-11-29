<script setup>
const props = defineProps({
  user: Object,
});
</script>
<template>
  <div class="card-top__rating">
    <p>Current rating:</p>
    <div class="card-top__rating-stars">
      <!-- First Star -->
      <img v-if="props.user.rating < 0.5" src="./../assets/star_empty.svg" />
      <img v-else-if="props.user.rating < 1" src="./../assets/star_half.svg" />
      <img v-else src="./../assets/star_solid.svg" />

      <!-- Second Star -->
      <img v-if="props.user.rating < 1.5" src="./../assets/star_empty.svg" />
      <img v-else-if="props.user.rating < 2" src="./../assets/star_half.svg" />
      <img v-else src="./../assets/star_solid.svg" />

      <!-- Third Star -->
      <img v-if="props.user.rating < 2.5" src="./../assets/star_empty.svg" />
      <img v-else-if="props.user.rating < 3" src="./../assets/star_half.svg" />
      <img v-else src="./../assets/star_solid.svg" />

      <!-- Fourth Star -->
      <img v-if="props.user.rating < 3.5" src="./../assets/star_empty.svg" />
      <img v-else-if="props.user.rating < 4" src="./../assets/star_half.svg" />
      <img v-else src="./../assets/star_solid.svg" />

      <!-- Fifth Star -->
      <img v-if="props.user.rating < 4.5" src="./../assets/star_empty.svg" />
      <img v-else-if="props.user.rating < 5" src="./../assets/star_half.svg" />
      <img v-else src="./../assets/star_solid.svg" />
    </div>
  </div>
</template>
<style scoped>
.card-top__rating {
  display: flex;
  justify-content: space-between;
  align-items: start;
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
  margin-left: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.card-top__rating-stars img {
  width: 25px;
}
</style>
