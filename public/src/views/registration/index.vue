<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="content">
        <div class="container">
          <div class="container">
            <div class="py-5 my-5">
              <div class="row justify-content-center">
                <div class="col-md-5">
                  <div class="card">
                    <div class="card-header text-center">
                      <h5 class="text-center"><strong>Create Account</strong></h5>
                    </div>
                    <div class="card-body py-5">
                      <div>
                        <div class="form-group row mb-3">
                          <label class="col-sm-4 col-form-label">First name</label>
                          <div class="col-sm-8">
                            <input v-model="form.firstname" type="text" class="form-control form-control-lg">
                          </div>
                        </div>
                        <div class="form-group row mb-3">
                          <label class="col-sm-4 col-form-label">Last name</label>
                          <div class="col-sm-8">
                            <input v-model="form.lastname" type="text" class="form-control form-control-lg">
                          </div>
                        </div>
                        <div class="form-group row mb-3">
                          <label class="col-sm-4 col-form-label">Email address</label>
                          <div class="col-sm-8">
                            <input v-model="form.email" type="email" class="form-control form-control-lg">
                          </div>
                        </div>
                        <div class="form-group row mb-3">
                          <label class="col-sm-4 col-form-label">Mobile Number</label>
                          <div class="col-sm-8">
                            <input v-model="form.contact" type="text" class="form-control form-control-lg">
                          </div>
                        </div>
                        <div class="form-group row mb-3">
                          <label class="col-sm-4 col-form-label">Password</label>
                          <div class="col-sm-8">
                            <input v-model="form.password" type="password" class="form-control form-control-lg">
                          </div>
                        </div>
                        <div class="form-group row mb-3">
                          <label class="col-sm-4 col-form-label">Confirm Password</label>
                          <div class="col-sm-8">
                            <input v-model="form.confirm_password" type="password" class="form-control form-control-lg">
                          </div>
                        </div>
                        <div class="d-flex justify-content-end">
                          <button class="btn btn-primary w-50" @click="register()" :disabled="loading">{{ loading ? 'Please wait...': 'Create Account' }}</button>
                        </div>
                      </div>
                    </div>
                    <div class="card-footer text-center">
                      <small>Don't have an account? 
                        <router-link to="/login">Login here</router-link>
                      </small>
                    </div>
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
  import axios from 'axios';
  import $ from 'jquery';
import Swal from 'sweetalert2';

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
      async register() {
        this.loading = true;
        await axios.get( variable()['api_main'] + "users_customer/register?" + $.param(this.form) ).then( async (response) => {
          this.loading = false;
          if(response.data?.success) {
            Swal.fire({
              title: 'Success',
              text: '',
              icon: 'success'
            }).then( () => {
              this.form.firstname         = '';
              this.form.lastname          = '';
              this.form.email             = '';
              this.form.password          = '';
              this.form.confirm_password  = '';
              this.form.contact           = '';
              this.$router.replace('/registration-verify');
            });
          }
          else {
            Swal.fire({
              title: 'Warning',
              text: response.data?.message,
              icon: 'warning'
            });
          }
        });
      }
    }
  });

</script>