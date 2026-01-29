<script setup>
import router from '@/router';
import { ref } from 'vue';
import { supabase } from '@/lib/supabase';
import { useToast } from 'vue-toastification';

const loginEmail = ref('');
const loginPassword = ref('');

const toast = useToast();

const handleLogin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    });

    toast.success('Successfully Logged In!');
    router.push('/');
    
  } catch (error) {
    console.error('Error Logging In', error);
    toast.error('Error Logging In');
  };
};

const handleLogOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
    toast.success('Succesfully Logged Out');
    router.push('/');

  } catch (error) {

    console.error('Error Logging Out', error);
    toast.error('Error Logging Out');

  }
};
</script>

<template>
  <section class="bg-stone-50">
    <div class="container m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleLogin">
          <h2 class="text-3xl text-center font-semibold mb-6">Log In</h2>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              v-model="loginEmail"
              id="email"
              name="email"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Email"
              required
            />
          </div>
          
          <div class="mb-4">
            <label for="password" class="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              v-model="loginPassword"
              id="password"
              name="password"
              class="border rounded w-full py-2 px-3"
              placeholder="Password"
            />
          </div>

          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log In
            </button>
          </div>
        </form>
        <form @submit.prevent="handleLogOut">
          <div class="my-8">
            <button
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log Out
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
