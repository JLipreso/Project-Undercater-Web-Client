<template>
  <div>
    <h1>Add Addons</h1>
    <div class="py-4">
      <swiper :modules="modules" :slides-per-view="1" :space-between="5" navigation @swiper="onSwiper">
        <swiper-slide v-for="(addon, ai) in addons" :key="ai">
          <div class="card border-0">
            <img :src=" addon?.photo ? 'https://api-fileserver.jlipreso.com/' + addon?.photo : 'https://static.vecteezy.com/system/resources/previews/036/804/331/non_2x/ai-generated-assorted-indian-food-on-dark-wooden-background-free-photo.jpg'" />
            <div class="card-body p-0 mt-4">
              <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h1>{{ addon?.name }}</h1>
                    <div v-if="(addon?.priceSale > 0)" >
                    <h3 class="p-0 m-0">PHP {{ addon?.priceSale }}</h3>
                    <p class="p-0 m-0">Discounted PHP <span style="text-decoration: line-through;">{{ addon?.price }}</span> </p>
                  </div>
                  <div v-else >
                    <h3 class="p-0 m-0">PHP {{ addon?.price }}</h3>
                  </div>
                </div>
                <button class="btn btn-primary btn-lg w-25" @click="addToCart(addon)" >Add to Cart</button>
              </div>
              <div class="d-flex justify-content-end mt-4">
                
              </div>
              <p>{{ addon?.description }}</p>
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
  import $ from 'jquery';
  import Swal from 'sweetalert2';

  export default defineComponent({
    name: "SlideContent3",
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
        addons: [] as any
      }
    },
    methods: {
      onSwiper(event: any) {
        this.swiper = event;
      },
      nextSlide() {
        this.$emit('next', { data: { index: 3 }});
      },
      backSlide() {
        this.$emit('back', { data: { index: 1 }});
      },
      async fetchAddons() {
        await axios.get( variable()['api_main'] + "add_ons/fetchAll" ).then( async (response) => {
          this.addons = response.data;
        });
      },
      async addToCart(addon: any) {
        await getBookingDataID().then( async (booking_dataid) => {
          var args = {
            booking_dataid: booking_dataid,
            addon_dataid: addon?.dataid,
            price: addon?.priceSale > 0 ? addon?.priceSale : addon?.price
          };
          await axios.get( variable()['api_main'] + "booking_addons/add?" + $.param(args)).then( async (response) => {
            if(response.data?.success) {
              Swal.fire({
                title: 'Success',
                text: response.data?.message,
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
      await this.fetchAddons();
    },
  });

</script>