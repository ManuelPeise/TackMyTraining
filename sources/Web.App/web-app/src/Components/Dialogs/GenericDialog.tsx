import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { IDialogProps } from 'src/Lib/Interfaces/IDialogProps';

interface IProps extends PropsWithChildren {
  dialogProps: IDialogProps;
}

const GenericDialog: React.FC<IProps> = (props) => {
  const { dialogProps, children } = props;
  return (
    <Dialog
      keepMounted={dialogProps.keepMounted}
      open={dialogProps.open}
      PaperProps={{
        sx: { width: '100%', minWidth: `${dialogProps.minWidth}px!important` },
      }}
    >
      <DialogTitle>{dialogProps.title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {dialogProps.hasCancelButton && (
          <Button disabled={dialogProps.cancelDisabled} onClick={dialogProps.onCancel}>
            {dialogProps.cancelButtonLabel}
          </Button>
        )}
        <Button disabled={dialogProps.saveDisabled} onClick={dialogProps.onAction}>
          {dialogProps.actionButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenericDialog;
