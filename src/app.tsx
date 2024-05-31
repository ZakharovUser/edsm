/* eslint-disable perfectionist/sort-imports */
import 'global.css';

// ----------------------------------------------------------------------
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Router from 'routes/sections';

import { useScrollToTop } from 'hooks/use-scroll-to-top';

import { ThemeProviderMui, ThemeProviderAntd } from 'theme';

import ProgressBar from 'components/progress-bar';
import { MotionLazy } from 'components/animate/motion-lazy';
import { SettingsDrawer, SettingsProvider } from 'components/settings';

import { AuthProvider } from 'auth/context/session';

// ----------------------------------------------------------------------

const queryClient = new QueryClient();

export default function App() {
  useScrollToTop();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SettingsProvider
          defaultSettings={{
            themeMode: 'light', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeContrast: 'default', // 'default' | 'bold'
            themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: false,
          }}
        >
          <ThemeProviderMui>
            <ThemeProviderAntd>
              <MotionLazy>
                <SettingsDrawer />
                <ProgressBar />
                <Router />
              </MotionLazy>
            </ThemeProviderAntd>
          </ThemeProviderMui>
        </SettingsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
