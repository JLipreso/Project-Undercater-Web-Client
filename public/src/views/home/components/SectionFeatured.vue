<template>
  <div class="py-3">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <h1 class="text-info">Food, substance consisting of protein, carbohydrate, fat, and other nutrients</h1>
        <p>
          Material consisting essentially of protein, carbohydrate, and fat used in the body of an organism to sustain growth, repair, and vital processes and to furnish energy. also : such material together with supplementary substances (as minerals, vitamins, and
        </p>
      </div>
      <div class="col-sm-12 col-md-6">
        <img class="w-100" src="/src/assets/img/hero_1.jpg"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "SectionFeatured",
    components: { }
  });

</script>
<style scoped>
  img {
    max-height: 300px;
    object-fit: cover;
    object-position: center;
  }
</style>