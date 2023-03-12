import axiosInstance from "./authHeader"

const userServices = axiosInstance.get('/user/authUser');

export default userServices;