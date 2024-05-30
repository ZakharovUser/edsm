import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  index: number;
  value: number;
}

export function TabPanel({ value, children, index }: Props) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
