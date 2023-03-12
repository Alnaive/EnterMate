<template>
    <header class=" sticky top-0 z-50">
    <div class="navbar bg-white dark:bg-slate-800 shadow-md ">
      <div class="container mx-auto">
        <div class="flex-1 ">
          <router-link to="/" class="btn btn-ghost normal-case text-xl">EnterMate</router-link>
        </div>
        <div class="flex-none space-x-4 mr-4" >
          <div v-if="auth.isAuthenticated()" class="dropdown dropdown-bottom dropdown-end">
            <label tabindex="0">Hi, {{ auth.user.username }} </label>
            <ul tabindex="0" class="  dropdown-content menu shadow bg-base-100 rounded-box w-auto">
              <li class="flex flex-col justify-center items-center">
                <router-link :to="`/profile/${auth.user.username}`">Profile</router-link>
                <button @click="logout()">Logout</button>
              </li>
            </ul>
          </div>
          <button @click="toggleDark()">
                  <Icon icon="bi:moon-fill" width="24" height="24" v-if="isDark"/> 
                  <Icon icon="akar-icons:sun-fill" width="28" height="28" v-else/>
                </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import {ref, onMounted, computed, watchEffect} from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import { RouterLink, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue';
import { storeToRefs } from 'pinia'

import { useAuth} from "@/stores/authStore";

const auth = useAuth()
const router = useRouter()
function logout(){
  auth.removeToken()
  router.push({name:'login'})
}

onMounted( async () => {
 await auth.getUser();
})

// const user = computed(() => {
//   return auth.user
// })
// watchEffect(() => {
//   console.log(user.value);
// });

const isDark = useDark();
const toggleDark = useToggle(isDark);

</script>