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
# Install dependencies (first time only)
npm install

# Start dev server
npm run dev

# Open http://localhost:4321 in browser
```

## Build

```bash
npm run build
```

## Deploy

1. Push code to GitHub
2. Connect GitHub repo to Cloudflare Pages
3. Done — auto-deploy on every push
