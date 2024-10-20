import React from 'react';
import { RegisterOptions } from 'react-hook-form';
import { FormProviderContext } from 'src/_contextProviders/FormContextProvider';

export const useCustomFormContext = () => {
  const context = React.useContext(FormProviderContext);

  if (!context) {
    throw Error('App context is not available!');
  }

  const registerField = (name: string, options?: RegisterOptions<any, string>) => {
    return context.register(name, options);
  };

  const onFieldChanged = React.useCallback(
    (name: string, value: any) => {
      context.setFieldValue(name, value);
    },
    [context]
  );

  const onResetFormField = React.useCallback(
    (name: string) => {
      context.resetField(name, { keepDirty: false, keepError: false, keepTouched: false });
    },
    [context]
  );

  return {
    fieldValues: context.state,
    errors: context.errors,
    isSubmitted: context.isSubmitted,
    isLoading: context.isLoading,
    control: context.control,
    registerField: registerField,
    onFieldChanged: onFieldChanged,
    onResetFormField: onResetFormField,
    methods: { ...context.methods },
  };
};
