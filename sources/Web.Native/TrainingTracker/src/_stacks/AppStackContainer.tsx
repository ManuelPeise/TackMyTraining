import AuthStack from './AuthStack';
import AppStack from './AppStack';
import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from 'src/_hooks/useAuth';

const AppStackContainer: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <NavigationContainer>
      <>
        {isLoading && (
          <View>
            <Text>Loading...</Text>
          </View>
        )}
        {isAuthenticated ? <AppStack /> : <AuthStack />}
      </>
    </NavigationContainer>
  );
};

export default AppStackContainer;
