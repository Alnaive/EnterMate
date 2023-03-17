<template>
    <div>
        <ul  class="menu bg-base-100 w-56 p-2 rounded-box text-lg">
            <li class="menu-title">
                <span>Post</span>
            </li>
            <li><a>Home</a></li>
            <li class="menu-title">
                <span>About</span>
            </li>
            <li v-for="item in dataAbout.about" :key="item">
                <div class="flex justify-between">
                    <a>{{ item.title }} 
                </a>
                <router-link :to="`/update/profile/${dataUser.id}/${item._id}`">Edit</router-link>
                </div>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import axiosInstance from '../../services/authHeader.js';
import { useRouter, useRoute } from 'vue-router'
const route = useRoute();
const dataUser = ref({});
const dataAbout = ref([]);
async function fetchDataAbout() {
    try {
        const userResult = await axiosInstance.get(`/user/profile/${route.params.id}`);
        dataUser.value = userResult.data;

        const aboutResult = await axiosInstance.get(`/profile/about/user/${userResult.data.id}`);
        dataAbout.value = aboutResult.data;
    } catch (err) {
        console.error(err);
    }
}

onMounted(fetchDataAbout);
</script>