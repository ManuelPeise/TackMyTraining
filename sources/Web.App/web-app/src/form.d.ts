import moment from 'moment';
import { TValue } from './customTypes';
import { DataTypeEnum } from './Lib/Enums/DataTypeEnum';

export type FormModelReturnType<TModel, TValue> = {
  state: TModel;
  formMembers: FormEntryDictionary<TModel, TValue>;
  formIsValid: boolean;
  isModified: boolean;
  resetForm: () => void;
};

type FormEntry<TModel, TValue> = {
  property: keyof TModel;
  value: TValue;
  dataType: DataTypeEnum;
  required: boolean;
  updateFunction: (value: TValue) => void;
  validationFunction?: (value: TValue) => boolean;
};

export type FormEntryDictionary<TModel, TValue> = {
  [P in keyof TModel]: FormEntry<TModel, TValue>;
};

export type FormEntrySettings<TModel> = {
  key: keyof TModel;
  type: DataTypeEnum;
  required: boolean;
  validationCallback?: (value: TValue) => TValue;
};

export type Login = {
  email: string;
  password: string;
  remember?: boolean;
};

export type Registration = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: moment.Moment | null;
  password: string;
  confirmPassword: string;
};
