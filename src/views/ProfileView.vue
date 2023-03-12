<template>
    <!-- <div v-if="!auth.user.verified">
        <button @click="emailVerify()" class="btn btn-primary">verify Email</button>
    </div> -->
        <div class=" " v-if="profile.editMode"><editUser/></div>
        <div class="" v-else> <HeaderProfile/></div>
            <div class="flex container mx-auto relative mt-2">
                <div class="absolute top-0 right-0 h-16 w-16 ...">
                    <button class="btn btn-primary" @click="profile.editMode = !profile.editMode">Edit</button>
                </div>

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
                <RightMenu/>
            </div>
</template>
<script setup>
import { onMounted, ref,reactive, computed, watch } from 'vue';
import {useAuth} from '@/stores/authStore';
import axiosInstance from '../services/authHeader.js';
import { useRouter, useRoute } from 'vue-router'
import HeaderProfile from '../components/Profile/HeaderProfile.vue';
import chainCard from "../components/ChainCard.vue"
import createPostCard from "../components/Profile/CreatePost.vue"
import RightMenu from '../components/Profile/RightMenu.vue';
import LeftMenu from '../components/Profile/LeftMenu.vue';
import editProfile from '../components/Profile/Edit/editProfile.vue';
import editUser from '../components/Profile/Edit/editUser.vue';
import BasicInfoCard from '../components/Profile/BasicInfoCard.vue';
import {useProfile} from '@/stores/profileStore';
const profile = useProfile();

    const route=useRoute();
const auth = useAuth();

const profileForm = ref(false);
const dataProfile = ref({});
const formName = reactive({
    name: null,
    username: null,
    image: null
})
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

// async function fetchData() {
//     await auth.getUser();
//     try {
//         const userResult = await axiosInstance.get(`/user/profile/${route.params.id}`);
//         dataUser.value = userResult.data;

//         const profileResult = await axiosInstance.get(`/profile/user/${userResult.data.id}`);
//         dataProfile.value = profileResult.data;
//     } catch (err) {
//         console.error(err);
//     }
// }

// onMounted(fetchData);

watch(() => auth.user, (newValue, oldValue) => {
    console.log('changed')
});

</script>