import commonEn from 'src/Lib/I18n/recourses/commonEn.json';
import commonDe from 'src/Lib/I18n/recourses/commonDe.json';
import menuEn from 'src/Lib/I18n/recourses/menuEn.json';
import menuDe from 'src/Lib/I18n/recourses/menuDe.json';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    common: commonEn,
    menu: menuEn,
  },
  de: {
    common: commonDe,
    menu: menuDe,
  },
};

i18next.use(initReactI18next).init({
  resources: resources,
  lng: 'en',
});
