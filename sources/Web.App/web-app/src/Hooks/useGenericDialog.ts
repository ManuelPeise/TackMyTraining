import React from 'react';
import { IDialogProps } from 'src/Lib/Interfaces/IDialogProps';
import { DialogInitializationProps } from 'src/types';

export const useGenericDialog = (props: DialogInitializationProps) => {
  const dialog = {} as IDialogProps;

  dialog.title = props.title;
  dialog.minWidth = props.minWidth;
  dialog.open = props.open;
  dialog.keepMounted = props.keepMounted;
  dialog.hasCancelButton = props.onCancel !== null;
  dialog.actionButtonLabel = props.actionLabel;
  dialog.cancelButtonLabel = props.onCancel != null ? props.cancelLable : undefined;
  dialog.saveDisabled = props.saveDisabled;
  dialog.cancelDisabled = props.cancelDisabled;
  dialog.onToggleOpen = props.onToggleOpen;

  const handleCancel = React.useCallback(async () => {
    props.onToggleOpen(false);

    props.onCancel && props.onCancel();
  }, [props]);

  const handleAction = React.useCallback(async () => {
    props.onToggleOpen(false);
    props.onAction();
  }, [props]);

  dialog.onAction = handleAction;
  dialog.onCancel = props.onCancel != null ? handleCancel : undefined;

  return dialog;
};
