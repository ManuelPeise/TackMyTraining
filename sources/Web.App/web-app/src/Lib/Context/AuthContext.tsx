import React, { PropsWithChildren } from 'react';
import { IAuthProps } from '../Interfaces/IAuthProps';
import { IUserData } from '../Interfaces/IUserData';
import { Login } from 'src/form';
import { useLocalStorage } from 'src/Hooks/useLocalStorage';
import { LocalStorageKeyEnum } from '../LocalStorage';
import { useNavigate } from 'react-router-dom';
import { serviceUrls, useApi } from 'src/Hooks/useApi';

export const AuthContext = React.createContext<IAuthProps | null>(null);

interface IAuthContextProps extends PropsWithChildren {}

export const AuthContextProvider: React.FC<IAuthContextProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [userData, setUserData] = React.useState<IUserData | null>(null);

  const { item, setStorageItem } = useLocalStorage<Login>(LocalStorageKeyEnum.LoginData);
  const navigate = useNavigate();

  const loginApi = useApi<IUserData>({ serviceUrl: serviceUrls.auth.login });

  const onLogin = React.useCallback(
    async (loginData: Login) => {
      const loginResult = await loginApi.post({ serviceUrl: serviceUrls.auth.login }, JSON.stringify(loginData));

      if (loginResult != null) {
        setIsAuthenticated(true);
        setUserData(loginResult);

        if (loginData.remember) {
          setStorageItem(loginData);
        } else {
          setStorageItem({ email: '', password: '', remember: false } as Login);
        }

        navigate('/');
      } else {
      }
    },
    [loginApi, setStorageItem, navigate]
  );

  const onLogout = React.useCallback(async () => {
    setUserData(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, login: item, onLogin, onLogout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
