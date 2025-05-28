import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  mode: 'development',
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true
    }
  },
  resolve: {
    preserveSymlinks: true
  },
  optimizeDeps: {
    include: [
      'react-router-dom',
      '@remix-run/router',
      'react-router',
      'scheduler',
      '@webfragments/core',
      '@webfragments/core/elements'
    ]
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  build: {
    commonjsOptions: {
      include: [/@webfragments\/core/, /node_modules/]
    }
  }
}); 