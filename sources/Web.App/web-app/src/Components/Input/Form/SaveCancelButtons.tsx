import { Button, Grid2, ListItem, useTheme } from '@mui/material';
import React, { CSSProperties } from 'react';
import { tokens } from 'src/Lib/theme';

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

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const cancelButtonButtonStyle = React.useMemo((): CSSProperties => {
    return {
      border: `${cancelDisabled ? `1px solid ${colors.gray[400]}` : `1px solid ${colors.gray[100]}`}`,
      backgroundColor: cancelDisabled ? colors.gray[400] : colors.gray[400],
      color: cancelDisabled ? colors.gray[200] : colors.gray[900],
    };
  }, [cancelDisabled, colors]);

  const saveButtonButtonStyle = React.useMemo((): CSSProperties => {
    return {
      border: `${saveDisabled ? `1px solid ${colors.gray[400]}` : `1px solid ${colors.gray[100]}`}`,
      backgroundColor: saveDisabled ? colors.gray[400] : colors.gray[400],
      color: saveDisabled ? colors.gray[200] : colors.gray[900],
    };
  }, [saveDisabled, colors]);

  const handleCancel = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      cancelAction();
    },
    [cancelAction]
  );

  const handleSave = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onAction();
    },
    [onAction]
  );

  return (
    <ListItem style={{ display: 'flex', justifyContent: placement ?? 'end', flexDirection: 'row', width: width }}>
      <Grid2 spacing={10} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
        <Grid2 padding={1.5}>
          <Button
            disabled={cancelDisabled}
            sx={{
              ...cancelButtonButtonStyle,
              '&:hover': {
                color: '#fff',
                cursor: 'pointer',
              },
            }}
            onClick={handleCancel}
          >
            {cancelLabel}
          </Button>
        </Grid2>
        <Grid2 padding={1.5}>
          <Button
            disabled={saveDisabled}
            sx={{
              ...saveButtonButtonStyle,
              '&:hover': {
                color: '#fff',
                cursor: 'pointer',
              },
            }}
            onClick={handleSave}
          >
            {actionLabel}
          </Button>
        </Grid2>
      </Grid2>
    </ListItem>
  );
};

export default SaveCancelButtons;
