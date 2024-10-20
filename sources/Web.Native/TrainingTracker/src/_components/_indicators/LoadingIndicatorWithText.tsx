import React from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text } from 'react-native';
import { useAppContext } from 'src/_hooks/useAppContext';

interface IProps {
  text: string;
}

const LoadingIndicatorWithText: React.FC<IProps> = (props) => {
  const { text } = props;
  const { styles } = useAppContext();

  const [colorIndex, setColorIndex] = React.useState(0);

  const colors = [
    styles.colors.chartColors.red,
    styles.colors.chartColors.orange,
    styles.colors.chartColors.yellow,
    styles.colors.chartColors.blue,
    styles.colors.chartColors.green,
    styles.colors.chartColors.purple,
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000);

    return () => clearInterval(timer);
  }, [colorIndex, colors, colorIndex]);

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: styles.colors.gray[800],
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 1,
      }}
    >
      <ActivityIndicator animating={true} size={300} color={colors[colorIndex]}></ActivityIndicator>
      <View
        style={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 90,
          backgroundColor: styles.colors.gray[400],
          maxWidth: 0,
          height: '100%',
          width: '100%',
        }}
      >
        <View
          style={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 220,
            width: 220,
            borderRadius: 110,
            backgroundColor: styles.colors.gray[800],
            zIndex: 1000,
          }}
        >
          <Text style={{ color: colors[colorIndex] }}>{text}</Text>
        </View>
      </View>
    </View>
  );
};

export default LoadingIndicatorWithText;
