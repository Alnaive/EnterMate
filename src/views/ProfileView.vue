<template>
    <div class="vld-parent">
        <loading v-model:active="isLoading" :is-full-page="fullPage" :loader="loader" metaIcon/>
    </div>
    <div >
    </div>
        <div class=" " v-if="profile.editMode"><editUser/></div>
        <div class="" v-else> <HeaderProfile/></div>
            <div v-if="auth.user.username == route.params.id" class="flex justify-between container mx-auto relative mt-2">
                <div  v-if="!auth.user.verified" class="alert alert-warning shadow-lg ">
                    <div >
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span v-if="!emailNotif">
                            Verify your email to update your data <button @click="emailVerify(auth.user.email)" class="btn btn-primary">verify Email</button> <br>
                        </span>
                        <span v-else>{{ emailNotif }}</span>
                    </div>
                </div>
                    <button v-if="profile.editMode" class="btn btn-secondary" @click="deleteUser()">Delete Account</button>
                    <button v-if="!profile.editMode && auth.user.verified" class="btn btn-primary" @click="profile.editMode = !profile.editMode">Edit</button>
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
                            <!-- <chainCard/> -->
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
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import {useProfile} from '@/stores/profileStore';
import {useAuth} from '@/stores/authStore';

const profile = useProfile();
const route = useRoute();
const router = useRouter();
const auth = useAuth();
const isLoading = ref(true)
const loader = 'spinner'
const fullPage = ref(false)
const emailNotif = ref()
 function emailVerify(){
    const formEmail = {
    email: auth.user.email
    }
    axiosInstance.post('user/sendVerify', JSON.stringify(formEmail))
    .then(function (res) {
        if(res){
            console.log(res)
            emailNotif.value = res.data.message
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
    isLoading.value = false
})
</script>