<script setup>
  import JobListing from './JobListing.vue';
  import { RouterLink } from 'vue-router';
  import { reactive, defineProps, onMounted, onUnmounted, watch, ref } from 'vue';
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
  import { supabase } from '@/lib/supabase';

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});

const state = reactive({
  jobs: [],
  isLoading: true,
});


const isVisible = ref(!document.hidden);
console.log("is Visible: ", isVisible);


const fetchJobs = async () => {
  console.log('=== FETCHJOBS FUNCTION CALLED ===');
  console.log('Current state.jobs.length:', state.jobs.length);
  console.log('Current state.isLoading:', state.isLoading);
  
  try {
    console.log('fetchJobs called - setting isLoading to true');
    state.isLoading = true;
    
    console.log('About to call Supabase...');
    const { data, error } = await supabase.from('items').select('*').order('created_at', {ascending: false});
    console.log('Supabase response received');
    console.log('Data:', data);
    console.log('Error:', error);
    
    if (error) {
      console.error('Supabase error detected:', error);
      throw error;
    }
    
    console.log('Setting state.jobs to:', data);
    state.jobs = data;
    console.log('Items fetched successfully:', data.length, 'items');
    console.log('Verify state.jobs.length:', state.jobs.length);
  } catch (error) {
    console.error('=== ERROR IN FETCHJOBS ===');
    console.error('Error fetching items:', error);
    console.error('Error message:', error.message);
    console.error('Full error object:', error);
  } finally {
    console.log('fetchJobs finally block - setting isLoading to false');
    state.isLoading = false;
    console.log('fetchJobs complete - isLoading set to false');
    console.log('Final state.jobs.length:', state.jobs.length);
  }
};

onMounted(() => {
  console.log('JobListings mounted');
  
  // Initial fetch
  fetchJobs();
  
  // Update visibility ref when page visibility changes
  const updateVisibility = () => {
    const wasHidden = !isVisible.value;
    isVisible.value = !document.hidden;
    console.log('Visibility changed. Now visible:', isVisible.value);
    
    // If page just became visible (was hidden, now visible), refetch
    if (wasHidden && isVisible.value) {
      console.log('Page became visible - refetching items');
      fetchJobs();
    }
  };
  
  document.addEventListener('visibilitychange', updateVisibility);
  
  // Watch for visibility changes
  watch(isVisible, (newVal, oldVal) => {
    console.log('isVisible watch triggered:', { oldVal, newVal });
  });
  
  // Cleanup function
  return () => {
    console.log('JobListings cleanup');
    document.removeEventListener('visibilitychange', updateVisibility);
  };
});
</script>

<template>
  <div class="bg-sky-50">
  <section class="bg-sky-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-black-500 mb-6 text-center">
        Browse Items
      </h2>
      <div v-if="(state.isLoading)" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListing
          v-for="job in state.jobs.slice(0, limit || state.jobs.length)"
          :key="job.id"
          :job="job"
        />
      </div>
    </div>
  </section>
  <section v-if="showButton" class="m-auto max-w-lg px-6 py-10">
    <RouterLink
      to="/items"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">
      View All Items
      </RouterLink>
  </section>
  </div>
</template>
