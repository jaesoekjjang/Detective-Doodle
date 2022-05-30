import { defineConfig } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
  },
  base: '',
  optimizeDeps: {
    exclude: ['react-testing-library'],
  },
});
