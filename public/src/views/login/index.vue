<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="content">
        <div class="container">
          <div class="py-5 my-5">
            <div class="row justify-content-center">
              <div class="col-md-5">
                <div class="card">
                  <div class="card-header text-center">
                    <h5 class="text-center"><strong>Login</strong></h5>
                  </div>
                  <div class="card-body py-5">
                    <div>
                      <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input v-model="form.email" type="email" class="form-control form-control-lg" id="email" name="email" required>
                      </div>
                      <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input v-model="form.password" type="password" class="form-control form-control-lg" id="password" name="password" required>
                      </div>
                      <div class="d-flex justify-content-end">
                        <button class="btn btn-primary w-50" @click="login()" :disabled="loading">{{ loading ? 'Please wait...':'Login' }}</button>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer text-center">
                    <small>
                      Don't have an account? 
                      <router-link to="/registration">Register here</router-link>
                    </small>
                  </div>
                </div>
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
  import { variable } from '@/var';
  import SectionHeader from "@/components/SectionHeader.vue";
  import SectionFooter from "@/components/SectionFooter.vue";
  import $ from 'jquery';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import ls from 'localstorage-slim';
  import { getLocalUser } from '@/assets/ts/localStorage';
  
  export default defineComponent({
    name: "LoginPage",
    components: { SectionFooter, SectionHeader },
    data() {
      return {
        loading: false,
        form: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      async login() {
        this.loading = true;
        await axios.get( variable()['api_main'] + "users_customer/login?" + $.param(this.form) ).then( async (response) => {
          this.loading = false;
          if(response.data?.success) {
            ls.set('user', response.data?.profile, { encrypt: true });
            this.$router.push('/events');
          }
          else {
            Swal.fire({
              title: 'Warning',
              text: response.data?.message,
              icon: 'warning'
            }).then( async () => {
              this.form.email     = '';
              this.form.password  = '';
            });
          }
        });
      }
    },
    async mounted() {
      await getLocalUser().then( async (user) => {
        console.log(user);
      });
    },
  });

</script>