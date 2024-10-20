import React, { PropsWithChildren } from 'react';
import { AxiosClient } from 'src/_lib/_api/AxiosClient';
import { serviceUrls } from 'src/_lib/_api/ServiceUrls';
import { Auth, Login } from 'src/_lib/_types/authTypes';
import { UserAuthenticationData, UserData } from 'src/_lib/_types/userTypes';
import { devUserData } from 'src/_lib/devUserData';
import { utils } from 'src/_lib/utils';

export const AuthContext = React.createContext<Auth>({} as Auth);

type AuthContextProps = PropsWithChildren & {};

const AuthContextProvider: React.FC<AuthContextProps> = (props) => {
  const { children } = props;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(
    process.env.EXPO_PUBLIC_API_ENVIRONMENT === 'dev' ? true : false
  );
  const [error, setError] = React.useState<string>('');

  const [state, dispatch] = React.useReducer<React.Reducer<UserAuthenticationData, UserAuthenticationData>>(
    (
      prevState: UserAuthenticationData | null,
      update: UserAuthenticationData | ((prev: UserAuthenticationData) => UserAuthenticationData)
    ) => utils.reducers.authenticationReducer(prevState, update),
    devUserData
  );

  const onLogin = React.useCallback(
    async (loginData: Login): Promise<boolean> => {
      let success = false;
      setIsLoading(true);
      try {
        await AxiosClient.post(serviceUrls.auth.login, JSON.stringify(loginData), {
          headers: { 'content-type': 'application/json' },
        }).then(async (res) => {
          if (res.status === 200) {
            const responseData: UserData = await JSON.parse(JSON.stringify(res.data));

            console.log('AuthRes:', responseData);
            dispatch({
              userInfo: {
                firstName: responseData.firstName,
                lastName: responseData.lastName,
                email: responseData.email,
                userName: responseData.userName,
                displayName: responseData.displayName,
                dateOfBirth: responseData.dateOfBirth,
                isActive: responseData.isActive,
                contactData: responseData.contactData,
              },
              jwtData: responseData.jwtData,
            });

            setIsAuthenticated(responseData.jwtData.jwtToken.length > 0);

            success = true;
          } else {
            throw new Error(`Authentication failed with ${res.status}!`);
          }
        });
      } catch (err) {
        setError(err);
      }

      setIsLoading(false);
      return success;
    },
    [dispatch]
  );

  const onLogout = React.useCallback(() => {
    dispatch({ userInfo: null, jwtData: null });
    setIsAuthenticated(false);
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        error,
        userInfo: state?.userInfo,
        jwtData: state?.jwtData,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
