<script setup>
import { reactive, ref } from 'vue';

import HotelElement from '../components/UI/HotelElement/HotelElement.vue';
import SearchMain from '../components/UI/CountrySearch/SearchMain.vue';
import ApplyFilterBtn from '../components/UI/FilterBtns/ApplyFilterBtn.vue';

import { loadHotels } from '/src/api/index.js';


const state = reactive({
  hotels: [],
});

state.hotels = await loadHotels();
 
function sortHotelsByCountries(countries) {
  if (countries === undefined) {
    console.log("state.hotels: ", state.hotels);
    return state.hotels;
  }
  state.hotels = countries;
  return state.hotels;
}

function onClickApplyBtn() {
  console.log("click");
}


</script>

<template>
  <div>
    <SearchMain @sort-hotels-by-countries="sortHotelsByCountries" />
    <div v-for="(hotel, index) in sortHotelsByCountries()" :key="index">
      <HotelElement :hotels="hotel" />
    </div>
    <ApplyFilterBtn @on-click-apply-btn="onClickApplyBtn" />
  </div>
</template>

<style scoped></style>
