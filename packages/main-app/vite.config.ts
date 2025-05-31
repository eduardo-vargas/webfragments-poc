import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { getNodeMiddleware } from 'web-fragments/gateway/node';
import { FragmentGateway } from 'web-fragments/gateway';
import { resolve } from 'path';

// Initialize the gateway
const gateway = new FragmentGateway();

const isDev = process.env.NODE_ENV !== 'production';
const baseUrl = isDev ? 'http://localhost:3002' : 'https://eduardo-vargas.github.io/webfragments-poc';

// Register our fragments with their full URLs
gateway.registerFragment({
  fragmentId: 'party-button',
  piercingClassNames: ['party-button', 'confetti-piece'],
  endpoint: `${baseUrl}/fragments/party-button/demo/index.html`,
  routePatterns: ['/fragment-demo']
});

gateway.registerFragment({
  fragmentId: 'dashboard',
  piercingClassNames: [],
  endpoint: `${baseUrl}/fragments/dashboard/demo/index.html`,
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
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  }
}); 