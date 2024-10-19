import { ValidationTypeEnum } from '_lib/_enums/ValidationTypeEnum';

export type KeysOfModel<TModel> = {
  [P in keyof TModel]: P;
};
export type KeysOfModels<T1, T2> = {
  [P in keyof T1]: T1[P] extends T2 ? P : never;
};

export type ValidationCallback<T> = (input: T) => boolean;

export type FormValidationCallback<T> = (value: T, callback: ValidationCallback<T>) => boolean;

export type MergedDataType<TParent, TChild, TCondition> = TParent extends { contactData: TCondition }
  ? TParent & TChild
  : TParent;

export type ValidatedFormProps<TFormModel, P extends keyof TFormModel, TValidate extends boolean> = {
  key: P;
  value: TFormModel[P];
  required: boolean;
  error: string;
  isValid: boolean;
};

export type FormProps<TFormModel, P extends keyof TFormModel> = {
  key: P;
  value: TFormModel[P];
  required: boolean;
};

export type FormEntry<TFormModel, TValidate extends boolean> = {
  [P in keyof TFormModel]?: TValidate extends true
    ? ValidatedFormProps<TFormModel, P, TValidate>
    : FormProps<TFormModel, P>;
};

export type PartialFormEntryUpdate = {
  key: string;
  value: string | number | boolean;
  error?: string;
  isValid?: boolean;
};

export type FormInputProps = {
  id: string;
  type: FormFieldTypeEnum;
  value: string | number | boolean;
  onChange?: (update: PartialFormEntryUpdate) => void;
  validationType?: ValidationTypeEnum;
  checked?: boolean;
  numberType?: 'integer' | 'decimal';
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  isPassword?: boolean;
  error?: string;
};
