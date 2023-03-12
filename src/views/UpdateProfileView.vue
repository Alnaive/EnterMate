<template>
    <div class="flex flex-col justify-center p-4 container mx-auto">
        <div class="flex flex-col card  mt-5">
            <h1>Basic Information</h1>
            <div>Username {{ auth.user.username }}</div>
            <div>Name {{ auth.user.name }}</div>
        </div>
        <div class="flex flex-col mt-5">
            <h1>Profile Information</h1>
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
        </div>
        <button @click="updateProfile1" class="btn btn-primary">Test</button>
        <!-- <div>
            <h2>About</h2>
    <div v-for="(item, index) in about" :key="index">
      <h3>About {{ index + 1 }}</h3>
      <label for="title">Title</label>
      <input type="text" v-model="item.title">
      <label for="description">Description</label>
      <textarea v-model="item.description"></textarea>
    </div>
            <button @click="addAbout" class="btn btn-success">Add new item</button>
            <button @click="storeAbout" class="btn btn-warning">Save changes</button>
        </div> -->
    </div>
</template>

<script setup>
import { onMounted, ref,reactive, defineProps } from 'vue';
import {useAuth} from '@/stores/authStore';
import axiosInstance from '../services/authHeader.js';
import { useRouter, useRoute } from 'vue-router'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
const route = useRoute();
const router = useRouter();
const auth = useAuth();
const profileForm = ref(false);
const dataProfile = ref();
const props = defineProps({
  id: {
    type: String,
    required: true
  },
})
const formProfile = reactive({
    title: null,
    gender: null,
    birthday: null,
    city: null,
    hobby: []
})
onMounted(async() => {
    const {data} = await axiosInstance.get(`/profile/user/${props.id}`)
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


const formName = reactive({
    name: null,
    username: null,
    image: null
})
const title = reactive('');
const description = reactive('');
const about = reactive([])
const addAbout = () => {
      about.push({ title: '', description: '' });
    };
function storeAbout(){

    const data = {
          title: 'title3',
          description: 'description3'
      };
  axiosInstance.post(`profile/about/store/${route.params.id}`, data)
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
function addNewItem() {
    //   formAbout.value.about.push({ title: '', description: '' });
    }
function updateAbout(){
    axiosInstance.post(`profile/about/update/${route.params.id}`, JSON.stringify(formAbout))
    .then(function (res) {
        if(res){
            console.log(res)
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function updateProfile1(){
    axiosInstance.put(`profile/update/${route.params.id}`, JSON.stringify(formProfile))
    .then(function (res) {
        if(res){
            console.log(res)
            router.push({name: 'home'})
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

const { updateProfile } = useAuth();
const { user } = useAuth();

const userData = ref({});

const updateData = async (id, updatedUserData) => {
  await updateProfile(id, updatedUserData);
  userData.value = user.value;
}

async function saveProfile(id, formData){
    if(formName.name || formName.username){
    await updateData(id, formData);
    profileForm.value = false
    }
}
const dataUser = ref({})
async function fetchData() {
    try {
        const userResult = await axiosInstance.get(`/user/profile/${route.params.id}`);
        dataUser.value = userResult.data;

        const profileResult = await axiosInstance.get(`/profile/user/${auth.user.id}`);
        dataProfile.value = profileResult.data;
    } catch (err) {
        console.error(err);
    }
}


</script>