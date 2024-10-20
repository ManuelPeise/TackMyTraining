import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useI18n } from 'src/_hooks/useI18n';
import { useAppContext } from 'src/_hooks/useAppContext';
import { NavigationEnum } from 'src/_lib/_enums/NavigationEnum';
import DrawerContent from './DrawerContent';
import HomeScreen from 'src/_views/Home/HomeScreen';
import AppSettingsScreen from 'src/_views/Settings/AppSettingsScreen';
import SandboxScreen from 'src/_views/Sandbox/SandboxScreen';
import UserProfileTabNavigation from 'src/_views/User/Components/UserTabNavigation';

const Drawer = createDrawerNavigator();

const AppStack: React.FC = () => {
  const { getResource } = useI18n();
  const { styles } = useAppContext();
  return (
    <Drawer.Navigator
      initialRouteName={NavigationEnum.Home}
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
        drawerStyle: { padding: 0, margin: 0, backgroundColor: styles.colors.gray[800] },
      }}
    >
      <Drawer.Screen
        name={NavigationEnum.Home}
        component={HomeScreen}
        options={{
          drawerLabel: getResource('nav:labelHome'),
          title: getResource('nav:labelHome'),
        }}
      />
      <Drawer.Screen
        name={NavigationEnum.AppSettings}
        component={AppSettingsScreen}
        options={{
          drawerLabel: getResource('nav:labelAppSettings'),
          title: getResource('nav:labelAppSettings'),
        }}
      />
      <Drawer.Screen
        name={NavigationEnum.Profile}
        component={UserProfileTabNavigation}
        options={{
          drawerLabel: getResource('nav:labelProfile'),
          title: getResource('nav:labelProfile'),
        }}
      />
      <Drawer.Screen
        name={NavigationEnum.Sandbox}
        component={SandboxScreen}
        options={{
          drawerLabel: getResource('nav:labelProfile'),
          title: getResource('nav:labelProfile'),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
