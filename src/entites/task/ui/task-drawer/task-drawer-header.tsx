import React from 'react';

import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import NotesIcon from '@mui/icons-material/Notes';
import TimelineIcon from '@mui/icons-material/Timeline';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

// -----------------------------------------------------------------------------------------------------------------

export enum View {
  Summary,
  History,
}

interface Props {
  view: View;
  onClose: VoidFunction;
  onChangeView(view: View): void;
}

export function TaskDrawerHeader({ view, onClose, onChangeView }: Props) {
  const theme = useTheme();

  const changeVieHandler = (_event: React.MouseEvent<HTMLElement>, nextView: View | null) => {
    if (nextView !== null) onChangeView(nextView);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ flex: 0, borderBottom: `dashed 1px ${theme.palette.divider}`, py: 1 }}
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
      </ToggleButtonGroup>
    </Stack>
  );
}
