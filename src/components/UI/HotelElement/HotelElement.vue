<script setup>
import { reactive, defineProps } from 'vue';

import { loadHotels } from '/src/api/index.js';

import HotelName from './HotelName.vue';
import HotelPrice from './HotelPrice.vue';
import HotelCountry from './HotelCountry.vue';
import HotelType from './HotelType.vue';
import HotelReviews from './HotelReviews.vue';
import HotelDescription from './HotelDescription.vue';
import HotelStars from './HotelStars.vue';

const props = defineProps({
  hotels: {
    type: [Array, Object],
    default: [],
  },
});

const hotels = reactive(props.hotels);
</script>

<template>
  <div class="hotel">
    <!-- <div v-for="(hotel, index) in hotels" :key="index" class="hotel"> -->
    <HotelName class="hotel__name">Name: {{ hotels.name }}</HotelName>
    <HotelPrice class="hotel__price">Price: {{ hotels.min_price }}</HotelPrice>
    <HotelCountry class="hotel__country">Country: {{ hotels.country }}</HotelCountry>
    <HotelType class="hotel__type">Type: {{ hotels.type }}</HotelType>
    <HotelReviews class="hotel__reviews">Reviews: {{ hotels.reviews_amount }}</HotelReviews>
    <HotelDescription class="hotel__description">Desc: {{ hotels.description }}</HotelDescription>
    <HotelStars class="hotel__stars" v-model="hotels.stars" />
    <!-- </div> -->
  </div>
</template>

<style lang="scss" scoped>
.hotel {
  width: 835px;
  height: 155px;
  margin: 20px 10px;
  padding: 15px 15px;
  border: 1px solid #eaeaea;
  border-radius: 15px;

  &__stars {
    margin-top: -120px;
  }
}
</style>
