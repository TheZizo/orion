# Orion — Public Website (`orionyouth.eu`)

Official web platform for **Orion Fiatalok Informális Csoportja** (Debrecen, Hungary) — Erasmus+ Youth Exchanges, project archive, partner consortium dossier, and contact dispatch.

Participant applications are routed through the centralized **Orion Network Gateway Portal** (`https://portal.orionyouth.eu`).

---

## Tech Stack & Build Configuration

- **Framework**: Next.js `16.4.6` (App Router, Turbopack)
- **Runtime**: Node.js `>=20`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Start Command**: `npm run start`
- **Lint & Tests**: `npm run lint`, `npm test`

---

## Environment Variables

Copy `.env.example` to `.env.local` for local testing, or configure these variables in your hosting provider's dashboard before going live:

```env
NEXT_PUBLIC_SITE_URL="https://www.orionyouth.eu"
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="Orion Website <noreply@send.orionyouth.eu>"
```

- `NEXT_PUBLIC_SITE_URL`: Canonical base URL used for `metadataBase`, `sitemap.xml`, `robots.txt`, and OpenGraph social cards (default: `https://www.orionyouth.eu`).
- `RESEND_API_KEY`: API key from [Resend](https://resend.com) used by `POST /api/contact` to deliver contact and partnership inquiries directly to `zeid@orionyouth.eu`. When omitted in development/test, submissions are validated and logged server-side; in production, `POST /api/contact` returns `503` (`RELAY_NOT_CONFIGURED`) so the UI falls back cleanly to direct email.
- `RESEND_FROM_EMAIL`: Sender address used by `/api/contact`. Verify Resend on a dedicated sending subdomain (e.g., `send.orionyouth.eu`) rather than the root domain so existing root Outlook MX records on `orionyouth.eu` are unaffected.

---

## Recommended Hosting Platforms

### Vercel / Netlify / Cloudflare
1. Push this repository to GitHub/GitLab (`git init`, commit, and add your remote).
2. Import the repository into **Vercel**, **Netlify**, or **Cloudflare** (Next.js runtime).
3. Add `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, and `RESEND_FROM_EMAIL` in the project environment settings.
4. Connect your custom domain `orionyouth.eu` (`A` / `CNAME` DNS records provided by the host) and enable HTTPS.

### Self-Hosted / Railway / Render / Docker
1. Provision a Node.js `>=20` service and configure the environment variables above.
2. Run build and startup commands:
   ```bash
   npm ci
   npm run build
   npm run start
   ```

---

## Pre-Launch Content & Security Checklist

- Add final team portraits, roles, and bios in `src/lib/orionData.ts` and `public/photos/team/`.
- Add official Organization ID (OID) / Partner Identification Form (PIF) details when finalized.
- Verify a dedicated sending subdomain (e.g., `send.orionyouth.eu`) in Resend so transactional emails arrive reliably at `zeid@orionyouth.eu` without disturbing root Outlook MX records on `orionyouth.eu`.
- Security headers (CSP, HSTS, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, `X-Content-Type-Options`, and `poweredByHeader: false`) are enforced globally via `next.config.ts`.
