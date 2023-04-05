<script setup>
import { reactive, computed, watch } from 'vue';
import { createPopper } from '@popperjs/core';

import { loadCountries, loadHotels } from '/src/api/index.js';

const state = reactive({
  hotels: [],
  countries: [],
  selectedCountries: [],
  newHotels: [],
});

const emit = defineEmits(['sortHotelsByCountries']);

const placement = 'top';

state.countries = await loadCountries();
state.hotels = await loadHotels();

function getCountryName() {
  return state.countries.map((item) => item.name);
}

const sortCountryName = computed(() => {
  const countries = getCountryName();
  return countries.sort((a, b) => a.localeCompare(b));
});

const findCountryByName = computed(() => {
  const countries = [];

  if (state.countries.length == 0 || state.selectedCountries.length == 0) return;
  let i = 0;
  let j;
  while (i < state.countries.length) {
    // для каждого элемента state.countries
    j = 0;
    while (j < state.selectedCountries.length) {
      if (state.countries[i].name === state.selectedCountries[j]) {
        countries.push(state.countries[i].name);
        break;
      }
      j++;
    }
    i++;
  }
  return countries;
});

function setCountryFilter() {

  if (state.hotels.length == 0 || state.selectedCountries.length == 0) return state.hotels;
  let i = 0;
  let j;
  state.newHotels = [];
  while (i < state.hotels.length) {
    // для каждого элемента state.hotels
    j = 0;
    while (j < state.selectedCountries.length) {
      if (state.hotels[i].country === state.selectedCountries[j]) {
        state.newHotels.push(state.hotels[i]);
        break;
      }
      j++;
    }
    i++;
  }
  emit('sortHotelsByCountries', state.newHotels);
  return;
}

watch(findCountryByName, () => {
  setCountryFilter();
});

function withPopper(dropdownList, component, { width }) {
  /**
   * We need to explicitly define the dropdown width since
   * it is usually inherited from the parent with CSS.
   */
  dropdownList.style.width = width;
  dropdownList.style.height = '202px';
  // dropdownList.style.marginTop = '12px';

  /**
   * Here we position the dropdownList relative to the $refs.toggle Element.
   *
   * The 'offset' modifier aligns the dropdown so that the $refs.toggle and
   * the dropdownList overlap by 1 pixel.
   *
   * The 'toggleClass' modifier adds a 'drop-up' class to the Vue Select
   * wrapper so that we can set some styles for when the dropdown is placed
   * above.
   */
  const popper = createPopper(component.$refs.toggle, dropdownList, {
    placement: placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 30],
        },
      },
      {
        name: 'toggleClass',
        enabled: true,
        phase: 'write',
        fn({ state }) {
          component.$el.classList.toggle('drop-up', state.placement === 'top');
        },
      },
    ],
  });

  /**
   * To prevent memory leaks Popper needs to be destroyed.
   * If you return function, it will be called just before dropdown is removed from DOM.
   */
  return () => popper.destroy();
}
</script>

<template>
  <div>
    <v-select
      v-model="state.selectedCountries"
      :options="sortCountryName"
      placeholder="Поиск стран"
      class="select"
      :searchable="true"
      :filterable="true"
      :multiple="true"
      append-to-body
      :close-on-select="true"
      :calculate-position="withPopper"
      :dropdown-should-open="() => true"
    />
  </div>
  <div>selectedCountries: {{ state.selectedCountries }}</div>
  <div>
    <ul>
      <li v-for="(country, index) in findCountryByName" :key="index" v-text="country"></li>
    </ul>
  </div>
</template>

<style scoped>
.select {
  width: 325px;
  margin-bottom: 250px;
}

#vs2__listbox {
  margin-top: 20px;
  padding-top: 120px;
}

.select .vs__dropdown-menu {
  margin-top: 20px;
  padding-top: 120px;
}

.v-select.drop-up.vs--open .vs__dropdown-toggle {
  border-radius: 0 0 4px 4px;
  border-top-color: transparent;
  border-bottom-color: rgba(60, 60, 60, 0.26);
}

[data-popper-placement='top'] {
  border-radius: 4px 4px 0 0;
  border-top-style: solid;
  border-bottom-style: none;
  box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.15);
}
</style>
