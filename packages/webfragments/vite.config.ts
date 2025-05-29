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

// Demo entries configuration
const fragments = ['party-button', 'dashboard'];
const demoEntries = Object.fromEntries(
  fragments.map(fragment => [
    `${fragment}/demo/index`, resolve(__dirname, `src/fragments/${fragment}/demo/index.html`)
  ])
);

// Build configuration
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      include: '**/*.tsx',
    }),
    {
      name: 'resolve-tsx-as-js',
      resolveId(source, importer) {
        if (!IS_PROD && importer?.includes('/demo/') && source.endsWith('.js')) {
          const potentialTsxPath = source.replace('.js', '.tsx');
          const absolutePath = resolve(dirname(importer), potentialTsxPath);
          if (fs.existsSync(absolutePath)) {
            return absolutePath;
          }
        }
        return null;
      }
    },
    {
      name: 'demo-handler',
      configureServer(server) {
        return () => {
          server.middlewares.use(async (req, res, next) => {
            if (!req.url) return next();

            // Handle demo routes
            const demoMatch = req.url.match(/^\/(party-button|dashboard)\/demo\/?$/);
            if (demoMatch) {
              const fragment = demoMatch[1];
              const htmlPath = resolve(__dirname, `src/fragments/${fragment}/demo/index.html`);
              
              try {
                let html = fs.readFileSync(htmlPath, 'utf-8');
                
                // Add React development setup and fragment registration
                html = html.replace(
                  '</head>',
                  `
                    <script>
                      window.process = { env: { NODE_ENV: 'development' } };
                    </script>
                    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
                    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
                    <script type="module" src="/src/elements.ts"></script>
                    </head>
                  `
                );

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                return res.end(html);
              } catch (e) {
                console.error(`Error serving ${htmlPath}:`, e);
                return next();
              }
            }

            next();
          });
        };
      }
    }
  ],
  base: BASE_URL,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        ...libEntries,
        ...demoEntries,
        // Add demo entry points explicitly
        ...Object.fromEntries(
          fragments.map(fragment => [
            `${fragment}/demo/main`, resolve(__dirname, `src/fragments/${fragment}/demo/main.tsx`)
          ])
        )
      },
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        entryFileNames: (chunkInfo) => {
          const name = chunkInfo.name;
          // Handle demo files
          if (name.includes('/demo/')) {
            const fragment = name.split('/')[0];
            return `${fragment}/demo/main.js`;
          }
          return '[name].js';
        },
        assetFileNames: 'assets/[name]-[hash].[ext]',
        chunkFileNames: 'chunks/[name]-[hash].js'
      }
    }
  },
  server: {
    cors: true,
    port: 3001,
    fs: {
      strict: false,
      allow: ['..', '../..']
    }
  }
}); 