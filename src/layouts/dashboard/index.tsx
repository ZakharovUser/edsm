import { PropsWithChildren } from 'react';
import { useBoolean } from 'hooks/use-boolean';
import { useResponsive } from 'hooks/use-responsive';
import { useSettingsContext } from 'components/settings';

import Box from '@mui/material/Box';

import Main from './main';
import Header from './header';
import NavMini from './nav-mini';
import NavVertical from './nav-vertical';
import NavHorizontal from './nav-horizontal';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }: PropsWithChildren) {
  const settings = useSettingsContext();

  const lgUp = useResponsive('up', 'lg');

  const nav = useBoolean();

  const isHorizontal = settings.themeLayout === 'horizontal';

  const isMini = settings.themeLayout === 'mini';

  if (isHorizontal) {
    return (
      <>
        <Header onOpenNav={nav.onTrue} />

        {lgUp ? <NavHorizontal /> : <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />}

        <Main>{children}</Main>
      </>
    );
  }

  if (isMini) {
    return (
      <>
        <Header onOpenNav={nav.onTrue} />

        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          {lgUp ? <NavMini /> : <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />}

          <Main>{children}</Main>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header onOpenNav={nav.onTrue} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />
        <Main>{children}</Main>
      </Box>
    </>
  );
}
