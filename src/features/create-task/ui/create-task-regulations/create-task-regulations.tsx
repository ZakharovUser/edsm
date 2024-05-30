import { useState } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

interface Props {}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export function CreateTaskRegulations(props: Props) {
  const [value, setValue] = useState(0);

  const onChange = (_: unknown, newValue: number) => setValue(newValue);

  return (
    <Tabs variant="scrollable" onChange={onChange}>
      <Tab label="Закупка ТРУ" {...a11yProps(0)} />
    </Tabs>
  );
}
