import React, { PropsWithChildren } from 'react';
import { SafeAreaView, View } from 'react-native';

interface IProps extends PropsWithChildren {
  backgroundColor?: string;
}

const ScreenContainer: React.FC<IProps> = (props) => {
  const { children, backgroundColor } = props;

  return (
    <SafeAreaView>
      <View
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: backgroundColor,
          paddingTop: 30,
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

export default ScreenContainer;
