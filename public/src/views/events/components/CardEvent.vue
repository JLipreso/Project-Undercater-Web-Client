<template>
  <div class="card border-0 m-4">
    <img class="w-100" src="/src/assets/image/about-image-3.png"/>
    <div class="card-body p-0 mt-4">
      <div class="d-flex justify-content-between align-items-center pb-4">
        <h1>{{ event?.name }}</h1>
        <button class="btn btn-primary btn-lg mt-3" @click="openModal(event)">Select Event</button>
      </div>
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
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "CardEvent",
    emits: ['openModal'],
    props: {
      event: {
        default: {} as any,
        type: Object
      }
    },
    methods: {
      openModal(event: Object) {
        this.$emit('openModal', { data: event });
      }
    }
  });

</script>