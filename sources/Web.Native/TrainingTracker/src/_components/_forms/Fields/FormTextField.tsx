import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import { useAppContext } from 'src/_hooks/useAppContext';

interface IProps {
  name: string;
  disabled?: boolean;
  required?: boolean;
  control: Control<FieldValues, any>;
  defaultValue: string | null;
  placeholder: string | null;
}

const FormTextField = React.forwardRef((props: IProps, ref: React.MutableRefObject<any>) => {
  const { name, defaultValue, placeholder, disabled, required, control } = props;
  const { styles } = useAppContext();

  return (
    <View ref={ref}>
      <View>
        <Text style={styles.inputStyles.placeholderStyle}>{placeholder}</Text>
      </View>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            style={[
              styles.inputStyles.formInputField,
              {
                borderColor: disabled
                  ? styles.colors.gray[600]
                  : required && !value.length
                    ? styles.colors.redAccent[300]
                    : styles.colors.blueAccent[200],
              },
            ]}
            value={value}
            editable={!disabled}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
    </View>
  );
});

export default FormTextField;
