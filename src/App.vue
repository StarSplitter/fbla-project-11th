<script setup>
import Navbar from '@/components/Navbar.vue';
import StatusBar from './components/StatusBar.vue';
import { RouterView } from 'vue-router';
import { reactive, onMounted, provide } from 'vue';
import { supabase } from './lib/supabase';

const auth = reactive({
  user: null,
  isAdmin: false,
  isLoading: true,
});

provide('auth', auth);

onMounted(async() => {

  const { data: { session } } = await supabase.auth.getSession();
  console.log('App.vue: Session:', session);

  if (session && session.user) {
    auth.user = session.user;
    console.log('App.vue: Set auth.user to:', auth.user);
    console.log('App.vue: auth.user.id:', auth.user.id);
  } else {
    auth.user = null;
    console.log('App.vue: No session found, auth.user is null');
  }
  
  if (auth.user) {
    const { data: { user } } = await supabase.auth.getUser();
    auth.isAdmin = user?.app_metadata?.role === 'admin';
    console.log('App.vue: Is admin?', auth.isAdmin);
  }
  
  auth.isLoading = false;
  console.log('App.vue: Final auth object:', auth);
  
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth state changed:', event);
    
    if (session?.user) {
      auth.user = session.user; 
      auth.isAdmin = session.user.app_metadata?.role === 'admin';
    } else {
      auth.user = null;
      auth.isAdmin = false;
    }
  });
  
});

</script>

<template>
  <StatusBar />
  <Navbar />
  <RouterView />
</template>
