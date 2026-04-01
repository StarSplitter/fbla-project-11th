<script setup>
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <section class="bg-stone-100">
    <div class="container m-auto py-6 px-6 bg-stone-100">
      <RouterLink
        to="/items"
        class="text-green-500 hover:text-green-600 flex items-center"
      >
        <i class="pi pi-arrow-circle-left mr-3"></i> {{ $t("backbutton.back") }}
      </RouterLink>
    </div>
  </section>
</template>
