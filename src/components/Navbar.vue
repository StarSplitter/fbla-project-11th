<script setup>
import { RouterLink, useRoute } from 'vue-router';
import logo from '@/assets/img/palisade.webp';

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};

</script>

<template>
  <nav class="bg-[linear-gradient(315deg,rgba(145,47,64,0.75)_0%,rgba(64,67,78,0.75)_100%)]">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img class="h-14 w-auto" :src="logo" alt="PaliFind" />
            <span class="hidden md:block text-white text-2xl font-boheld ml-2">
              PALIFOUND
            </span>
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/') 
                    ? 'bg-[#702632]'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'font-uniongothic',
                ]">
                Home
              </RouterLink>

              <RouterLink
                to="/items"
                :class="[
                  isActiveLink('/items')
                    ? 'bg-[#702632]'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'font-uniongothic',
                ]">
                Items
              </RouterLink>

              <RouterLink
                to="/items/add"
                :class="[
                  isActiveLink('/items/add')
                    ? 'bg-[#702632]'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'font-sans',
                ]">
                Add Item
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
