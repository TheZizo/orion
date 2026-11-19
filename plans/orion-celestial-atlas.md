# ORION — "The Celestial Atlas" Architectural Blueprint & Execution Plan

**Task ID:** `orion-celestial-atlas`  
**Architect:** `@architect` (Phase 1: Planning + Foundation)  
**Date:** 2026-10-24  
**Project:** Orion Ifjúsági Egyesület (Erasmus+ Youth NGO, Debrecen, Hungary)  
**Concept:** The Celestial Atlas (Interactive Trajectory & Wayfinding)

---

## 1. Context & Objectives

Orion is an international Erasmus+ youth NGO based in Debrecen, Hungary (`47.53° N, 21.62° E`). The core conceptual motif is **"The Celestial Atlas"**: viewing youth mobilities as navigational arcs across a European celestial chart, where Debrecen serves as the anchor star and young changemakers form interconnected constellations.

### Strict Scope & Design Constraints
1. **Brand Color Palette (Locked):**
   - **Midnight Navy (`#0B132B`):** Dark anchor surface (hero, navbar, footer, drawer background).
   - **Off-White (`#F8F9FA`):** Daylight background canvas for editorial content and knockout text on navy.
   - **Ember Orange (`#e35619`):** Accent ONLY. Strictly capped at **$\le 1$ focal highlight per viewport** (e.g. single highlighted word in headline, active shooting star node, or primary CTA button).
   - **Surface & Grid Tokens:**
     - `orbit-dark` (`rgba(248, 249, 250, 0.14)`): 1px borders and celestial graticules on navy.
     - `orbit-light` (`rgba(11, 19, 43, 0.10)`): 1px architectural borders on off-white.
     - `nebula-surface` (`#111D3B`): Elevated card/drawer surface on navy.
     - `graticule` (`rgba(248, 249, 250, 0.08)`): Map coordinate gridlines.
2. **WCAG 2.1 AA Guardrails:**
   - **NEVER** use Ember Orange (`#e35619`) as a large background fill.
   - **NEVER** set orange text directly on Midnight Navy (`#0B132B`).
   - **Primary Button AA Decision:** Ember Orange fill (`#e35619`) with Midnight Navy text (`#0B132B`, bold). Relative luminance calculation yields a **4.9:1 contrast ratio**, cleanly passing WCAG 2.1 AA normal text ($\ge 4.5:1$). (White text on ember fails at ~3.7:1).
3. **Locked Typography Scale (Sentence Case, Left-Aligned):**
   - Headings: `Space Grotesk` (fallback `Sora, system-ui, sans-serif`).
   - Body & UI: `Inter` (fallback `system-ui, sans-serif`).
   - Scale:
     - `.type-display`: 40px (mobile) $\to$ 64px (md), 700 bold, line-height 1.05, tracking -0.01em
     - `.type-h1`: 32px (mobile) $\to$ 40px (md), 700 bold, line-height 1.1, tracking -0.005em
     - `.type-h2`: 26px (mobile) $\to$ 32px (md), 600 semibold, line-height 1.15, tracking 0
     - `.type-h3`: 20px (mobile) $\to$ 24px (md), 600 semibold, line-height 1.2, tracking 0
     - `.type-body-lg`: 18px, 400 regular, line-height 1.6, max 65ch
     - `.type-body`: 16px, 400 regular, line-height 1.6, max 65ch
     - `.type-caption`: 14px, 500 medium, line-height 1.4
     - `.type-eyebrow`: Space Grotesk, 12px, 600 semibold, line-height 1.3, tracking +0.08em, uppercase
   - Formatting: Sentence case for all headings and UI; ALL CAPS strictly reserved for the `ORION` wordmark and `12px` eyebrows.
4. **Layout & Motion Restraint:**
   - 8px spatial rhythm (`4px, 8px, 16px, 24px, 32px, 48px, 64px`) across a 12-column grid (`.container-orion` max 1280px).
   - Zero generic rounded drop-shadow SaaS cards; use crisp 1px borders, coordinate stamps, and architectural tabular layouts.
   - Single orchestrated motion: SVG shooting-star dash trace (`.animate-arc-trace`) from Debrecen HQ to active open call node.
5. **Next.js 15/16 App Router Contract:**
   - **Dynamic Route Params:** `params` is a `Promise`. In server components:
     ```tsx
     interface PageProps {
       params: Promise<{ slug: string }>;
     }
     export default async function Page({ params }: PageProps) {
       const { slug } = await params;
       // ...
     }
     ```
     Engineers must `await params` in dynamic routes (`/open-calls/[slug]` and `/projects/[slug]`).

---

## 2. Interface Contracts

All engineers must import and consume the foundation layer without modifying root configs or shared contracts.

### A. Data Contracts (`src/types/orion.ts`)
```ts
export type ActionType = 'Youth Exchange' | 'Training Course';
export type CallStatus = 'Open' | 'Closing soon' | 'Closed';
export type ApplicationMode = 'internal' | 'external';
export type ProjectStatus = 'Completed' | 'Ongoing';
export type SubmissionStatus = 'received' | 'reviewing' | 'accepted' | 'waitlisted';
export type ContactMode = 'participant' | 'partner';
export type AtlasNodeKind = 'hq' | 'open-call' | 'project';

export interface Coordinates { lat: number; lng: number; }
export interface DailyExperienceItem { label: string; description: string; }
export interface TravelReimbursementBand { distanceBand: string; maxAmountEUR: number; }

export interface OpenCall {
  slug: string;
  title: string;
  actionType: ActionType;
  country: string;
  city: string;
  venue?: string;
  coordinates: Coordinates;
  startDate: string; // ISO YYYY-MM-DD
  endDate: string; // ISO YYYY-MM-DD
  applicationDeadline: string; // ISO YYYY-MM-DD
  status: CallStatus;
  ageRange: string;
  participantsPerCountry: number | string;
  emotionalPayoff: string;
  summary: string;
  dailyExperience: DailyExperienceItem[];
  travelReimbursement: TravelReimbursementBand[];
  reimbursementNotes: string;
  eligibility: string[];
  infopackUrl: string;
  applicationMode: ApplicationMode;
  externalFormUrl?: string;
  partnerOrgs: string[];
  themes: string[];
}

export interface Project {
  slug: string;
  title: string;
  actionType: string;
  status: ProjectStatus;
  locationLabel: string;
  country: string;
  coordinates: Coordinates;
  startDate: string;
  endDate: string;
  dateLabel: string;
  partners: string[];
  grantReference?: string;
  focus: string;
  summary: string;
  emotionalSummary: string;
  impactMetrics: Array<{ label: string; value: string }>;
  gallery: Array<{ src: string; alt: string; caption: string }>;
  quotes: Array<{ quote: string; name: string; country: string }>;
  partnerLogos: Array<{ name: string; country: string }>;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  coordinates?: Coordinates;
  avatarUrl?: string;
}

export interface ApplicationSubmission {
  id: string;
  callSlug: string;
  createdAt: string;
  status: SubmissionStatus;
  aboutYou: {
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    nationality: string;
    countryOfResidence: string;
    sendingOrganisation?: string;
  };
  motivation: {
    motivation: string;
    experience: string;
    contribution: string;
    accessNeeds?: string;
  };
  travel: {
    departureCity: string;
    travelMode: string;
    needsVisa: boolean;
    consentDataProcessing: boolean;
    consentPhotos: boolean;
  };
}

export interface PartnerInquiry {
  id: string;
  createdAt: string;
  organizationName: string;
  country: string;
  contactPerson: string;
  email: string;
  projectType: string;
  topic: string;
  message: string;
  oid?: string;
}

export interface ContactMessage {
  id: string;
  createdAt: string;
  mode: ContactMode;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AtlasNode {
  id: string;
  kind: AtlasNodeKind;
  title: string;
  coordinates: Coordinates;
  dateLabel: string;
  statusLabel: string;
  summary: string;
  href: string;
  ctaLabel: string;
}
```

### B. Seed Data & Accessors (`src/lib/orionData.ts`)
```ts
export const ORION_ORG: {
  legalName: 'Orion Ifjúsági Egyesület';
  seat: 'Debrecen, Hungary (47.53° N, 21.62° E)';
  coordinates: { lat: 47.53; lng: 21.62 };
  oid: 'E103XXXXX';
  grantReference: '2026-1-HU01-KA152-YOU-000399636';
  tagline: 'Spark something bigger.';
  shortBoilerplate: string;
  longBoilerplate: string;
  erasmusDisclaimer: string;
  impactStats: Array<{ label: string; value: string }>;
};

export function formatCoordinates(coords: Coordinates): string; // e.g. "47.53° N, 21.62° E"
export function formatDateRange(startIso: string, endIso: string): string; // e.g. "12–21 Mar 2027"
export function getOpenCalls(filters?: OpenCallFilters): OpenCall[];
export function getOpenCallBySlug(slug: string): OpenCall | undefined;
export function getProjects(filters?: ProjectFilters): Project[];
export function getProjectBySlug(slug: string): Project | undefined;
export function getTeam(): TeamMember[];
export function getAtlasNodes(): AtlasNode[];
```

### C. Persistence & Validation Layer (`src/lib/storage.ts`)
```ts
export interface SubmissionRepository<T extends { id: string }> {
  save(item: T): Promise<T>;
  list(): Promise<T[]>;
  getById(id: string): Promise<T | undefined>;
  clear?(): Promise<void>;
}

export const applicationRepository: SubmissionRepository<ApplicationSubmission>;
export const partnerInquiryRepository: SubmissionRepository<PartnerInquiry>;
export const contactRepository: SubmissionRepository<ContactMessage>;

export function validateAboutYou(data: Partial<ApplicationSubmission['aboutYou']>): Record<string, string>;
export function validateMotivation(data: Partial<ApplicationSubmission['motivation']>): Record<string, string>;
export function validateTravel(data: Partial<ApplicationSubmission['travel']>): Record<string, string>;
export function validatePartnerInquiry(data: Partial<PartnerInquiry>): Record<string, string>;
export function validateContactMessage(data: Partial<ContactMessage>): Record<string, string>;
```

### D. Shared Motifs & UI Primitives
- **`src/components/motifs/SparkleStar.tsx`**:
  `SparkleStar({ size, color, className, pulse, title }: SparkleStarProps)`
- **`src/components/motifs/TrajectoryArc.tsx`**:
  `TrajectoryArc({ from, to, curvature, stroke, strokeWidth, dashed, animated, progress, className }: TrajectoryArcProps)`  
  `arcPath(from: Point2D, to: Point2D, curvature?: number): string`
- **`src/components/ui/Button.tsx`**:
  `Button({ variant: 'primary' | 'secondary' | 'ghost', tone: 'light' | 'dark', size: 'sm' | 'md' | 'lg', href?, ...props }: ButtonProps)`
- **`src/components/ui/Eyebrow.tsx`**:
  `Eyebrow({ children, tone: 'light' | 'dark', sparkle?: boolean, className? }: EyebrowProps)`
- **`src/components/ui/StatusBadge.tsx`**:
  `StatusBadge({ status: 'Open' | 'Closing soon' | 'Closed' | 'Completed' | 'Ongoing', tone: 'light' | 'dark', className? }: StatusBadgeProps)`
- **`src/components/ui/CoordinateStamp.tsx`**:
  `CoordinateStamp({ coordinates?, lat?, lng?, label?, tone?, className? }: CoordinateStampProps)`
- **`src/components/ui/Section.tsx`**:
  `Section({ as?, tone: 'dark' | 'light' | 'nebula', spacing: 'none' | 'sm' | 'md' | 'lg' | 'xl', borderTop?, borderBottom?, children }: SectionProps)`
- **`src/components/ui/Container.tsx`**:
  `Container({ children, className? }: ContainerProps)`

---

## 3. Worker Assignments (Strict File-Domain Splits)

```
                       ┌──────────────────────────────┐
                       │     @architect (Phase 1)     │
                       │  Scaffold, Design Tokens,    │
                       │  Contracts, Data & Testing   │
                       └──────────────┬───────────────┘
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         ▼                            ▼                            ▼
┌──────────────────┐        ┌──────────────────┐        ┌──────────────────┐
│     Worker A     │        │     Worker B     │        │     Worker C     │
│  Motifs, Atlas,  │        │  Open Calls &    │        │  Projects, About,│
│  Nav & Homepage  │        │  Admin Preview   │        │  Partners & Form │
└──────────────────┘        └──────────────────┘        └──────────────────┘
```

### Worker A: Motifs, Interactive Celestial Atlas, Layout & Home Canvas
- **Target Files & Directories (STRICT):**
  - `src/components/motifs/OrionLogo.tsx` (variants: `full-light`, `full-dark`, `star-only` with 3 tapered motion streaks sweeping to 4-point star)
  - `src/components/motifs/CelestialAtlas.tsx` (interactive SVG European chart on `#0B132B`, Debrecen anchor, coordinate graticules, interactive nodes)
  - `src/components/motifs/NodeInspector.tsx` (interactive details drawer for clicked/focused atlas node with emotional summary, coordinates, direct CTA)
  - `src/components/motifs/MotionTrailDivider.tsx` (sweeping tapered `#e35619` streaks section transition)
  - `src/components/layout/Navbar.tsx` (full navigation bar on `#0B132B`, desktop links + mobile toggle, CTA `Explore open calls`)
  - `src/components/layout/Footer.tsx` (full footer on `#0B132B`, tagline, boilerplate, coordinates, Erasmus+ disclaimer, `/admin-preview` link)
  - `src/components/home/HeroSection.tsx` (12-col night-sky canvas, Display headline, lead copy, CTAs, interactive Atlas + Inspector)
  - `src/components/home/DeparturesLedger.tsx` (Daylight canvas, impact proof stats 200+/14/100%, Erasmus+ explainer, tabular open calls list)
  - `src/components/home/MessagingPillars.tsx` (4 core pillars grid with 1px chart borders)
  - `src/components/home/RecentConstellations.tsx` (ReForest & Job Jam editorial preview linking to `/projects`)
  - `src/app/page.tsx` (composing the full home page)
  - Colocated tests: `src/components/motifs/__tests__/OrionLogo.test.tsx`, `CelestialAtlas.test.tsx`, `src/components/home/__tests__/Home.test.tsx`

### Worker B: Open Calls Directory, Hybrid Application Funnel & Admin Preview
- **Target Files & Directories (STRICT):**
  - `src/app/open-calls/page.tsx` (Directory view with filters: Action Type, Country, Status)
  - `src/app/open-calls/[slug]/page.tsx` (Detail view: `await params`, emotional payoff, logistics, daily schedule, travel bands, infopack PDF download, hybrid application)
  - `src/components/open-calls/OpenCallsDirectory.tsx`
  - `src/components/open-calls/CallFilterBar.tsx`
  - `src/components/open-calls/CallCard.tsx`
  - `src/components/open-calls/HybridApplicationFunnel.tsx` (handles `applicationMode === 'internal'` vs `'external'`)
  - `src/components/open-calls/ThreeStepApplicationForm.tsx` (Connected by `<TrajectoryArc />` step progress, validates with `storage.ts`, saves to `applicationRepository`, shows confirmation screen `"Application received. You've got this, and we've got you."`)
  - `src/components/open-calls/ExternalApplicationCard.tsx` (for external Google Forms mode)
  - `src/app/admin-preview/page.tsx` (Admin dashboard showing Phase 2 readiness)
  - `src/components/admin/AdminPreviewDashboard.tsx`
  - `src/components/admin/SubmissionsLedger.tsx` (live inspection of LocalStorage submissions)
  - `src/components/admin/SupabaseReadinessBanner.tsx` (clear indicator of Phase 2 DB schema & sync state)
  - Colocated tests: `src/components/open-calls/__tests__/OpenCalls.test.tsx`, `src/components/admin/__tests__/AdminPreview.test.tsx`

### Worker C: Projects Archive, Institutional Dossier, About & 2-Mode Contact
- **Target Files & Directories (STRICT):**
  - `src/app/projects/page.tsx` (Projects archive with status/action filters)
  - `src/app/projects/[slug]/page.tsx` (Project detail: `await params`, impact metrics, photo gallery grid, participant quotes, partner logos, grant badge `2026-1-HU01-KA152-YOU-000399636`)
  - `src/components/projects/ProjectsArchive.tsx`
  - `src/components/projects/ProjectDetailView.tsx`
  - `src/components/projects/PhotoGalleryGrid.tsx`
  - `src/app/partners/page.tsx` (Institutional Dossier written in Formal Mode)
  - `src/components/partners/InstitutionalDossier.tsx` (mandatory long boilerplate lead, quick-copy NGO credentials ledger)
  - `src/components/partners/OidCopyButton.tsx` (interactive button copying `E103XXXXX` with accessible toast `"OID copied"`)
  - `src/components/partners/PifDownloadButton.tsx` (downloads `/docs/orion-pif.pdf`)
  - `src/components/partners/PartnerInquiryForm.tsx` (validates & saves to `partnerInquiryRepository`)
  - `src/app/about/page.tsx` (About Orion origin story, mission, Debrecen roots)
  - `src/components/about/ConstellationLeadershipGrid.tsx` (the 5 leaders: Zeid, Roberta, Jázmin, Jordan, Ismail)
  - `src/app/contact/page.tsx` (Contact page with 2-mode toggle)
  - `src/components/contact/TwoModeContactForm.tsx` (`"I'm a young person applying"` vs `"I represent a partner organization"`, validates with `storage.ts`, saves to `contactRepository`)
  - `src/components/contact/ParticipantFaq.tsx`
  - Colocated tests: `src/components/projects/__tests__/Projects.test.tsx`, `src/components/partners/__tests__/Partners.test.tsx`, `src/components/contact/__tests__/Contact.test.tsx`

---

## 4. Verification Matrix

Before submitting deliverables, parallel workers must run and satisfy the full verification matrix:

| Check | Command | Passing Criteria |
| :--- | :--- | :--- |
| **Linting** | `npm run lint` | Exit code 0, no ESLint warnings/errors |
| **Type Check** | `npx tsc --noEmit` | Exit code 0, no TypeScript compilation errors |
| **Unit & Component Tests** | `npm test` | Exit code 0, all vitest assertions pass (`vitest run`) |
| **Production Build** | `npm run build` | Exit code 0, clean Next.js static page generation |

---

## 5. Execution Checklist

### Phase 1: Planning & Foundation (`@architect`)
- [x] Scaffold Next.js 16 (App Router) + TypeScript + Tailwind CSS in workspace root
- [x] Configure Vitest + `@vitejs/plugin-react` + `jsdom` + `@testing-library/react` + `@testing-library/jest-dom`
- [x] Configure Tailwind design tokens (`navy`, `offwhite`, `ember`, `nebula`, `orbit-dark`, `orbit-light`, `graticule`)
- [x] Configure Google fonts `Space Grotesk` & `Inter` in `layout.tsx` and `globals.css`
- [x] Implement locked typography utility classes (`.type-display`, `.type-h1`, `.type-h2`, `.type-h3`, `.type-body-lg`, `.type-body`, `.type-caption`, `.type-eyebrow`)
- [x] Implement layout grid helpers (`.container-orion`, `.grid-orion`) and keyframe animations (`animate-arc-trace`, `animate-star-pulse`)
- [x] Define shared TypeScript contracts in `src/types/orion.ts`
- [x] Seed realistic open calls, projects, team, org constants, and accessors in `src/lib/orionData.ts`
- [x] Implement SSR-safe storage repositories and pure validation helpers in `src/lib/storage.ts`
- [x] Build shared SVG motifs (`SparkleStar.tsx`, `TrajectoryArc.tsx`)
- [x] Build shared UI primitives (`Button.tsx`, `Eyebrow.tsx`, `StatusBadge.tsx`, `CoordinateStamp.tsx`, `Section.tsx`, `Container.tsx`)
- [x] Generate minimal valid PDF documents (`orion-pif.pdf` and 6 open call infopacks)
- [x] Verify foundation with `npm test`, `npx tsc --noEmit`, `npm run lint`, `npm run build` (All 4 pass with exit code 0)
- [x] Publish implementation blueprint `plans/orion-celestial-atlas.md`

### Phase 2: Parallel Implementation
- [x] **Worker A:** OrionLogo, CelestialAtlas, NodeInspector, MotionTrailDivider, Navbar, Footer, Home canvas
- [x] **Worker B:** Open Calls directory, single call view with hybrid form, Admin preview
- [x] **Worker C:** Projects portfolio, Institutional Dossier with OID copy & PIF, About team grid, 2-mode Contact

### Phase 3: Integration & Security Gate
- [x] Integrated test run (`npm test`) across all partitions (98/98 tests passing)
- [x] AST security analysis & WCAG audit (`@security-auditor` findings remediated)
- [x] Final production verification (`npm run build` — 21/21 static pages generated)
