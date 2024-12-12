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
              <h1>{{ event?.name }}</h1>
              <p>{{ event?.description }}</p>
              <table class="table">
                <tbody>
                  <tr>
                    <td>Min capacity</td>
                    <td>{{ event?.min_occupancy }}</td>
                  </tr>
                  <tr>
                    <td>Max capacity</td>
                    <td>{{ event?.max_occupancy }}</td>
                  </tr>
                  <tr>
                    <td>Price per pack</td>
                    <td>PHP {{ event?.price }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-sm-12 col-md-5">
              <div class="alert alert-info">
                <h2 class="p-0 m-0 text-dark">Enter date and time to verify availability</h2>
                <div class="mb-3 mt-5">
                  <label class="form-label text-dark">Date of Visit</label>
                  <input v-model="form.date" type="date" class="form-control form-control-lg">
                </div>
                <div class="mb-3 mt-2">
                  <label class="form-label text-dark">Select Start Time</label>
                  <input v-model="form.start_time" type="time" class="form-control form-control-lg">
                </div>
                <div class="mb-3 mt-2">
                  <label class="form-label text-dark">Select End Time</label>
                  <input v-model="form.end_time" type="time" class="form-control form-control-lg">
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
  import { variable } from '@/var';
  import { getLocalUser } from '@/assets/ts/localStorage';
  import ls from 'localstorage-slim';
  import axios from 'axios';
  import $ from 'jquery';
  import Swal from 'sweetalert2';


  export default defineComponent({
    name: "ModalEventAvailability",
    props: {
      open: {
        default: true,
        type: Boolean
      },
      event: {
        default: {},
        type: Object
      }
    },
    data() {
      return {
        form: {
          date: '',
          start_time: '',
          end_time: '',
        }
      }
    },
    methods: {
      async closeModal() {
        this.$emit("closed");
      },
      async checkAvailability() {
        await axios.get( variable()['api_main'] + "events/checkAvailability?" + $.param(this.form) ).then( async (response) => {
          console.log(response.data);
          if(response.data?.success) {
            Swal.fire({
              title: "Available",
              text: "Your selected date and time is available, would you like to proceed in booking process?",
              icon: "question",
              showCancelButton: true,
              cancelButtonText: "Maybe later",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, Proceed to Booking"
            }).then( async (result) => {
              if (result.isConfirmed) {
                await this.proceedToBooking();
              }
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
        
      },
      async proceedToBooking() {
        await getLocalUser().then( async (user) => {
          if(user) {
            var args = {
              user_dataid: user?.dataid,
              pax_price: this.event?.price,
              event_dataid: this.event?.dataid,
              event_date: this.form.date,
              event_start_time: this.form.start_time,
              event_end_time: this.form.end_time,
            };
            await axios.get( variable()['api_main'] + "booking/initBooking?" + $.param(args) ).then( async (response) => {
              if(response.data?.success) {
                ls.set('booking-event', this.event );
                ls.set('booking-dataid', response.data?.last_dataid);
                this.$router.replace('/events-booking');
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
          else {
            Swal.fire({
              title: 'Sign In required',
              text: 'Please sign in or create account to continue',
              icon: 'warning'
            });
          }
        });
      }
    }
  });

</script>

