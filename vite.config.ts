/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ghPages } from "vite-plugin-gh-pages";

const isProd = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ghPages()],
  base: isProd ? "/user-profiles/" : "/",
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
    include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
  },
});
