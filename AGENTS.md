# website-draft — agent guide

KTB Health landing site. Vite+ (`vp`) monorepo; app in `apps/landing`
(TanStack Start, Paraglide i18n, Tailwind v4, deployed to Cloudflare
Workers via Alchemy).

## Commands

- `bun run dev` — :3001 · `bun run build` / `bun run check` / `bun run test`
- `bun run deploy` / `infra:deploy` — Alchemy → Cloudflare prod
  (needs cuora vault access)

## Rules

- i18n: all user-facing strings go through Paraglide `messages/*.json`
  — keep `en`, `pt-BR`, `es` in parity. NEVER hand-edit generated
  Paraglide output; regenerate with the compiler (`vp build`/`check`
  does it).
- Positioning: documentation-only, channel-agnostic (see project
  proposals P-001, T-021) — no diagnosis/decision-support claims.
- Tokens/components come from `@ktbhealth/ui` when the React flavor
  fits; landing-specific styling stays local.
