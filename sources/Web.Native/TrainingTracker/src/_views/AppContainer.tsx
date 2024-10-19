import React from 'react';
import AppContextProvider from 'src/_contextProviders/AppContextProvider';
import AuthContextProvider from 'src/_contextProviders/AuthContextProvider';
import AppStackContainer from 'src/_stacks/AppStackContainer';

const AppContainer: React.FC = () => {
  return (
    <AppContextProvider>
      <AuthContextProvider>
        <AppStackContainer />
      </AuthContextProvider>
    </AppContextProvider>
  );
};

export default AppContainer;
