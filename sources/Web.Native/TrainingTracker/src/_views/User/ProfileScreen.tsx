import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useAppContext } from 'src/_hooks/useAppContext';
import ProfileFormInitializationContainer from './Components/ProfileScreenContainer';

const ProfileScreen: React.FC = () => {
  const { styles } = useAppContext();

  return (
    <View style={[styles.containerStyles.pageContainerStyle, { padding: 0, height: '100%', borderRadius: 0 }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ProfileFormInitializationContainer />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ProfileScreen;
