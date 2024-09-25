import { Login } from 'src/form';

export enum LocalStorageKeyEnum {
  LoginData = 'LoginData',
}

type StorageValues = {
  [key: string]: {};
};
const defaultValuesDictionary: StorageValues = {
  [LocalStorageKeyEnum.LoginData]: { email: '', password: '', remember: false } as Login,
};

export class LocalStorage {
  public getItem = <T>(key: LocalStorageKeyEnum): T => {
    const stringifiedItem = window.localStorage.getItem(key);

    if (stringifiedItem == null) {
      return defaultValuesDictionary[key] as T;
    }

    return JSON.parse(stringifiedItem) as T;
  };

  public setItem = <T>(key: LocalStorageKeyEnum, data: T): void => {
    window.localStorage.setItem(key, JSON.stringify(data));
  };

  public deleteItem = (key: LocalStorageKeyEnum): void => {
    window.localStorage.removeItem(key);
  };
}
