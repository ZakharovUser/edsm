import { useRef, useState, useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import Alert from '@mui/material/Alert';
import TabPanel from '@mui/lab/TabPanel';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import AlertTitle from '@mui/material/AlertTitle';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useTaskRoutes, useCreateTaskQuery } from 'entities/task/api';

import { CreateTaskForm } from './create-task-form';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

export function CreateTaskModal({ open, onClose }: Props) {
  const ref = useRef<HTMLDivElement>();

  const [tab, setTab] = useState<string>('');

  const createTaskQuery = useCreateTaskQuery();

  const { data: routes } = useTaskRoutes({
    select: (originalRoutes) =>
      originalRoutes.map((route) => ({
        id: route.id.toString(),
        name: route.name,
      })),
  });

  useEffect(() => {
    if (routes) setTab(`route${routes[0].id}`);
  }, [routes]);

  const closeHandler = () => {
    createTaskQuery.reset();
    onClose();
  };

  const errorHandler = (error: unknown) => {
    ref.current?.scrollTo(0, 0);
    throw error;
  };

  return (
    <Dialog open={open} onClose={closeHandler} fullWidth maxWidth="sm">
      <DialogTitle>Создание задачи</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', p: 0 }}>
        {routes && (
          <TabContext value={tab}>
            <Box sx={{ px: 3, borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={(_, value) => setTab(value)}>
                {routes.map((route) => (
                  <Tab key={`tab${route.id}`} label={route.name} value={`route${route.id}`} />
                ))}
              </TabList>
            </Box>

            <Box sx={{ overflowY: 'auto', scrollBehavior: 'smooth', p: 3 }} ref={ref}>
              {createTaskQuery.error && (
                <Alert sx={{ mb: 2 }} severity="error">
                  <AlertTitle>Ошибка</AlertTitle>
                  {createTaskQuery.error.message}
                </Alert>
              )}

              {routes.map((route) => (
                <TabPanel key={`panel${route.id}`} value={`route${route.id}`} sx={{ p: 0 }}>
                  <CreateTaskForm
                    route={route.id}
                    name={`route${route.id}`}
                    onSubmit={(values) =>
                      createTaskQuery.mutateAsync(values).then(closeHandler).catch(errorHandler)
                    }
                  />
                </TabPanel>
              ))}
            </Box>
          </TabContext>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          form={tab}
          type="reset"
          onClick={closeHandler}
          disabled={createTaskQuery.isPending}
        >
          Отменить
        </Button>
        <Button
          form={tab}
          type="submit"
          color="primary"
          variant="contained"
          disabled={createTaskQuery.isPending}
        >
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
}
