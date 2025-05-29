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
const BASE_URL = IS_PROD ? '/webfragments-poc/fragments/' : '/';

// Library entries are always needed
const libEntries = {
  'index': resolve(__dirname, 'src/index.ts'),
  'elements': resolve(__dirname, 'src/elements.ts'),
  'party-button/index': resolve(__dirname, 'src/fragments/party-button/index.ts'),
  'dashboard/index': resolve(__dirname, 'src/fragments/dashboard/index.ts')
};

export default defineConfig(({ command }) => {
  const isBuild = command === 'build';
  
  return {
    plugins: [
      react({
        jsxRuntime: 'automatic',
        include: '**/*.tsx',
      }),
      {
        name: 'resolve-tsx-as-js',
        resolveId(source, importer) {
          // Handle both absolute and relative paths
          const jsFile = source.endsWith('.js') ? source : null;
          if (!IS_PROD && jsFile) {
            // Try to find corresponding tsx file
            const tsxPath = jsFile.replace('.js', '.tsx');
            // Handle paths relative to the demo directory
            const resolvedPath = resolve(
              __dirname,
              process.env.VITE_ROOT_DIR || '',
              tsxPath.startsWith('/') ? tsxPath.slice(1) : tsxPath
            );
            if (fs.existsSync(resolvedPath)) {
              return resolvedPath;
            }
          }
          return null;
        }
      }
    ],
    base: BASE_URL,
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        input: isBuild ? {
          ...libEntries,
          // Only include demo entries in build mode
          ...Object.fromEntries(
            ['party-button', 'dashboard'].map(fragment => [
              `${fragment}/demo/index`, resolve(__dirname, `src/fragments/${fragment}/demo/index.html`)
            ])
          )
        } : undefined,
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
          },
          entryFileNames: '[name].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
          chunkFileNames: 'chunks/[name]-[hash].js'
        }
      }
    },
    server: {
      cors: true,
      fs: {
        strict: false,
        allow: ['..', '../..', '../../..']  // Allow accessing files up to the project root
      }
    }
  };
});