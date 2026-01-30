<script setup>
import router from '@/router';
import { inject } from 'vue';
import { supabase } from '@/lib/supabase';
import { RouterLink, useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';

const toast = useToast();

const auth = inject('auth');

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
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
  <div v-if="auth.user" class="bg-green-100 border-b border-green-200 px-4 py-2">
    <div class="container mx-auto flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-green-800 font-semibold">Logged in as:</span>
        <span class="text-green-900">{{ auth.user.email }}</span>
        <span v-if="auth.isAdmin" class="bg-green-600 text-white text-xs px-2 py-1 rounded">
          ADMIN
        </span>
      </div>
        <button
            class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="submit" @click="handleLogOut"
        >
            Log Out
        </button>
    </div>
  </div>
  
  <div v-else class="bg-yellow-100 border-b border-yellow-200 px-4 py-2">
    <div class="container mx-auto flex items-center justify-between">
      <span class="text-yellow-800 font-semibold">Not logged in</span>
      <div class="flex gap-3">
        <RouterLink
            to="/signup"
            class="bg-purple-500"
            :class="[
                isActiveLink('/signup')
                ? 'bg-[#702632]'
                : 'hover:bg-purple-600 hover:text-white',
                'text-white',
                'px-3',
                'py-2',
                'rounded-md',
                'font-sans',
            ]">
            Sign Up
        </RouterLink>
        <RouterLink
                to="/login"
                class="bg-purple-500"
                :class="[
                  isActiveLink('/login')
                    ? 'bg-[#702632]'
                    : 'hover:bg-purple-600 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                  'font-sans',
                ]">
                Log In
        </RouterLink>
      </div>
    </div>
  </div>
</template>
