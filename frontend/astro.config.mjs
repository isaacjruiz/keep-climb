// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind'; // Import astrojs/tailwind

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind() // Add tailwind integration
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});