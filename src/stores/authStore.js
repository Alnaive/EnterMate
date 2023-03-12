import { defineStore } from "pinia";
import { ref, watch, computed } from "vue";
import axiosInstance from "../services/authHeader"
import userServices from "../services/user"
import { useRouter } from "vue-router";
const router = useRouter();
export const useAuth = defineStore('auth', () => {
    const token = ref(localStorage.getItem('accessToken') || null);
    const user = ref([]);
   
    const isAuthenticated = () => {
        return token.value !== null;
    }
    
    async function setToken(res) {
        token.value = res.data.accessToken;
        localStorage.setItem('accessToken', res.data.accessToken);
        user.value = res.data;

    }

    function removeToken(){
        token.value = null;
        localStorage.removeItem('accessToken');
    }

    const updatedUser = async(res) => {
        user.value = res.data;
    }

    const getUser = async () => {
      const jwtToken = localStorage.getItem('accessToken');
        if(jwtToken){
            const { data } = await userServices;
            user.value = data;
            token.value = jwtToken;
        }

    }

    const updateUser = async (id, updatedUserData) => {
        const { data: updatedUser } = await axiosInstance.put(`/user/updateProfile/${id}`, updatedUserData);
        user.value = updatedUser; //update user in Pinia state
    }

    return {token, user, isAuthenticated, setToken, removeToken, getUser, updatedUser, updateUser}
});