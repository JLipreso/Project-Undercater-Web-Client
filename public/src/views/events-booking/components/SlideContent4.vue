<template>
  <div>
    <h1>Place Reservation</h1>
    <div class="mt-4">
      <h4>Guest Details Of Who Will Pay the Booking</h4>
      <p>Fill in your information below.</p>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <label class="form-label">First name</label>
          <input type="text" class="form-control form-control-lg">
        </div>
        <div class="col-sm-12 col-md-6">
          <label class="form-label">Last name</label>
          <input type="text" class="form-control form-control-lg">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <label class="form-label">Email</label>
          <input type="text" class="form-control form-control-lg">
        </div>
        <div class="col-sm-12 col-md-6">
          <label class="form-label">Phone</label>
          <input type="text" class="form-control form-control-lg">
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
      <button class="btn btn-outline-secondary btn-lg me-4" style="width: 200px;" @click="backSlide()">Back</button>
      <button class="btn btn-primary btn-lg" style="width: 200px;" @click="postBooking()">Reserve Booking</button>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "SlideContent4",
    emits: ['next', 'back'],
    methods: {
      postBooking() {
        
      },
      backSlide() {
        this.$emit('back', { data: { index: 2 }});
      }
    }
  });

</script>