import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  server: {
    allowedHosts: ["9c93-76-66-153-79.ngrok-free.app"],
  },
  resolve: {
    tsconfigPaths: true,
  },
});
