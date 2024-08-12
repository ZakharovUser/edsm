import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://91.226.234.195:1337',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  preview: {
    port: 8082,
  },
});
