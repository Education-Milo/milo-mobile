import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from 'src/i18n/locales/en.json';
import frTranslations from 'src/i18n/locales/fr.json';
import { getLocales } from 'expo-localization';

const resources = {
  en: {
    translation: enTranslations,
  },
  fr: {
    translation: frTranslations,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: getLocales()[0]?.languageCode || 'fr',
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
