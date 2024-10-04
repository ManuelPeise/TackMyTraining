import { DataTypeEnum } from './Lib/Enums/DataTypeEnum';

declare module '*.css';
declare module '*.json' {
  const value: any;
  export default value;
}

export type FormInputProps<T> = {
  key: keyof T;
  type: DataTypeEnum;
  value: string | number | null;
  label?: string;
  validationCallback?: (value: string | number | null) => boolean;
};

export type DialogInitializationProps = {
  open: boolean;
  actionLabel: string;
  onToggleOpen: (open: boolean) => void;
  onAction: () => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
  title?: string;
  keepMounted?: boolean;
  cancelLable?: string;
  saveDisabled?: boolean;
  cancelDisabled?: boolean;
  minWidth?: number;
};
