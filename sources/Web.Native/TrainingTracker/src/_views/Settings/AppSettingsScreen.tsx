import React from 'react';
import ScreenContainer from 'src/_components/_containers/ScreenContainer';
import { useAppContext } from 'src/_hooks/useAppContext';

const AppSettingsScreen: React.FC = () => {
  const { styles } = useAppContext();
  return <ScreenContainer backgroundColor={styles.colors.gray[900]}></ScreenContainer>;
};

export default AppSettingsScreen;
