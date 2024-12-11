<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="content">
        <SectionBanner title="Events" description="Come for the Food, stay for the memories"/>
        <div class="container py-5">
          <div class="row">
            <div class="col-sm-12 col-lg-6" v-for="(event, ei) in 3" :key="ei">
              <CardEvent @openModal="()=>{ modal.checkAvailability = true; }"/>
            </div>
          </div>
        </div>
      </div>
      <SectionFooter/>
    </main>
    <ModalEventAvailability :open="modal.checkAvailability" @closed="()=>{ modal.checkAvailability = false; }" />
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import SectionHeader from "@/components/SectionHeader.vue";
  import SectionFooter from "@/components/SectionFooter.vue";
  import SectionBanner from "@/components/SectionBanner.vue";
  import CardEvent from "./components/CardEvent.vue";
  import ModalEventAvailability from "./components/ModalEventAvailability.vue";

  export default defineComponent({
    name: "EventsPage",
    data() {
      return {
        modal: {
          checkAvailability: false
        }
      }
    },
    components: { ModalEventAvailability, CardEvent, SectionBanner, SectionFooter, SectionHeader }
  });

</script>
<style scoped>
  .display {
    display: block;
    background-color: #0a0a0a42;
  }
</style>