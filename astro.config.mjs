import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://china-starter-guide-3sn.pages.dev',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh', 'ja', 'ko', 'fr', 'th', 'ru', 'es', 'ar'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  integrations: [
    tailwind(),
    mdx(),
  ],
  vite: {
    resolve: {
      alias: {
        '@layouts': '/src/layouts',
      },
    },
    ssr: {
      noExternal: ['sharp'],
    },
  },
});
