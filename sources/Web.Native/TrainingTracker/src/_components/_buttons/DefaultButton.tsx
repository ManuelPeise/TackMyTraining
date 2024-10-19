import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface IProps {
  label: string;
  disabled?: boolean;
  disabledColor: string;
  backgroundColor: string;
  onPress: () => void | Promise<void>;
}

const DefaultButton: React.FC<IProps> = (props) => {
  const { label, disabled, backgroundColor, disabledColor, onPress } = props;
  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: 90,
        padding: 5,
        borderRadius: 8,
        backgroundColor: disabled ? disabledColor : backgroundColor,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={{ textAlign: 'center', fontSize: 15, color: '#ffffff' }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default DefaultButton;
