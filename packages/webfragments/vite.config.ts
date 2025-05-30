import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig(({ mode }) => {
  const isDemoMode = mode === 'demo';
  const isProd = process.env.NODE_ENV === 'production';
  const baseUrl = isProd ? '/webfragments-poc/' : '/';
  const fragment = process.env.FRAGMENT;

  // Configure entries based on mode
  const demoEntry = fragment ? {
    [fragment]: resolve(__dirname, 'src', 'fragments', fragment, 'demo', 'index.html')
  } : null;
  const libEntries = {
    'elements': resolve(__dirname, 'src', 'elements.ts'),
    'index': resolve(__dirname, 'src', 'index.ts'),
  };

  return {
    base: baseUrl,
    plugins: [
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          if (!isDemoMode || !fragment) return html;

          // Update HTML to use the bundle
          return html
            .replace(/<script type="module">[\s\S]*?<\/script>/g, '')  // Remove the module script
            .replace(
              /<\/body>/,
              `  <script src="${baseUrl}fragments/${fragment}/demo/bundle.js"></script>
               </body>`
            );
        },
        generateBundle() {
          if (!isDemoMode || !fragment) return;

          // Create output directory
          const outPath = resolve(__dirname, 'dist', 'fragments', fragment, 'demo');
          if (!fs.existsSync(outPath)) {
            fs.mkdirSync(outPath, { recursive: true });
          }

          // Write HTML file
          const filePath = resolve(__dirname, `src/fragments/${fragment}/demo/index.html`);
          if (!fs.existsSync(filePath)) return;

          let html = fs.readFileSync(filePath, 'utf-8');
          html = html
            .replace(/<script type="module">[\s\S]*?<\/script>/g, '')  // Remove the module script
            .replace(
              /<\/body>/,
              `  <script src="${baseUrl}fragments/${fragment}/demo/bundle.js"></script>
               </body>`
            );

          fs.writeFileSync(resolve(outPath, 'index.html'), html);
        }
      }
    ],
    build: {
      outDir: 'dist',
      emptyOutDir: !isDemoMode,
      rollupOptions: {
        input: isDemoMode ? demoEntry : libEntries,
        output: {
          format: isDemoMode ? 'iife' : 'es',
          entryFileNames: isDemoMode ? 'fragments/[name]/demo/bundle.js' : '[name].js',
          chunkFileNames: 'chunks/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      }
    }
  };
});