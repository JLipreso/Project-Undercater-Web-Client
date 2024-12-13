<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <SectionSlider/>
      <div class="content">
        <div class="container">
          <div class="py-5" data-aos="fade-right" data-aos-duration="800" data-aos-easing="ease-in-out">
            <h1 class="text-center">Welcome to</h1>
            <h1 class="text-center">Loreto's Kitchenette</h1>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-6" v-for="(marketing, mi) in marketings" :key="mi">
              <SectionFeatured :marketing="marketing" />
            </div>
          </div>
          <div class="py-5" data-aos="fade-right" data-aos-duration="800" data-aos-easing="ease-in-out">
            <h1 class="text-center text-danger">Discounted Add-ons</h1>
            <p class="text-center">Enjoy our limited discounted offers for add-ons</p>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-6" v-for="(addon, ai) in addons" :key="ai">
              <SectionDiscountedAddOns :addon="addon"/>
            </div>
          </div>
        </div>
      </div>
      <SectionParalax/>
      <SectionFooter/>
    </main>
  </div>
</template>
<script lang="ts">

  import { defineComponent, toRaw } from 'vue';
  import { variable } from '@/var';
  import SectionHeader from "@/components/SectionHeader.vue";
  import SectionSlider from "./components/SectionSlider.vue";
  import SectionFeatured from "./components/SectionFeatured.vue";
  import SectionDiscountedEvents from "./components/SectionDiscountedEvents.vue";
  import SectionDiscountedAddOns from "./components/SectionDiscountedAddOns.vue";
  import SectionParalax from "./components/SectionParalax.vue";
  import SectionFooter from "@/components/SectionFooter.vue";
  import axios from 'axios';
  import Aos from 'aos';

  export default defineComponent({
    name: "HomePage",
    components: { SectionFooter, SectionHeader, SectionSlider, SectionFeatured, SectionDiscountedEvents, SectionDiscountedAddOns, SectionParalax },
    data() {
      return {
        marketings: [] as any,
        addons: [] as any
      }
    },
    methods: {
      async fetchAllMarketing() {
        await axios.get( variable()['api_main'] + "marketing/fetchAll" ).then( async (response) => {
          this.marketings = response.data;
        });
      },
      async fetchDiscounted() {
        await axios.get( variable()['api_main'] + "add_ons/fetchDiscounted" ).then( async (response) => {
          this.addons = response.data;
        });
      }
    },
    async mounted() {
      await this.fetchAllMarketing().then( async () => {
        await this.fetchDiscounted().then( async () => {
          Aos.init();
          console.log("Home:", toRaw(this.$data));
        });
      });
    },
  });

</script>