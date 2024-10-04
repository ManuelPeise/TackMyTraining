import React from 'react';
import { LocalStorage, LocalStorageKeyEnum } from 'src/Lib/LocalStorage';

export const useLocalStorage = <T>(key: LocalStorageKeyEnum) => {
  const localStorage = React.useMemo(() => {
    return new LocalStorage();
  }, []);

  const loadDataFromStorage = React.useCallback(() => {
    return localStorage.getItem<T>(key);
  }, [localStorage, key]);

  const [item, setItem] = React.useState<T | null>(() => {
    console.log('load value from storage');
    return loadDataFromStorage();
  });

  React.useEffect(() => {
    localStorage.getItem<T>(key);
  }, [key, localStorage]);

  const setStorageItem = React.useCallback(
    (data: T) => {
      localStorage.setItem(key, data);
      setItem(data);
    },
    [key, localStorage, setItem]
  );

  const removeItem = React.useCallback(() => {
    localStorage.deleteItem(key);
    setItem(loadDataFromStorage());
  }, [key, localStorage, loadDataFromStorage]);

  return { item, setStorageItem, removeItem };
};
