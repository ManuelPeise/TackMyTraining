import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationEnum } from 'src/_lib/_enums/NavigationEnum';
import ProfileScreen from '../ProfileScreen';
import Icon from 'react-native-vector-icons/AntDesign';
import { useAppContext } from 'src/_hooks/useAppContext';
import ContactScreen from '../ContactScreen';

const TabNavigation = createBottomTabNavigator();

const UserProfileTabNavigation: React.FC = () => {
  const { styles } = useAppContext();
  return (
    <TabNavigation.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;

          if (route.name === NavigationEnum.ProfileData) {
            iconName = 'idcard';
          }

          if (route.name === NavigationEnum.ProfileContactData) {
            iconName = 'mail';
          }

          return (
            <Icon
              name={iconName}
              size={size}
              color={focused ? styles.colors.blueAccent[300] : styles.colors.gray[300]}
            />
          );
        },
        headerShown: false,
        unmountOnBlur: true,
        tabBarStyle: {
          backgroundColor: styles.colors.gray[800],
          borderWidth: 0,
          borderColor: 'transparent',
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: styles.colors.redAccent[600],
        tabBarInactiveTintColor: styles.colors.gray[300],
      })}
    >
      <TabNavigation.Screen name={NavigationEnum.ProfileData} component={ProfileScreen} />
      <TabNavigation.Screen name={NavigationEnum.ProfileContactData} component={ContactScreen} />
    </TabNavigation.Navigator>
  );
};

export default UserProfileTabNavigation;
