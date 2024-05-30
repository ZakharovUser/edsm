import { useState } from 'react';
import { FormInstance } from 'antd';
import { CreateTaskForm } from 'features/create-task/ui/create-task-form/create-task-form';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { TabPanel } from 'shared/tab-panel';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export function CreateTaskModal({ open, onClose }: Props) {
  const [form, setForm] = useState<null | FormInstance>(null);

  const [value, setValue] = useState(0);

  const onChange = (_: unknown, newValue: number) => setValue(newValue);

  const handleClose = () => {
    form?.resetFields();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Создание задачи</DialogTitle>
      <DialogContent>
        <Tabs
          value={value}
          onChange={onChange}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            position: 'sticky',
            top: 0,
            zIndex: 1450,
            bgcolor: (theme) => theme.palette.background.paper,
          }}
        >
          <Tab label="Закупка ТРУ" {...a11yProps(0)} />
        </Tabs>

        <Box sx={{ mt: 3 }}>
          <TabPanel value={value} index={0}>
            <CreateTaskForm onInitForm={(f) => setForm(f)} />
          </TabPanel>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Отменить
        </Button>
        <Button variant="contained" color="primary">
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
}
