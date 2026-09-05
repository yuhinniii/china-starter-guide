import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

const langs = ['en', 'zh', 'ja', 'ko', 'fr', 'th', 'ru', 'es', 'ar'];
const sections = ['visa', 'cities', 'life', 'payment', 'transport'];

const indexRedirects = {};
for (const lang of langs) {
  for (const sec of sections) {
    indexRedirects[`/${lang}/${sec}/index`] = `/${lang}/${sec}/`;
  }
}

export default defineConfig({
  site: 'https://chinastarterhub.com',
  output: 'static',
  redirects: indexRedirects,
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
