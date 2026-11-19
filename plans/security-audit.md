# Orion Pre-Release Security & Code Quality Audit

**Target Codebase:** `c:\Users\zeid-\Documents\antigravity\elegant-mendeleev`  
**Date:** 2026-10-24  
**Auditor:** `@security-auditor` (Phase 4 Security Gate)  
**Status:** Verification Complete (Pass with Pre-Release Fixes Required)  
**Verification Toolchain Execution:**
- `npm audit --omit=dev`: **0 vulnerabilities**
- `npm audit`: **0 vulnerabilities**
- `npx tsc --noEmit`: **0 errors** (Clean typecheck)
- `npm run lint`: **0 warnings / 0 errors** (ESLint passed)
- `npm test` (`vitest run`): **13 test files passed, 94 tests passed** (100% test pass rate)

---

## Executive Summary

| Severity | Count | Release Impact |
| :--- | :--- | :--- |
| **BLOCKER** | 2 | **Must be remediated before production deployment** (Security headers, brand/contrast guardrail) |
| **WARNING** | 5 | **High-priority architectural & defensive hardening** (localStorage deserialization, quota swallowing, unvalidated fields, tab-nabbing, focus rings) |
| **NOTE** | 4 | **Code hygiene, resilience & Phase 2 transition recommendations** |

---

## Findings: BLOCKER

### 1. Missing Security Headers and Content Security Policy (CSP) Configuration
- **File:** `next.config.ts`
- **Lines:** 1–18
- **Snippet:**
  ```ts
  import type { NextConfig } from "next";

  const nextConfig: NextConfig = {
    /* config options here */
    cacheComponents: true,
    partialPrefetching: true,
    turbopack: {
      rules: {
        "*.css": {
          loaders: ["@tailwindcss/turbopack"],
          as: "*.css",
        },
      },
    },
  };

  export default nextConfig;
  ```
- **Risk:**
  `next.config.ts` defines no `headers()` configuration. The application is served without standard defensive HTTP headers:
  - Missing `Content-Security-Policy` leaves the application exposed to script injection and unauthorized resource loading.
  - Missing `X-Frame-Options` and `frame-ancestors` permits clickjacking via iframe embedding.
  - Missing `X-Content-Type-Options: nosniff` permits MIME-type sniffing.
  - Missing `Referrer-Policy: strict-origin-when-cross-origin` leaks full path information to external sites.
  - Missing `Permissions-Policy` leaves browser device APIs (camera, microphone, geolocation) unconstrained.
- **Recommended Remediation:**
  Add a comprehensive `headers()` async function to `next.config.ts` appropriate for Next.js 16, Google Fonts (`next/font`), local images, and the external application funnel:
  ```ts
  import type { NextConfig } from "next";

  const securityHeaders = [
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on',
    },
    {
      key: 'X-Frame-Options',
      value: 'DENY',
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin',
    },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
    },
    {
      key: 'Cross-Origin-Opener-Policy',
      value: 'same-origin',
    },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload',
    },
    {
      key: 'Content-Security-Policy',
      value: [
        "default-src 'self';",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline';",
        "style-src 'self' 'unsafe-inline';",
        "img-src 'self' data: blob:;",
        "font-src 'self' data:;",
        "connect-src 'self' https://*.supabase.co;",
        "frame-ancestors 'none';",
        "form-action 'self' https://forms.gle;",
        "base-uri 'self';",
      ].join(' '),
    },
  ];

  const nextConfig: NextConfig = {
    cacheComponents: true,
    partialPrefetching: true,
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
      ];
    },
    turbopack: {
      rules: {
        "*.css": {
          loaders: ["@tailwindcss/turbopack"],
          as: "*.css",
        },
      },
    },
  };

  export default nextConfig;
  ```

---

### 2. Brand Guardrail & Contrast Correctness Violation: Small Ember Text on Navy Canvas
- **File:** `src/components/admin/SupabaseReadinessBanner.tsx`
- **Line:** 111
- **Snippet:**
  ```tsx
  <tbody className="divide-y divide-[rgba(248,249,250,0.08)] font-mono text-xs">
    {schemaMappings.map((row) => (
      <tr key={row.tableName} className="hover:bg-[#0B132B]/40">
        <td className="p-3 font-bold text-[#F8F9FA]">{row.tableName}</td>
        <td className="p-3 text-[rgba(248,249,250,0.85)]">{row.tsType}</td>
        <td className="p-3 text-[#e35619]">{row.storageKey}</td>
        <td className="p-3 text-emerald-300">
  ```
- **Risk:**
  The parent container is `bg-[#111D3B]` (dark nebula navy). Line 111 renders `row.storageKey` in `text-[#e35619]` at `text-xs` (12px font size).
  This directly violates the client brief's locked design rules:
  - *Brief Rule:* "NEVER set small body text in orange, and NEVER put orange text directly on `#0B132B` (Midnight Navy)."
  - *Brand Guardrail:* As codified in `StatusBadge.tsx:39` (`// Off-white text on dark, NOT orange text`), orange text on dark navy surfaces impairs legibility and causes chromatic aberration.
- **Recommended Remediation:**
  Change line 111 to render in crisp off-white or an accessible amber tint:
  ```tsx
  <td className="p-3 text-[rgba(248,249,250,0.85)]">{row.storageKey}</td>
  ```
  Or render inside a bordered badge:
  ```tsx
  <td className="p-3">
    <span className="px-2 py-0.5 border border-[rgba(248,249,250,0.18)] bg-[#0B132B] text-[rgba(248,249,250,0.9)]">
      {row.storageKey}
    </span>
  </td>
  ```

---

## Findings: WARNING

### 3. Unsafe Deserialization and Missing Type Guard in LocalStorage Repository
- **File:** `src/lib/storage.ts`
- **Lines:** 38–41, 48–51, 58–64
- **Snippet:**
  ```ts
  const raw = window.localStorage.getItem(this.storageKey);
  if (!raw) return [];
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? (parsed as T[]) : [];
  ...
  async getById(id: string): Promise<T | undefined> {
    const all = await this.list();
    return all.find((item) => item.id === id);
  }
  ```
- **Risk:**
  `list()` casts `parsed as T[]` simply because `Array.isArray(parsed)` is true. If localStorage is tampered with or corrupted (e.g. `[null, 123, "test"]`), or if objects contain `__proto__` pollution:
  1. `getById(id)` will execute `item.id === id`. When `item` is `null`, it throws an uncaught runtime `TypeError: Cannot read properties of null (reading 'id')` and crashes because `getById` lacks error handling.
  2. In `save()`, `all.findIndex((existing) => existing.id === item.id)` similarly throws if `existing` is null.
  3. In `SubmissionsLedger.tsx:84-110`, rendering `app.createdAt.slice(0, 10)` crashes if `app.createdAt` is not a string.
- **Recommended Remediation:**
  Implement defensive item validation and prototype sanitization in `storage.ts`:
  ```ts
  async list(): Promise<T[]> {
    if (!this.isClient()) return [];
    try {
      const raw = window.localStorage.getItem(this.storageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (item): item is T =>
          Boolean(
            item &&
            typeof item === 'object' &&
            !Array.isArray(item) &&
            typeof (item as Record<string, unknown>).id === 'string' &&
            !Object.prototype.hasOwnProperty.call(item, '__proto__')
          )
      );
    } catch (err) {
      console.warn(`[LocalStorageRepository] Error parsing key ${this.storageKey}:`, err);
      return [];
    }
  }

  async getById(id: string): Promise<T | undefined> {
    try {
      const all = await this.list();
      return all.find((item) => item && typeof item === 'object' && item.id === id);
    } catch {
      return undefined;
    }
  }
  ```

---

### 4. Silent Swallowing of `QuotaExceededError` in LocalStorage Persistence
- **File:** `src/lib/storage.ts`
- **Lines:** 68–71
- **Snippet:**
  ```ts
  try {
    ...
    window.localStorage.setItem(this.storageKey, JSON.stringify(updated));
  } catch (err) {
    console.error(`[LocalStorageRepository] Error saving item to ${this.storageKey}:`, err);
  }
  return item;
  ```
- **Risk:**
  When browser localStorage reaches its quota limit (typically 5MB) or is disabled in private browsing/incognito with strict storage isolation, `localStorage.setItem` throws `DOMException: QuotaExceededError`.
  Because `save()` catches and logs the error without rethrowing or indicating failure, the caller assumes persistence succeeded. In `ThreeStepApplicationForm.tsx:230-231`, `setSubmittedId(submissionId)` is called, displaying a confirmation screen to the applicant while their submission data was permanently lost.
- **Recommended Remediation:**
  Allow `save()` to rethrow storage errors or return a status flag so the UI can display a helpful error message to the applicant:
  ```ts
  async save(item: T): Promise<T> {
    if (!this.isClient()) return item;
    const all = await this.list();
    const existingIdx = all.findIndex((existing) => existing?.id === item.id);
    let updated: T[];
    if (existingIdx >= 0) {
      updated = [...all];
      updated[existingIdx] = item;
    } else {
      updated = [item, ...all];
    }
    // Let QuotaExceededError bubble to the form submit handler
    window.localStorage.setItem(this.storageKey, JSON.stringify(updated));
    return item;
  }
  ```

---

### 5. Missing Input Length Caps & Format Validation in Form Validators
- **File:** `src/lib/storage.ts`
- **Lines:** 166–222, 224–257, 285–331, 333–372
- **Snippet:**
  ```ts
  // validateAboutYou:
  const dateOfBirth = sanitize(data.dateOfBirth);
  if (!dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required.';
  }
  // data.sendingOrganisation is completely unvalidated

  // validateMotivation:
  // data.accessNeeds is completely unvalidated

  // validatePartnerInquiry:
  // data.country, data.contactPerson, data.topic have no maxLength caps
  // data.email has no maxLength cap (validateAboutYou caps at 120)
  ```
- **Risk:**
  Several form fields lack maximum length caps and format constraints:
  1. `sendingOrganisation` in `ApplicationAboutYou` has zero length validation; an unbounded string can be submitted into storage.
  2. `accessNeeds` in `ApplicationMotivation` has zero length validation.
  3. `dateOfBirth` has no format validation (e.g. ISO date `^\d{4}-\d{2}-\d{2}$` or range check for youth exchanges `18–30`).
  4. In `validatePartnerInquiry`, `email`, `country`, `contactPerson`, and `topic` have no upper length bounds.
  5. In `validateContactMessage`, `email` has no upper length bound.
- **Recommended Remediation:**
  Harden validation in `src/lib/storage.ts`:
  - Cap `sendingOrganisation` at 120 characters:
    `if (data.sendingOrganisation && sanitize(data.sendingOrganisation).length > 120) { errors.sendingOrganisation = 'Cannot exceed 120 characters.'; }`
  - Cap `accessNeeds` at 1500 characters.
  - Enforce `dateOfBirth` regex: `/^\d{4}-\d{2}-\d{2}$/` and verify age bounds.
  - Cap all contact and partner fields at standard limits (e.g., email max 120, contact person max 100, topic max 150).

---

### 6. Reverse Tab-Nabbing Risk in Generic Button Link Component
- **File:** `src/components/ui/Button.tsx`
- **Lines:** 87–99
- **Snippet:**
  ```tsx
  if (href) {
    const isExternal = href.startsWith('http://') || href.startsWith('https://');
    return (
      <Link
        href={href}
        className={combined}
        target={isExternal ? '_blank' : (rest as ButtonAsLink).target}
        rel={isExternal ? 'noopener noreferrer' : (rest as ButtonAsLink).rel}
        onClick={(rest as ButtonAsLink).onClick}
      >
        {children}
      </Link>
    );
  }
  ```
- **Risk:**
  If a developer uses `<Button href="/docs/infopack.pdf" target="_blank">`, `isExternal` evaluates to `false` because the path does not start with `http://` or `https://`.
  As a result, `rel` falls back to `(rest as ButtonAsLink).rel`. If the caller omits `rel`, the link opens with `target="_blank"` without `rel="noopener noreferrer"`, exposing users to tab-nabbing / window.opener hijacking in older or non-Chromium browsers.
- **Recommended Remediation:**
  Ensure that whenever `target === '_blank'` (whether inferred from `isExternal` or explicitly passed in props), `rel` defaults securely to `'noopener noreferrer'`:
  ```tsx
  if (href) {
    const isExternal = href.startsWith('http://') || href.startsWith('https://');
    const target = (rest as ButtonAsLink).target ?? (isExternal ? '_blank' : undefined);
    const rel = (rest as ButtonAsLink).rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined);

    return (
      <Link
        href={href}
        className={combined}
        target={target}
        rel={rel}
        onClick={(rest as ButtonAsLink).onClick}
      >
        {children}
      </Link>
    );
  }
  ```

---

### 7. Ineffective Dark-Surface Focus Ring Selector in Global Styles
- **File:** `src/app/globals.css`
- **Lines:** 166–170
- **Snippet:**
  ```css
  .bg-navy :focus-visible,
  .dark-surface :focus-visible {
    outline: 2px solid #F8F9FA;
    outline-offset: 3px;
  }
  ```
- **Risk:**
  Neither `.bg-navy` nor `.dark-surface` exists as a CSS class on any dark section or component in the JSX tree (components use Tailwind `bg-[#0B132B]` or `bg-[#111D3B]` directly).
  Therefore, any focusable interactive element inside a dark section that does not explicitly declare a Tailwind focus ring utility falls back to the global default:
  ```css
  :focus-visible {
    outline: 2px solid #e35619;
    outline-offset: 3px;
  }
  ```
  This causes an orange focus outline to appear directly on dark navy backgrounds, conflicting with the WCAG AA brand contrast guidance.
- **Recommended Remediation:**
  Update `globals.css` to cover Tailwind arbitrary navy classes or provide explicit utility helpers:
  ```css
  :focus-visible {
    outline: 2px solid #e35619;
    outline-offset: 3px;
  }

  [class*="bg-[#0B132B]"] :focus-visible,
  [class*="bg-[#111D3B]"] :focus-visible,
  [data-tone="dark"] :focus-visible {
    outline: 2px solid #F8F9FA;
    outline-offset: 3px;
  }
  ```

---

## Findings: NOTE

### 8. Uncleaned 50ms Focus Timers in Multi-Step Form
- **File:** `src/components/open-calls/ThreeStepApplicationForm.tsx`
- **Lines:** 155, 165, 189
- **Snippet:**
  ```tsx
  setTimeout(() => errorSummaryRef.current?.focus(), 50);
  ```
- **Observation:**
  These one-off 50ms timeouts are spawned without storing their IDs in a `useRef` or clearing them on component unmount.
  Because optional chaining `errorSummaryRef.current?.focus()` is used, this will not throw an error if unmounted. However, storing the timer in a ref and cleaning it up on unmount is best practice to avoid dangling macro-tasks during fast page navigation.
- **Remediation:**
  Create a `timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)` and clear in an unmount cleanup effect:
  ```tsx
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  ```

---

### 9. URL Scheme & Host Validation in External Application Card
- **File:** `src/components/open-calls/ExternalApplicationCard.tsx`
- **Lines:** 21–22
- **Snippet:**
  ```tsx
  const rawUrl = call.externalFormUrl?.trim() ?? '';
  const isSecureUrl = rawUrl.startsWith('https://');
  ```
- **Observation:**
  `rawUrl.startsWith('https://')` effectively rejects insecure `http:` and dangerous `javascript:` schemes. However, it does not validate that `rawUrl` parses as a valid URL via `new URL(rawUrl)`. If malformed data is introduced in `orionData.ts`, `<Button href={rawUrl}>` could receive a broken string.
- **Remediation:**
  Wrap in `URL` constructor parsing:
  ```tsx
  const isSecureUrl = useMemo(() => {
    try {
      const parsed = new URL(rawUrl);
      return parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }, [rawUrl]);
  ```

---

### 10. Phase 2 Admin Preview Data Masking Recommendation
- **File:** `src/components/admin/SubmissionsLedger.tsx`
- **Line:** 100
- **Snippet:**
  ```tsx
  <td className="p-3 text-[rgba(248,249,250,0.9)]">
    {app.aboutYou?.fullName || '—'}
  </td>
  <td className="p-3 font-mono text-xs text-[rgba(248,249,250,0.8)]">
    {maskEmail(app.aboutYou?.email || '')}
  </td>
  ```
- **Observation:**
  `maskEmail()` properly masks email addresses (e.g. `j***@example.com`). However, the applicant's full name is rendered in plaintext.
  For Phase 1 (a client-side preview reading the visitor's own browser localStorage), this is acceptable. For Phase 2 (Supabase multi-tenant data), full names and submission details must be protected behind strict server-side authentication and Supabase Row Level Security (RLS) policies.
- **Remediation:**
  Document in the Phase 2 migration specification that `/admin-preview` must transition to an authenticated route (`/admin`) requiring role-based access (`admin` role in Supabase auth).

---

### 11. Vitest Test Environment Isolation Optimization
- **File:** `vitest.config.mts`
- **Lines:** 7–11
- **Observation:**
  During test execution, Vitest reports:
  `Environment jsdom was created 13 times · 38.91s total, 58% of tracked time`
- **Remediation:**
  To optimize CI test run speeds, configure pool isolation in `vitest.config.mts`:
  ```ts
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    pool: 'vmThreads',
  }
  ```

---

## Verification Checklist

| Checkpoint | Verified State | Status |
| :--- | :--- | :--- |
| `dangerouslySetInnerHTML` | Zero occurrences | PASSED |
| `javascript:` pseudo-protocols | Zero occurrences | PASSED |
| `target="_blank"` without `rel` | Guarded in `ExternalApplicationCard`; needs fallback in `Button.tsx` | ACTION REQUIRED (Warning #6) |
| LocalStorage Deserialization | `JSON.parse` wrapped in try/catch; needs type-guarding against null items | ACTION REQUIRED (Warning #3) |
| PII Console Logging | No form payloads logged to console | PASSED |
| Hydration Mismatches | Deterministic static star dust; deterministic date string formatting | PASSED |
| Timers / Event Listeners Cleanup | Cleaned in `CelestialAtlas`, `OidCopyButton`, `Navbar` | PASSED |
| Form Promise Rejection Handling | All forms implement try/catch/finally with user-facing error state | PASSED |
| Security Headers | Missing in `next.config.ts` | ACTION REQUIRED (Blocker #1) |
| WCAG Contrast Guardrail | Ember `#e35619` text on navy in `SupabaseReadinessBanner.tsx:111` | ACTION REQUIRED (Blocker #2) |
| Dependency Vulnerabilities | 0 vulnerabilities found via `npm audit` | PASSED |
| Build & Type Integrity | TypeScript clean (`tsc --noEmit`), ESLint clean, 94 unit tests pass | PASSED |

---
**Report generated by:** `@security-auditor`  
**Location:** `plans/security-audit.md`
