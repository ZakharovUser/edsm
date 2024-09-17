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

import { Task } from 'entities/task/model';

import { taskStatusOptions } from '../helpers';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  history: Task['task_history'] | undefined;
  hidden: boolean;
}

export function TaskDrawerHistory({ history, hidden }: Props) {
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
                <div>{fDate(step.timestamp, 'HH:mm:ss')}</div>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot variant="outlined" color={taskStatusOptions[step.task_status].color} />
                {idx !== arr.length - 1 && (
                  <TimelineConnector
                    sx={{ bgcolor: `${taskStatusOptions[step.task_status]}.main` }}
                  />
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
