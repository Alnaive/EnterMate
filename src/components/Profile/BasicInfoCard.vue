<template>
    <div class="flex flex-col">
        <div class="flex justify-center  bg-violet-500 p-4 rounded-lg ">
            <div class="avatar flex flex-col justify-center items-center">
                <div class="w-24 rounded-lg">
                    <img :src="dataUser.image" />
                </div>
                <div class=" text-center space-y-2">
                    <h2  class="text-2xl text-bold">{{ dataUser.name }} </h2>
                    <h2 class="text-lg" >@{{ dataUser.username }}</h2>
                    <section v-for="data in dataProfile" :key="data">
                        <div class="bg-blue-500 text-bold rounded-md p-2" >{{ data.title }}</div>
                    </section>
                </div>
            </div>
            
        </div>
        <div>
            <RightMenu/>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axiosInstance from '../../services/authHeader.js';
import { useRouter, useRoute } from 'vue-router'
import RightMenu from './RightMenu.vue';
const route=useRoute();
const dataUser = ref({});
const dataProfile = ref({});
async function fetchData() {
    try {
        const userResult = await axiosInstance.get(`/user/profile/${route.params.id}`);
        dataUser.value = userResult.data;

        const profileResult = await axiosInstance.get(`/profile/user/${userResult.data.id}`);
        dataProfile.value = profileResult.data;
    } catch (err) {
        console.error(err);
    }
}

onMounted(fetchData);
</script>