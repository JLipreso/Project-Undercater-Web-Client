<template>
  <div class="card">
    <img src="https://smallbizclub.com/wp-content/uploads/2017/12/Awesome-Facebook-Cover-Photos.jpg" class="img-fluid" alt="">
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