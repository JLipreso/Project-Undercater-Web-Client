<template>
  <div>
    <h1>Your Reservation</h1>
    <p>Ensure your booking is as smooth as possible</p>
    <div class="py-4 my-4" style="max-width: 380px;">
      <table class="table" >
        <tbody>
          <tr>
            <td>Date of Visit</td>
            <td>PHP 0.00</td>
          </tr>
          <tr>
            <td>Start Time</td>
            <td></td>
          </tr>
          <tr>
            <td>End Time</td>
            <td></td>
          </tr>
          <tr>
            <td>Add-on</td>
            <td>PHP 0.00</td>
          </tr>
          <tr>
            <td>Food</td>
            <td>PHP 0.00</td>
          </tr>
          <tr>
            <td>Total Pax</td>
            <td>PHP 0.00</td>
          </tr>
          <tr>
            <td>Grand Total</td>
            <td>PHP 0.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "SummarySection",
  });

</script>