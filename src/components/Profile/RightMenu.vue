<template>
    <div>
        <ul  class="flex flex-col space-y-2 bg-base-100 w-56 p-4 rounded-box text-lg">
            <li class="menu-title">
                <span>Post</span>
            </li>
            <li><a>Home</a></li>
            <li class="menu-title">
                <span>About</span>
            </li>
            <li v-for="item in dataAbout.about" :key="item">
                    <label for="my-modal-4" @click="show(item._id)" >
                    {{ item.title }}
                </label>
            </li>
        </ul>
    </div>

    <!-- The button to open modal -->

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal-4" class="modal-toggle" />
<label for="my-modal-4" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <section v-if="arrayAbout">
        <div v-for="data in arrayAbout.about" :key="data">
            <h3 class="text-lg font-bold">About {{ data.title }}</h3>
            <p class="py-4">{{data.description}}</p>
        </div>
    </section>
  </label>
</label>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import axiosInstance from '../../services/authHeader.js';
import { useRouter, useRoute } from 'vue-router'
const route = useRoute();
const dataUser = ref({});
const dataAbout = ref([]);
const arrayAbout = ref();
async function show (aboutId) {
    try {
        const {data} = await axiosInstance.get(`/profile/about/array/${dataUser.value.id}/${aboutId}`)
        arrayAbout.value = data
        console.log(data)
    } catch (e) {
        console.log(e)
    }
}

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