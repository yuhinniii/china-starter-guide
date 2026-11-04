import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://chinastarterhub.com',
  output: 'static',
  // 注意：不要在这里配 redirects。/xx/index -> /xx/ 这类规则在 static 模式下
  // Astro 只能生成「200 + meta refresh」的 HTML 跳转页，不是真 301，
  // 还会被 sitemap 当成正常页面收录。真 301 统一写在 public/_redirects。
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
