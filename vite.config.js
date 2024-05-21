import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@entities": path.resolve(__dirname, "./src/entities"),
      "@components": path.resolve(__dirname, "./src/shared/components"),
      "@widgets": path.resolve(__dirname, "./src/widgets"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@layouts": path.resolve(__dirname, "./src/app/layouts"),
      "@shared": path.resolve(__dirname, "./src/app/shared"),
    },
  },
});
