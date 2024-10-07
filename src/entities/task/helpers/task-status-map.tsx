import { ReactElement } from 'react';
import { LabelColor } from 'components/label';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

import { TaskStatus } from 'entities/task/model';

// -----------------------------------------------------------------------------------------------------------------

type Options = {
  label: string;
  color: LabelColor;
  icon?: ReactElement;
};

export const taskStatusMap: Record<TaskStatus, Options> = {
  [TaskStatus.New]: { color: 'info', label: 'Новая', icon: <AddCircleOutlineRoundedIcon /> },
  [TaskStatus.Draft]: { color: 'default', label: 'Черновик', icon: <SaveAsOutlinedIcon /> },
  [TaskStatus.Canceled]: { color: 'error', label: 'Отменена', icon: <HighlightOffIcon /> },
  [TaskStatus.Progress]: { color: 'secondary', label: 'В работе', icon: <WorkHistoryOutlinedIcon /> },
  [TaskStatus.Completed]: { color: 'success', label: 'Завершена', icon: <CheckCircleOutlineOutlinedIcon /> },
  [TaskStatus.Refinement]: { color: 'warning', label: 'На доработке', icon: <ErrorOutlineRoundedIcon /> },
};
