<script setup>
import { reactive, defineProps } from 'vue';
import emailjs from '@emailjs/browser';
import { useToast } from 'vue-toastification';

const props = defineProps({
  item: Object
});

const toast = useToast();

const formData = reactive({
  name: '',
  ContactName: props.item.company.name,
  email: props.item.company.contactEmail,
  message: ''
});

const sendEmail = () => {
  emailjs.send('service_uqg6nwa', 
    'template_173xft8', 
    {
        name: formData.name,
        ContactName: props.item.company.name,
        recipient: formData.email,
        message: formData.message
    },
    {
        publicKey: 't06CPiVGsmcA6W65F'
    })
    .then(
      () => {
        toast.success('Form Sent Successfully');
        console.log('SUCCESS!')
        formData.name = '';
        formData.message = '';
      },
      (error) => {
        toast.error('Error submitting form');
        console.error('FAILED...', error);
      }
    );
};
</script>

<template>
    <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
    <form @submit.prevent="sendEmail">
        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Name</label>
            <input type="text" v-model="formData.name" name="name" placeholder="Your Name" required>
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Message</label>
            <textarea v-model="formData.message" name="message" placeholder="Your Message" required></textarea>
        </div>

        <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Send Form
            </button>
          </div>
    </form>
  </div>
</template>
