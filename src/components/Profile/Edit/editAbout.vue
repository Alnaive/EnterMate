<template>
    <div class="flex flex-col justify-center p-4 container mx-auto">
        <div class="flex flex-col mt-5">
            <h1>Update About</h1>
            <div >
                <!-- <div v-if="!formProfile.hobby.length">
                    <button @click="addHobby" class="btn btn-success">Add Hobby</button>
                </div>
                <div v-else>
                    <div v-for="(item, index) in formProfile.hobby" :key="index">
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
                </div> -->
            </div>
        <button @click="storeAbout" class="btn btn-primary mt-4">Save</button>
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

const formAbout = reactive({
    about: {
        title: null,
        description: null,
    }
})
onMounted(async() => {
    const {data} = await axiosInstance.get(`/profile/about/user/${auth.user.id}`);
    formAbout.about = data[0].about;
})

const addHobby = () => {
      formAbout.hobby.push('');
    };
const removeHobby = (index) => {
  formAbout.hobby.splice(index, 1);
}

const title = reactive('');
const description = reactive('');
const about = reactive([])

function storeAbout(){
    const data = {
          title: 'title3',
          description: 'description3'
      };
  axiosInstance.post(`profile/about/store/${auth.user.id}`, JSON.stringify(data))
    .then(function (res) {
      if (res) {
        console.log(res)
      console.log(data)
      }
    })
    .catch(function (error) {
      console.log(error)
      console.log(data)
    })
}
const addAbout = () => {
      about.push({ title: '', description: '' });
    };

</script>