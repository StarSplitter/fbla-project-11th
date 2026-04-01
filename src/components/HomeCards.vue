<script setup>
import { RouterLink } from 'vue-router';
import Card from '@/components/Card.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

</script>

<template>
  <!--bg-[linear-gradient(315deg,rgba(145,47,64,0.75)_0%,theme(colors.zinc.400)_100%)]-->
  <section class="bg-stone-100 py-4">
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <Card bg="bg-white">
          <h2 class="text-2xl font-poppins">{{$t("homecards.title")}}</h2>
          <p class="mt-2 mb-4">
            {{$t("homecards.subtitle")}}
          </p>
          <RouterLink
            to="/items"
            class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-stone-600 font-uniongothic">
            {{$t("homecards.title")}}
          </RouterLink>
        </Card>
        <Card bg="bg-purple-100">
          <h2 class="text-2xl font-poppins">{{$t("homecards.title2")}}</h2>
          <p class="mt-2 mb-4 font-inter">
            {{$t("homecards.subtitle2")}}
          </p>
          <RouterLink
            to="/items/add"
            class="inline-block bg-purple-500 text-white rounded-lg px-4 py-2 hover:bg-purple-600"
          >
            {{$t("homecards.title2")}}
          </RouterLink>
        </Card>
      </div>
    </div>
  </section>
</template>
