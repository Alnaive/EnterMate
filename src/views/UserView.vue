<template>
    <div v-if=!auth.user.name>
        <router-link to="profile">
            <div class="alert alert-info shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>Update your profile name</span>
                </div>
            </div>
        </router-link>
    </div>
    <div v-else>
        {{ auth }}
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useAuth} from "@/stores/authStore"
import { RouterLink } from "vue-router";
const auth = useAuth();
const user = ref({});
onMounted( async () => {
  await auth.getUser()
})
</script>