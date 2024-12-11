<template>
  <div>
    <h1>Theme and packs</h1>
    <p>Select your prefered theme and number of packs to continue</p>
    <div class="py-5 my-5">
      <div class="mb-3 mt-2">
        <label class="form-label">Select theme</label>
        <select class="form-control form-control-lg">
          <option value="0">Select theme</option>
        </select>
      </div>
      <div class="mb-3 mt-2">
        <label class="form-label">Number of Pax</label>
        <input type="number" value="20" class="form-control form-control-lg">
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <p class="p-0 m-0">Total Pax:</p>
        <h3 class="p-0 m-0 fw-bold">PHP 50,000</h3>
      </div>
      <div>
        <button class="btn btn-primary btn-lg" style="width: 200px;" @click="nextSlide()">Next</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "SlideContent1",
    emits: ['next'],
    methods: {
      nextSlide() {
        this.$emit('next', { data: { index: 1 }});
      }
    }
  });

</script>