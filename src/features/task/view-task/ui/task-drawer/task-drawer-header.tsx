import React from 'react';

import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import NotesIcon from '@mui/icons-material/Notes';
import Stack, { StackProps } from '@mui/material/Stack';
import TimelineIcon from '@mui/icons-material/Timeline';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import { View } from 'features/task/view-task/models';

// -----------------------------------------------------------------------------------------------------------------

interface Props extends StackProps {
  view: View;
  onClose: VoidFunction;
  onChangeView(view: View): void;
}

export function TaskDrawerHeader({ view, onClose, onChangeView, sx, ...props }: Props) {
  const theme = useTheme();

  const changeVieHandler = (_event: React.MouseEvent<HTMLElement>, nextView: View | null) => {
    if (nextView !== null) onChangeView(nextView);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ borderBottom: `dashed 1px ${theme.palette.divider}`, py: 1, ...sx }}
      {...props}
    >
      <IconButton onClick={onClose} size="small">
        <KeyboardDoubleArrowRightIcon />
      </IconButton>

      <ToggleButtonGroup
        exclusive
        size="small"
        value={view}
        onChange={changeVieHandler}
        sx={{ bgcolor: 'transparent' }}
      >
        <ToggleButton value={View.Summary} sx={{ p: 0.5 }}>
          <NotesIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value={View.History} sx={{ p: 0.5 }}>
          <TimelineIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value={View.Comments} sx={{ p: 0.5 }}>
          <AnnouncementOutlinedIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value={View.Attachments} sx={{ p: 0.5 }}>
          <AttachFileOutlinedIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
