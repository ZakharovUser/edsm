import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  name: string;
  hidden: boolean;
  id: number | string;
}

export function TabPanel({ name, children, id, hidden }: Props) {
  return (
    <div
      role="tabpanel"
      hidden={hidden}
      id={`${name}-tabpanel-${id}`}
      aria-labelledby={`${name}-tab-${id}`}
    >
      {/* {value === index && <>{children}</>} */}
      {children}
    </div>
  );
}
