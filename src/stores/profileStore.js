import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "../services/authHeader"

export const useProfile = defineStore('profile', () => {

    const editMode = ref(false)
    const profileData = ref()

    const isEditMode = () => {
        return editMode.value !== null;
    }

    const updateProfile = async (id, updatedUserData) => {
        const { data: updatedUser } = await axiosInstance.put(`/user/updateProfile/${id}`, updatedUserData);
        profileData.value = updatedUser; //update user in Pinia state
    }

    return { editMode, profileData, isEditMode, updateProfile }
    
})

