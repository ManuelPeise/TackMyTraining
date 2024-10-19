import React from 'react';
import { View } from 'react-native';
import ProfileFormInitializationContainer from './Components/ProfileForm';
import { useAppContext } from 'src/_hooks/useAppContext';

const ProfileScreen: React.FC = () => {
  const { styles } = useAppContext();
  return (
    <View style={[styles.containerStyles.formStyle, { padding: 0, height: '100%', borderRadius: 0 }]}>
      <ProfileFormInitializationContainer />
    </View>
  );
};

export default ProfileScreen;
