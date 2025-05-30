import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { getNodeMiddleware } from 'web-fragments/gateway/node';
import { FragmentGateway } from 'web-fragments/gateway';
import { resolve } from 'path';

// Initialize the gateway
const gateway = new FragmentGateway();

// Register our fragments with their full URLs
gateway.registerFragment({
  fragmentId: 'party-button',
  piercingClassNames: ['party-button', 'confetti-piece'],
  endpoint: 'https://eduardo-vargas.github.io/webfragments-poc/fragments/party-button/demo/index.html',
  routePatterns: ['/fragment-demo']
});

gateway.registerFragment({
  fragmentId: 'dashboard',
  piercingClassNames: [],
  endpoint: 'https://eduardo-vargas.github.io/webfragments-poc/fragments/dashboard/demo/index.html',
  routePatterns: ['/dashboard']
});

// Get the middleware
const nodeMiddleware = getNodeMiddleware(gateway);

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'web-fragments-middleware',
      configureServer(server) {
        server.middlewares.use(nodeMiddleware);
      }
    }
  ],
  base: process.env.NODE_ENV === 'production' ? '/webfragments-poc/' : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  },
  server: {
    port: 3000,
    open: true
  }
}); 