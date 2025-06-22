import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://gym.mestracegonhas.com',
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [
    react({
      include: /.(jsx|tsx)$/,
      babel: {
        plugins: ['styled-components'],
        babelrc: false,
        configFile: false,
      },
    }),
  ],
});
