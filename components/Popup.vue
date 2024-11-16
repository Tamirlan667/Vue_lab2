<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  visible: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
    <div class="popup-menu" v-if="visible">
      <div class="popup-content">
        <slot>
          <button v-for="(item, index) in items" :key="index" @click="item.action">
            {{ item.label }}
          </button>
        </slot>
      </div>
    </div>
  </template>
  
  <style scoped>
  .popup-menu {
    position: absolute;
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    z-index: 1000;
  }
  
  .popup-content{
    display: flex;
    flex-flow: column;
    width: 200px;
    height: auto
  }

  .popup-content button {
    display: block;
    width: 100%;
    height: 0px;
    padding: 20px;
    background-color: #f9f9f9;
    border: none;
    text-align: left;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 5px;
    border-radius: 5px;
    transition: background-color 0.2s ease;
  }
  
  .popup-content button:hover {
    background-color: #eaeaea;
  }
  </style>
  