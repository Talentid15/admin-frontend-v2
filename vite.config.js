import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Import alias for cleaner imports
    },
  },
  server: {
    port: 3000, // Set default port for development
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "dist", // Specify output directory for production build
    sourcemap: true, // Enable source maps for debugging
  },
});
