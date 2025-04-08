import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import translationEN from './locales/en';
import translationFR from './locales/fr';

const resources = {
  en: {
    header: translationEN.header,
    footer: translationEN.footer,
    doc: translationEN.doc,
  },
  fr: {
    header: translationFR.header,
    footer: translationFR.footer,
    doc: translationFR.doc,
  },
};

const loadLanguage = async () => {
  try {
    const lang = await AsyncStorage.getItem('lang');
    return lang || 'fr'; // Default to French like in the website
  } catch (error) {
    console.error('Failed to load language', error);
    return 'fr';
  }
};

const loadLanguageAsync = async () => {
  const language = await loadLanguage();

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: language,
      fallbackLng: 'en',
      ns: ['header', 'footer', 'doc'],
      defaultNS: 'header',
      interpolation: {
        escapeValue: false, // React already escapes values
      },
    });
};

loadLanguageAsync();

export const changeLanguage = async (language: string) => {
  try {
    await AsyncStorage.setItem('lang', language);
    i18n.changeLanguage(language);
  } catch (error) {
    console.error('Failed to save language', error);
  }
};

export default i18n; 