<script setup>
import { reactive } from 'vue';

</script>

<template>
  <div class="apply_btn">
    <button @click="$emit('on-click-apply-btn');">Применить фильтр</button>
  </div>
</template>

<style scoped></style>
