import { useSettingsContext } from 'components/settings';

import MuiContainer, { ContainerProps } from '@mui/material/Container';

export function Container(props: ContainerProps) {
  const settings = useSettingsContext();

  return <MuiContainer maxWidth={settings.themeStretch ? false : 'xl'} {...props} />;
}
