export enum FormFieldTypeEnum {
  Text = 'text',
  Password = 'password',
  Number = 'number',
  Checkbox = 'checkbox',
}

export type FormFieldSetup<TModel> = {
  id: keyof TModel;
  type: FormFieldTypeEnum;
  placeholder?: string;
  required?: boolean;
  width?: number;
};

export type FormProps<T1, T2> = {
  formId: string;
  model: T1;
  fields: FormFieldProps[];
  additionalModel?: T2;
  additionalFields?: FormFieldProps[];
};

export type FormFieldProps = {
  id: string;
  type: FormFieldTypeEnum;
  placeholder?: string;
  checked?: boolean;
  value?: unknown;
  isPassword?: boolean;
  required?: boolean;
  width?: number;
};

export type FormSetup<T1, T2> = {
  formId: string;
  model: T1;
  additionalModel?: T2;
  fields: FormFieldSetup<T1>[];
  additionalFields?: FormFieldSetup<T2>[];
};

type InputFieldPropsBase = {
  id: string;
  type: FormFieldTypeEnum;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  width?: number;
};

export type TextFieldProps = InputFieldPropsBase & {
  value: string;
  isPassword?: boolean;
  onChange: (value: string) => void;
};

export type NumberFieldProps = InputFieldPropsBase & {
  value: number;
  onChange: (value: number) => void;
};
