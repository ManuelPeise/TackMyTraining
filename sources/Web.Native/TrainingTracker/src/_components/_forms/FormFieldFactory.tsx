import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { useAppContext } from 'src/_hooks/useAppContext';
import { FormFieldTypeEnum } from 'src/_lib/_enums/FieldTypeEnum';
import { FormFieldProps, TextFieldProps } from 'src/_lib/_types/formTypes';

export const getFormItem = (type: FormFieldTypeEnum, props: FormFieldProps) => {
  switch (type) {
    case FormFieldTypeEnum.Text:
      return <TextField {...props} />;
    case FormFieldTypeEnum.Password:
      return <PasswordField {...props} />;
    case FormFieldTypeEnum.Number:
      return <NumberField {...props} />;
    case FormFieldTypeEnum.Checkbox:
      return null;
  }
};

interface IProps extends FormFieldProps {}

const TextField: React.FC<IProps> = (props) => {
  const { id, isPassword, disabled, placeholder, value, required, width, onChange } = props as TextFieldProps;
  const { styles } = useAppContext();
  const [focused, setFocused] = React.useState<boolean>(false);

  return (
    <View key={id} style={{ width }}>
      <View>
        <Text style={styles.inputStyles.placeholderStyle}>
          {focused || (value as string)?.length ? (required ? `${placeholder} *` : placeholder) : ''}
        </Text>
      </View>
      <TextInput
        style={[
          styles.inputStyles.formInputField,
          {
            borderColor: disabled ? styles.colors.gray[100] : focused ? styles.colors.blueAccent[200] : '',
          },
        ]}
        placeholder={focused ? '' : placeholder}
        editable={!disabled}
        value={value}
        secureTextEntry={isPassword}
        onChangeText={(value) => onChange(value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};

const PasswordField: React.FC<IProps> = (props) => {
  const { id, isPassword, disabled, placeholder, value, required, width, onChange } = props as TextFieldProps;
  const { styles } = useAppContext();
  const [focused, setFocused] = React.useState<boolean>(false);

  return (
    <View key={id} style={{ width: width }}>
      <View>
        <Text style={{ paddingLeft: 5, paddingBottom: 4, color: styles.colors.blueAccent[200] }}>
          {focused || (value as string)?.length ? placeholder : ''}
        </Text>
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
        value={required ? `${value} *` : value}
        secureTextEntry={isPassword}
        onChangeText={(value) => onChange(value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};

const NumberField: React.FC<IProps> = (props) => {
  return <View></View>;
};
