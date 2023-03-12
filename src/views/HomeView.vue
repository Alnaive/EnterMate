<template>
  <div class="flex justify-center items-center container mx-auto">
    <div v-if="!auth.token">Please Login</div>
    <div v-else>
      <chain-card/>
    </div>
  </div>
</template>

<script setup>
import chainCard from "../components/ChainCard.vue"
import { useAuth } from "@/stores/authStore";
import { onMounted, ref } from "vue";
import axios from "axios";

const auth = useAuth()
const user = ref([]);

const token = localStorage.getItem('accessToken');

onMounted(async () => {
  const data = await axios.get('http://localhost:8000/api/user', {headers: { 'x-access-token': token}})
  .then((result) => {
    user.value = result 
  }).catch((err) => {
    console.log(err)
  });
})

</script>