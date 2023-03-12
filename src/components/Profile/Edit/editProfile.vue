<template>
    <div class="flex flex-col justify-center p-4 container mx-auto">
        <div class="flex flex-col mt-5">
            <h1>Update Profile</h1>
            <div >
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Title</span>
                    </label>
                    <input type="text" v-model="formProfile.title" placeholder="Type here" class="input input-bordered input-info w-full max-w-xs bg-white" />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Gender</span>
                    </label>
                    <select v-model="formProfile.gender" class="select select-bordered  select-info bg-white">
                        <option disabled selected>Pick one</option>
                        <option>Female</option>
                        <option>Male</option>
                    </select>
                </div>
                <div class="form-control w-full max-w-xs">
                    <label for="">
                        <span>Birthday</span>
                    </label>
                    <VueDatePicker v-model="formProfile.birthday" :enable-time-picker="false"/>
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">City</span>
                    </label>
                    <input type="text" v-model="formProfile.city" placeholder="Type here" class="input input-bordered input-info w-full max-w-xs bg-white" />
                </div>
                <div v-if="!formProfile.hobby.length">
                    <button @click="addHobby" class="btn btn-success">Add Hobby</button>
                </div>
                <div v-else>
                    <div v-for="(item, index) in formProfile.hobby" :key="index">
                        <!-- <div class="flex flex-col justify-between">
                            <div>{{ item }} | <button @click="removeHobby(index)">Delete</button></div>
                        </div> -->
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">{{`Add Hobby ${index + 1}`}}</span>
                                </label>
                                <div class="flex space-x-4">
                                    <input type="text" v-model="formProfile.hobby[index]" placeholder="Type here" class="input input-bordered input-info w-full max-w-xs bg-white" />
                                    <button class="btn bg-red-500" @click="removeHobby(index)">Delete</button>
                                </div>
                            
                            </div>
                    </div>
                    <button @click="addHobby" class="btn btn-success mt-5">Add New Hobby</button>
                </div>
            </div>
        <button @click="updateProfile1" class="btn btn-primary mt-4">Save</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref,reactive, defineProps } from 'vue';
import {useAuth} from '@/stores/authStore';
import {useProfile} from '@/stores/profileStore';
import axiosInstance from '../../../services/authHeader.js';
import { useRouter, useRoute } from 'vue-router'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
const route = useRoute();
const router = useRouter();
const auth = useAuth();
const profile = useProfile();
const profileForm = ref(false);
const dataProfile = ref();

const formProfile = reactive({
    title: null,
    gender: null,
    birthday: null,
    city: null,
    hobby: []
})
onMounted(async() => {
    const {data} = await axiosInstance.get(`/profile/user/${auth.user.id}`)
    formProfile.title = data[0].title;
    formProfile.gender = data[0].gender;
    formProfile.birthday = data[0].birthday;
    formProfile.city = data[0].city;
    formProfile.hobby = data[0].hobby;
})

const addHobby = () => {
      formProfile.hobby.push('');
    };
const removeHobby = (index) => {
  formProfile.hobby.splice(index, 1);
}

function updateProfile1(){
    axiosInstance.put(`profile/update/${auth.user.id}`, JSON.stringify(formProfile))
    .then(function (res) {
        if(res){
            console.log(res)
            profile.editMode = false
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}


</script>