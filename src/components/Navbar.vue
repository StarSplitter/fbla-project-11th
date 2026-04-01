<script setup>
import { RouterLink, useRoute } from 'vue-router';
import logo from '@/assets/img/palisade.webp';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};

</script>

<template>
  <nav class="bg-[#660014] border-rose-950 border-b sticky">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img class="h-14 w-auto" :src="logo" alt="PaliFind" />
            <span class="hidden md:block text-white text-2xl font-caudexbold ml-2">
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
                {{ $t('nav.home') }}
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
                {{ $t('nav.items') }}
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
                {{$t('nav.addItem')}}
              </RouterLink>

              <div class="flex space-x-1 ml-4">
                <button
                  @click="locale = 'en'"
                  :class="[
                    locale === 'en' ? 'bg-[#702632]' : 'hover:bg-gray-900',
                    'text-white', 'px-2', 'py-1', 'rounded-md', 'text-sm', 'font-sans'
                  ]">
                  🇺🇸
                </button>
                <button
                  @click="locale = 'es'"
                  :class="[
                    locale === 'es' ? 'bg-[#702632]' : 'hover:bg-gray-900',
                    'text-white', 'px-2', 'py-1', 'rounded-md', 'text-sm', 'font-sans'
                  ]">
                  🇲🇽
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
