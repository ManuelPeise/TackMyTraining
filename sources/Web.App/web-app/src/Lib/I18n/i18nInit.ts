import commonEn from 'src/Lib/I18n/recourses/commonEn.json';
import commonDe from 'src/Lib/I18n/recourses/commonEn.json';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    common: commonEn,
  },
  de: {
    common: commonDe,
  },
};

i18next.use(initReactI18next).init({
  resources: resources,
  lng: 'en',
});
