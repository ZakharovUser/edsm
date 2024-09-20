import { DialogProps } from '@mui/material/Dialog';
import { ButtonProps } from '@mui/material/Button';

// ----------------------------------------------------------------------

export type ConfirmDialogProps = Omit<DialogProps, 'title' | 'content'> & {
  title: React.ReactNode;
  content?: React.ReactNode;
  action: React.ReactNode;
  onClose: VoidFunction;
  closeProps?: ButtonProps;
};
