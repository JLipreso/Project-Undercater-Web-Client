<template>
  <div class="modal fade" :class="{ show: open, display: open }" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Check Availability</h5>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-12 col-md-7">
              <img class="w-100" src="/src/assets/image/about-image-3.png"/>
              <h1>DEBUT</h1>
              <p>A debut is a grand celebration of a young woman’s 18th birthday, made memorable with tables and chairs for guests, a fully air-conditioned venue for comfort, and existing décor that adds elegance and charm to the event.</p>
              <p>Max capacity of this event is 60</p>
            </div>
            <div class="col-sm-12 col-md-5">
              <div class="alert alert-info">
                <h2 class="p-0 m-0 text-dark">PHP 300</h2>
                <p class="p-0 m-0 text-dark">Per Pack</p>
                <div class="mb-3 mt-5">
                  <label class="form-label">Date of Visit</label>
                  <input type="date" class="form-control form-control-lg">
                </div>
                <div class="mb-3 mt-2">
                  <label class="form-label">Select Start Time</label>
                  <input type="time" class="form-control form-control-lg">
                </div>
                <div class="mb-3 mt-2">
                  <label class="form-label">Select End Time</label>
                  <input type="time" class="form-control form-control-lg">
                </div>
              </div>
              <button class="btn btn-primary btn-lg w-100 mt-4" @click="checkAvailability()" >Check Availability</button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal()">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "ModalEventAvailability",
    props: {
      open: {
        default: true,
        type: Boolean
      }
    },
    methods: {
      async closeModal() {
        this.$emit("closed");
      },
      async checkAvailability() {
        this.$router.push('/events-booking');
      }
    }
  });

</script>

