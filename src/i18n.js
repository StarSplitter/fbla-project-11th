import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import es from './locales/es.json';

export default createI18n({
    legacy: false,
    locale: navigator.language.startsWith('es') ? 'es' : 'en',
    fallbackLocale: 'en',
    messages: { en, es }
});