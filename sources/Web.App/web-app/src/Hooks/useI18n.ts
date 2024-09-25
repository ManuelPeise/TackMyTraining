import React from 'react';
import { useTranslation } from 'react-i18next';

export const useI18n = () => {
  const { t, i18n } = useTranslation(['common']);

  const getResource = (key: string) => {
    console.log(t(key));
    return t(key);
  };

  const changeLanguage = React.useCallback(
    (lng: 'en' | 'de') => {
      i18n.changeLanguage(lng);
    },
    [i18n]
  );

  return {
    getResource,
    changeLanguage,
  };
};
