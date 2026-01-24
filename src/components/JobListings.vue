<script setup>
  import JobListing from './JobListing.vue';

import { RouterLink } from 'vue-router';
import { reactive, defineProps, onMounted } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});

const state = reactive({
  jobs: [],
  isLoading: true,
});

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/items');
    state.jobs = response.data;
  } catch (error) {
    console.error('Error fetching items', error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <div class="bg-sky-50">
  <section class="bg-sky-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-black-500 mb-6 text-center">
        Browse Items
      </h2>

      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>


      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListing
          v-for="job in state.jobs.slice(0, limit || state.jobs.length)"
          :key="job.id"
          :job="job"
        />
      </div>
    </div>
  </section>
  <section v-if="showButton" class="m-auto max-w-lg px-6 py-10">
    <RouterLink
      to="/items"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">
      View All Items
      </RouterLink>
  </section>
  </div>
</template>
