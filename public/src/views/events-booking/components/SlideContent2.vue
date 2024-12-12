<template>
  <div>
    <h1>Add Food</h1>
    <p class="m-0">Please select {{ validate.dish }} food and {{ validate.dessert }} dessert</p>
    <div class="py-4">
      <swiper :modules="modules" :slides-per-view="1.5" :space-between="5" navigation @swiper="onSwiper">
        <swiper-slide v-for="(menu, mi) in menus" :key="mi">
          <div class="card border-1">
            <img src="https://static.vecteezy.com/system/resources/previews/036/804/331/non_2x/ai-generated-assorted-indian-food-on-dark-wooden-background-free-photo.jpg" />
            <div class="card-body" style="overflow-y:auto;height: 240px;">
              <h4>{{ menu?.name }}</h4>
              <p>{{ menu?.description }}</p>
              <p>Category: <span class="badge text-bg-warning">{{ menu?.category }}</span></p>
            </div>
            <div class="card-footer">
              <button class="btn btn-clear-primary w-100" @click="addToCart(menu)" >Add to Cart</button>
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
  import { variable } from '@/var';
  import { getBookingDataID } from '@/assets/ts/localStorage';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import $ from 'jquery';

  export default defineComponent({
    name: "SlideContent2",
    components: { Swiper, SwiperSlide },
    emits: ['next', 'back', 'refresh'],
    setup() {
      return {
        modules: [Navigation, Pagination],
      }
    },
    data() {
      return {
        swiper: {} as any,
        menus: [] as any,
        validate: {
          dish: 5,
          dessert: 1
        }
      }
    },
    methods: {
      onSwiper(event: any) {
        this.swiper = event;
      },
      async nextSlide() {
        await getBookingDataID().then( async (booking_dataid) => {
          var args = {
            booking_dataid: booking_dataid,
            target_dish: this.validate.dish,
            target_dessert: this.validate.dessert
          };
          await axios.get( variable()['api_main'] + "booking_foods/verify?" + $.param(args) ).then( async (response) => {
            if(response.data?.success) {
              this.$emit('next', { data: { index: 2 }});
            }
            else {
              Swal.fire({
                title: 'Warning',
                text: response.data?.message,
                icon: 'warning'
              });
            }
          });
        });
      },
      backSlide() {
        this.$emit('back', { data: { index: 0 }});
      },
      async fetchAllMenu() {
        await axios.get( variable()['api_main'] + "menu/fetchAll" ).then( async (response) => {
          this.menus = response.data;
        });
      },
      async addToCart(menu: any) {
        await getBookingDataID().then( async (dataid) => {
          await axios.get( variable()['api_main'] + "booking_foods/add?booking_dataid="+ dataid +"&menu_dataid=" + menu?.dataid + "&menu_category=" + menu?.category ).then( async (response) => {
            if(response.data?.success) {
              Swal.fire({
                title: 'Added',
                icon: 'success'
              }).then( async () => {
                this.$emit('refresh');
              });
            }
            else {
              Swal.fire({
                title: 'Warning',
                text: response.data?.message,
                icon: 'warning'
              });
            }
          });
        });
        
      }
    },
    async mounted() {
      await this.fetchAllMenu();
    },
  });

</script>