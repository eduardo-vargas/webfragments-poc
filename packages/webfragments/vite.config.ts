import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig(({ mode }) => {
  const isDemoMode = mode === 'demo';
  const isProd = process.env.NODE_ENV === 'production';
  const baseUrl = isProd ? '/webfragments-poc/fragments/' : '/';

  // Demo entries configuration
  const fragments = ['party-button', 'dashboard'];
  const demoEntries = Object.fromEntries(
    fragments.map(fragment => [
      // Only include the HTML entry point
      `${fragment}/demo/index`, resolve(__dirname, `src/fragments/${fragment}/demo/index.html`)
    ])
  );

  // Library entries
  const libEntries = {
    'index': resolve(__dirname, 'src/index.ts'),
    'elements': resolve(__dirname, 'src/elements.ts'),
    'party-button/index': resolve(__dirname, 'src/fragments/party-button/index.ts'),
    'dashboard/index': resolve(__dirname, 'src/fragments/dashboard/index.ts')
  };

  return {
    base: baseUrl,
    plugins: [
      react(),
      {
        name: 'handle-ts-extension',
        resolveId(source, importer) {
          // Skip if no importer (entry point) or not a .js file
          if (!importer || !source.endsWith('.js')) return null;

          // Handle both development and production paths
          if (source.startsWith('../../../')) {
            // Resolve root-level imports (e.g., ../../../elements.js)
            const normalizedSource = source.replace('../../../', '');
            const targetPath = resolve(__dirname, 'src', normalizedSource.replace('.js', '.ts'));
            if (fs.existsSync(targetPath)) {
              return targetPath;
            }
          } else if (source.startsWith('../')) {
            // Resolve fragment-level imports (e.g., ../index.js)
            const importerDir = resolve(importer, '..');
            const targetPath = resolve(importerDir, source.replace('.js', '.ts'));
            if (fs.existsSync(targetPath)) {
              return targetPath;
            }
          }
          return null;
        }
      }
    ],
    build: {
      outDir: 'dist',
      emptyOutDir: !isDemoMode,
      rollupOptions: {
        input: isDemoMode ? demoEntries : libEntries,
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
          },
          entryFileNames: '[name].js',
          assetFileNames: (assetInfo) => {
            // Keep HTML files in their original path structure
            if (assetInfo.name?.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash].[ext]';
          },
          chunkFileNames: 'chunks/[name]-[hash].js'
        }
      }
    }
  };
}); 