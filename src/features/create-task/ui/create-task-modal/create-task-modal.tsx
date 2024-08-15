import { Tabs, TabsProps } from 'antd';
import StickyBox from 'react-sticky-box';
import { useRef, useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { TruTaskForm } from 'entites/regulation-tru/ui';
import { useTaskMutation, useTaskRoutesQuery } from 'entites/task/hooks';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

export function CreateTaskModal({ open, onClose }: Props) {
  const { palette } = useTheme();
  const ref = useRef<HTMLDivElement>();

  const { data, isPending: isPendingRoutes, error: errorRoutes } = useTaskRoutesQuery();
  const { mutate, isPending: isPendingMutate, error: errorMutate, reset } = useTaskMutation();

  const [formId, setFormId] = useState<string | undefined>();

  useEffect(() => {
    if (errorMutate || errorRoutes) {
      ref.current?.scrollTo(0, 0);
    }
  }, [errorRoutes, errorMutate, ref]);

  const onSubmit = (values: unknown, onSuccess?: VoidFunction) => {
    mutate(values, {
      onSuccess: () => {
        onSuccess?.();
        onClose();
      },
    });
  };

  const handleClose = () => {
    reset();
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
          onSubmit={onSubmit}
          getFormId={setFormId}
          error={errorMutate || errorRoutes}
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
          disabled={isPendingMutate || isPendingRoutes}
        >
          Отменить
        </Button>
        <Button
          type="submit"
          form={formId}
          color="primary"
          variant="contained"
          disabled={isPendingMutate || isPendingRoutes}
        >
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
}
