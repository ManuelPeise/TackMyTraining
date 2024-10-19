import React from 'react';
import { ImageBackground, View } from 'react-native';
import { images } from '../../../assets/index';
import LoginForm from 'src/_components/_forms/LoginForm';

const LoginView: React.FC = () => {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <ImageBackground
        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        source={images.darkNight}
      >
        <LoginForm />
      </ImageBackground>
    </View>
  );
};

export default LoginView;
