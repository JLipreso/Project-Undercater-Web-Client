<template>
  <div class="card">
    <img class="blog-cover img-fluid" :src=" blog?.photo ? 'https://api-fileserver.jlipreso.com/' + blog?.photo : 'https://smallbizclub.com/wp-content/uploads/2017/12/Awesome-Facebook-Cover-Photos.jpg'" alt="">
    <div class="card-body">
      <h1>{{ blog?.title }}</h1>
      <p>{{ blog?.description }}</p>
    </div>
    <div class="card-footer">
      <button class="btn btn-clear-primary w-100">Read more</button>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent, toRaw } from 'vue';

  export default defineComponent({
    name: "CardBlog",
    props: {
      blog: {
        default: {},
        type: Object
      }
    }
  });

</script>
<style scoped>
  .blog-cover {
    height: 280px;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
</style>