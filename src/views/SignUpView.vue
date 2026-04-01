<script setup>
import router from '@/router';
import { ref } from 'vue';
import { supabase } from '@/lib/supabase';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const signupEmail = ref('');
const signupPassword = ref('');

const toast = useToast();

const handleSignup = async () => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: signupEmail.value,
      password: signupPassword.value,
    });

    toast.success(t("toast.account.signup"));
    router.push('/');

  } catch (error) {
    console.error('Error Signing Up', error);
    toast.error(t("toast.account.signuperror"));
  };
};
</script>

<template>
  <section class="bg-stone-50">
    <div class="container m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSignup">
          <h2 class="text-3xl text-center font-semibold mb-6">{{ $t("signup.signup") }}</h2>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">
              {{ $t("signup.email") }}
            </label>
            <input
              type="email"
              v-model="signupEmail"
              id="email"
              name="email"
              class="border rounded w-full py-2 px-3 mb-2"
              required
            />
          </div>
          
          <div class="mb-4">
            <label for="password" class="block text-gray-700 font-bold mb-2">
              {{ $t("signup.password") }}
            </label>
            <input
              type="password"
              v-model="signupPassword"
              id="password"
              name="password"
              class="border rounded w-full py-2 px-3"
            />
          </div>

          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {{ $t("signup.signup") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
