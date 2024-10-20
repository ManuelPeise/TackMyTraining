import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import SaveCancelButtons from 'src/_components/_buttons/SaveCancelButtons';
import { useAppContext } from 'src/_hooks/useAppContext';
import { CustomFormContentProps, FormContextProps } from 'src/_lib/_types/formContextTypes';

export const FormProviderContext = React.createContext<CustomFormContentProps>({} as CustomFormContentProps);

const FormContextProvider = <TModel,>(props: FormContextProps<TModel>) => {
  const {
    additionalStyle,
    children,
    padding,
    defaultValues,
    buttonPosition,
    actionLabel,
    cancelLabel,
    marginTop,
    onSubmit,
  } = props;
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { styles } = useAppContext();
  const methods = useForm({ defaultValues: defaultValues, mode: 'all' });

  const onResetToDefaults = () => {
    methods.reset(methods.formState.defaultValues);
  };

  const handleSubmit = React.useCallback(async () => {
    await onSubmit(methods.watch()).then((result) => {
      setIsSubmitted(result);
    });
  }, [methods, onSubmit]);

  return (
    <View style={[styles.containerStyles.formStyle, additionalStyle, { padding: padding }]}>
      <FormProviderContext.Provider
        value={{
          methods: methods,
          isSubmitted: isSubmitted,
          isLoading: methods.formState.isLoading,
          state: methods.formState,
          errors: methods.formState.errors,
          control: methods.control,
          register: methods.register,
          setFieldValue: methods.setValue,
          resetField: methods.resetField,
        }}
      >
        <FormProvider {...methods}>
          <View>{children}</View>
          <SaveCancelButtons
            marginTop={marginTop}
            canCancel={methods.formState.isDirty}
            canSave={methods.formState.isDirty && methods.formState.isValid}
            position={buttonPosition}
            cancelLabel={cancelLabel}
            saveLabel={actionLabel}
            onCancel={onResetToDefaults}
            onSave={handleSubmit}
          />
        </FormProvider>
      </FormProviderContext.Provider>
    </View>
  );
};

export default FormContextProvider;
