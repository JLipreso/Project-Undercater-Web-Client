<template>
  <div class="card border-0">
    <img class="w-100" :src="addon?.photo ? 'https://api-fileserver.jlipreso.com/' + addon?.photo : '/src/assets/img/hero_1.jpg'"/>
    <div class="card-body">
      <h3 class="text-dark">{{ addon?.name }}</h3>
      <p class="px-4 py-0">{{ addon?.description }}</p>
      <div class="px-4 py-0 mt-4 border-left-orange">
        <h1>{{ toCurrencyFormat(addon?.priceSale) }}</h1>
        <h5>Before <span style="text-decoration: line-through;">{{ toCurrencyFormat(addon?.price) }}</span></h5>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import { toCurrency } from '@/assets/ts/formatter';

  export default defineComponent({
    name: "SectionFeatured",
    props: {
      addon: {
        default: {},
        type: Object
      }
    },
    methods: {
      toCurrencyFormat(amount: number) {
        return toCurrency(amount);
      }
    }
  });

</script>
<style scoped>
  img {
    max-height: 300px;
    object-fit: cover;
    object-position: center;
  }
</style>