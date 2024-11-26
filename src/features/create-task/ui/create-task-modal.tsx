import { Tabs, TabsProps } from 'antd';
import StickyBox from 'react-sticky-box';
import { useRef, useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { useCreateTaskQuery } from 'entities/task/api';
import { TruTaskForm } from 'entities/regulation-tru/ui';
import { useTaskRoutesQuery } from 'entities/task/hooks';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

export function CreateTaskModal({ open, onClose }: Props) {
  const { palette } = useTheme();

  const ref = useRef<HTMLDivElement>();

  const [formId, setFormId] = useState<string | undefined>();

  const { data, error: errorRoutes } = useTaskRoutesQuery();

  const createTaskQuery = useCreateTaskQuery();

  useEffect(() => {
    if (createTaskQuery.error || errorRoutes) {
      ref.current?.scrollTo(0, 0);
    }
  }, [errorRoutes, createTaskQuery.error, ref]);

  const handleClose = () => {
    createTaskQuery.reset();
    onClose();
  };

  const tabs: TabsProps['items'] =
    data &&
    Object.entries(data).map(([id, name]) => ({
      key: id,
      label: name,
      children: (
        <TruTaskForm
          route={id}
          onSubmit={(values) => createTaskQuery.mutateAsync(values).then(onClose)}
          getFormId={setFormId}
          error={createTaskQuery.error || errorRoutes}
        />
      ),
    }));

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Создание задачи</DialogTitle>
      <DialogContent ref={ref}>
        <Tabs
          items={tabs}
          renderTabBar={(props, DefaultTabBar) => (
            <StickyBox offsetTop={0} style={{ zIndex: 10 }}>
              <DefaultTabBar {...props} style={{ background: palette.background.paper }} />
            </StickyBox>
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          type="reset"
          form={formId}
          onClick={handleClose}
          disabled={createTaskQuery.isPending}
        >
          Отменить
        </Button>
        <Button
          type="submit"
          form={formId}
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
