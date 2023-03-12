<template>
    <div class="flex justify-center items-center ">
      <div class="shadow-lg bg-slate-200 dark:bg-gray-500 card p-2">
        <div class="flex items-center gap-2 mb-2">
          <div class="avatar ">
            <div class="w-16 rounded-full">
              <img :src="auth.user.image" />
            </div>
          </div>
          <div class="flex flex-col text-md font-bold ">
            <div>{{auth.user.name}}</div>
            <div>@{{auth.user.username}}</div>
          </div>
        </div>
        <textarea class="textarea textarea-error w-[510px]" placeholder="Bio"></textarea>
      </div>
    </div>
</template>
<script setup>
  import {useAuth} from '@/stores/authStore';
  import { onMounted } from 'vue';
  
  const auth = useAuth();
  onMounted(async () => {
    await auth.getUser();
  })
</script>
