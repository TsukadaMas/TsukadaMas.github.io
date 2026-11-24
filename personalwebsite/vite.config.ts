import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  server: {
    allowedHosts: ["ff6d-174-94-4-193.ngrok-free.app"],
  },
  resolve: {
    tsconfigPaths: true,
  },
});
