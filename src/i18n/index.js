import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import zh from './zh';

const STORAGE_KEY = 'lang';
const savedLang = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  lng: savedLang || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', lng => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, lng);
  }
});

export default i18n;
