<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import BackButton from '@/components/BackButton.vue';
import InquiryForm from '@/components/InquiryForm.vue';
import { reactive, onMounted } from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { supabase } from '@/lib/supabase';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const jobId = route.params.id;


const state = reactive({ 
  job: {},
  isLoading: true,
});

const deleteJob = async () => {
  try {
    const confirm = window.confirm('Are you sure you want to delete this job?');
    if (confirm) {
      const {error} = await supabase.from('items').delete().eq('id', jobId);
      //await axios.delete(`/api/items/${jobId}`);
      toast.success('Item Deleted Successfully');
      router.push('/items');
    }
  } catch (error) {
    console.error('Error deleting job', error);
    toast.error('Job Not Deleted');
  }
};

onMounted(async () => {
  try {
    //const response = await axios.get(`/api/items/${jobId}`);
    const { data, error } = await supabase.from('items').select('*').eq('id', jobId).single();
    if (error) throw error;
    state.job = data;

  } catch (error) {
    console.error('Error fetching item', error.message);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <BackButton />
  <section v-if="!state.isLoading" class="bg-sky-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <h1 class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
            <img alt=state.job.title :src="state.job.image_url" width="200" />
          </div>
          <InquiryForm :item="state.job"/>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Finder Info</h3>

            <h2 class="text-2xl">{{ state.job.finder_name }}</h2>

            <hr class="my-4" />

            <h3 class="text-xl">Finder's Email:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ state.job.contact_email }}
            </p>

            <h3 class="text-xl">Finder's Phone:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ state.job.contact_phone }}
            </p>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Item</h3>
            <RouterLink
              :to="`/items/edit/${state.job.id}`"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >Edit Item</RouterLink
            >
            <button
              @click="deleteJob"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Delete Item
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
  <div v-else class="text-center text-gray-500 py-6">
    <PulseLoader />
  </div>
</template>
