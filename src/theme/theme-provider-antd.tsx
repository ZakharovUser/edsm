import { PropsWithChildren } from 'react';
import { theme, ThemeConfig, ConfigProvider } from 'antd';

import { alpha, useTheme } from '@mui/material/styles';

const { darkAlgorithm, defaultAlgorithm } = theme;

export function ThemeProviderAntd({ children }: PropsWithChildren) {
  const { palette, zIndex } = useTheme();

  const alphaBg = palette.mode === 'light' ? 0.1 : 0.3;
  const algorithm = palette.mode === 'light' ? defaultAlgorithm : darkAlgorithm;

  const themeConfig: ThemeConfig = {
    algorithm,
    token: {
      colorBorder: palette.divider,
      colorError: palette.error.main,
      colorText: palette.text.primary,
      colorWarning: palette.warning.main,
      colorPrimary: palette.primary.main,
      colorSuccess: palette.success.main,
      zIndexPopupBase: zIndex.modal + 100,
      colorBgBase: palette.background.default,
      colorPrimaryBg: alpha(palette.primary.main, alphaBg),
    },
  };

  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
}
