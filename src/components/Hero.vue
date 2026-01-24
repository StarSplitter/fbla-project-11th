<script setup>
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    default: 'Find Lost Items Fast',
  },
  subtitle: {
    type: String,
    default: 'REPORT & CLAIM LOST ITEMS AT PALISADE WITH PALIFOUND',
  },
});
</script>
<!--bg-[linear-gradient(315deg,rgba(145,47,64,0.75)_0%-->
<!--bg-gradient-to-tr from-[rgba(0,0,0,0.2)] to-zinc-300-->
<template>
  <section class="bg-[linear-gradient(315deg,rgba(145,47,64,0.75)_0%,theme(colors.zinc.400)_100%)] py-20">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
    >
      <div class="text-center">
        <h1 class="text-4xl font-boheld text-white sm:text-5xl md:text-6xl">
          {{ title }}
        </h1>
        <p class="my-4 font-boheld text-xl text-white">
          {{ subtitle }}
        </p>
      </div>
    </div>
  </section>
</template>
