<template>
  <div>
    <SectionHeader/>
    <main class="main">>
      <div class="content">
        <SectionBanner title="Contact Us" />
        <div class="container">
          
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
    name: "ContactPage",
    components: { SectionFooter, SectionHeader, SectionBanner }
  });

</script>