<template>
    <header class="">
      <div class="container mx-auto">
        <div class="flex-1 ">
            <div class="flex flex-col ">
                <div class="flex justify-between bg-indigo-500 p-4 rounded-lg ">
                    <div class="flex">
                        <div class="avatar flex flex-col">
                            <div class="w-24 rounded-full">
                                <img :src="formUser.image" />
                            </div>
                        </div>
                        <div class="ml-4 w-72 ">
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Username</span>
                                </label>
                                <input type="text" v-model="formUser.username" placeholder="Type here" class="input input-bordered input-info w-full max-w-xs bg-white" />
                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Name</span>
                                </label>
                                <input type="text" v-model="formUser.name" placeholder="Type here" class="input input-bordered input-info w-full max-w-xs bg-white" />
                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Image</span>
                                </label>
                                <input type="text" v-model="formUser.image" placeholder="Type here" class="input input-bordered input-info w-full max-w-xs bg-white" />
                            </div>
                            <button class="btn btn-success mt-5" @click="updateUser">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
  </header>
</template>

<script setup>
import { onMounted, ref,reactive, defineProps } from 'vue';
import {useAuth} from '@/stores/authStore';
import {useProfile} from '@/stores/profileStore';
import axiosInstance from '../../../services/authHeader.js';
const auth = useAuth();
const profile = useProfile();
const formUser = reactive({
    username: auth.user.username,
    name: auth.user.name,
    image: auth.user.image,
})
onMounted(async() => {
   await auth.getUser()
})

function updateUser(){
    axiosInstance.put(`user/updateProfile/${auth.user.id}`, JSON.stringify(formUser))
    .then(function (res) {
        if(res){
            console.log(res)
            auth.updatedUser(res)
            profile.editMode = false
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}
  const updateUsername = async () => {
    const updatedUserData = {
      username: formUser.value.username,
      name: formUser.value.name,
      image: formUser.value.image,
    }
    await auth.updateUser(auth.user.id, updatedUserData)
  }

</script>