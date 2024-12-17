<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="content">
        <div class="container">
          <div class="container">
            <div class="row">
              <div class="col-5">
                <div class="p-5 bg-dark"></div>
              </div>
              <div class="col-5">
                <div class="p-5 bg-warning"></div>
              </div>
            </div>
          </div>
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

  export default defineComponent({
    name: "RegisterPage",
    components: { SectionFooter, SectionHeader },
    data() {
      return {
        loading: false,
        form: {
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          confirm_password: '',
          contact: '',
        }
      }
    },
    methods: {
      
    }
  });

</script>