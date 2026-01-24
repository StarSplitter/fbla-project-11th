<script setup>
import { RouterLink } from 'vue-router';
import { defineProps, ref, computed } from 'vue';

const props = defineProps({
  job: Object
});

</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative">
    <div class="p-4">
      <div class="mb-6">
        <h3 class="text-xl font-bold">{{ job.title }}</h3>
        <img :alt="job.title.toUpperCase()" :src="job.image" width="200" />
      </div>

      <div class="border border-gray-100 mb-5"></div>

      <div class="flex flex-col lg:flex-row justify-between mb-4">
        <div class="text-black-700 mb-3">
          {{ job.company.name }}
        </div>
        <RouterLink
          :to="'/items/' + job.id"
          class="h-[36px] bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          Read More
        </RouterLink>
      </div>
    </div>
  </div>
</template>
