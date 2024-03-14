/* eslint-disable perfectionist/sort-imports */
import 'global.css';

// ----------------------------------------------------------------------

import Router from 'routes/sections';

import { useScrollToTop } from 'hooks/use-scroll-to-top';

import ThemeProvider from 'theme';

import ProgressBar from 'components/progress-bar';
import { MotionLazy } from 'components/animate/motion-lazy';
import { SettingsDrawer, SettingsProvider } from 'components/settings';

import { AuthProvider } from 'auth/context/jwt';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
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
        <ThemeProvider>
          <MotionLazy>
            <SettingsDrawer />
            <ProgressBar />
            <Router />
          </MotionLazy>
        </ThemeProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
