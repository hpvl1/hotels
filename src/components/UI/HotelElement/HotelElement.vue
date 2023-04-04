<script setup>
import { reactive, defineProps, toRefs } from 'vue';

import { loadHotels } from '/src/api/index.js';

import HotelName from './HotelName.vue';
import HotelPrice from './HotelPrice.vue';
import HotelCountry from './HotelCountry.vue'
import HotelType from './HotelType.vue';
import HotelReviews from './HotelReviews.vue';
import HotelDescription from './HotelDescription.vue';
import HotelStars from './HotelStars.vue';

const props = defineProps({
  hotels: {
    type: [Array, Object],
    default: [],
  }
});

const hotels = reactive(props.hotels);

</script>

<template>
  <div>
    <div v-for="(hotel, index) in hotels" :key="index" class="hotel">
        <HotelName class="hotel__name">Name: {{ hotel.name }}</HotelName>
        <HotelPrice class="hotel__price">Price: {{ hotel.min_price }}</HotelPrice>
        <HotelCountry class="hotel__country">Country: {{  hotel.country  }}</HotelCountry>
        <HotelType class="hotel__type">Type: {{ hotel.type}}</HotelType>
        <HotelReviews class="hotel__reviews">Reviews: {{ hotel.reviews_amount }}</HotelReviews>
        <HotelDescription class="hotel__description">Desc: {{ hotel.description }}</HotelDescription>
        <HotelStars class="hotel__stars" v-model="hotel.stars"/>
    </div>
  </div>
</template>

<style scoped>
.hotel {
  width: 835px;
  height: 155px;

  border: 1px solid #eaeaea;
  border-radius: 15px;
}

.hotel__stars {
  margin-top: -120px;
}
</style>
