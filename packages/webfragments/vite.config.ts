import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';
import type { Plugin } from 'vite';

// Define available fragments
const fragments = ['party-button', 'dashboard'];

export default defineConfig(({ mode }) => {
  const isDemoMode = mode === 'demo';
  const isProd = process.env.NODE_ENV === 'production';
  const baseUrl = isProd ? '/webfragments-poc/fragments/' : '/';

  // Library entries
  const libEntries = {
    'index': resolve(__dirname, 'src/index.ts'),
    'elements': resolve(__dirname, 'src/elements.ts'),
    ...Object.fromEntries(
      fragments.map(fragment => [
        `${fragment}/index`,
        resolve(__dirname, `src/fragments/${fragment}/index.ts`)
      ])
    )
  };

  // Demo entries
  const demoEntries = Object.fromEntries(
    fragments.map(fragment => [
      `${fragment}/demo/index`,
      resolve(__dirname, `src/fragments/${fragment}/demo/index.html`)
    ])
  );

  return {
    base: baseUrl,
    resolve: {
      alias: {
        '@webfragments': resolve(__dirname, 'src')
      }
    },
    plugins: [
      react(),
      {
        name: 'handle-ts-extension',
        resolveId(source, importer) {
          if (!importer || !source.endsWith('.js')) return null;

          if (source.startsWith('../../../')) {
            const normalizedSource = source.replace('../../../', '');
            const targetPath = resolve(__dirname, 'src', normalizedSource.replace('.js', '.ts'));
            if (fs.existsSync(targetPath)) return targetPath;
          } else if (source.startsWith('../')) {
            const importerDir = resolve(importer, '..');
            const targetPath = resolve(importerDir, source.replace('.js', '.ts'));
            if (fs.existsSync(targetPath)) return targetPath;
          }
          return null;
        }
      },
      {
        name: 'demo-html',
        enforce: 'post',
        configResolved(config) {
          if (!isDemoMode) return;

          // Process each fragment's HTML file
          fragments.forEach(fragment => {
            const filePath = resolve(__dirname, `src/fragments/${fragment}/demo/index.html`);
            if (!fs.existsSync(filePath)) return;

            let html = fs.readFileSync(filePath, 'utf-8');
            // Update imports to use absolute paths
            html = html.replace(
              /from ['"]([^'"]+)['"]/g,
              (_, path) => {
                if (path.startsWith('@webfragments/')) {
                  return `from '${path}'`;
                }
                if (path.startsWith('../')) {
                  const normalizedPath = path.replace(/^\.\.\/+/, '');
                  return `from '@webfragments/${normalizedPath}'`;
                }
                return `from '${path}'`;
              }
            );

            // Write the HTML file directly to the output directory
            const outDir = config.build.outDir || 'dist';
            const outPath = resolve(outDir, fragment, 'demo');
            if (!fs.existsSync(outPath)) {
              fs.mkdirSync(outPath, { recursive: true });
            }
            fs.writeFileSync(resolve(outPath, 'index.html'), html);
          });
        },
        closeBundle() {
          if (!isDemoMode) return;

          // Clean up old HTML files
          const outDir = resolve(__dirname, 'dist');
          const srcDir = resolve(outDir, 'src');
          if (fs.existsSync(srcDir)) {
            fs.rmSync(srcDir, { recursive: true, force: true });
          }
        }
      } as Plugin
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
          chunkFileNames: 'chunks/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      }
    }
  };
}); 