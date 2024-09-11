import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import {
  Timeline,
  TimelineDot,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  TimelineOppositeContent,
} from '@mui/lab';

import { fDate } from 'utils/format-time';

import { Task } from 'entites/task/model';

import { statusOptions } from './status-options';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  history: Task['task_history'] | undefined;
  hidden: boolean;
}

export function HistoryPanel({ history, hidden }: Props) {
  console.log(history);

  return (
    <Box hidden={hidden}>
      {history && (
        <Timeline
          sx={{
            m: 0,
            p: 0,
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {history.map((step, idx, arr) => (
            <TimelineItem key={idx}>
              <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align="right"
                variant="body2"
                color="text.secondary"
              >
                <div>{fDate(step.timestamp)}</div>
                <div>{fDate(step.timestamp, 'hh:mm:ss')}</div>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot variant="outlined" color={statusOptions[step.task_status].color} />
                {idx !== arr.length - 1 && (
                  <TimelineConnector sx={{ bgcolor: `${statusOptions[step.task_status]}.main` }} />
                )}
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="body2">{step.current_stage.stage_name}</Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      )}
    </Box>
  );
}
