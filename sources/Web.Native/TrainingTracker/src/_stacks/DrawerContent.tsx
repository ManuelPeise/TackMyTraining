import React from 'react';
import { Text, View } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { useAppContext } from 'src/_hooks/useAppContext';
import { useAuth } from 'src/_hooks/useAuth';
import { useI18n } from 'src/_hooks/useI18n';
import { NavigationEnum } from 'src/_lib/_enums/NavigationEnum';

interface IDrawerContentProps extends DrawerContentComponentProps {}

interface IDrawerItemProps {
  title: string;
  to: string;
  selected: boolean;
  focused: boolean;
  navigation: DrawerNavigationHelpers;
  handleSelect: (value: string) => void;
}

const DrawerListItem: React.FC<IDrawerItemProps> = (props) => {
  const { title, navigation, to, focused, handleSelect } = props;
  const { styles } = useAppContext();

  const onNavigate = React.useCallback(() => {
    navigation.navigate(to);
    handleSelect(title);
  }, []);

  return (
    <DrawerItem
      style={{ padding: 0, margin: 0, backgroundColor: 'transparent' }}
      pressOpacity={0.5}
      labelStyle={{ paddingLeft: 10, fontStyle: 'italic', fontSize: 18, color: styles.colors.gray[200] }}
      label={title}
      focused={focused}
      activeBackgroundColor={styles.colors.gray[400]}
      activeTintColor={styles.colors.gray[700]}
      inactiveBackgroundColor={styles.colors.gray[100]}
      inactiveTintColor={styles.colors.gray[100]}
      onPress={onNavigate}
    />
  );
};

const DrawerContent: React.FC<IDrawerContentProps> = (props) => {
  const { navigation } = props;
  const { userInfo } = useAuth();
  const { getResource } = useI18n();
  const { styles } = useAppContext();
  const { routeNames, routes, index } = props.state;
  const focused = routeNames[index];

  const [selectedItem, setSelectedItem] = React.useState<string>('');

  const getLabel = React.useCallback(
    (route: NavigationEnum) => {
      switch (route) {
        case NavigationEnum.Home:
          return getResource('nav:labelHome');
        case NavigationEnum.AppSettings:
          return getResource('nav:labelAppSettings');
        case NavigationEnum.Profile:
          return getResource('nav:labelProfile');
        case NavigationEnum.Profile:
          return 'Sandbox';
        default:
          return '';
      }
    },
    [getResource]
  );

  const drawerItems = React.useMemo(() => {
    const items: IDrawerItemProps[] = routes.map((route, index) => {
      return {
        title: getLabel(route.name as NavigationEnum),
        selected: selectedItem === route.name,
        to: route.name,
        focused: focused === route.name,
        navigation: navigation,
        handleSelect: setSelectedItem,
      };
    });

    return items;
  }, [navigation, routes]);

  return (
    <DrawerContentScrollView style={{ display: 'flex', flexDirection: 'column' }}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          backgroundColor: styles.colors.gray[800],
        }}
      >
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 150,
            backgroundColor: styles.colors.gray[800],
          }}
        >
          {/* icon */}
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: styles.colors.redAccent[500],
            }}
          >
            <Text>Img</Text>
          </View>
          {/* userName */}
          <View style={{ paddingTop: 20, width: '100%' }}>
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: 20,
                fontStyle: 'italic',
                color: styles.colors.gray[200],
              }}
            >
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <Text
                  style={{ width: '100%', textAlign: 'center', fontSize: 12, color: styles.colors.blueAccent[300] }}
                >
                  {getResource('common:labelLoggedInAs')}
                </Text>
                <Text
                  style={{ width: '100%', textAlign: 'center', fontSize: 14, color: styles.colors.blueAccent[400] }}
                >
                  {userInfo?.displayName}
                </Text>
              </View>
            </Text>
          </View>
          {/* divider */}
          <View style={{ width: '95%', marginTop: 10, height: 1.2, backgroundColor: styles.colors.gray[200] }} />
        </View>
        <View style={{ padding: 0 }}>
          {drawerItems.map((item) => {
            return (
              <View key={item.to} style={{ display: 'flex', flexDirection: 'column' }}>
                <DrawerListItem {...item} />
                {/* divider */}
                <View
                  style={{
                    marginLeft: '2.5%',
                    width: '95%',
                    marginTop: 2,
                    height: 1.2,
                    backgroundColor: styles.colors.gray[200],
                  }}
                />
              </View>
            );
          })}
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
