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

const FormTextField = React.forwardRef((props: IProps, ref: React.MutableRefObject<any>) => {
  const { name, defaultValue, placeholder, disabled, required, control, pattern, onFieldValueChanged } = props;
  const regEx = React.useRef(pattern !== undefined ? new RegExp(pattern) : null);
  const { styles } = useAppContext();
  const [focused, setFocused] = React.useState<boolean>(false);

  const handleChange = React.useCallback(
    (value: string) => {
      let isValidValue = false;
      if (pattern) {
        isValidValue = regEx.current.test(value);
      }

      if (isValidValue) {
        onFieldValueChanged(name, value);
      } else {
        if (defaultValue) {
          onFieldValueChanged(name, defaultValue);
          return;
        } else {
          onFieldValueChanged(name, null);
        }
      }
    },
    [defaultValue, onFieldValueChanged]
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
        defaultValue={defaultValue}
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

export default FormTextField;
