import styled from '@emotion/styled';
import { Dialog, DialogActions, DialogContent, DialogTitle, Theme } from '@mui/material';

export const StyledDialog = styled(Dialog)((theme: Theme) => ({}));

export const StyledDialogTitle = styled(DialogTitle)(() => ({
  backgroundColor: '#292929',
}));

export const StyledDialogContent = styled(DialogContent)((theme: Theme) => ({}));

export const StyledDialogActions = styled(DialogActions)((theme: Theme) => ({
  backgroundColor: '#292929',
}));
