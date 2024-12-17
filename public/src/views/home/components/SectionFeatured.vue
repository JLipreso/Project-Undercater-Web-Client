<template>
  <div class="card border-0">
    <div v-if="(marketing?.photo).includes('mp4')">
      <video class="marketing-cover-photo w-100 bg-dark" :src="marketing?.photo ? marketing?.fullpath : ''" controls></video>
    </div>
    <div v-else>
      <img class="marketing-cover-photo w-100 bg-dark" :src="marketing?.photo ? marketing?.fullpath : '/src/assets/img/hero_1.jpg' "/>
    </div>
    <div class="card-body">
      <h3 class="text-danger">{{ marketing?.title }}</h3>
      <p>{{ marketing?.content }}</p>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "SectionFeatured",
    props: {
      marketing: {
        default: {},
        type: Object
      }
    },
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