<script setup>
// IMPORTS
import router from '@/router';
import { reactive, ref, inject, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { supabase } from '@/lib/supabase';

const imageFile = ref(null);
const imagePreview = ref(null);

const auth = inject('auth');

// Form Data
const form = reactive({
  title: '',
  company: {
    name: '',
    contactEmail: '',
    contactPhone: '',
  },
  image: '',
});

const toast = useToast();

// Handles image file selection and preview
const handleImage = (e) => {
  const file = e.target.files[0];
  if (!file){
    return;
  };

  imageFile.value = file;
  imagePreview.value = URL.createObjectURL(file);
};

/*
  Handles form submission
  Uploads image to storage and creates item in database
*/
const handleSubmit = async () => {
  try {
    
    // Uploads image to storage and checks for an upload error
    const filePath = `items/${crypto.randomUUID()}`;
    const { error: uploadError } = await supabase.storage.from('images').upload(filePath, imageFile.value);
    
    if (uploadError){
      throw uploadError;
    }

    // Get an URL for the image
    const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);

    const imageUrl = urlData.publicUrl;

    // Create the item in the database
    const { data, error: insertError } = await supabase
      .from('items')
      .insert({
        title: form.title,
        image_url: imageUrl,
        finder_name: form.company.name,
        contact_email: form.company.contactEmail,
        contact_phone: form.company.contactPhone,
        user_id: auth.user.id,
      })
      .select()
      .single();

    if (insertError){
      throw insertError;
    };

    // Show success message and redirect to home page
    toast.success('Item Added Successfully');
    router.push(`/items/${data.id}`);

  } catch (error) {
    console.error('Error fetching item', error);
    toast.error('Item Was Not Added');
  }
};

onMounted(() => {
  if (!auth.user) {
    toast.error('Please log in to add an item');
    router.push('/login');
  };
});
</script>

<template>
  <section class="bg-stone-50">
    <div class="container m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Report Item</h2>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">
              Item Name
            </label>
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

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">
              Item Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              class="border rounded w-full py-2 px-3 mb-2"
              accept="image/*"
              @change="handleImage"
              required
            />
             <img v-if="imagePreview" :src="imagePreview" width="200" />
          </div>

          <h3 class="text-2xl mb-5">Finder Info</h3>

          <div class="mb-4">
            <label for="company" class="block text-gray-700 font-bold mb-2">
              Finder's Name
            </label>
            <input
              type="text"
              v-model="form.company.name"
              id="company"
              name="company"
              class="border rounded w-full py-2 px-3"
              placeholder="Your Name"
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
              placeholder="Your Email address"
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
              placeholder="Your Phone Number"
            />
          </div>

          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
