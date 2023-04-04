import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import "vue-select/dist/vue-select.css";

import vue3StarRatings from 'vue3-star-ratings';
import vSelect from "vue-select";


const app = createApp(App);

app.component("v-select", vSelect);
app.component('vue3-star-ratings', vue3StarRatings);
app.mount('#app');

