<template>
  <div>
    <swiper :modules="modules" navigation :pagination="{ clickable: true }" :slides-per-view="1" :space-between="0" @swiper="onSwiper">
      <swiper-slide>
        <img class="home-banner-slider w-100" src="/src/assets/image/loretosHomeBanner.jpg"/>
      </swiper-slide>
      <swiper-slide>
        <img class="home-banner-slider w-100" src="/src/assets/image/loretosHomeBanner.jpg"/>
      </swiper-slide>
      <swiper-slide>
        <img class="home-banner-slider w-100" src="/src/assets/image/loretosHomeBanner.jpg"/>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import { Navigation, Pagination } from 'swiper/modules';
  import { Swiper, SwiperSlide } from 'swiper/vue';

  export default defineComponent({
    name: "SectionSlider",
    components: { Swiper, SwiperSlide },
    setup() {
      return {
        modules: [Navigation, Pagination],
      }
    },
    data() {
      return {
        swiper: {} as any,
      }
    },
    methods: {
      onSwiper(event: any) {
        this.swiper = event;
      }
    }
  });

</script>
<style scoped>
  .home-banner-slider {
    height: calc(100vh - 100px);
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
</style>