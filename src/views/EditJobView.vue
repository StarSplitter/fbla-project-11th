<script setup>
import router from '@/router';
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import { supabase } from '@/lib/supabase';

const route = useRoute();
const toast = useToast();

const jobId = route.params.id;

const form = reactive({
  title: '',
  company: {
    name: '',
    contactEmail: '',
    contactPhone: '',
  },
});

const state = reactive({
  job: {},
  isLoading: true,
});

const handleSubmit = async () => {
  try {
    //const response = await axios.put(`/api/items/${jobId}`, updatedJob);
    const { error } = await supabase
      .from('items')
      .update({
        title: form.title,
        finder_name: form.company.name,
        contact_email: form.company.contactEmail,
        contact_phone: form.company.contactPhone,
      })
      .eq('id', jobId);

    if (error){
      throw error;
    } 

    toast.success('Item Updated Successfully');
    router.push(`/items/${jobId}`);
  } catch (error) {
    console.error('Error fetching item', error);
    toast.error('Item Was Not Added');
  }
};

onMounted(async () => {
  try {
    const { data, error } = await supabase.from('items').select('*').eq('id', jobId).single();
    if (error) throw error;
    state.job = data;
    form.title = state.job.title;
    form.company.name = state.job.finder_name;
    form.company.contactEmail = state.job.contact_email;
    form.company.contactPhone = state.job.contact_phone;
  } catch (error) {
    console.error('Error fetching item', error.message);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Edit Item</h2>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"
              >Item Listing Name</label
            >
            <input
              type="text"
              v-model="form.title"
              id="name"
              name="name"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. Black Adidas Metal Waterbottle"
              required
            />
          </div>

          <h3 class="text-2xl mb-5">Finder Info</h3>

          <div class="mb-4">
            <label for="company" class="block text-gray-700 font-bold mb-2"
              >Finder's Name</label
            >
            <input
              type="text"
              v-model="form.company.name"
              id="company"
              name="company"
              class="border rounded w-full py-2 px-3"
              placeholder="Company Name"
            />
          </div>

          <div class="mb-4">
            <label
              for="contact_email"
              class="block text-gray-700 font-bold mb-2"
              >Finder's Email</label
            >
            <input
              type="email"
              v-model="form.company.contactEmail"
              id="contact_email"
              name="contact_email"
              class="border rounded w-full py-2 px-3"
              placeholder="Email address for applicants"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="contact_phone"
              class="block text-gray-700 font-bold mb-2"
              >Finder's Phone</label
            >
            <input
              type="tel"
              v-model="form.company.contactPhone"
              id="contact_phone"
              name="contact_phone"
              class="border rounded w-full py-2 px-3"
              placeholder="Optional phone for applicants"
            />
          </div>

          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Item
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
