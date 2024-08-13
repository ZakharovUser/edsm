import { useMemo, useState, ReactNode } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';

import { TabPanel } from 'shared/tab-panel';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  name: string;
  tabs: Array<{ id: number | string; label: string; panel: ReactNode }> | undefined;
}

// -----------------------------------------------------------------------------------------------------------------

export function CreateTaskRegulations({ tabs: controls = [], name }: Props) {
  const [tabIndex, setTabIndex] = useState(0);

  const onChange = (_: unknown, newTabIndex: number) => setTabIndex(newTabIndex);

  const [tabs, panels] = useMemo(
    () =>
      controls.reduce(
        (elements, { id, label, panel }, index) => {
          const tab = <Tab label={label} {...a11yProps(name, index)} key={`${name}-tab-${id}`} />;

          const tabPanel = (
            <TabPanel
              id={id}
              name={name}
              hidden={tabIndex !== index}
              key={`${name}-tab-panel-${id}`}
            >
              {panel}
            </TabPanel>
          );

          elements[0].push(tab);
          elements[1].push(tabPanel);

          return elements;
        },
        [[], []] as [JSX.Element[], JSX.Element[]]
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

function a11yProps(name: string, id: number) {
  return {
    id: `${name}-tab-${id}`,
    'aria-controls': `${name}-tabpanel-${id}`,
  };
}
