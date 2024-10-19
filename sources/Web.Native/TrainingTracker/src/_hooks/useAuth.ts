import React from 'react';
import { AuthContext } from 'src/_contextProviders/AuthContextProvider';

export const useAuth = () => {
  return React.useContext(AuthContext);
};
