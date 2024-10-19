import React from 'react';
import { View } from 'react-native';
import { useAppContext } from 'src/_hooks/useAppContext';

const SandboxScreen: React.FC = () => {
  const { styles } = useAppContext();

  return <View style={styles.containerStyles.pageContainerStyle}>{/* <ProfileFormInitializationContainer /> */}</View>;
};

export default SandboxScreen;
