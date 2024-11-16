<script setup>
import ReviewCard from './../components/ReviewCard.vue';
import { blogReviews } from '@/stores/reviews';
import { computed, ref } from 'vue';

const props = defineProps({
    user: Object,
    editMode: Boolean
})

const reviews = blogReviews();
let currentPage = ref(1);
let itemsPerPage = ref(2);
let reviewsArr = computed(() => reviews.filteredByUser(props.user)); // default
let maxPages = computed(() => Math.ceil(reviewsArr.value.length / itemsPerPage.value));

console.log(reviewsArr.value.length);

const nextPage = () => {
    if (currentPage.value === maxPages.value) currentPage.value = 1;
    else currentPage.value++;
}

const prevPage = () => {
    if(currentPage.value === 1) return;
    else currentPage.value--;
}

</script>
<template>
    <div class="posts-container">
        <h3>Latest posts</h3>
        <div class="cards">
            <div class="card"
                v-for="review in reviewsArr.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)"
                v-bind:key="review.id">
                <ReviewCard :id="review.id" :name="review.name" :surname="review.surname" :date="review.date"
                    :avatar="review.avatar" :rating="review.rating" :text="review.text" :edit-mode="props.editMode" @clicked=handleLikeClick />
            </div>
        </div>
        <div class="card-content__pages">
                    <p @click="prevPage">{{ '<' }}</p>
                    <p>{{ `${currentPage}/${maxPages}` }}</p>
                    <p @click="nextPage">{{ '>' }}</p>
        </div>
    </div>
</template>
<style scoped>
.posts-container {
    display: flex;
    flex-flow: column;
    gap: 15px
}

.posts-container h3 {
    font-family: "Inknut Antiqua";
    font-size: 14px;
    font-weight: 400;
    line-height: 36.11px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
}

.cards {
    display: flex;
    width: 100%;
    justify-content: space-around;
}

.card-content__pages {
    display: flex;
    gap: 10px;
    height: 10px;
    font-size: 1.5rem;

    align-self: self-end;
}

.card-content__pages p{
    cursor: pointer;
}
</style>