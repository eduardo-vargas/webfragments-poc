import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig(({ mode }) => {
  const isDemoMode = mode === 'demo';
  const isProd = process.env.NODE_ENV === 'production';
  const baseUrl = isProd ? '/webfragments-poc/fragments/' : '/';

  return {
    base: baseUrl,
    plugins: [
      react(),
      {
        name: 'resolve-tsx-as-js',
        resolveId(source) {
          if (!source.endsWith('.js')) return null;
          
          // Try to find corresponding tsx file
          const tsxPath = source.replace('.js', '.tsx');
          const resolvedPath = resolve(__dirname, tsxPath.startsWith('/') ? tsxPath.slice(1) : tsxPath);
          
          if (fs.existsSync(resolvedPath)) {
            return resolvedPath;
          }
          return null;
        }
      }
    ],
    build: {
      outDir: 'dist',
      emptyOutDir: !isDemoMode,
      rollupOptions: {
        input: isDemoMode ? {
          'party-button/demo/index': resolve(__dirname, 'src/fragments/party-button/demo/index.html'),
          'dashboard/demo/index': resolve(__dirname, 'src/fragments/dashboard/demo/index.html')
        } : {
          'index': resolve(__dirname, 'src/index.ts'),
          'elements': resolve(__dirname, 'src/elements.ts'),
          'party-button/index': resolve(__dirname, 'src/fragments/party-button/index.ts'),
          'dashboard/index': resolve(__dirname, 'src/fragments/dashboard/index.ts')
        },
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
          },
          entryFileNames: (chunkInfo) => {
            // For demo entries, ensure we output as .js
            if (chunkInfo.name.includes('/demo/')) {
              const name = chunkInfo.name.replace('.tsx', '');
              return `${name}.js`;
            }
            return '[name].js';
          },
          assetFileNames: 'assets/[name]-[hash].[ext]',
          chunkFileNames: 'chunks/[name]-[hash].js'
        }
      }
    }
  };
}); 