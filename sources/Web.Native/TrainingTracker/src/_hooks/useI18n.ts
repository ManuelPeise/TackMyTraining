import React from 'react';
import { useTranslation } from 'react-i18next';

export const useI18n = () => {
  const { t, i18n } = useTranslation(['common', 'nav']);

  const getResource = React.useCallback(
    (key: string) => {
      return t(key);
    },
    [t]
  );

  const changeLanguage = React.useCallback(
    (lng: 'en' | 'de') => {
      i18n.changeLanguage(lng);
    },
    [i18n]
  );
  return {
    getResource: getResource,
    changeLanguage: changeLanguage,
  };
};
