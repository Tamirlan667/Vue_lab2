<script setup>

import Popover from './components/PopoverReg.vue';
let menuToggle = ref(false);

const toggleMenu = () => {
  menuToggle.value = !menuToggle.value;
}
</script>
<template>
  <Head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Jersey+15&display=swap" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@300;400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Italianno&display=swap" rel="stylesheet" />
  </Head>
  <div>
    <NuxtLayout>
      <MainHeader :menuShow="menuToggle" @clicked="toggleMenu" />
      <MainMenu v-show="menuToggle" @clicked="toggleMenu"/>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<style>

</style>