<template>
    <div class="flex flex-col justify-center p-4 container mx-auto">
        <div class="flex flex-col mt-5">
            <h1>Update About</h1>
            <div >
                <div v-if="!formAbout.dataAbout.about">
                    <button @click="addAbout" class="btn btn-success">Add Hobby</button>
                </div>
                <div v-else>
                    <div v-for="(item, index) in formAbout.dataAbout.about" :key="index">
                        {{ formAbout.dataAbout.about.title }}
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">{{`Add about ${index + 1}`}}</span>
                                </label>
                                <div class="flex space-x-4">
                                    <div class="flex flex-col space-y-2">
                                        <input type="text" v-model="item.title" placeholder="Type here" class="input input-bordered input-info w-full max-w-xs bg-white" />
                                        <textarea class="textarea textarea-bordered textarea-info bg-white" v-model="item.description" placeholder="Bio"></textarea>
                                    </div>
                                    <button class="btn bg-red-500" @click="removeAbout(index, item._id)">Delete</button>
                                </div>
                            </div>
                    </div>
                    <button @click="addAbout" class="btn btn-success mt-5">Add About</button>
                </div>
            </div>
        <button @click="storeAbout" class="btn btn-primary mt-4">Save</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref,reactive,  } from 'vue';
import {useAuth} from '@/stores/authStore';
import {useProfile} from '@/stores/profileStore';
import axiosInstance from '../../../services/authHeader.js';
import { useRouter, useRoute } from 'vue-router'
const route = useRoute();
const router = useRouter();
const auth = useAuth();
const profile = useProfile();

const formAbout = reactive({
    dataAbout: [{
        title: null,
        description: null,
   }]
})
onMounted(async() => {
    const {data} = await axiosInstance.get(`/profile/about/user/${auth.user.id}`);
    formAbout.dataAbout = data;
})

const addAbout = () => {
    formAbout.dataAbout.about.push({ title: '', description: '' });
    };
const removeAbout = (index, aboutId) => {
    if (Array.isArray(formAbout.dataAbout.about)) {
        formAbout.dataAbout.about.splice(index, 1);
        if (aboutId) {
          axiosInstance.delete(`profile/about/${auth.user.id}/${aboutId}`)
            .then(res => {
              console.log(res);
            })
            .catch(error => {
              console.log(error);
            });
        } else {
            console.log('missing id about')
        }
  }
}

function storeAbout(){
  axiosInstance.put(`profile/about/update/${auth.user.id}`, JSON.stringify(formAbout.dataAbout))
    .then(function (res) {
      if (res) {
        console.log(res)
      profile.editMode = false

      }
    })
    .catch(function (error) {
      console.log(error)
    })
}


</script>