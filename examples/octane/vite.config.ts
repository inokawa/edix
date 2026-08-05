import { defineConfig } from "vite";
import { octane } from "octane/compiler/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [octane()],
  build: { target: "esnext" },
});
