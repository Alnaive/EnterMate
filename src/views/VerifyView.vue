<script setup>
import axiosInstace from '../services/authHeader.js'
import {onMounted,defineProps, computed} from 'vue'
import {useRoute} from 'vue-router'

    const route=useRoute();
const token = route.params.token;
const tokenWithDots = token.replace(/_/g, ".");
   
onMounted(async () => {
    
    await axiosInstace.post(`/user/verify/${tokenWithDots}`)
    .then(function (res) {
        if(res){
            console.log(res)
        }
    })
    .catch(function (error) {
        console.log(error);
    });
})

</script>

<template>
    <div class="flex justify-center items-center">
        <h1></h1>
    </div>
</template>