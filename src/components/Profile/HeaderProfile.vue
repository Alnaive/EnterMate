<template>
    <header class="flex sticky top-0">
      <div class="container mx-auto mt-5">
        <div class="flex-1 ">
            <div class="flex flex-col ">
                <div class="flex justify-between bg-indigo-500 p-4 rounded-lg ">
                    <div class="flex">
                        <div class="avatar flex flex-col">
                            <div class="w-24 rounded-full">
                                <img :src="dataUser.image" />
                            </div>
                        </div>
                        <div class="ml-4 w-72 ">
                            <h2  class="text-2xl text-bold">{{ dataUser.name }}</h2>
                            <h2 class="text-lg" >@{{ dataUser.username }}</h2>
                            <div class="flex space-x-4">
                                <h2>POST</h2>
                                <div class="divider divider-horizontal"></div>
                                <h2>Followers</h2>
                                <div class="divider divider-horizontal"></div>
                                <h2>Following</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
  </header>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import axiosInstance from '../../services/authHeader.js';
import { useRouter, useRoute } from 'vue-router'
import {useAuth} from '@/stores/authStore';

const auth = useAuth();
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
