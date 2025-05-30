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
          // Only handle .js imports in development
          if (!isProd && source.endsWith('.js')) {
            // Try .ts version of the file
            const tsSource = source.replace(/\.js$/, '.ts');
            const resolved = resolve(importer ? resolve(importer, '..') : __dirname, tsSource);
            
            if (fs.existsSync(resolved)) {
              return resolved;
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