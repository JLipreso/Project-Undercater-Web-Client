<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <div class="content">
        <SectionBanner title="Contact Us" />
        <div class="container">
          <div class="row py-5">
            <div class="col-lg-4">
              <div class="card">
                <div class="card-body">
                  <h3>Get in Touch</h3>
                  <p class="mt-4">At UnderCater Restaurant, we value your feedback and inquiries. Whether you have questions, suggestions, or need assistance, our team is here to help. Please feel free to reach out to us through your preferred method of communication. We look forward to hearing from you!</p>
                  <p>If you have questions or comments, please get a hold of us in whichever way is most convenient. Ask away.</p>
                  <h3 class="mt-4">Follow Us on:</h3>
                  <table class="table table-borderless">
                    <tbody>
                      <tr>
                        <td><i class="bi bi-geo-alt-fill fs-3"></i></td>
                        <td>
                          <h5 class="p-0 m-0">Address:</h5>
                          <p class="p-0 m-0"><small>Nice Place Compound Nancasayan 2428 Urdaneta, Philippines</small></p>
                        </td>
                      </tr>
                      <tr>
                        <td><i class="bi bi-envelope-fill fs-3"></i></td>
                        <td>
                          <h5 class="p-0 m-0">Email:</h5>
                          <p class="p-0 m-0"><small>loretoskitchenette@gmail.com</small></p>
                        </td>
                      </tr>
                      <tr>
                        <td><i class="bi bi-phone fs-3"></i></td>
                        <td>
                          <h5 class="p-0 m-0">Mobile Number:</h5>
                          <p class="p-0 m-0"><small>0915 305 7747</small></p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="card border-0">
                <div class="card-body">
                  <div class="px-sm-0 px-lg-4">
                    <h3>Get in Touch</h3>
                    <div class="row">
                      <div class="col-sm-12 col-md-6">
                        <label class="form-label">Your name</label>
                        <input v-model="form.name" type="text" class="form-control form-control-lg" />
                      </div>
                      <div class="col-sm-12 col-md-6">
                        <label class="form-label">Your email</label>
                        <input v-model="form.email" type="text" class="form-control form-control-lg" />
                      </div>
                      <div class="col-12 mt-3">
                        <label class="form-label">Subject</label>
                        <input v-model="form.subject" type="text" class="form-control form-control-lg" />
                      </div>
                      <div class="col-12 mt-3">
                        <label class="form-label">Message</label>
                        <textarea v-model="form.message" class="form-control form-control-lg" style="min-height: 250px;"></textarea>
                      </div>
                      <div class="col-12 mt-3">
                        <button class="btn btn-danger btn-lg" @click="sendMessage()">Send Message</button>
                      </div>
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
  import SectionBanner from "@/components/SectionBanner.vue";
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import $ from 'jquery';

  export default defineComponent({
    name: "ContactPage",
    components: { SectionFooter, SectionHeader, SectionBanner },
    data() {
      return {
        form: {
          name: '',
          email: '',
          subject: '',
          message: ''
        }
      }
    },
    methods: {
      async sendMessage() {
        await axios.get( variable()['api_main'] + "inquiry/send?" + $.param(this.form) ).then( async (response) => {
          if(response.data?.success) {
            Swal.fire({
              title: 'Send',
              text: response.data?.message,
              icon: 'success'
            }).then( async () => {
              this.form.name      = '';
              this.form.email     = '';
              this.form.subject   = '';
              this.form.message   = '';
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