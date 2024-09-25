import { Button, Grid2, ListItem } from '@mui/material';
import React, { CSSProperties } from 'react';
import { colors } from 'src/Lib/colors';

interface IProps {
  width?: string;
  placement?: 'center' | 'end';
  actionLabel: string;
  cancelLabel?: string;
  cancelDisabled?: boolean;
  saveDisabled?: boolean;
  onAction: () => void | Promise<void>;
  cancelAction: () => void | Promise<void>;
}

const SaveCancelButtons: React.FC<IProps> = (props) => {
  const { width, cancelLabel, actionLabel, cancelDisabled, saveDisabled, placement, onAction, cancelAction } = props;

  const cancelButtonButtonStyle = React.useMemo((): CSSProperties => {
    return {
      borderRadius: 25,
      backgroundColor: !cancelDisabled ? colors.buttons.BackgroundDisabled : colors.buttons.ActiveCancel,
      color: !cancelDisabled ? colors.buttons.FontDisabled : colors.buttons.FontActiveWhite,
    };
  }, [cancelDisabled]);

  const saveButtonButtonStyle = React.useMemo((): CSSProperties => {
    return {
      borderRadius: 25,
      backgroundColor: !saveDisabled
        ? colors.buttons.BackgroundDisabledConfirm
        : colors.buttons.BackgroundActiveConfirm,
      color: !saveDisabled ? colors.buttons.FontDisabled : colors.buttons.FontActiveWhite,
    };
  }, [saveDisabled]);

  return (
    <ListItem style={{ display: 'flex', justifyContent: placement ?? 'end', flexDirection: 'row', width: width }}>
      <Grid2 spacing={10} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
        <Grid2 padding={1.5}>
          <Button disabled={!cancelDisabled} sx={cancelButtonButtonStyle} onClick={cancelAction}>
            {cancelLabel}
          </Button>
        </Grid2>
        <Grid2 padding={1.5}>
          <Button disabled={!saveDisabled} sx={saveButtonButtonStyle} onClick={onAction}>
            {actionLabel}
          </Button>
        </Grid2>
      </Grid2>
    </ListItem>
  );
};

export default SaveCancelButtons;
