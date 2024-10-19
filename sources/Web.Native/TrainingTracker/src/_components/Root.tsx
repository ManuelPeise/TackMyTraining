import '../Lib/I18n/i18n';
import React from 'react';
import ScreenContainer from './_containers/ScreenContainer';
import AppStackContainer from 'src/_stacks/AppStackContainer';
import AuthContextProvider from 'src/_contextProviders/AuthContextProvider';
import AppContextProvider from 'src/_contextProviders/AppContextProvider';

const Root: React.FC = () => {
  return (
    <AppContextProvider>
      <AuthContextProvider>
        <ScreenContainer>
          <AppStackContainer />
        </ScreenContainer>
      </AuthContextProvider>
    </AppContextProvider>
  );
};

export default Root;
