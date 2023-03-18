<template>
    <div class="vld-parent">
        <loading v-model:active="isLoading" :is-full-page="fullPage" :loader="loader" />
    </div>
    <ul v-for="data in dataProfile" :key="data" class=" vld-parent flex flex-col space-y-2 bg-base-100 w-56 p-4 rounded-box text-lg">
        <li class="flex gap-2 text-lg font-bold"><Icon icon="mdi:person-card-details" width="32" height="32" /> Profile Information</li>
        <li class="flex items-center gap-2">
            <Icon icon="material-symbols:person-pin" width="32" height="32" />
            <strong class="flex-1 w-64">Name <br> {{ dataUser.name }}</strong>
        </li>
        <li class="flex items-center gap-2">
            <Icon icon="fa6-solid:user-graduate" width="32" height="32" />
            <strong class="flex-1 w-64">Title <br> {{ data.title }}</strong>
        </li>
        
        <li class="flex items-center gap-2">
            <Icon icon="material-symbols:date-range" width="32" height="32" />
            <strong class="flex-1 w-64">Birthday <br> {{ formatDate(data.birthday) }}</strong>
        </li>
        <li class="flex items-center gap-2">
            <Icon icon="mdi:address-marker" width="32" height="32" />
            <strong class="flex-1 w-64">City <br> {{ data.city }} </strong>
        </li>
        
        <li class="flex gap-2 text-lg font-bold"> <Icon icon="fluent:cube-tree-20-filled" width="32" height="32" />Hobby</li>
        <li  v-for="dataHobby in data.hobby" :key="dataHobby">
            <div class="flex gap-2">
                <Icon icon="mdi:address-marker" width="32" height="32" class="invisible"/>

            <strong>{{ dataHobby }}<br></strong>
            </div>
        </li>
    </ul>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import axiosInstance from '../../services/authHeader.js';
import { useRouter, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
const route=useRoute();
const dataUser = ref({});
const dataProfile = ref({});

const isLoading = ref(true)
const loader = 'spinner'
const fullPage = ref(false)

async function fetchData() {
    try {
        const userResult = await axiosInstance.get(`/user/profile/${route.params.id}`);
        dataUser.value = userResult.data;

        const profileResult = await axiosInstance.get(`/profile/user/${userResult.data.id}`);
        dataProfile.value = profileResult.data;
        isLoading.value = false
    } catch (err) {
        console.error(err);
    }
}

onMounted(fetchData);

function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();

      return `${day}/${month}/${year}`;
}
</script>