<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <SectionSlider/>
      <div class="content">
        <div class="container">
          <h1 class="text-center">Welcome to</h1>
          <h1 class="text-center">Loreto's Kitchenette</h1>
          <SectionFeatured v-for="(feature, fi) in 4" :key="fi"/>
          <SectionDiscountedEvents/>
          <SectionDiscountedAddOns/>
        </div>
      </div>
      <SectionParalax/>
      <SectionFooter/>
    </main>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import SectionHeader from "@/components/SectionHeader.vue";
  import SectionSlider from "./components/SectionSlider.vue";
  import SectionFeatured from "./components/SectionFeatured.vue";
  import SectionDiscountedEvents from "./components/SectionDiscountedEvents.vue";
  import SectionDiscountedAddOns from "./components/SectionDiscountedAddOns.vue";
  import SectionParalax from "./components/SectionParalax.vue";
  import SectionFooter from "@/components/SectionFooter.vue";

  export default defineComponent({
    name: "HomePage",
    components: { SectionFooter, SectionHeader, SectionSlider, SectionFeatured, SectionDiscountedEvents, SectionDiscountedAddOns, SectionParalax }
  });

</script>