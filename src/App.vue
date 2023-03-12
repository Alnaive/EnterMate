<script setup>
import { useDark, useToggle } from '@vueuse/core';
import { RouterLink, RouterView } from 'vue-router'
import { Icon } from '@iconify/vue';
import BottomNav from './components/BottomNav.vue';
import Navbar from './components/Navbar.vue';

const isDark = useDark();
const toggleDark = useToggle(isDark);



</script>

<template>
<div class="min-h-screen bg-white dark:bg-gray-800">
  <Navbar/>

  <!-- <BottomNav/> -->
  <div  class=" h-auto ">
        <RouterView />
  </div>
</div>
</template>

