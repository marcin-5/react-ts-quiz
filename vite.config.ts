import react from '@vitejs/plugin-react-swc';
import path from "path";
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
