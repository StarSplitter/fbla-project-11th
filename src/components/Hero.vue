<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
<template>
  <section class="bg-[#660014] py-20">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
    >
      <div class="text-center">
        <h1 class="text-4xl font-caudexbold text-white sm:text-5xl md:text-6xl">
          {{ $t("hero.title") }}
        </h1>
        <p class="my-4 font-poppins text-xl text-white">
          {{ $t("hero.subtitle") }}
        </p>
      </div>
    </div>
  </section>
</template>
