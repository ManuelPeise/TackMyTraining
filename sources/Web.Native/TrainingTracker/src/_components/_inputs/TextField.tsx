import React from 'react';
import { StyleProp, Text, TextInput, View, ViewStyle } from 'react-native';
import { useAppContext } from 'src/_hooks/useAppContext';

interface IProps {
  value: string;
  disabled?: boolean;
  isPassword?: boolean;
  sx?: StyleProp<ViewStyle>;
  placeholder?: string;
  placeholderColor?: string;
  onChange: (value: string) => void;
}

const TextField: React.FC<IProps> = (props) => {
  const { value, isPassword, disabled, sx, placeholder, placeholderColor, onChange } = props;
  const [focused, setFocused] = React.useState<boolean>(false);
  const { styles } = useAppContext();

  return (
    <View style={[sx, { padding: 2 }]}>
      <View>
        <Text style={{ paddingLeft: 5, color: placeholderColor }}>{focused || value.length ? placeholder : ''}</Text>
      </View>
      <TextInput
        style={{
          fontSize: 16,
          borderRadius: 5,
          borderWidth: 1,
          padding: 2,
          backgroundColor: '#ffffff',
          borderColor: disabled
            ? styles.colors.gray[100]
            : focused
              ? styles.colors.blueAccent[200]
              : styles.colors.gray[300],
        }}
        placeholder={focused ? '' : placeholder}
        editable={!disabled}
        value={value}
        secureTextEntry={isPassword}
        onChangeText={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};

export default TextField;
