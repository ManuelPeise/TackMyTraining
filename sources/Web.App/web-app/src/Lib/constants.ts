import { DialogInitializationProps } from 'src/types';

export const loginDialogInitializationProps: DialogInitializationProps = {
  title: '',
  open: false,
  saveDisabled: true,
  cancelDisabled: true,
  actionLabel: 'LOGIN',
  cancelLable: 'CANCEL',
  keepMounted: true,
  minWidth: 200,
  onToggleOpen: () => {},
  onAction: () => {},
  onCancel: () => {},
};

export const registerDialogInitializationProps: DialogInitializationProps = {
  title: '',
  open: false,
  saveDisabled: true,
  cancelDisabled: true,
  actionLabel: 'REGISTER',
  cancelLable: 'CANCEL',
  keepMounted: true,
  minWidth: 200,
  onToggleOpen: () => {},
  onAction: () => {},
  onCancel: () => {},
};

export const dateFormats = {
  YearMonthDay: 'YYYY-MM-DD',
};
