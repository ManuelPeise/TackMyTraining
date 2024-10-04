import React from 'react';
import { AuthContext } from 'src/Lib/Context/AuthContext';

export const useAuthentication = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('Error while initialize useAuth');
  }

  return context;
};
