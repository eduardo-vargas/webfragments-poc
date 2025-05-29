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
const FRAGMENTS_URL = IS_PROD ? `/${REPO_NAME}/fragments/` : '../webfragments/dist/';

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
      '@webfragments/core': IS_PROD 
        ? `${BASE_URL}fragments`  // Will resolve to /webfragments-poc/fragments in production
        : resolve(__dirname, '../webfragments/dist')
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
    },
    outDir: 'dist',
    emptyOutDir: true
  }
}); 