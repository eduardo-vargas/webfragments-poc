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
  const fragment = process.env.FRAGMENT;

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

  // Demo entry for the current fragment
  const demoEntry = fragment ? {
    [`${fragment}/demo/bundle`]: resolve(__dirname, `src/fragments/${fragment}/demo/index.ts`)
  } : {};

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
        name: 'handle-demo-html',
        apply: 'build',
        enforce: 'post',
        async generateBundle() {
          if (!isDemoMode || !fragment) return;

          const filePath = resolve(__dirname, `src/fragments/${fragment}/demo/index.html`);
          if (!fs.existsSync(filePath)) return;

          let html = fs.readFileSync(filePath, 'utf-8');

          // Update HTML to use the bundle
          html = html
            .replace(/<script type="module">[\s\S]*?<\/script>/g, '')  // Remove the module script
            .replace(
              /<\/body>/,
              `  <script src="/${fragment}/demo/bundle.js"></script>
               </body>`
            );

          // Create output directory
          const outPath = resolve(__dirname, 'dist', fragment, 'demo');
          if (!fs.existsSync(outPath)) {
            fs.mkdirSync(outPath, { recursive: true });
          }

          // Write HTML file
          fs.writeFileSync(resolve(outPath, 'index.html'), html);
        }
      } as Plugin
    ],
    build: {
      outDir: 'dist',
      emptyOutDir: !isDemoMode,
      rollupOptions: {
        input: isDemoMode ? demoEntry : libEntries,
        output: {
          format: isDemoMode ? 'iife' : 'es',
          entryFileNames: '[name].js',
          chunkFileNames: 'chunks/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      }
    }
  };
}); 