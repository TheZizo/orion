# Post-Launch Remediation Blueprint — `orionyouth.eu`

## 1. Context & Objectives

Following initial deployment of the Orion Fiatalok Informális Csoportja web platform (`orionyouth.eu`), a post-launch audit identified several configuration, data-truth, security, SEO, and UI polish gaps across the codebase. This blueprint partitions the remediation cleanly across three parallel worker domains with zero overlapping file ownership.

### Core Objectives
1. **Deployment & Asset Hygiene**: Enable Next.js AVIF/WebP image optimisation, add `railway.toml` binding `0.0.0.0`, remove duplicate root `public/reforest-2.jpg`, and prevent staging `.up.railway.app` hosts from being indexed via `X-Robots-Tag: noindex, nofollow`.
2. **Canonical SEO & Metadata**: Standardise canonical URLs to `https://www.orionyouth.eu`, add `alternates.canonical`, inject `EducationalOrganization` JSON-LD structured data, harden `not-found.tsx` metadata (`noindex, follow`), and tune `sitemap.ts` priorities and timestamps.
3. **API & Validation Hardening**: Protect `POST /api/contact` with strict production `Origin` verification, an in-memory per-IP sliding-window rate limiter (5 req / 10 min), a `website` honeypot field, and explicit `503 RELAY_NOT_CONFIGURED` responses in production when `RESEND_API_KEY` is absent. Unify British English validation messaging in `validatePartnerInquiry`.
4. **Data Accuracy & Honest Presentation**: Add `ORION_ORG.gatewayPortalLive: false`, clarify `ReForest` 12-day duration (`October 11–22, 2026, including arrival and departure days`) and `1,000+` native saplings metric, mark `The Financial Blueprint` as `Upcoming` with `gallery: []`, and surface honest gateway/status cues across pages.

---

## 2. Interface Contracts

- **`ORION_ORG.gatewayPortalLive`**: `boolean` (`false`) in `src/lib/orionData.ts`. Consumers (`OpenCalls`, `Navbar`, `OpenCallDetail`, etc.) gate live-portal links or display early-interest/coming-soon states when `false`.
- **`SEED_PROJECTS` Status & Metrics**:
  - `reforest`: `status: 'Completed'`, 4th `impactMetrics` item is `{ label: 'Seedlings planted', value: '1,000+', detail: 'Native fir & spruce across Harghita' }`.
  - `the-financial-blueprint`: `status: 'Upcoming'`, `gallery: []`.
- **`validatePartnerInquiry(data)`**: Returns `Record<string, string>` with British English copy (`'Organisation name is required.'`, `'Organisation name must be at least 2 characters.'`, `'Organisation name cannot exceed 120 characters.'`, `'Partnership topic is required.'`, `'Please provide details regarding your partnership inquiry.'`), retaining `>= 20` min and `<= 4000` max message checks.
- **`POST /api/contact` Contract**:
  - Request payload extends `ContactApiPayload` with optional `website?: string` honeypot.
  - Exported `resetContactRateLimit(): void` clears the per-IP sliding-window `Map`.
  - Responses:
    - `403` `{ ok: false, error: 'Forbidden origin.' }` on mismatched/invalid `Origin` in `production`.
    - `429` `{ ok: false, error: 'Too many requests. Please wait a few minutes or email zeid@orionyouth.eu directly.' }` when IP header present and `>= 5` requests in 10 minutes.
    - `400` `{ ok: false, error: 'Invalid submission.' }` when honeypot `website` is non-empty.
    - `503` `{ ok: false, code: 'RELAY_NOT_CONFIGURED', recipient, id, error: ... }` in `production` when `RESEND_API_KEY` is unset.
    - `200` `{ ok: true, recipient, id, delivery: 'logged' | 'resend' }` on success (non-prod fallback or Resend delivery).

---

## 3. Worker Assignments

### Worker 1 — Foundation Engineer (Platform, Config, Data, API, SEO)
- `plans/post-launch-remediation.md` (create)
- `public/reforest-2.jpg` (delete)
- `next.config.ts`
- `railway.toml` (create)
- `.env.example`, `README.md`
- `src/lib/orionData.ts`, `src/lib/storage.ts`
- `src/app/api/contact/route.ts`
- `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`, `src/app/not-found.tsx`
- `src/lib/__tests__/orionData.test.ts`, `src/lib/__tests__/storage.test.ts`, `src/app/api/contact/__tests__/route.test.ts`

### Worker 2 — Homepage, Motifs, Navbar & PageHeader
- `src/app/page.tsx`
- `src/components/home/*`
- `src/components/motifs/*`
- `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`, `src/components/ui/PageHeader.tsx`
- Associated component unit tests

### Worker 3 — Inner Routes, Forms, Galleries & About
- `src/app/open-calls/*`, `src/app/projects/*`, `src/app/partners/*`, `src/app/contact/*`, `src/app/about/*`, `src/app/privacy/*`
- `src/components/open-calls/*`, `src/components/projects/*`, `src/components/partners/*`, `src/components/contact/*`, `src/components/about/*`
- Associated form/page/archive tests (including `Upcoming` filter alignment in `ProjectsArchive.tsx` and `Projects.test.tsx`)

---

## 4. Verification Matrix

| Check | Command | Scope |
| :--- | :--- | :--- |
| Foundation Unit & API Tests | `npx vitest run src/lib/__tests__ src/app/api/contact/__tests__` | Worker 1 |
| Full Test Suite | `npx vitest run` | All Workers |
| TypeScript Check | `npx tsc --noEmit` | All Workers |
| Production Build | `npm run build` | Integration Gate |
| Lint | `npm run lint` | Integration Gate |

---

## 5. Checklist

- [x] Create `plans/post-launch-remediation.md`
- [ ] Delete `public/reforest-2.jpg`
- [ ] Configure `next.config.ts` image formats & Railway `X-Robots-Tag`
- [ ] Add `railway.toml`
- [ ] Update `.env.example` & `README.md` (`www.orionyouth.eu` + Resend subdomain guidance)
- [ ] Update `src/lib/orionData.ts` (`gatewayPortalLive`, `ReForest`, `The Financial Blueprint`)
- [ ] Unify British spelling in `src/lib/storage.ts`
- [ ] Harden `src/app/api/contact/route.ts` (Origin, rate limit, honeypot, `503` prod guard)
- [ ] Update `layout.tsx`, `sitemap.ts`, `robots.ts`, `not-found.tsx`
- [ ] Update & pass Worker 1 tests + `tsc --noEmit`
