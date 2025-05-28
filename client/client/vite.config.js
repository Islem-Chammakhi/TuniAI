import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Frontend-only Vite configuration
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, '../attached_assets'),
    }
  },
  server: {
    port: 3000,
    host: '0.0.0.0', // Allow external access
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  }
});