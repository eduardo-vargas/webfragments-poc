import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the repo name from package.json
const getRepoName = () => {
  const rootPkgPath = resolve(__dirname, '../../package.json');
  const pkgJson = JSON.parse(fs.readFileSync(rootPkgPath, 'utf-8'));
  return pkgJson.name;
};

const REPO_NAME = getRepoName();
const IS_PROD = process.env.NODE_ENV === 'production';
const BASE_URL = IS_PROD ? `/${REPO_NAME}/fragments/` : '/';

// Library entries are always needed
const libEntries = {
  'index': resolve(__dirname, 'src/index.ts'),
  'elements': resolve(__dirname, 'src/elements.ts'),
  'party-button/index': resolve(__dirname, 'src/fragments/party-button/index.ts'),
  'dashboard/index': resolve(__dirname, 'src/fragments/dashboard/index.ts')
};

// Demo entries are only used in production builds
const demoEntries = IS_PROD ? {
  'party-button/demo/index': resolve(__dirname, 'src/fragments/party-button/dev/main.tsx'),
  'dashboard/demo/index': resolve(__dirname, 'src/fragments/dashboard/dev/main.tsx')
} : {};

// Build configuration
export default defineConfig({
  plugins: [react()],
  base: BASE_URL,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: IS_PROD ? {
        ...libEntries,
        ...demoEntries
      } : libEntries,
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name?.includes('/demo')) {
            return '[name]/index.js';
          }
          return '[name].js';
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.html')) {
            return '[name]/index.html';
          }
          return 'assets/[name]-[hash].[ext]';
        }
      }
    }
  },
  server: {
    cors: true,
    port: 3001
  }
}); 