import React, { PropsWithChildren } from 'react';
import { View, Text } from 'react-native-reanimated/lib/typescript/Animated';
import { useAppContext } from 'src/_hooks/useAppContext';

interface IProps extends PropsWithChildren {
  headerTitle: string;
  padding?: number;
}

const FormChildWithTitle: React.FC<IProps> = (props) => {
  const { headerTitle, padding, children } = props;
  const { styles } = useAppContext();

  return (
    <View style={{ padding: padding }}>
      <View style={{ display: 'flex', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center', color: styles.colors.gray[300] }}>{headerTitle}</Text>
      </View>
      <View>{children}</View>
    </View>
  );
};

export default FormChildWithTitle;
