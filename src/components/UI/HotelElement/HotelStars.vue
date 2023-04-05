<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

import vue3StarRatings from 'vue3-star-ratings';


const emits = defineEmits(['update:modelValue']);

const { modelValue } = defineProps({
  modelValue: Number,
});

const value = ref(modelValue);

const starRating = {
  showControl: false,
  starSize: '10',
  starColor: '#FFA900',
  inactiveColor: '#D7D7D7',
};

watch(value, () => {
  emits('update:modelValue', value.value);
});
</script>

<template>
  <div>
    <span>
      <vue3-star-ratings
        v-model="value"
        :showControl="starRating.showControl"
        :starSize="starRating.starSize"
        :starColor="starRating.starColor"
        :inactiveColor="starRating.inactiveColor"
      />
    </span>
  </div>
</template>

<style scoped>
</style>
