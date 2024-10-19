import { parseInt } from 'lodash';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { useAppContext } from 'src/_hooks/useAppContext';
import { FormFieldTypeEnum } from 'src/_lib/_enums/FieldTypeEnum';
import { ValidationTypeEnum } from 'src/_lib/_enums/ValidationTypeEnum';
import { FormInputProps, PartialFormEntryUpdate } from 'src/_lib/_types/customTypes';
import { customValidationCallbacks } from 'src/_lib/validation';

export default class FormFieldFactory {
  static execute(type: FormFieldTypeEnum, props: FormInputProps) {
    switch (type) {
      case FormFieldTypeEnum.Text:
        return formTextField(props as FormInputProps);
      case FormFieldTypeEnum.Number:
        return formNumberField(props as FormInputProps);
      default:
        return null;
    }
  }
}

const validateValue = (type: ValidationTypeEnum, value: string, length?: number, min?: number, max?: number) => {
  switch (type) {
    case ValidationTypeEnum.String:
      return customValidationCallbacks.isValidStringLength(value, length);
    case ValidationTypeEnum.Email:
      return customValidationCallbacks.isEmail(value);
    case ValidationTypeEnum.Password:
      return customValidationCallbacks.isValidStringLength(value, length);
    default:
      return true;
  }
};
export function getFormTextFieldProps(
  id: string,
  value: string,
  isPassword: boolean,
  onChange: (update: PartialFormEntryUpdate) => void,
  required?: boolean,
  disabled?: boolean,
  placeholder?: string,
  validationType?: ValidationTypeEnum,
  error?: string
): FormInputProps {
  return {
    id: id,
    type: isPassword ? FormFieldTypeEnum.Password : FormFieldTypeEnum.Text,
    value: value as string,
    isPassword: isPassword,
    required: required,
    disabled: disabled,
    placeholder: placeholder,
    onChange: onChange,
    validationType: validationType,
    error: error,
  };
}

function formTextField(props: FormInputProps) {
  const { id, isPassword, disabled, placeholder, value, required, validationType, error, onChange } = props;
  const { styles } = useAppContext();
  const [focused, setFocused] = React.useState<boolean>(false);
  const [validationResult, setValidationResult] = React.useState<{ isValid: boolean; error: string }>({
    isValid: false,
    error: '',
  });

  const validate = React.useCallback((value: string) => {
    return validateValue(validationType, value);
  }, []);

  React.useEffect(() => {
    if ((value as string)?.length && validationType !== ValidationTypeEnum.None) {
      const result = validate(value as string);

      setValidationResult({
        isValid: result,
        error: !result ? error : '',
      });
    }
  }, [value]);

  const handleChange = React.useCallback(
    (value: string) => {
      if (validationType !== ValidationTypeEnum.None) {
        onChange({ key: id, value: value, isValid: validationResult.isValid, error: validationResult.error });
        return;
      }

      onChange({ key: id, value: value });
    },
    [onChange]
  );

  return (
    <View key={id as string}>
      <View>
        <Text style={styles.inputStyles.placeholderStyle}>
          {focused || (value as string)?.length ? (required ? `${placeholder} *` : placeholder) : ''}
        </Text>
      </View>
      <TextInput
        style={[
          styles.inputStyles.formInputField,
          {
            borderColor: disabled
              ? styles.colors.gray[100]
              : focused
                ? styles.colors.blueAccent[200]
                : styles.colors.blueAccent[900],
          },
        ]}
        placeholder={focused ? '' : required ? `${placeholder} *` : placeholder}
        placeholderTextColor={styles.colors.blueAccent[100]}
        editable={!disabled}
        value={value as string}
        secureTextEntry={isPassword}
        onChangeText={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

function formNumberField(props: FormInputProps) {
  const { id, isPassword, disabled, placeholder, value, numberType, required, validationType, error, onChange } = props;
  const { styles } = useAppContext();
  const [focused, setFocused] = React.useState<boolean>(false);
  const [validationResult, setValidationResult] = React.useState<{ isValid: boolean; error: string }>({
    isValid: false,
    error: '',
  });

  const validate = React.useCallback((value: number) => {
    return validateValue(validationType, value as unknown as string);
  }, []);

  React.useEffect(() => {
    if ((value as string)?.length && validationType !== ValidationTypeEnum.None) {
      const result = validate(value as unknown as number);

      setValidationResult({
        isValid: result,
        error: !result ? error : '',
      });
    }
  }, [value, validate]);

  const numberValue = React.useMemo(() => {
    if (value == null || value === '0') {
      return null;
    }

    const stringValue = value as string;

    if (stringValue.length && numberType === 'integer') {
      return parseInt(stringValue).toFixed(0);
    }

    return parseFloat(stringValue).toFixed(2);
  }, [value]);

  const handleChange = React.useCallback(
    (value: string) => {
      const replacedValue = value.replace(/[^0-9]/g, '');

      if (replacedValue.length === 0) {
        if (replacedValue != null) {
          if (validationType !== ValidationTypeEnum.None) {
            onChange({ key: id, value: value, isValid: validationResult.isValid, error: validationResult.error });

            return;
          }
          onChange({ key: id, value: value });
        }
      } else if (replacedValue.match(/[0-9]/g)) {
        if (validationType !== ValidationTypeEnum.None) {
          onChange({ key: id, value: value, isValid: validationResult.isValid, error: validationResult.error });

          return;
        }
        onChange({ key: id, value: value });
      }
    },
    [onChange]
  );

  return (
    <View key={id as string}>
      <View>
        <Text style={styles.inputStyles.placeholderStyle}>
          {focused || (value as unknown as string)?.length ? (required ? `${placeholder} *` : placeholder) : ''}
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
        value={numberValue}
        secureTextEntry={isPassword}
        onChangeText={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}
