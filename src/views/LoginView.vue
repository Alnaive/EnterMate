<template>
    <div class="hero bg-white dark:bg-base-100">
        <div class="hero-content flex-col lg:flex-row-reverse ">
            <div class="text-center lg:text-left">
            <h1 class="text-5xl font-bold" v-if="!signup">Login now!</h1>
            <h1 class="text-5xl font-bold" v-else>Sign Up</h1>
            <p class="py-6">{{ errorRegister }} {{ errorLogin }}</p>
            </div>
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white dark:bg-base-100">
                <div v-if="!signup" class="card-body">
                    <form id="formLogin" action="">
                        <div class="form-control">
                        <label class="label">
                            <span class="label-text">Username</span>
                        </label>
                        <input v-model="formData.usernameOrEmail" type="text" placeholder="Username or Email" class="input input-bordered bg-white dark:bg-base-100" />
                        </div>
                        <div class="form-control">
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input v-model="formData.password" type="password" placeholder="password" class="input input-bordered bg-white dark:bg-base-100" />
                        <label class="label">
                            <a href="#" class="label-text-alt link link-hover" >Forgot password?</a>
                        </label>
                        </div>
                    </form>
                    
                    <div class="form-control mt-6 space-y-4">
                    <button class="btn btn-primary" @click="login()">Login</button>
                    <div class="divider" >OR</div>
                        <button class="btn btn-primary" @click="showSignup()">Sign Up</button>
                    </div>
                </div>
                <div v-else class="card-body">
                   <form id="formRegister">
                    
                        <div class="form-control">
                        <label class="label">
                            <span class="label-text">Name</span>
                        </label>
                        <input v-model="formRegister.name" type="text" placeholder="Username" class="input input-bordered bg-white dark:bg-base-100" />
                        </div>
                        <div class="form-control">
                        <label class="label">
                            <span class="label-text">Username</span>
                        </label>
                        <input v-model="formRegister.username" type="text" placeholder="Username" class="input input-bordered bg-white dark:bg-base-100" />
                        </div>
                        <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input v-model="formRegister.email" type="text" placeholder="Email" class="input input-bordered bg-white dark:bg-base-100" />
                        </div>
                        <div class="form-control">
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input v-model="formRegister.password" type="password" placeholder="Password" class="input input-bordered bg-white dark:bg-base-100" />
                        </div>
                        <div class="form-control">
                        <label class="label">
                            <span class="label-text">Password Confirmation</span>
                        </label>
                        <input v-model="formRegister.passwordConfirmation" type="password" placeholder="Same Password" class="input input-bordered bg-white dark:bg-base-100" />
                        </div>
                   </form>
                    <div class="form-control mt-6 space-y-4">
                    <button class="btn btn-primary" @click="register()">Register</button>
                    <div class="divider" >OR</div>
                    <button class="btn btn-primary" @click="showLogin()">Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import {ref, onMounted, defineEmits} from "vue";
import { useCookies } from "vue3-cookies";
import { useRouter, useRoute } from 'vue-router'
import { useAuth} from "@/stores/authStore";
import axiosInstance  from "../services/authHeader.js";
const auth = useAuth();

const router = useRouter()
const signup = ref(false);
function showSignup(){
    signup.value = true;
}
function showLogin(){
    signup.value = false;
}

const errorRegister = ref();
const errorLogin = ref();

const formRegister = {
    username: null,
    name: null,
    email: null,
    password: null,
    passwordConfirmation: null,
}

async function register(){
    try {
    const res = await axiosInstance.post('/auth/signup/', JSON.stringify(formRegister))
        if(res.data.accessToken){
          auth.setToken(res);
          router.push({name: 'home'})
        }   
    } catch (error) {
        errorRegister.value = error.response.data.message;
    }
}

const { cookies } = useCookies();

const formData = {
    usernameOrEmail: null,
    password: null
}

async function login() {
  const loginData = {
    username: formData.usernameOrEmail,
    email: formData.usernameOrEmail,
    password: formData.password
  };
  try {
    const res = await axiosInstance.post('/auth/signin/', JSON.stringify(loginData));
    if (res.data.accessToken) {
      auth.setToken(res);
      await auth.getUser;
      router.push({name: 'home'})
    }
  } catch (error) {
    errorLogin.value = error.response.data.message;
    console.log(error);
  }
}
</script>