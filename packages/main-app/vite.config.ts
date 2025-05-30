import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

// Get the repo name from package.json
const getRepoName = () => {
  const rootPkgPath = resolve(__dirname, '../../package.json');
  const pkgJson = JSON.parse(fs.readFileSync(rootPkgPath, 'utf-8'));
  return pkgJson.name;
};

const REPO_NAME = getRepoName();
const IS_PROD = process.env.NODE_ENV === 'production';
const BASE_URL = IS_PROD ? `/${REPO_NAME}/` : '/';

export default defineConfig({
  plugins: [react()],
  base: BASE_URL,
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
      '@webfragments/core': resolve(__dirname, '../webfragments/src'),
      '@webfragments/core/elements': resolve(__dirname, '../webfragments/src/elements'),
      '@webfragments/core/fragments/party-button': resolve(__dirname, '../webfragments/src/fragments/party-button'),
      '@webfragments/core/fragments/dashboard': resolve(__dirname, '../webfragments/src/fragments/dashboard')
    }
  },
  optimizeDeps: {
    exclude: [
      'react',
      'react-dom',
      'react-router-dom',
      '@remix-run/router',
      'react-router',
      'scheduler'
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
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-dom/client',
        'react-router',
        'react-router-dom',
        '@remix-run/router',
        'scheduler'
      ],
      output: {
        format: 'esm',
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
}); 