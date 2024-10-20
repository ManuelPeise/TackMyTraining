import React from 'react';
import { ChangeHandler, Control, Controller, FieldValues, RefCallBack } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import { useAppContext } from 'src/_hooks/useAppContext';

interface IProps {
  name: string;
  disabled?: boolean;
  required?: boolean;
  min?: number | string;
  minLength?: number;
  max?: number | string;
  maxLength?: number;
  pattern?: string;
  control: Control<FieldValues, any>;
  ref?: RefCallBack;
  onChange?: ChangeHandler;
  //   custom properties
  defaultValue: string | null;
  placeholder: string | null;
  onFieldValueChanged: (name: string, value: string) => void;
}

const FormNumberField = React.forwardRef((props: IProps, ref: React.MutableRefObject<any>) => {
  const { name, defaultValue, placeholder, disabled, required, control, onFieldValueChanged } = props;
  const { styles } = useAppContext();
  const [focused, setFocused] = React.useState<boolean>(false);

  const handleChange = React.useCallback(
    (value: string) => {
      const stringValue = value.replace(/[^0-9]/g, '');

      if (stringValue.length === 0) {
        onFieldValueChanged(name, defaultValue);
      } else if (stringValue.match(/[0-9]/g)) {
        onFieldValueChanged(name, parseFloat(stringValue).toString());
      }
    },
    [onFieldValueChanged]
  );

  return (
    <View ref={ref}>
      <View>
        <Text style={styles.inputStyles.placeholderStyle}>
          {focused || (defaultValue as string)?.length ? (required ? `${placeholder} *` : placeholder) : ''}
        </Text>
      </View>
      <Controller
        name={name}
        control={control}
        render={({ field: { value } }) => (
          <TextInput
            style={[
              styles.inputStyles.formInputField,
              {
                borderColor: disabled ? styles.colors.gray[100] : focused ? styles.colors.blueAccent[200] : '',
              },
            ]}
            placeholder={placeholder}
            value={value}
            editable={!disabled}
            onChangeText={handleChange}
            onBlur={() => setFocused(false)}
            onFocus={() => setFocused(true)}
          />
        )}
      />
    </View>
  );
});

export default FormNumberField;
