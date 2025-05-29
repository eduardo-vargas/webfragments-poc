import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    dts({ 
      rollupTypes: true,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/dev/**/*'],
      outDir: 'dist/types'
    })
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        elements: resolve(__dirname, 'src/elements.ts'),
        'fragments/party-button/index': resolve(__dirname, 'src/fragments/party-button/index.ts'),
        'fragments/dashboard/index': resolve(__dirname, 'src/fragments/dashboard/index.ts')
      },
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        assetFileNames: 'assets/[name][extname]',
        preserveModules: true,
        preserveModulesRoot: 'src'
      }
    },
    cssCodeSplit: false,
    cssMinify: true,
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    port: 3001
  }
}); 