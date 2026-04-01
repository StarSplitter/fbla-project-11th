<script setup>
import { reactive, defineProps } from 'vue';
import emailjs from '@emailjs/browser';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  item: Object
});

const toast = useToast();

const formData = reactive({
  name: '',
  ContactName: props.item.finder_name,
  email: props.item.contact_email,
  message: ''
});

const sendEmail = () => {
  emailjs.send('service_uqg6nwa', 
    'template_173xft8', 
    {
        name: formData.name,
        ContactName: props.item.finder_name,
        recipient: formData.email,
        message: formData.message
    },
    {
        publicKey: 't06CPiVGsmcA6W65F'
    })
    .then(
      () => {
        toast.success(t("toast.form.success"));
        console.log('SUCCESS!')
        formData.name = '';
        formData.message = '';
      },
      (error) => {
        toast.error(t("toast.form.error"));
        console.error('FAILED...', error);
      }
    );
};
</script>

<template>
    <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
    <form @submit.prevent="sendEmail">
        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">{{$t("inquiry.name")}}</label>
            <input type="text" v-model="formData.name" name="name" :placeholder="$t('inquiry.name')" required>
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">{{$t("inquiry.message")}}</label>
            <textarea v-model="formData.message" name="message" :placeholder="$t('inquiry.message')" required></textarea>
        </div>

        <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {{$t("inquiry.sendform")}}
            </button>
          </div>
    </form>
  </div>
</template>
