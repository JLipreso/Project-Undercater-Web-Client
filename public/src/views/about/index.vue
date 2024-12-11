<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="content">
        <SectionBanner title="About Us"/>
        <div class="container">
          <div class="row py-5">
            <div class="col-sm-12 col-md-6">
              <h1>ENJOY our Offer Services</h1>
              <h3 class="mt-5">Who we are</h3>
              <p>Loreto’s Kitchenette is a family-owned food business selling Classic Filipino dishes coming from the owners’ secret family recipes. It is located at Nice Place Compound Nancayasan, Urdaneta City, Pangasinan, Philippines. Loreto’s Kitchenette is owned by Remedios P. Sibayan with her partner Ainie E. Jardin. It was established on January 4, 2022, and they started with 4 staff members in their management, and the current staff is 9. It was named after the cook Loreto Corpuz who passed away in 2021.</p>
              <h3 class="mt-5">What we do</h3>
              <p>We specialize in planning and executing events of all sizes, offering services such as venue setup with comfortable tables and chairs, fully air-conditioned spaces, and elegant décor. From start to finish, we handle every detail so you can relax and enjoy your special moments.</p>
              <h3 class="mt-5 text-center">Service Inclusion</h3>
              <div class="d-flex justify-content-center">
                <div class="card">
                  <div class="card-body">
                    <img src="/src/assets/image/icon-cup.png"/>
                    <h5 class="text-center">Breakfast</h5>
                  </div>
                </div>
                <div class="p-3"></div>
                <div class="card">
                  <div class="card-body">
                    <img src="/src/assets/image/icon-ac.png"/>
                    <h5 class="text-center">Air Conditioning</h5>
                  </div>
                </div>
                <div class="p-3"></div>
                <div class="card">
                  <div class="card-body">
                    <img src="/src/assets/image/icon-led.png"/>
                    <h5 class="text-center">TV LCD</h5>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center mt-4">
                <div class="card">
                  <div class="card-body">
                    <img src="/src/assets/image/icon-wifi.png"/>
                    <h5 class="text-center">Wi-fi</h5>
                  </div>
                </div>
                <div class="p-3"></div>
                <div class="card">
                  <div class="card-body p-1">
                    <img src="/src/assets/image/icon-car.png"/>
                    <h5 class="text-center">Free Parking</h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6">
              <swiper :modules="modules" navigation :pagination="{ clickable: true }" :slides-per-view="1" :space-between="0" @swiper="onSwiper">
                <swiper-slide><img class="about-image" src="/src/assets/image/about-image-1.png"/></swiper-slide>
                <swiper-slide><img class="about-image" src="/src/assets/image/about-image-2.png"/></swiper-slide>
                <swiper-slide><img class="about-image" src="/src/assets/image/about-image-3.png"/></swiper-slide>
                <swiper-slide><img class="about-image" src="/src/assets/image/about-image-4.png"/></swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </div>
      <SectionFooter/>
    </main>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import SectionHeader from "@/components/SectionHeader.vue";
  import SectionFooter from "@/components/SectionFooter.vue";
  import SectionBanner from "@/components/SectionBanner.vue";
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Navigation, Pagination } from 'swiper/modules';

  export default defineComponent({
    name: "AboutPage",
    components: { SectionBanner, SectionFooter, SectionHeader, Swiper, SwiperSlide },
    setup() {
      return {
        modules: [Navigation, Pagination],
      }
    },
    data() {
      return {
        swiper: {} as any
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
  .about-image {
    width: 100%;
    height: 750px;
    object-fit: cover;
  }
</style>