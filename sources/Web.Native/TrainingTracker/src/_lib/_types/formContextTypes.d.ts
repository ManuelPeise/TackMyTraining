import { PropsWithChildren } from 'react';

export type FormContextProps<TModel> = PropsWithChildren & {
  defaultValues?:
    | AsyncDefaultValues<{
        formModel: TModel;
      }>
    | {
        formModel?: TModel;
      };
  buttonPosition: 'center' | 'flex-end';
  onSubmit: () => Promise<boolean>;
  padding?: number;
  marginTop?: number;
  cancelLabel?: string;
  actionLabel?: string;
};

export type CustomFormContentProps = {
  methods: UseFormReturn<FieldValues, any, undefined>;
  state: FormState<FieldValues>;
  isSubmitted: boolean;
  isLoading: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  control: Control<FieldValues, any>;
  setFieldValue: <string>(
    name: string,
    value: any,
    options?: Partial<{
      shouldValidate: boolean;
      shouldDirty: boolean;
      shouldTouch: boolean;
    }>
  ) => void;
  resetField: <string>(
    name: string,
    options?: Partial<{
      keepDirty: boolean;
      keepTouched: boolean;
      keepError: boolean;
      defaultValue: any;
    }>
  ) => void;
};
