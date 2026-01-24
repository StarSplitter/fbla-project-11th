<script setup>
import { RouterLink } from 'vue-router';
import Card from '@/components/Card.vue';
</script>

<template>
  <!--bg-[linear-gradient(315deg,rgba(145,47,64,0.75)_0%,theme(colors.zinc.400)_100%)]-->
  <section class="bg-sky-50 py-4">
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <Card>
          <h2 class="text-2xl font-uniongothic">Search Items</h2>
          <p class="mt-2 mb-4">
            Search for all lost belongings reported found
          </p>
          <RouterLink
            to="/items"
            class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700 font-uniongothic">
            Search Items
          </RouterLink>
        </Card>
        <Card bg="bg-purple-100">
          <h2 class="text-2xl font-Inter">Report Item</h2>
          <p class="mt-2 mb-4 font-Inter">
            Report a found item through a submission form
          </p>
          <RouterLink
            to="/items/add"
            class="inline-block bg-purple-500 text-white rounded-lg px-4 py-2 hover:bg-purple-600"
          >
            Report Item
          </RouterLink>
        </Card>
      </div>
    </div>
  </section>
</template>
