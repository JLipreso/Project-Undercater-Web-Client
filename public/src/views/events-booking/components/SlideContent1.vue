<template>
  <div>
    <h1>Theme and packs</h1>
    <p>Select your prefered theme and number of packs to continue</p>

    <div class="my-5">
      <div class="mb-3 mt-2">
        <div class="row">
          <div class="col-6">
            <label class="form-label me-2">Event</label>
            <input type="text" :value="event?.name" class="form-control form-control-lg" :readonly="true"/>
          </div>
          <div class="col-6">
            <label class="form-label me-2">Event Location <sup class="text-danger">*</sup></label>
            <select v-model="form.event_location" class="form-control form-control-lg">
              <option value="0">Select location</option>
              <option value="IN">Restaurant venue</option>
              <option value="OUT">Customer's choice</option>
            </select>
          </div>
        </div>
      </div>
      <div class="mb-3 mt-2">
        <label class="form-label me-2">Per Pax</label>
        <input type="text" :value="`PHP ${ event?.price }`" class="form-control form-control-lg" :readonly="true"/>
      </div>
      <div class="mb-3 mt-2">
        <div class="d-flex justify-content-between align-items-center">
          <label class="form-label me-2">Select theme <sup class="text-danger">*</sup></label>
          <button class="btn btn-secondary btn-sm px-2 py-0" @click="fetchAllThemes()">
            <i class="bi bi-arrow-clockwise fw-bold text-white"></i>
            <span>Reload</span>
          </button>
        </div>
        <select v-model="form.event_theme_dataid"  class="form-control form-control-lg">
          <option value="0">Select theme</option>
          <option v-for="(theme, ti) in themes" :key="ti" :value="theme?.dataid">{{ theme?.name }}</option>
        </select>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="mb-3 mt-2">
            <label class="form-label">Number of Pax (Min. 20) <sup class="text-danger">*</sup></label>
            <input v-model="form.event_pax"  type="number" class="form-control form-control-lg" @input="onPaxChanged()" />
          </div>
        </div>
        <div class="col-6">
          <div class="mb-3 mt-2">
            <label class="form-label">Total Cost</label>
            <input type="text" :value="`${ toCurrencyFormat(form.event_cost) }`" class="form-control form-control-lg" :readonly="true"/>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary btn-lg" style="width: 200px;" @click="nextSlide()">Next</button>
    </div>
  </div>
</template>
<script lang="ts">

  import { variable } from '@/var';
  import { defineComponent } from 'vue';
  import { toCurrency } from '@/assets/ts/formatter';
  import axios from 'axios';
  import $ from 'jquery';
import Swal from 'sweetalert2';
import { getLocalUser } from '@/assets/ts/localStorage';

  export default defineComponent({
    name: "SlideContent1",
    emits: ['next'],
    props: {
      event: {
        default: {},
        type: Object
      }
    },
    data() {
      return {
        themes: {} as any,
        form: {
          user_dataid: '',
          event_theme_dataid: 0,
          event_location: '0',
          event_pax: 0,
          event_cost: 0
        }
      }
    },
    methods: {
      async nextSlide() {
        await axios.get( variable()['api_main'] + "booking/themeAndPacks?" + $.param(this.form) ).then( async (response) => {
          if(response.data?.success) {
            this.$emit('next', { data: { index: 1 }});
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
      async fetchAllThemes() {
        await axios.get( variable()['api_main'] + "themes/fetchAll" ).then( async (response) => {
          this.themes = response.data;
        });
      },
      onPaxChanged() {
        var per_pax_price = parseFloat(this.event?.price);
        this.form.event_cost = per_pax_price * this.form.event_pax;
      },
      toCurrencyFormat(amount: number) {
        return toCurrency(amount);
      }
    },
    async mounted() {
      await this.fetchAllThemes().then( async () => {
        await getLocalUser().then( async (user) => {
          this.form.user_dataid = user?.dataid;
        });
      });
    },
  });

</script>