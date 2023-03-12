<template>
    <div class="flex justify-center items-center">
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
            <div class="flex flex-col absolute top-4 right-5">
                <div>Chain Post</div>
                <div>{{ date }}</div>
            </div>
          </div>
        </div>
        <swiper class="flex md:max-w-lg max-w-[360px] h-[200px]  overflow-visible"
            :effect="'cards'"
            :grabCursor="false"
            :modules="modules"
          >
          <swiper-slide class="card bg-gray-300 dark:bg-blue-400">
            <div class="card-body text-black dark:text-white">             
                <h2 class="card-title">Love just a bug</h2>
                <p>
                    Aku memang gagal di dunia percintaan tapi, aku gk boleh gagal untuk mejalankan revenge list dan aku akan membuktikan suatu saat nanti aku bisa
                    menjadi MC di dunia yang fana ini. 
                </p>
            </div>
          </swiper-slide>
          <swiper-slide class="card bg-gray-300 dark:bg-red-400">
            <div class="card-body text-black dark:text-white">
              <p>
                Pengen sih hiling atau liburan kek orang-orang, tapi apa daya selalu money issue.
              </p>
            </div>
          </swiper-slide>
          <swiper-slide class="card bg-gray-300 dark:bg-green-400">
            <div class="card-body text-black dark:text-white">
              <p>
                Cari lamaran di lokal yang sesuai skill sulit out of skill malah di tolak, di luar banyak tapi apa daya money issue.
              </p>
            </div>
          </swiper-slide>
          <swiper-slide class="card bg-gray-300 dark:bg-gray-400">
            <div class="card-body text-black dark:text-white">
              <p>
                Remote atau freelance kan bisa, iya bisa tapi takut nda selesai apa yang dikerjakan, serasa gk guna banget hidup... 
              </p>
            </div>
          </swiper-slide>
          <swiper-slide class="card bg-gray-300 dark:bg-gray-400">
            <div class="card-body text-black dark:text-white">
              <p>
                Walau begitu, harus tetap semangat menjalanin hidup, walau gk ada yg peduli setidakny ada Anime yang menemani 😌 
              </p>
            </div>
          </swiper-slide>
        </swiper>
        <div class="flex justify-around mt-2">
            <div class="">Like</div>
            <div class="">Comments</div>
            <div class="">Share</div>
        </div>
      </div>
    </div>
</template>
<script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { EffectCards } from "swiper";
  import "swiper/css/effect-cards";
  import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
  import {useAuth} from '@/stores/authStore';
  import { onMounted } from 'vue';
  import 'swiper/css';
  const modules = [EffectCards];
  const current = new Date();
  const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
  const auth = useAuth();
  onMounted(async () => {
    await auth.getUser();
  })
</script>
<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"/>

<style>
.ps {
  height: 200px;
}
</style>