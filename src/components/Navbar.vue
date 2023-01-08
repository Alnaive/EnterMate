<template>
    <header class="sticky top-0">
    <div class="z-20 shadow-md text-black dark:text-white body-font bg-white dark:bg-slate-800">
          <div class="flex items-center justify-between">
            <div class="flex items-center ">
              <input type="checkbox" name="hamburger" id="hamburger" class="peer" hidden>
              <label for="hamburger" class="peer-checked:hamburger block relative z-20 p-6 -mr-6 cursor-pointer">
                <Icon icon="akar-icons:three-line-horizontal" width="32" height="32" />
              </label>
              <h1 class="ml-2">EnterMate</h1>
              <div class="peer-checked:translate-x-0 fixed inset-0 w-1/6 translate-x-[-100%] bg-gray-300 dark:bg-slate-800  shadow-xl transition duration-300 z-30">
                <div class="flex items-center">
                  <div class="flex items-center">
                    <input type="checkbox" name="hamburger" id="hamburger" class="peer" hidden>
                    <label for="hamburger" class="peer-checked:hamburger block relative z-30 p-6 cursor-pointer">
                      <Icon icon="akar-icons:three-line-horizontal" width="32" height="32" />
                    </label>
                    <h1 class="ml-2">EnterMate</h1>
                  </div>
                </div>
                <div class="overflow-auto">
                  <div class="flex flex-col px-6 space-y-4">
                    <div>Home</div>
                    <div>Circle</div>
                  </div>
                  <div class="w-auto h-1 bg-indigo-500 rounded mt-5 mb-4"></div>
                  <div class="absolute bottom-0 left-3 mt-2 mb-2">
                    <div class="text-center">©2023 EnterMate</div>
                  </div>
                </div>
              </div>
            </div>
            <nav class="absolute right-20 space-x-4 mr-auto">
            
            </nav>
            <div class="flex justify-center items-center absolute right-10">
              <button @click="toggleDark()" >
                <Icon icon="bi:moon-fill" width="24" height="24" v-if="isDark"/> 
                <Icon icon="akar-icons:sun-fill" width="28" height="28" v-else/>
              </button>
            </div>
          </div>
    </div>
  </header>
    <!-- <header class="sticky top-0 z-30 text-black dark:text-white body-font shadow-md bg-white dark:bg-slate-800 ">
    <div class=" flex flex-wrap p-5 flex-col md:flex-row items-center relative space-x-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-end ">
          <input type="checkbox" name="hamburger" id="hamburger" class="peer" hidden>
          <label for="hamburger" class="peer-checked:hamburger block relative z-20  cursor-pointer ">
            <Icon icon="akar-icons:three-line-horizontal" width="32" height="32" />
          </label>

          <div class="peer-checked:translate-x-0 bg-red-500 w-1/6 fixed inset-0  translate-x-[-100%]   shadow-xl transition duration-300 ">
            <div class=" flex flex-wrap p-5 flex-col md:flex-row items-center relative space-x-4">
          <input type="checkbox" name="hamburger" id="hamburger" class="peer" hidden>
            <button  @click="sidebar = !sidebar" class="ml-2"><Icon icon="akar-icons:three-line-horizontal" width="32" height="32" /></button>
            <div class="">
                <input type="text" class="rounded-md" placeholder=" Search">
            </div>
        </div>
          </div>
        </div>
      </div>
        <div class="">
            <input type="text" class="rounded-md" placeholder=" Search">
        </div>
      <nav class="absolute right-20 space-x-4 mr-auto">
        <router-link to="/" class="hover:border-white">About</router-link>
        <router-link to="/" class="">Project</router-link>
        <router-link to="/" class="">CV</router-link>
      </nav>
      <div class="flex justify-center items-center absolute right-10">
        <button @click="toggleDark()" >
          <Icon icon="bi:moon-fill" width="24" height="24" v-if="isDark"/> 
          <Icon icon="akar-icons:sun-fill" width="28" height="28" v-else/>
        </button>
      </div>
    </div>
    </header> -->
    
</template>

<script setup>
import {ref} from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import { RouterLink, RouterView } from 'vue-router'
import { Icon } from '@iconify/vue';

const isDark = useDark();
const toggleDark = useToggle(isDark);
const sidebar = ref(false);

</script>