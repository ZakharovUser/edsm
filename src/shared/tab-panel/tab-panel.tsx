import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  index: number;
  value: number;
  name: string;
}

export function TabPanel({ name, value, children, index }: Props) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${name}-tabpanel-${index}`}
      aria-labelledby={`${name}-tab-${index}`}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
