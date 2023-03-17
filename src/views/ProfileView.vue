<template>
    <!-- <div v-if="!auth.user.verified">
        <button @click="emailVerify()" class="btn btn-primary">verify Email</button>
    </div> -->
        <div class=" " v-if="profile.editMode"><editUser/></div>
        <div class="" v-else> <HeaderProfile/></div>
            <div v-if="auth.user.username == route.params.id" class="flex justify-between container mx-auto relative mt-2">
                    <button v-if="profile.editMode" class="btn btn-secondary" @click="deleteUser()">Delete Account</button>
                    <button v-if="!profile.editMode" class="btn btn-primary" @click="profile.editMode = !profile.editMode">Edit</button>
                    <button v-if="profile.editMode" class="btn btn-primary" @click="profile.editMode = !profile.editMode">Close Edit Mode</button>
            </div>

            <div class="flex container mx-auto justify-center space-x-8 mt-4  p-4 rounded-xl" >
                
                <div v-if="profile.editMode"><editProfile/></div>
                <div v-else><LeftMenu/></div>
                <div class="flex flex-col">
                    <div class="card p-4 bg-indigo-700 w-auto">
                        <div class="space-y-5">
                            <div class="mb-5" v-if="auth.user.username == route.params.id">
                                <create-post-card/>
                            </div>
                            <chainCard/>
                        </div>
                    </div>
                </div>
                <div v-if="!profile.editMode"><RightMenu/></div>
                <div v-else><editAbout/></div>
            </div>
</template>
<script setup>
import { onMounted, ref,reactive, computed, watch } from 'vue';
import axiosInstance from '../services/authHeader.js';
import { useRouter, useRoute } from 'vue-router'
import HeaderProfile from '../components/Profile/HeaderProfile.vue';
import chainCard from "../components/ChainCard.vue"
import createPostCard from "../components/Profile/CreatePost.vue"
import RightMenu from '../components/Profile/RightMenu.vue';
import LeftMenu from '../components/Profile/LeftMenu.vue';
import editProfile from '../components/Profile/Edit/editProfile.vue';
import editUser from '../components/Profile/Edit/editUser.vue';
import editAbout from '../components/Profile/Edit/editAbout.vue';
import BasicInfoCard from '../components/Profile/BasicInfoCard.vue';
import {useProfile} from '@/stores/profileStore';
import {useAuth} from '@/stores/authStore';

const profile = useProfile();
const route = useRoute();
const router = useRouter();
const auth = useAuth();

const formEmail = {
    email: auth.user.email
}
 function emailVerify(){
    axiosInstance.post('user/sendVerify', JSON.stringify(formEmail))
    .then(function (res) {
        if(res){
            console.log(res)
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

 function deleteUser(){
    auth.deleteAccount();
   router.push({name:'login'})
}
onMounted(async() => {
    await auth.getUser();
})
</script>