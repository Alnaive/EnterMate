<template>
    <div class="flex justify-center">
      <div class="shadow-lg bg-slate-200 dark:bg-gray-500 card p-2">
        <div class="flex items-center gap-2 mb-2">
          <div class="avatar ">
            <div class="w-16 rounded-full">
              <img src="https://cdn.discordapp.com/avatars/210754498837086209/fd09d58cd822558b930046de4831b7a8.webp?size=128" />
            </div>
          </div>
          <div class="flex flex-col text-md font-bold ">
            <div>Nair ✔</div>
            <div>@Ruler_Of_Reality</div>
            <div class="flex flex-col absolute top-4 right-5">
                <div>Chain Post</div>
                <div>{{ date }}</div>
            </div>
          </div>
        </div>
        <swiper class="flex md:max-w-lg max-w-sm max-h-[400px]  overflow-visible"
            :effect="'cards'"
            :grabCursor="false"
            :modules="modules"
          >
          <swiper-slide class="card bg-gray-300 dark:bg-gray-400">
            <div class="card-body text-black dark:text-white">             
                <h2 class="card-title">Begitu lah Hidup</h2>
                <p>
                    Bengong dikit aja langsung podcast sama diri sendiri.
                </p>
            </div>
          </swiper-slide>
          <swiper-slide class="card bg-gray-300 dark:bg-gray-400">
            <div class="card-body text-black dark:text-white">
              <p>
                Pengen sih hiling atau liburan kek orang-orang, tapi apa daya selalu money issue.
              </p>
            </div>
          </swiper-slide>
          <swiper-slide class="card bg-gray-300 dark:bg-gray-400">
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
  import 'swiper/css';
  const modules = [EffectCards];
  const current = new Date();
  const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;

</script>
<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"/>

<style>
.ps {
  height: 200px;
}
</style>