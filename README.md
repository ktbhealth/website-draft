# ktb-website

KTB Health landing site. TanStack Start (SSR on Cloudflare Workers),
Paraglide i18n (en / pt-BR / es), Tailwind CSS v4, shadcn components
from [`@ktbhealth/ui`](https://github.com/ktbhealth/ui).

## Layout

- `apps/landing` — the site itself (`@ktb/landing`)
- `infra/ports` — provider-agnostic deploy specs (`@ktb/infra-ports`)
- `infra/cloudflare` — Alchemy/Cloudflare implementation (`@ktb/infra-cloudflare`)

## Run

```bash
bun install
bun run dev      # local dev server
bun run build    # SSR build (client + worker bundle)
bun run check    # vp check (lint + types)
bun run deploy   # alchemy deploy to Cloudflare (prod stage, cuora vault)
```

## i18n

Messages live in `apps/landing/messages/{en,pt-BR,es}.json`. The locale
is resolved per request from the `ktb-locale` cookie in `src/start.ts`
(SSR-correct `lang`, no layout shift); `LanguageToggle` in the header
switches it.
