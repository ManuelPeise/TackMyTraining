import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationEnum } from 'src/_lib/_enums/NavigationEnum';
import WelcomeScreen from 'src/_views/Welcome/WelcomeScreen';
import LoginView from 'src/_views/Auth/LoginView';

export const AuthStack: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={NavigationEnum.Welcome}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={NavigationEnum.Welcome} component={WelcomeScreen} options={{ headerTitle: 'Welcome' }} />
      <Stack.Screen name={NavigationEnum.Login} component={LoginView} options={{ headerTitle: 'Login' }} />
    </Stack.Navigator>
  );
};

export default AuthStack;
