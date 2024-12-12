<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="content">
        <SectionBanner title="Latest News"/>
        <div class="container">
          <div class="row gy-4 py-5">
            <div class="col-lg-4" v-for="(blog, bi) in blogs" :key="bi">
              <CardBlog :blog="blog" />
            </div>
          </div>
        </div>
      </div>
      <SectionFooter/>
    </main>
  </div>
</template>
<script lang="ts">

  import { defineComponent, toRaw } from 'vue';
  import { variable } from '@/var';
  import SectionHeader from "@/components/SectionHeader.vue";
  import SectionFooter from "@/components/SectionFooter.vue";
  import SectionBanner from "@/components/SectionBanner.vue";
  import CardBlog from "./components/CardBlog.vue";
  import axios from 'axios';
  
  export default defineComponent({
    name: "BlogPage",
    components: { CardBlog, SectionBanner, SectionFooter, SectionHeader },
    data() {
      return {
        blogs: [] as any
      }
    },
    methods: {
      async fetchAllBlog() {
        await axios.get( variable()['api_main'] + "blog/fetchAll" ).then( async (response) => {
          this.blogs = response.data;
        });
      }
    },
    async mounted() {
      await this.fetchAllBlog().then( async () => {
        console.log("Blog:", toRaw(this.$data));
      });
    },
  });

</script>