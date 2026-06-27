# China Starter Guide

Your ultimate guide to traveling, living, and working in China.

## Tech Stack

- **Astro** — Static site generator
- **Tailwind CSS** — Utility-first CSS
- **TypeScript** — Type safety
- **i18n** — English + Chinese multi-language support

## Project Structure

```
china-starter-guide/
├── src/
│   ├── components/       # Reusable components
│   ├── layouts/          # Page layouts
│   └── pages/            # Pages
│       ├── en/           # English pages
│       └── zh/           # Chinese pages
├── public/               # Static assets
└── astro.config.mjs      # Site configuration
```

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:4321
```

## Deploy

Push to GitHub main branch → auto-deploys to Cloudflare Pages.

**Custom domain:** chinastarterhub.com
