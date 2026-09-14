import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  logLevel: 'info',
  build: {
    outDir: 'dist', // where Vite outputs production build
  },
  server: {
    proxy: {
      "/ws": {
        target: "ws://localhost:9080",
        ws: true,
      },
    },
    port: 5173, // optional, default is 5173
    open: true, // auto-open browser on dev
  }
});

