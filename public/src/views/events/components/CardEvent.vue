<template>
  <div class="card m-4">
    <img class="w-100" src="/src/assets/image/about-image-3.png"/>
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center pb-4">
        <h1>DEBUT</h1>
        <button class="btn btn-primary btn-lg mt-3" @click="openModal()">Select Event</button>
      </div>
      <p>A debut is a grand celebration of a young woman’s 18th birthday, made memorable with tables and chairs for guests, a fully air-conditioned venue for comfort, and existing décor that adds elegance and charm to the event.</p>
      <p>Max capacity of this event is 60</p>
      <h2 class="p-0 m-0">PHP 300</h2>
      <p class="p-0 m-0">Per Pack</p>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "CardEvent",
    emits: ['openModal'],
    methods: {
      openModal() {
        this.$emit('openModal');
      }
    }
  });

</script>