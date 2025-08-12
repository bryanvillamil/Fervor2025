// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // site: 'https://comfortdesign.com.co',
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
  integrations: [react(), tailwind({
    applyBaseStyles: false,
  }),],
  adapter: vercel()
});