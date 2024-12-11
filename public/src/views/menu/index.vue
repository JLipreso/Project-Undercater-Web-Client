<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="content">
        <SectionBanner title="The Menu" description="Ridiculus sociosqu cursus neque cursus curae ante scelerisque vehicula."/>
        <div class="container">
          <div class="p-5 m-5 bg-success"></div>
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

  export default defineComponent({
    name: "MenuPage",
    components: { SectionBanner, SectionFooter, SectionHeader }
  });

</script>