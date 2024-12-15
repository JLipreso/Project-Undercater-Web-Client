<template>
  <div>
    <h1>Your Reservation</h1>
    <p>Ensure your booking is as smooth as possible</p>
    <div class="py-4 my-4" style="max-width: 380px;">
      <div class="card">
        <div class="card-body">
          <h6 class="fw-bold">Date and Time</h6>
          <table class="table table-striped table-borderless">
            <tbody>
              <tr>
                <td style="width: 120px;">Date of Visit</td>
                <td>: {{ profile?.header?.event_date }}</td>
              </tr>
              <tr>
                <td>Start Time</td>
                <td>: {{ profile?.header?.event_start_time }}</td>
              </tr>
              <tr>
                <td>End Time</td>
                <td>: {{ profile?.header?.event_end_time }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card mt-3">
        <div class="card-body">
          <h6 class="fw-bold">Food List</h6>
          <table class="table table-striped table-borderless">
            <tbody>
              <tr v-for="(food, fi) in profile?.foods?.foods" :key="fi">
                <td style="width: 180px;">{{ food?.name }}</td>
                <td>: {{ food?.category }}</td>
                <td><i class="bi bi-x-lg" style="cursor: pointer;" @click="removeFood(food?.booking_food_dataid)" ></i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card mt-3">
        <div class="card-body">
          <h6 class="fw-bold">Add-ons</h6>
          <table class="table table-striped table-borderless">
            <tbody>
              <tr v-for="(addon, pi) in profile?.addons?.addons" :key="pi">
                <td style="width: 180px;">{{ addon?.name }}</td>
                <td>: {{ toCurrencyFormat(addon?.booking_addons_price) }}</td>
                <td><i class="bi bi-x-lg" style="cursor: pointer;" @click="removeAddOns(addon?.booking_addons_dataid)"></i></td>
              </tr>
              <tr>
                <td><b>Total</b></td>
                <td><b>: {{ toCurrencyFormat(profile?.addons?.total) }}</b></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card mt-3">
        <img clss="w-100" :src=" profile?.header?.valid_id_path ? 'https://api-fileserver.jlipreso.com/' + profile?.header?.valid_id_path:'' "/>
        <div class="card-body">
          <h6 class="fw-bold">Valid ID</h6>
        </div>
      </div>
      <table class="table" >
        <tbody>
          <tr>
            <td style="width: 120px;">Inclusion Cost</td>
            <td>
              : <span>{{ toCurrencyFormat(profile?.pax_cost?.value) }} <i class="bi bi-info-circle-fill text-info" :title="profile?.pax_cost?.label" ></i></span>
            </td>
          </tr>
          <tr>
            <td>Grand Total</td>
            <td>: {{ toCurrencyFormat(profile?.grand_total) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">

  import { getBookingDataID } from '@/assets/ts/localStorage';
  import { variable } from '@/var';
  import axios from 'axios';
  import { defineComponent, toRaw } from 'vue';
  import { toCurrency } from '@/assets/ts/formatter';

  export default defineComponent({
    name: "SummarySection",
    props: ['refresh'],
    data() {
      return {
        profile: {} as any
      }
    },
    watch: {
      refresh: async function () {
        this.fetchProfile();
      }
    },
    methods: {
      async fetchProfile() {
        await getBookingDataID().then( async (booking_dataid) => {
          await axios.get( variable()['api_main'] + "booking/profile?booking_dataid=" + booking_dataid ).then( async (profile) => {
            this.profile = profile.data;
          });
        });
      },
      async removeFood(dataid: number) {
        await axios.get( variable()['api_main'] + "booking_foods/remove/" + dataid ).then( async () => {
          await this.fetchProfile();
        });
      },
      async removeAddOns(dataid: number) {
        await axios.get( variable()['api_main'] + "booking_addons/remove/" + dataid ).then( async () => {
          await this.fetchProfile();
        });
      },
      toCurrencyFormat(amount: number) {
        if(isNaN(amount)) {
          return toCurrency(0);
        }
        else {
          return toCurrency(amount);
        }
      }
    },
    async mounted() {
      await this.fetchProfile();
    },
  });

</script>