<script setup>
import router from '@/router';
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const route = useRoute();

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

const toast = useToast();

const handleSubmit = async () => {
  const updatedJob = {
    title: form.title,
    company: {
      name: form.company.name,
      contactEmail: form.company.contactEmail,
      contactPhone: form.company.contactPhone,
    },
  };

  try {
    const response = await axios.put(`/api/items/${jobId}`, updatedJob);
    toast.success('Item Updated Successfully');
    router.push(`/items/${response.data.id}`);
  } catch (error) {
    console.error('Error fetching item', error);
    toast.error('Item Was Not Added');
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(`/api/items/${jobId}`);
    state.job = response.data;
    // Populate inputs
    form.title = state.job.title;
    form.company.name = state.job.company.name;
    form.company.contactEmail = state.job.company.contactEmail;
    form.company.contactPhone = state.job.company.contactPhone;
  } catch (error) {
    console.error('Error fetching job', error);
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
