import { useMemo, useState, ReactNode } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';

import { TabPanel } from 'shared/tab-panel';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  name: string;
  tabs: Array<{ id: number; label: string; panel: ReactNode }>;
}

// -----------------------------------------------------------------------------------------------------------------

export function CreateTaskRegulations({ tabs: controls, name }: Props) {
  const [tabIndex, setTabIndex] = useState(0);

  const onChange = (_: unknown, newValue: number) => setTabIndex(newValue);

  const [tabs, panels] = useMemo(
    () =>
      controls.reduce(
        (elements: [JSX.Element[], JSX.Element[]], control, index) => {
          const tab = (
            <Tab
              label={control.label}
              {...a11yProps(name, index)}
              key={`${name}-tab-${control.id}`}
            />
          );

          const panel = (
            <TabPanel
              name={name}
              index={index}
              value={tabIndex}
              key={`${name}-tap-panel-${control.id}`}
            >
              {control.panel}
            </TabPanel>
          );

          elements[0].push(tab);
          elements[1].push(panel);

          return elements;
        },
        [[], []]
      ),
    [controls, name, tabIndex]
  );

  return (
    <>
      <Tabs
        value={tabIndex}
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
        {tabs}
      </Tabs>
      <Box sx={{ mt: 3 }}>{panels}</Box>
    </>
  );
}

function a11yProps(name: string, index: number) {
  return {
    id: `${name}-tab-${index}`,
    'aria-controls': `${name}-tabpanel-${index}`,
  };
}
