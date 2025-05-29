import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

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
    preserveSymlinks: true,
    alias: {
      '@webfragments/core': resolve(__dirname, '../webfragments/dist')
    }
  },
  optimizeDeps: {
    include: [
      'react-router-dom',
      '@remix-run/router',
      'react-router',
      'scheduler',
      '@webfragments/core',
      '@webfragments/core/elements',
      '@webfragments/core/fragments/party-button',
      '@webfragments/core/fragments/dashboard'
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