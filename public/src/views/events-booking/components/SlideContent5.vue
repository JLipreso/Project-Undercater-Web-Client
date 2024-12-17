<template>
  <div>
    <h1 class="text-center">GCash Payment</h1>
    <p class="text-center">
      Scan the GCash QR code below and pay the total amount to complete your booking.<br/>
      You need to pay 50% of the total. Here is 50% of your order.
    </p>
    <img class="gcash-image" src="/src/assets/image/gcashho.png" />
    <p class="text-center fs-4 fw-bold p-0 m-0">Transfer fees may apply</p>
    <p class="text-center fs-2 fw-bold p-0 m-0" style="color: #085bde;">AI**E L.</p>
    <p class="text-center fs-4 fw-bold p-0 m-0">
      <span>Mobile No.: </span>
      <span>091* ****911</span>
    </p>
    <p class="mb-4 text-muted text-center">Once payment is made, upload your receipt to confirm your booking.</p>
    <button class="d-block m-auto btn btn-dark btn-lg w-50" @click="()=>{ open = true }">Upload Receipt</button>
    <div class="modal fade" :class="{ show: open, display: open }" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Receipt Upload</h5>
          </div>
          <div class="modal-body">
            <CardPhotoUploader
              @uploaded="onUploadSuccess"
              @fail="onUploadFail"
            />
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary w-50" @click="()=>{ open = false }">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end mt-4">
      <button class="btn btn-outline-secondary btn-lg me-4" style="width: 200px;" @click="backSlide()">Back</button>
      <button class="btn btn-primary btn-lg" style="width: 200px;" @click="nextSlide()">Next</button>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import { getBookingDataID } from "@/assets/ts/localStorage.ts";
  import { variable } from '@/var';
  import CardPhotoUploader from "@/components/CardPhotoUploader.vue";
  import Swal from 'sweetalert2';
  import axios from 'axios';
  import $ from 'jquery';

  export default defineComponent({
    data() {
      return {
        open: false,
        done: false
      }
    },
    components: { CardPhotoUploader },
    methods: {
      async onUploadSuccess(event: any) {
        await getBookingDataID().then( async (booking_dataid) => {
          var args = {
            booking_dataid: booking_dataid,
            photo: event?.data?.filepath
          };
          await axios.get( variable()['api_main'] + "booking/updatePaymentReceipt?" + $.param(args)).then( async (response) => {
            if(response.data?.success) {
              this.done = true;
              Swal.fire({
                title: 'Uploaded',
                text: 'Payment receipt uploaded successfully',
                icon: 'info'
              }).then( () => {
                this.$emit('next', { data: { index: 5 }});
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
        });
      },
      onUploadFail(event: any) {
        Swal.fire({
          title: 'Warning',
          text: 'Fail to upload photo, try again later.',
          icon: 'warning'
        });
      },
      nextSlide() {
        if(this.done) {
          this.$emit('next', { data: { index: 5 }});
        }
        else {
          Swal.fire({
            title: 'Required',
            text: 'Payment receipt is required to continue',
            icon: 'warning'
          });
        }
      },
      backSlide() {
        this.$emit('back', { data: { index: 3 }});
      },
    }

  });

</script>
<style scoped>
  .display {
    display: block;
    background-color: #0a0a0a42;
  }
  .gcash-image {
    display: block;
    margin: 0 auto;
    width: 300px;
  }
</style>