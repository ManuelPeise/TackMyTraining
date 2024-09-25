import React, { PropsWithChildren } from 'react';
import { IAuthProps } from '../Interfaces/IAuthProps';
import { IJwtData, IRegistrationResult, IUserData } from '../Interfaces/IUserData';
import { Login, Registration } from 'src/form';
import { useLocalStorage } from 'src/Hooks/useLocalStorage';
import { LocalStorageKeyEnum } from '../LocalStorage';
import { useNavigate } from 'react-router-dom';
import { serviceUrls, useApi } from 'src/Hooks/useApi';

export const AuthContext = React.createContext<IAuthProps | null>(null);

interface IAuthContextProps extends PropsWithChildren {}

export const AuthContextProvider: React.FC<IAuthContextProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [userData, setUserData] = React.useState<IUserData | null>(null);

  const loginStorage = useLocalStorage<Login>(LocalStorageKeyEnum.LoginData);
  const jwtStorage = useLocalStorage<IJwtData>(LocalStorageKeyEnum.JwtData);
  const navigate = useNavigate();

  const loginApi = useApi<IUserData>({ serviceUrl: serviceUrls.auth.login }, true);
  const registerApi = useApi<IRegistrationResult>({ serviceUrl: serviceUrls.auth.registration }, true);

  const onLogin = React.useCallback(
    async (loginData: Login) => {
      const loginResult = await loginApi.post({ serviceUrl: serviceUrls.auth.login }, JSON.stringify(loginData));

      if (loginResult != null) {
        setIsAuthenticated(true);
        setUserData(loginResult);

        jwtStorage.setStorageItem(loginResult.jwtData);

        if (loginData.remember) {
          loginStorage.setStorageItem(loginData);
        } else {
          loginStorage.setStorageItem({ email: '', password: '', remember: false } as Login);
        }

        navigate('/');
      } else {
      }
    },
    [loginApi, loginStorage, jwtStorage, navigate]
  );

  const onRegistration = React.useCallback(
    async (registration: Registration) => {
      registerApi
        .post({ serviceUrl: serviceUrls.auth.registration }, JSON.stringify(registration))
        .then(async (result) => {
          if (result.success) {
            navigate('/');
          }
        });
    },
    [registerApi, navigate]
  );

  const onLogout = React.useCallback(async () => {
    setUserData(null);
    setIsAuthenticated(false);
    jwtStorage.removeItem();
  }, [jwtStorage]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userData, login: loginStorage.item, onLogin, onRegistration, onLogout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
