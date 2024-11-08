import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

// -----------------------------------------------------------------------------------------------------------------

export interface TaskDeadlineExtendButtonProps {
  title: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: VoidFunction;
}

export function TaskDeadlineExtendButton({
  title,
  size = 'small',
  onClick,
}: TaskDeadlineExtendButtonProps) {
  return (
    <Tooltip title={title}>
      <IconButton size={size} onClick={onClick}>
        <EditCalendarIcon fontSize={size} />
      </IconButton>
    </Tooltip>
  );
}
