<template>
  <div>
    <h1>Place Reservation</h1>
    <div class="mt-4">
      <h4>Guest Details Of Who Will Pay the Booking</h4>
      <p>Fill in your information below.</p>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <label class="form-label">First name</label>
          <input v-model="form.first_name" type="text" class="form-control form-control-lg">
        </div>
        <div class="col-sm-12 col-md-6">
          <label class="form-label">Last name</label>
          <input v-model="form.last_name"  type="text" class="form-control form-control-lg">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <label class="form-label">Email</label>
          <input v-model="form.email" type="text" class="form-control form-control-lg">
        </div>
        <div class="col-sm-12 col-md-6">
          <label class="form-label">Phone</label>
          <input v-model="form.phone" type="text" class="form-control form-control-lg">
        </div>
      </div>
      <p>Update ID Photo</p>
      <p>Please read and agree to the terms and conditions before proceeding:</p>
      <div style="text-align: left; max-height: 150px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
        <p>Non-Refundable Deposit : By proceeding with the payment, you acknowledge that 50% of the total amount is non-refundable deposit to confirm your booking .</p>
        <p>Rescheduling : you may reschedule the event, subject to availability, with advance notice as per our policy. additional charge may apply.</p>
        <p>Final Payment : The remaining balance must be settled by the specified deadline before the event</p>
        <p>Changes or cancellations may incur charges.</p>
        <p>All information provided must be accurate.</p>
      </div>
      <div style="text-align: left;">
        <input type="checkbox" id="agreeCheckbox">
        <label for="agreeCheckbox"> I agree to the terms and conditions</label>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <button class="btn btn-outline-secondary btn-lg me-4" style="width: 200px;" @click="backSlide()" :disabled="loading">Back</button>
      <button class="btn btn-primary btn-lg" style="width: 200px;" @click="postBooking()" :disabled="loading">Reserve Booking</button>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import { variable } from '@/var';
  import axios from 'axios';
  import { getBookingDataID } from '@/assets/ts/localStorage';
  import Swal from 'sweetalert2';
  import $ from 'jquery';

  export default defineComponent({
    name: "SlideContent5",
    emits: ['next', 'back', 'refresh'],
    data() {
      return {
        loading: false,
        form: {
          booking_dataid: '',
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          total_price: 0
        }
      }
    },
    methods: {
      async postBooking() {
        this.loading = true;
        await getBookingDataID().then( async (booking_dataid) => {
          this.form.booking_dataid = booking_dataid;
          await axios.get( variable()['api_main'] + "booking/profile?booking_dataid=" + booking_dataid ).then( async (profile) => {
            this.form.total_price = profile.data?.grand_total;
            await axios.get( variable()['api_main'] + "booking/placeReservation?" + $.param(this.form) ).then( async (response) => {
              this.loading = false;
              if(response.data?.success) {
                Swal.fire({
                  title: 'Success',
                  text: response.data?.message,
                  icon: 'success'
                }).then( async () => {
                  this.form.booking_dataid  = '';
                  this.form.first_name      = '';
                  this.form.last_name       = '';
                  this.form.email           = '';
                  this.form.phone           = '';
                  this.$router.replace('/events-booking-placed');
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
        });
        
      },
      backSlide() {
        this.$emit('back', { data: { index: 2 }});
      }
    }
  });

</script>