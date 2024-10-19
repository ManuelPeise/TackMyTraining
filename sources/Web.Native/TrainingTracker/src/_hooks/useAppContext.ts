import React from 'react';
import { AppContext } from 'src/_contextProviders/AppContextProvider';

export const useAppContext = () => {
  const context = React.useContext(AppContext);

  if (!context) {
    throw Error('App context is not available!');
  }

  return { ...context };
};
