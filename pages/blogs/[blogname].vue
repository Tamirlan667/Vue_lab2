<script setup>
import BlogInfo from '@/components/BlogInfo.vue';

</script>
<template>
    <div class="blog-info">
        <BlogInfo>
            <template #general-info>
                <p>Name: {{ $route.params.blogname }} </p>
            </template>
            <template #details-info>
                <p>There are no posts yet!</p>
            </template>
        </BlogInfo>
    </div>
</template>
<style scoped>
.blog-info {
    font-family: "Jersey 15";
    font-size: 36px;
    margin-top: 70px;
}
</style>

<!-- password for mongoDB: JzZpVhASp7eePSRH -->