# Architectural Blueprint: Orion Factual Audit, Asset Architecture & Project Gallery Showcase

**Document Status:** Final Draft  
**Target File:** `plans/factual-audit-and-gallery-showcase.md`  
**Author:** `@architect` (Systems & Frontend Architect)  
**Governing Standard:** `AGENTS.md` (Two-Pass Design & Architecture Loop)  

---

## Executive Summary

This blueprint delivers two mission-critical foundations for the Orion web platform:
1. **An Exhaustive Factual Audit & User Interview Protocol**: A forensic accounting of every single piece of content, statistic, quote, date, venue, reimbursement figure, email, OID, partner name, team biography, cited PDF (`/docs/orion-pif.pdf`, `/docs/infopacks/...`), and image (`/images/projects/...`) written or cited into the codebase without direct user validation.
2. **A Production-Grade Asset System & Project Gallery Showcase Architecture**:
   - A non-technical asset ingestion system (`PHOTO_AND_ASSET_GUIDE.md`) with a strict folder taxonomy under `public/photos/`, `public/images/projects/`, and `public/docs/`.
   - An interactive editorial documentary gallery showcase upgrading `PhotoGalleryGrid.tsx` with moment/category filtering (`All`, `Field Action`, `Workshops`, `Community & Culture`), a featured lead frame, and an accessible, keyboard-driven Lightbox Modal (`ArrowLeft`, `ArrowRight`, `Escape`, `tabular-nums` index counter, focus trapping, and documentary caption ledger).
   - Dedicated "Field Photography Showcase" sections integrated into `ProjectsArchive.tsx` and `ProjectDetailView.tsx`.
   - Backwards-compatible contract extensions in `src/types/orion.ts` and `src/lib/orionData.ts` ensuring all 112 existing test suites continue to pass without regression.

---

## PART I: Exhaustive Fact-Audit & Content Inventory

The following table documents every claim, figure, quote, name, and asset currently in the codebase that requires user confirmation, correction, or replacement with official documentation.

### 1. Institutional Identity & Accreditation Ledger

| Asset / Field | Current Code Value | Code Location | Status & Risk Analysis | Verification Question for User |
| :--- | :--- | :--- | :--- | :--- |
| **Legal Entity Name** | `Orion Ifjúsági Egyesület` | `src/lib/orionData.ts:12`, `Footer.tsx`, `InstitutionalDossier.tsx` | Assumed authentic Hungarian NGO name. | Is *Orion Ifjúsági Egyesület* the exact legal name registered with the Hungarian court (*Bíróság*)? |
| **Official Seat Address** | `Debrecen, Hungary` (`47.53° N, 21.62° E`) | `src/lib/orionData.ts:13-14` | City-level only; no street address or postal code. | What is the exact registered legal street address in Debrecen (for official PIF / grant forms)? |
| **Erasmus+ OID** | `E103XXXXX` | `src/lib/orionData.ts:15`, `InstitutionalDossier.tsx:56`, `Footer.tsx:136` | **Critical Placeholder**. Masked with `XXXXX`. | What is Orion's actual 8-character Organization ID (OID) registered in the European Commission portal? |
| **Accredited Grant Code** | `2026-1-HU01-KA152-YOU-000399636` | `src/lib/orionData.ts:16, 201`, `NextDeparture.tsx:71, 349`, `InstitutionalDossier.tsx:65` | Synthetic Hungarian NA grant number format. | Is `2026-1-HU01-KA152-YOU-000399636` your real Tempus grant agreement code, or a synthetic placeholder? |
| **Official Contact Email** | `hello@orion-youth.eu` | `TwoModeContactForm.tsx:474` | Unverified domain mailbox. | Is `hello@orion-youth.eu` active and monitored, or should incoming mail route to another inbox (e.g., Gmail)? |
| **Official PIF Document** | `/docs/orion-pif.pdf` | `public/docs/orion-pif.pdf` (645 bytes), `PifDownloadButton.tsx` | Minimal 1-line text placeholder PDF. | Please provide the official European Commission Partner Identification Form (PIF) PDF for upload. |
| **Core Boilerplates** | Short: *"Orion helps young people find direction..."*<br>Long: *"Orion is an international youth initiative..."* | `src/lib/orionData.ts:18-21` | Written based on the initial project brief. | Do these two boilerplates accurately express Orion's official charter, or are specific adjustments needed? |

---

### 2. Leadership Board & Core Team Roster

| Member Name | Current Title & Bio | Location in Code | Status & Evidence | Verification Question for User |
| :--- | :--- | :--- | :--- | :--- |
| **Zeid George Nicola Isaac** | *Founder & President*<br>"Visionary coordinator and youth development strategist based in Debrecen..." | `src/lib/orionData.ts:236-241`, `ConstellationLeadershipGrid.tsx` | Attributed real founder name; bio text is synthesized. | Is your official legal role *President* / *Elnök*? Does the bio accurately reflect your background? |
| **Roberta Szabó** | *Co-Founder & Board Member*<br>"Non-formal educator and community builder specializing in experiential learning..." | `src/lib/orionData.ts:243-248` | Synthesized name / bio. | Is Roberta Szabó an actual co-founder/board member? If yes, is the bio accurate? If not, who should be listed? |
| **Jázmin Szabó** | *Co-Founder & Operations Coordinator*<br>"Orchestrating seamless logistics, mobility budgets, participant care..." | `src/lib/orionData.ts:250-255` | Synthesized name / bio. | Is Jázmin Szabó an actual coordinator? Should this role/profile be kept, modified, or replaced? |
| **Jordan Smith** | *Co-Founder & International Outreach*<br>"Facilitator and cross-border partnership architect connecting Orion..." | `src/lib/orionData.ts:257-262` | Synthesized British/international name. | Is Jordan Smith a real member of Orion's leadership team, or a placeholder created in the brief? |
| **Ismail** | *Core Team & Mobility Coordinator*<br>"Dedicated on-the-ground project facilitator ensuring culturally safe spaces..." | `src/lib/orionData.ts:264-269` | **Incomplete Data**. Listed without a surname. | What is Ismail's full name, role, and biographical background? |
| **Team Portraits** | Initials / Monogram SVG Badges (`ZG`, `RS`, `JS`, etc.) | `ConstellationLeadershipGrid.tsx:65-85` | No real photo assets uploaded. | Please provide high-resolution headshots for the team members (to drop into `/public/photos/team/`). |

---

### 3. Project 1: ReForest (Completed Youth Exchange)

| Claim / Field | Current Code Value | Location in Code | Status & Analysis | Verification Question for User |
| :--- | :--- | :--- | :--- | :--- |
| **Mobility Dates** | `2026-10-02` – `2026-10-11` (October 2026) | `src/lib/orionData.ts:88-89, 138-139`, `ReForestStory.tsx:61` | Depicted as recently completed. | Did this exchange take place on these exact dates in October 2026? |
| **Location & Venues** | Lacu Roșu, Miercurea Ciuc & Băgaciu, Harghita, Romania (`46.78° N, 25.78° E`) | `src/lib/orionData.ts:86, 135` | Specific mountain towns cited. | Were Lacu Roșu, Miercurea Ciuc, and Băgaciu the actual operational venues? |
| **Hosting Partner** | *Asociația Agoje* (Romania) | `src/lib/orionData.ts:122, 141`, `ReForestStory.tsx:65` | Real Romanian youth NGO referenced. | Was *Asociația Agoje* the official sending or hosting partner for ReForest? |
| **Seedlings Planted** | `1,200+ native saplings` | `src/lib/orionData.ts:105, 148`, `ReForestStory.tsx:30, 143` | Specific environmental claim. | Is the figure of 1,200+ seedlings planted accurate, or what was the recorded planting count? |
| **Participants & Reach** | `36 young changemakers`, `5 nationalities`, `18 km alpine trails restored`, `3.4 hectares` | `src/lib/orionData.ts:149-152`, `ReForestStory.tsx:31-34, 143` | High-precision metrics. | Are these impact metrics (36 youth, 5 countries, 18 km trail, 3.4 hectares) verified by project reporting? |
| **Participant Quotes** | **Dóra Kovács** (Hungary): *"In the quiet mist of Lacu Roșu..."*<br>**Andrei Popescu** (Romania): *"ReForest showed me how non-formal education..."* | `src/lib/orionData.ts:170-183`, `ReForestStory.tsx:23-27` | Fictional participant quotes created for UX demo. | Are Dóra Kovács and Andrei Popescu real participants, or can you provide authentic participant testimonials? |
| **Google Forms Link** | `https://forms.gle/ReForest2026Archive` | `src/lib/orionData.ts:120` | Placeholder Google Form URL. | Should this link to an official report, video recap, or remain a closed archive notice? |
| **Photo Assets** | `reforest-1.jpg`, `reforest-2.jpg`, `reforest-3.jpg` | `public/images/projects/` (~1MB each) | AI-generated photorealistic landscape imagery. | Please provide real photographs taken during the ReForest exchange to replace these AI placeholders. |

---

### 4. Project 2: The Financial Blueprint (Hosted Youth Exchange)

| Claim / Field | Current Code Value | Location in Code | Status & Analysis | Verification Question for User |
| :--- | :--- | :--- | :--- | :--- |
| **Scheduled Dates** | `2027-03-15` – `2027-03-23` (March 2027) | `src/lib/orionData.ts:40-41, 197-198`, `NextDeparture.tsx:94` | Concrete future mobility calendar. | Are March 15–23, 2027 the official grant-approved dates for this hosted Youth Exchange? |
| **Venue / City** | Hungary, location TBA | `src/lib/orionData.ts:37-38, 194`, `NextDeparture.tsx:164` | Venue announced as pending. | Has the Hungarian host venue or municipality been selected (e.g. Debrecen, Hortobágy, Lake Tisza)? |
| **Target Audience** | Age `18–30`, residents of Hungary and European partner nations | `src/lib/orionData.ts:44, 71` | Standard Erasmus+ Youth Exchange parameters. | Is the target group age 18–30, and how many Hungarian participants will Orion select directly? |
| **6-Day Curriculum** | Day 1: Money Myths<br>Day 2: Cashflow Lab<br>Day 3: European Realities<br>Day 4: Street Challenge<br>Day 5: Ethical Banking<br>Day 6: Action Blueprint & Youthpass | `NextDeparture.tsx:16-53` | Detailed pedagogical workshop schedule. | Does this 6-day curriculum match the activity programme submitted in your grant application? |
| **Infopack Asset** | `/docs/infopacks/the-financial-blueprint.pdf` | `public/docs/infopacks/the-financial-blueprint.pdf` (643 bytes) | Minimal 1-line text placeholder PDF. | Do you have a draft or completed Infopack PDF for The Financial Blueprint? |
| **Lead Image** | `debrecen-1.jpg` | `public/images/projects/debrecen-1.jpg` (964 KB) | AI-generated image of a meeting table. | Please provide an authentic team photo or venue photograph from Debrecen. |

---

### 5. Orphaned Projects, Test Infopacks & Outdated Travel Data

| Asset / Dataset | Details Found in Codebase | Current Status | Recommended Action | Question for User |
| :--- | :--- | :--- | :--- | :--- |
| **Job Jam Exchange** | `jobjam-1.jpg`, `jobjam-2.jpg` (Sudislav nad Orlicí & Prague, Czechia · May 2026) | In `public/images/projects/`, but removed from `SEED_PROJECTS`. | Orphaned files. | Was *Job Jam* a real past exchange that Orion participated in? Should we restore it to the Projects Archive? |
| **Mock Infopacks** | `alpine-navigators-georgia.pdf`<br>`coastal-horizons-portugal.pdf`<br>`danube-currents-hungary.pdf`<br>`mediterranean-roots-greece.pdf`<br>`nordic-lights-estonia.pdf`<br>`urban-sparks-valencia.pdf` | Stored in `public/docs/infopacks/` (612–617 bytes each), referenced in unit tests. | Test-only mock artifacts. | Are any of these real partner calls (Cascais, Stepantsminda, Tartu, Valencia), or should we keep them isolated to test mocks? |
| **Distance Band Rates Discrepancy** | `CoverageExplainer.tsx`: €28/€56, €211/€285, €309/€417 (Current 2024–2027 Erasmus+ standard)<br>`SEED_OPEN_CALLS`: €180, €275 (Older 2020 rates) | Inconsistent reimbursement figures across components. | Unify `SEED_OPEN_CALLS` to current official Erasmus+ standard (€211/€309). | Confirm that your grant agreement utilizes standard 2024–2027 Erasmus+ distance bands. |

---

## PART II: Digital Asset Taxonomy & Guide Architecture

To ensure the Orion team can independently maintain photographs, partner logos, and official PDFs without technical hurdles, we establish a structured folder hierarchy and author a non-technical guide in `PHOTO_AND_ASSET_GUIDE.md`.

### 1. Structured Directory Taxonomy

```text
public/
├── docs/
│   ├── orion-pif.pdf                     # Official EC Partner Identification Form
│   ├── orion-statute.pdf                 # Registered NGO constitution/bylaws (optional)
│   └── infopacks/
│       ├── the-financial-blueprint.pdf   # Hosted Hungary Youth Exchange Infopack
│       └── reforest-transylvania.pdf     # Completed Romania Exchange archive pack
├── images/
│   └── projects/                         # Backwards-compatible legacy image root
│       ├── debrecen-1.jpg
│       ├── reforest-1.jpg
│       ├── reforest-2.jpg
│       └── reforest-3.jpg
└── photos/                               # New high-fidelity documentary taxonomy
    ├── projects/
    │   ├── reforest/
    │   │   ├── action-01.jpg             # Planting, stream survey, physical activity
    │   │   ├── workshop-01.jpg           # Indoor/outdoor reflection circles, simulation
    │   │   └── community-01.jpg          # Campfires, group cohesion, intercultural meals
    │   └── the-financial-blueprint/
    │       ├── debrief-01.jpg
    │       └── venue-01.jpg
    ├── team/
    │   ├── zeid-isaac.jpg                # 1:1 ratio square portraits
    │   ├── roberta-szabo.jpg
    │   ├── jazmin-szabo.jpg
    │   ├── jordan-smith.jpg
    │   └── ismail.jpg
    └── partners/
        ├── agoje-ro.svg                  # Vector SVG partner wordmarks
        └── tempus-hu.svg
```

### 2. Asset Standard Specifications

| Asset Category | Target Dimensions | Aspect Ratio | Maximum File Size | Color Profile & Format |
| :--- | :--- | :--- | :--- | :--- |
| **Hero & Expedition Lead** | `2400 × 1028 px` or `1920 × 820 px` | `21:9` Ultra-wide | `< 450 KB` | sRGB, WebP / Progressive JPEG (82% quality) |
| **Editorial Gallery Showcase** | `1800 × 1200 px` | `3:2` Editorial standard | `< 350 KB` | sRGB, WebP / Progressive JPEG |
| **Grid Thumbnails** | `1200 × 750 px` | `16:10` Standard | `< 250 KB` | sRGB, WebP / Progressive JPEG |
| **Team Leadership Portraits** | `800 × 800 px` | `1:1` Square | `< 180 KB` | sRGB, WebP / Progressive JPEG |
| **Official Documents / PDFs** | Standard A4 / Letter | N/A | `< 8 MB` | Flattened PDF/A, vector text |

### 3. Non-Technical Staff Workflow (`PHOTO_AND_ASSET_GUIDE.md`)

The markdown document `PHOTO_AND_ASSET_GUIDE.md` will be placed in the project root containing:
1. **How to Drop in a Real Photo in 3 Steps**:
   - Step 1: Export photo from camera/phone in landscape orientation.
   - Step 2: Use free tool (e.g. Squoosh.app or TinyJPG) to resize width to `1800px` and compress below `350KB`.
   - Step 3: Copy file to `public/photos/projects/{project-slug}/{moment-name}.jpg`.
2. **How to Register the Photo in Code**:
   - Open `src/lib/orionData.ts`.
   - Add entry to the project's `gallery: [...]` array with caption, category, date, and photographer credit.
3. **How to Replace Official PDFs**:
   - Save the official PIF as `orion-pif.pdf` into `public/docs/`.
   - The download buttons automatically serve the new file immediately with no code edits required.

---

## PART III: Two-Pass Design & Architecture Loop (AGENTS.md Protocol)

### Pass 1 — Codebase Reconnaissance & Design Brief

#### Token Audit & Font Variables
- **Font Display**: Space Grotesk via `--font-space-grotesk` (`var(--font-display)`), fallback Sora, system-ui.
- **Font Body**: Inter via `--font-inter` (`var(--font-body)`), fallback system-ui.
- **Strict Color Tokens**:
  - Deep Observatory Night: `#0B132B` (`--color-navy`)
  - Elevated Instrument Surface: `#111D3B` (`--color-nebula`)
  - Warm Alabaster Paper: `#F6F4EF` (`--color-offwhite`)
  - Secondary Archival Paper: `#ECE8DF` (`--color-paper-warm`)
  - Manifesto Archival Surface: `#EAE6DC` (`--color-paper-manifesto`)
  - Signal Flare Vermilion: `#E35619` (`--color-ember`)
  - Ionosphere Slate Hairlines: `#1D356B` (`--color-slate-orbit`)
  - Day structural hairlines: `rgba(11, 19, 43, 0.10)`
  - Night structural hairlines: `rgba(248, 249, 250, 0.14)`

#### Gallery Typographic Scale & Lockups
- **Showcase Section Heading**: `type-h2` (`32px / 26px`), weight 600, sentence case (`Field photography showcase`).
- **Section Kicker**: `type-eyebrow` (`12px`, letter-spacing `0.08em`), sentence-case telemetry format: `Expedition field journal · 47.53° N, 21.62° E`.
- **Counter & Metadata Figures**: Strict `tabular-nums` on index (`01 / 06`), dates (`10 Oct 2026`), and coordinates (`46.78° N, 25.78° E`).
- **Documentary Caption**: `type-body` (`14px / 16px`), max width `<65ch`, accompanied by photographer metadata badge (`Photo: Orion Archive`).

#### ASCII Layout Wireframes

##### Wireframe A: Editorial Gallery Showcase Grid (`PhotoGalleryGrid.tsx`)

```text
+---------------------------------------------------------------------------------------------------+
| [FILTER BAR: Sticky / Alabaster Surface #F6F4EF]                                                  |
|  [● All (6)]   [Field Action (2)]   [Workshops (2)]   [Community & Culture (2)]    Index: 01 / 06 |
+---------------------------------------------------------------------------------------------------+
| [FEATURED LEAD FRAME: 8 Columns]                       | [SECONDARY COLUMN: 4 Columns]            |
| +----------------------------------------------------+ | +--------------------------------------+ |
| |                                                    | | |                                      | |
| |                                                    | | |        MOMENT 02 (Aspect 16:10)      | |
| |                                                    | | |                                      | |
| |               FEATURED HERO FRAME                  | | +--------------------------------------+ |
| |                  (Aspect 16:10)                    | |  Caption: Debrief circle unpacking...  | |
| |                                                    | | +--------------------------------------+ |
| |                                                    | | |                                      | |
| | [⤢ Expand (Enter/Click)]                           | | |        MOMENT 03 (Aspect 16:10)      | |
| +----------------------------------------------------+ | |                                      | |
| | 46.78° N, 25.78° E | Oct 2026 | Photo: Orion Team  | | +--------------------------------------+ |
| | Caption: Community tree planting above Lacu Roșu   | |  Caption: Ridge trail navigation...    | |
+---------------------------------------------------------------------------------------------------+
| [SECONDARY ASYMMETRIC GRID: 3 Columns x 4 Cols each]                                              |
| +-------------------------+ +-------------------------+ +---------------------------------------+ |
| |       MOMENT 04         | |       MOMENT 05         | |               MOMENT 06               | |
| |     (Aspect 3:2)        | |     (Aspect 3:2)        | |             (Aspect 3:2)              | |
| | Caption: Workshop deb...| | Caption: Campfire cir...| | Caption: Final charter signatures...  | |
| +-------------------------+ +-------------------------+ +---------------------------------------+ |
+---------------------------------------------------------------------------------------------------+
```

##### Wireframe B: Accessible Documentary Lightbox Modal

```text
+---------------------------------------------------------------------------------------------------+
| [LIGHTBOX MODAL: Full viewport backdrop rgba(11,19,43,0.96) | role="dialog" | aria-modal="true"]  |
|                                                                                                   |
|  [Orion Field Archive — Lacu Roșu, Romania]                      [ 02 / 06 ]    [✕ Close (Esc)]   |
|  ───────────────────────────────────────────────────────────────────────────────────────────────  |
|                                                                                                   |
|    [◄ Prev (LeftArrow)]                                                   [► Next (RightArrow)]   |
|                                                                                                   |
|                               +-----------------------------------+                               |
|                               |                                   |                               |
|                               |                                   |                               |
|                               |      FULL RESOLUTION FRAME        |                               |
|                               |         (Max 85vh / 80vw)         |                               |
|                               |                                   |                               |
|                               |                                   |                               |
|                               +-----------------------------------+                               |
|                                                                                                   |
|  ───────────────────────────────────────────────────────────────────────────────────────────────  |
|  [CAPTION & DOCUMENTARY TELEMETRY LEDGER]                                                         |
|  Category: [ Field Action ]   Location: [ 46.78° N, 25.78° E ]   Date: [ 04 Oct 2026 ]            |
|  "Youth participants planting native fir and beech saplings across the upper Harghita ridgeline." |
|  Credit: Recorded by Orion Youth Delegation (CC BY-SA 4.0)                                        |
+---------------------------------------------------------------------------------------------------+
```

---

### Pass 2 — Anti-Cliché Self-Critique Gate

In accordance with Section 1.2 of `AGENTS.md`, this design was audited against the Banned AI Tells list prior to finalizing specifications.

| Potential AI Cliché / Banned Tell | Audit Finding & Revision Rationale | Concrete Design Rule Enforced |
| :--- | :--- | :--- |
| **Single-word orange color spans** | Banned: `Field Photography <span class="text-[#e35619]">Showcase</span>`. | Heading is solid `#0B132B` with typographic contrast achieved via weight and scale, never random single-word colored spans. |
| **Tracked-out ALL-CAPS eyebrow labels** | Banned: `PHOTO DOCUMENTATION ARCHIVE`. | Replaced with sentence-case telemetry kicker: `Expedition field journal · 47.53° N, 21.62° E` with `tabular-nums`. |
| **Middle-dot meta strings** | Banned: `Field Action · Romania · 2026 · Orion`. | Replaced with structured definition list `<dl>` or separate discrete metadata pills separated by clean 1px rules. |
| **Truncated `line-clamp-2` captions** | Banned: cutting off documentary captions mid-sentence with ellipsis. | Captions are budgeted for complete thought presentation (`max-w-[65ch]`) without `line-clamp` on desktop or modal readouts. |
| **Generic SaaS card grid** | Banned: 3 identical rounded cards with grey drop shadows and float-up scroll animations. | Architectural grid with sharp 1px hairline framing (`border-[rgba(11,19,43,0.12)]`), asymmetric 8/4 split, and zero floating drop shadows. |
| **Chanel Rule application** | Removed redundant decorative star icons in every image corner. | Reserved the single Ember Orange highlight strictly for the active category filter pill or active modal navigation button. |

---

## PART IV: Component Architecture & Interface Contracts

### 1. Extended TypeScript Contracts (`src/types/orion.ts`)

To support documentary curation while maintaining 100% backwards compatibility with existing components and test fixtures:

```typescript
export type GalleryCategory =
  | 'All'
  | 'Field Action'
  | 'Workshops'
  | 'Community & Culture';

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  // Optional extensions (100% backwards-compatible)
  category?: 'Field Action' | 'Workshops' | 'Community & Culture' | string;
  date?: string;
  location?: string;
  photographer?: string;
  featured?: boolean;
}
```

### 2. Interactive PhotoGalleryGrid Specifications (`src/components/projects/PhotoGalleryGrid.tsx`)

#### Component Props Contract
```typescript
export interface PhotoGalleryGridProps {
  gallery: GalleryItem[];
  title?: string;
  initialCategory?: GalleryCategory;
  showCategoryFilters?: boolean;
  className?: string;
}
```

#### State & Interaction Behaviors
1. **Category Filtering**:
   - Computes unique categories present in the `gallery` array dynamically.
   - Defaults to `'All'`. Displays pill buttons with live count badges (e.g. `All (6)`, `Field Action (2)`).
   - Clicking a filter pill filters the grid smoothly with accessible `aria-pressed` states.
2. **Featured Lead Frame**:
   - The first item in the filtered set (or an item with `featured: true`) occupies an 8-column wide focal frame with high-resolution presentation and documentary telemetry badge.
   - The remaining items flow into an asymmetric 4-column stack and a secondary 3-column row.
3. **Interactive Lightbox Modal**:
   - State: `activeLightboxIndex: number | null`.
   - Trigger: Clicking any image or pressing `Enter` on its focused figure.
   - Modal Semantics: Container rendered as `<div role="dialog" aria-modal="true" aria-label="Photo Lightbox">`.
   - Keyboard Navigation:
     - `ArrowLeft`: Navigate to previous image (loops to end if at start).
     - `ArrowRight`: Navigate to next image (loops to start if at end).
     - `Escape`: Closes modal and restores focus to triggering element.
   - Focus Trapping: Ensures keyboard `Tab` cycles only between previous button, next button, and close button while modal is open.
   - Body Scroll Lock: Sets `document.body.style.overflow = 'hidden'` while modal is mounted.

### 3. Archive Integration (`src/components/projects/ProjectsArchive.tsx`)

A dedicated "Field Photography Showcase" section is introduced below the project listing:
- Curates photos from across all Orion projects (`ReForest`, `The Financial Blueprint`, and community workshops).
- Features category pills allowing visitors to inspect moments by theme regardless of project slug.
- Provides an immediate visual testimonial of Erasmus+ youth mobilities in action.

### 4. Detail View Integration (`src/components/projects/ProjectDetailView.tsx`)

Upgrades the existing static `PhotoGalleryGrid` in the "Field documentation" section into the interactive editorial showcase:
- Connects all project gallery items (including the lead hero photo).
- Enables modal zoom and keyboard exploration for every documentary picture.

---

## PART V: Verification Strategy & Test Matrix

### 1. Existing Test Compatibility (Zero Regression)
All 13 existing vitest test files (112 tests) must pass with zero errors:
- `npm test` verification.
- Specifically verify `src/components/projects/__tests__/Projects.test.tsx` line 140 (`PhotoGalleryGrid renders images and figcaptions`) remains fully valid without modification.

### 2. New Test Suite Specifications (`src/components/projects/__tests__/PhotoGalleryShowcase.test.tsx`)
A new test file must verify:
1. **Filtering**: Clicking category pills filters images correctly and updates the count readout.
2. **Lightbox Trigger**: Clicking a gallery image opens the lightbox modal with `role="dialog"` and displays `01 / X`.
3. **Keyboard Controls**: Pressing `ArrowRight` advances to `02 / X`, pressing `ArrowLeft` reverses to `01 / X`, pressing `Escape` closes the lightbox.
4. **Accessibility**: All buttons have accessible labels, images have alt text, and modal trap focus attributes are set.

### 3. Live DOM Verification & Chanel Rule Audit
1. **Viewport checks**:
   - `375px` (Mobile): Gallery collapses into a single-column documentary stream; category filters scroll horizontally; modal fits within screen bounds.
   - `768px` (Tablet): 2-column asymmetric layout with legible captions.
   - `1440px` (Desktop): Full 12-column architectural split (8 lead / 4 secondary).
2. **Chanel Rule Checklist**:
   - Checked each photo container: zero double borders, zero drop shadows.
   - Ensured Ember Orange is used ONLY for the active category pill beacon and focus rings.

---

## PART VI: Subagent Implementation Partitions

Following the Antigravity Multi-Agent Orchestration Protocol, implementation is partitioned across specialized subagents:

```text
[Phase 1: Planning & Blueprint] ────────► @architect (COMPLETE)
                                              │
                                              ▼
                                plans/factual-audit-and-gallery-showcase.md
                                              │
    ┌─────────────────────────────────────────┴─────────────────────────────────────────┐
    ▼                                                                                   ▼
[Partition A: Asset System & Types]                                 [Partition B: Interactive Showcase]
@engineer                                                           @engineer
- Create PHOTO_AND_ASSET_GUIDE.md                                   - Upgrade PhotoGalleryGrid.tsx (filters + lightbox)
- Create public/photos/ taxonomy folders                            - Integrate into ProjectsArchive.tsx
- Extend src/types/orion.ts (GalleryItem)                           - Integrate into ProjectDetailView.tsx
- Enrich SEED_PROJECTS in src/lib/orionData.ts                      - Author PhotoGalleryShowcase.test.tsx
    │                                                                                   │
    └─────────────────────────────────────────┬─────────────────────────────────────────┘
                                              │
                                              ▼
                                  [Test Run: npm test (112+ tests)]
                                              │
                                              ▼
                                  [Security & Code Quality Gate]
```

---

## Appendix: Immediate User Interview Questionnaire

*Copy and send this questionnaire to the user to resolve all factual uncertainties identified in the audit:*

1. **OID & Legal Entity**: What is Orion's official 8-character Erasmus+ Organization ID (OID) and exact registered seat address in Debrecen?
2. **Grant Reference**: Is `2026-1-HU01-KA152-YOU-000399636` your real Tempus Public Foundation grant number for The Financial Blueprint?
3. **Official Email**: Should public inquiries route to `hello@orion-youth.eu` or another email address?
4. **Leadership Board**: Can you confirm the full names and roles of your board members (especially confirming Roberta Szabó, Jázmin Szabó, Jordan Smith, and Ismail's full name)?
5. **ReForest Project**: Did ReForest take place in October 2026 in Lacu Roșu with Asociația Agoje, and do you have real photos and quotes to replace our AI placeholders?
6. **The Financial Blueprint**: Is March 15–23, 2027 the exact grant date, and has a specific Hungarian venue been chosen?
7. **Official Documents**: Please provide your official Partner Identification Form (PIF) PDF and any Infopack PDFs to place into `/public/docs/`.
