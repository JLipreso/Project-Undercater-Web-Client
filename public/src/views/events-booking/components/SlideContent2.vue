<template>
  <div>
    <div class="d-flex justify-content-between">
      <h1>Add Food</h1>
      <button class="btn btn-primary btn-lg w-25">Add to Cart</button>
    </div>
    <div class="py-4">
      <swiper :modules="modules" :slides-per-view="1" :space-between="5" navigation @swiper="onSwiper">
        <swiper-slide v-for="(menu, mi) in 7" :key="mi">
          <div class="card border-0">
            <img src="https://static.vecteezy.com/system/resources/previews/036/804/331/non_2x/ai-generated-assorted-indian-food-on-dark-wooden-background-free-photo.jpg" />
            <div class="card-body">
              <h1>Fried Chicken</h1>
              <p>Fried chicken is crispy, golden chicken seasoned and deep-fried to perfection, tender and juicy inside.</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="d-flex justify-content-end">
      <button class="btn btn-outline-secondary btn-lg me-4" style="width: 200px;" @click="backSlide()">Back</button>
      <button class="btn btn-primary btn-lg" style="width: 200px;" @click="nextSlide()">Next</button>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import { Navigation, Pagination } from 'swiper/modules';
  import { Swiper, SwiperSlide } from 'swiper/vue';

  export default defineComponent({
    name: "SlideContent2",
    components: { Swiper, SwiperSlide },
    emits: ['next', 'back'],
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
      },
      nextSlide() {
        this.$emit('next', { data: { index: 2 }});
      },
      backSlide() {
        this.$emit('back', { data: { index: 0 }});
      }
    }
  });

</script>