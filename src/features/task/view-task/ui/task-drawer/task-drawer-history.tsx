import Label from 'components/label';
import React, { Fragment } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alertClasses } from '@mui/material/Alert';
import { TimelineDot, TimelineConnector, TimelineSeparator } from '@mui/lab';

import { fDate } from 'utils/format-time';
import { formatUserName } from 'utils/format-user-name';

import { taskStatusOptions } from 'features/task/view-task/helpers';

import { Task } from 'entities/task/model';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  history: Task['task_history'] | undefined;
  hidden: boolean;
}

export function TaskDrawerHistory({ history, hidden }: Props) {
  if (!history) return null;

  return (
    <Box hidden={hidden}>
      <Box
        sx={{
          columnGap: 1.5,
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
        }}
      >
        {history.map((step, idx, arr) => {
          const { color, label } = taskStatusOptions[step.task_status];

          return (
            <Fragment key={step.id}>
              <Stack sx={{ justifySelf: 'end', pt: 0.5, pb: 2 }}>
                <Label>{step.current_stage.stage_name}</Label>
                <Typography noWrap variant="caption" align="right">
                  {fDate(step.timestamp, 'dd.MM.yy HH:mm')}
                </Typography>
              </Stack>

              <TimelineSeparator>
                <TimelineDot variant="outlined" color={color === 'default' ? 'grey' : color} />
                {idx !== arr.length - 1 && <TimelineConnector />}
              </TimelineSeparator>

              <Stack sx={{ py: 0.7 }} alignItems="start" gap={1}>
                <Label variant="soft" color={color}>
                  {label}
                </Label>

                <Box sx={{ width: 1 }}>
                  {step.comments.map(({ commented_by, ...comment }) => (
                    <Box
                      key={comment.id}
                      sx={{
                        px: 1,
                        py: 0.5,
                        mb: 0.5,
                        borderRadius: 1,
                        color: 'warning.darker',
                        bgcolor: 'warning.lighter',
                        border: ({ palette }) => `1px solid ${palette.warning.light}`,

                        [`& .${alertClasses.message}`]: { p: 0, width: 1 },
                      }}
                    >
                      <Typography variant="body2">{comment.comment_text}</Typography>

                      <Stack
                        sx={{ mt: 1, color: 'warning.dark', width: 1 }}
                        direction="row"
                        justifyContent="space-between"
                        gap={1}
                      >
                        <Typography noWrap variant="caption">
                          {formatUserName(
                            commented_by.last_name,
                            commented_by.first_name,
                            commented_by.middle_name
                          )}
                        </Typography>
                        <Typography noWrap variant="caption">
                          {fDate(comment.comment_date, 'dd.MM.yy HH:mm')}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Box>
              </Stack>
            </Fragment>
          );
        })}
      </Box>
    </Box>
  );
}
