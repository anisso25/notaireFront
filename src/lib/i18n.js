
import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

const options = {
  loadPath: '/locales/{{lng}}/{{ns}}.json',
};

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    defaultNS: 'Global',
    fallbackLng: 'ar',
    lng: 'ar',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: options,
  });

export default i18n;
