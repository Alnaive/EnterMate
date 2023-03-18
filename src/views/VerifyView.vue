<script setup>
import axiosInstace from '../services/authHeader.js'
import {onMounted,ref} from 'vue'
import {useRoute} from 'vue-router'

    const route=useRoute();
const token = route.params.token;
const tokenWithDots = token.replace(/_/g, ".");
const emailNotif = ref()
onMounted(async () => {
    
    await axiosInstace.post(`/user/verify/${tokenWithDots}`)
    .then(function (res) {
        if(res){
            console.log(res)
            emailNotif.value = res.data.message

        }
    })
    .catch(function (error) {
        console.log(error);
    });
})

</script>

<template>
    <div class="flex justify-center test-center items-center">
        <h1>{{ emailNotif }} <br> Please refresh the page!</h1>
    </div>
</template>