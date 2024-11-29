<script setup>
import { defineEmits, defineProps, ref } from "vue";
import PopoverLogin from "./PopoverLogin.vue";

const menuClicked = defineEmits(["clicked"]);
const props = defineProps({
  menuShow: Boolean,
});
const user = useCurrentUserStore();
const toggleMenu = ref(props.menuShow);

const menuClick = () => {
  menuClicked("clicked", !toggleMenu.value);
};

const profileIconClick = () => {
  popupShow.value = !popupShow.value;
};

const popoverLoginToggle = () => {
  popupShow.value = false;
  popoverLoginShow.value = !popoverLoginShow.value;
};

const navigateAndClose = (endPoint) => {
  popupShow.value = false;
  navigateTo(`/${endPoint}`);
};

const logout = () => {
  navigateAndClose("");
  user.logout();
  window.location.reload();
};

const popoverLoginShow = ref(false);
const popupShow = ref(false);
</script>
<template>
  <header>
    <div class="menu_icon_container">
      <img
        src="../assets/menu.png"
        width="35px"
        height="35px"
        @click="menuClick"
      />
    </div>
    <div class="content_text">
      <p>New trips on Fall season! Full details on our Instagram accounts.</p>
    </div>
    <div class="profile_icon_container">
      <img
        src="../assets/profile.png"
        width="35px"
        height="35px"
        @click="profileIconClick"
      />
    </div>
  </header>
  <Popup :visible="popupShow">
    <template v-if="user.currentUser">
      <button><NuxtLink to="/profile">MY PROFILE</NuxtLink></button>
      <button><a @click="navigateAndClose('friends')">FAVORITES</a></button>
      <button @click="logout"><a>LOG OUT</a></button>
    </template>
    <template v-else>
      <button @click="popoverLoginToggle"><a>LOGIN</a></button>
      <button><a @click="navigateAndClose('register')">REGISTER</a></button>
    </template>
  </Popup>
  <PopoverLogin
    :showPopover="popoverLoginShow"
    @clickClose="popoverLoginToggle"
  />
</template>
<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10%;
  max-width: 100vw;
  overflow-x: hidden;
  background: rgba(255, 255, 255, 0.74);
  height: 60px;
  gap: 15px;
}

button {
  padding: 10px 0px;
  cursor: pointer;
  background-color: #7eefff;
  border: 1px solid #000000;
}

button a {
  text-decoration: none;
  font-family: Inknut Antiqua;
  font-size: 20px;
  font-weight: 700;
  line-height: 43.84px;
  color: #ffffff;
  -webkit-text-stroke: 1px rgba(0, 0, 0, 0.7);
  text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.5), 1px -1px 0 rgba(0, 0, 0, 0.5),
    -1px 1px 0 rgba(0, 0, 0, 0.5), 1px 1px 0 rgba(0, 0, 0, 0.5);
}

.menu_icon_container {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgb(0, 0, 0);
  width: 50px;
  height: 50px;
}

.menu_icon_container img {
  cursor: pointer;
}

.profile_icon_container {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(126, 239, 255, 1);
  width: 50px;
  height: 50px;
}

.content_text {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    90deg,
    #e5f67c 0%,
    #ecef64 33%,
    #d2e037 66%,
    #eaee3a 100%
  );

  height: 75%;
  width: 90%;
  border-radius: 10px;
  padding: 0 0px;
}

.content_text p {
  background: linear-gradient(90deg, #ffadad 0%, #ff774c 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: "Inknut Antiqua";
  font-size: 17px;
  font-weight: 400;
  line-height: 43.84px;
  text-align: left;
}
</style>
