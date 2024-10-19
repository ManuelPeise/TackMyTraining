import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { images } from '../../../assets/index';
import { useNavigation } from '@react-navigation/native';
import { useI18n } from 'src/_hooks/useI18n';
import { useAppContext } from 'src/_hooks/useAppContext';
import { NavigationEnum } from 'src/_lib/_enums/NavigationEnum';

const WelcomeScreen: React.FC = () => {
  const { getResource } = useI18n();
  const { styles } = useAppContext();
  const navigate = useNavigation();

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: styles.colors.blueAccent[100],
      }}
    >
      <ImageBackground style={{ width: '100%' }} source={images.darkNight}>
        <View
          style={{
            height: '100%',
            width: '100%',
            padding: 20,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ paddingTop: 50 }}>
            <Text
              style={{
                fontSize: 30,
                fontStyle: 'italic',
                fontWeight: 'bold',
                textAlign: 'center',
                opacity: 0.5,
                color: styles.colors.gray[100],
              }}
            >
              {getResource('common:labelTrainingsTracker')}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontStyle: 'italic',
                fontWeight: 'bold',
                textAlign: 'center',
                color: styles.colors.gray[100],
                opacity: 0.7,
                paddingTop: 10,
              }}
            >
              {getResource('common:labelWelcomeText')}
            </Text>
          </View>
          <View style={{ paddingBottom: 10, opacity: 0.6 }}>
            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: styles.colors.gray[100],
              }}
              onPress={() => navigate.navigate(NavigationEnum.Login as never)}
            >
              <Text style={{ fontSize: 20, textAlign: 'center', color: styles.colors.gray[100] }}>
                {getResource('common:labelLetsGo')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;
