import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  // Relative assets keep the built prototype portable between GitHub Pages
  // project sites and a future custom domain.
  base: "./",
  plugins: [react(), tailwindcss()],
});
