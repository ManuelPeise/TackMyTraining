export interface IDialogProps {
  title: string;
  minWidth: number;
  open: boolean;
  keepMounted?: boolean;
  hasCancelButton?: boolean;
  actionButtonLabel: string;
  cancelButtonLabel?: string;
  saveDisabled?: boolean;
  cancelDisabled?: boolean;
  onToggleOpen: (open: boolean) => void;
  onAction: () => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
}
