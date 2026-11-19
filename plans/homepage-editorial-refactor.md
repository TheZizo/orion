# Architectural Blueprint: Homepage Editorial Refactor & Brand Token Alignment

**Document Status:** Working Architectural Blueprint & Design Brief  
**Target File:** `plans/homepage-editorial-refactor.md`  
**Author:** `@architect` (Systems & Frontend Architect)  
**Governing Standard:** `AGENTS.md` (Two-Pass Design & Architecture Loop)  

---

## 1. Executive Summary & Refactoring Objectives

This architectural blueprint executes the user's exact specification to elevate the Orion homepage into a calm, authoritative, editorial experience. It resolves four critical design tensions:

1. **Global Brand Token Consolidation**:
   - Eliminates all legacy warm alabaster/manifesto tints (`#F6F4EF`, `#ECE8DF`, `#EAE6DC`) across `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `MotionTrailDivider.tsx`, and all `src/components/home/*` components.
   - Enforces Orion's locked **Daylight Off-White (`#F8F9FA`)** as the universal daylight background for `<body>` and all daytime sections.
   - Sets elevated surfaces to pure **White (`#FFFFFF`)** with hairline **`1px` borders (`rgba(11, 19, 43, 0.12)`)**.
   - Updates the bottom fill path of the 56px SVG horizon rim divider (`MotionTrailDivider.tsx`) to `fill="#F8F9FA"`.
   - In `HeroSection.tsx`: refactors `<span className="italic font-serif font-normal text-[#E35619]">bigger.</span>` to `<span className="text-[#e35619]">bigger.</span>` so it remains in Space Grotesk 700 Bold without font or weight shifts.

2. **Re-Architected Post-Hero Narrative Hierarchy in `src/app/page.tsx`**:
   The new sequence transitions from Midnight Navy night sky into concrete expedition proof, structural clarity, upcoming departure, application mechanics, philosophy, and institutional partnership:
   - **Hero Section**: `HeroSection` (Midnight Navy `#0B132B`, 3D Celestial Orrery, Space Grotesk bold headline)
   - **Planetary Horizon Rim**: `MotionTrailDivider` (56px SVG arc cut into `#F8F9FA`)
   - **Section 1 (Position #1 Post-Hero)**: `ReForestStory` (Full-bleed expedition field report, Kemal quote, 4 verified impact metrics, Before/After drawer, verified `/reforest-2.jpg` asset)
   - **Section 2**: `ErasmusHorizonSlider` (Zero-widget 12-column architectural comparison ledger)
   - **Section 3**: `NextDeparture` + `DailyExchangeAnatomy` (Unified live departure and 24-hour non-formal learning rhythm)
   - **Section 4**: `HowToApply` (Static 3-step trajectory, zero tab clicks, sample motivation quote permanently inside Step 2)
   - **Section 5**: `Beliefs` ("What We Believe" on `#F8F9FA` with elevated `bg-white` cells, zero Roman numerals)
   - **Section 6**: `PartnerBand` (Outer section on `bg-[#F8F9FA] py-20 md:py-24` wrapping a framed `bg-[#0B132B]` container, preventing bleed into the `#0B132B` footer)
   - **Footer**: `Footer` (Midnight Navy `#0B132B`)

3. **Public Asset Hygiene**:
   - Copies `public/images/projects/reforest-2.jpg` to `public/reforest-2.jpg` so both `/reforest-2.jpg` and `/images/projects/reforest-2.jpg` resolve cleanly without 404 errors.

---

## 2. Pass 1 — Codebase Reconnaissance & Design Brief

### 2.1 Unified Palette Specification
| Token Name | Hex / CSS Value | Semantic Role in Homepage |
| :--- | :--- | :--- |
| **Night Sky Canvas** | `#0B132B` | `HeroSection`, `Footer`, and framed inner dock of `PartnerBand`. |
| **Daylight Canvas** | `#F8F9FA` | Universal `<body>` background, daylight section wrappers, and `MotionTrailDivider` fill. |
| **Elevated Paper Surface** | `#FFFFFF` | Cards, comparison table cells, step containers, and belief blocks. |
| **Architectural Hairlines**| `rgba(11, 19, 43, 0.12)` | Crisp `1px` structural borders on all daylight surfaces. |
| **Night Dividers** | `rgba(248, 249, 250, 0.14)` | Hairline dividers inside dark sections (`HeroSection`, `PartnerBand`). |
| **Ember Beacon** | `#E35619` | Focused active markers, horizon star, and keyword `bigger.` in hero. |
| **Text Primary** | `#0B132B` | Headings and primary copy on daylight surfaces. |
| **Text Secondary** | `rgba(11, 19, 43, 0.76)` | Explanatory leads, definitions, and field notes. |

### 2.2 Purge Targets
The following deprecated hex codes are completely removed from `src/app/` and `src/components/home/`:
- `#F6F4EF` (Old Alabaster) → replaced with `#F8F9FA`.
- `#ECE8DF` (Old Archival Bento Paper) → replaced with `#FFFFFF` or `#F8F9FA`.
- `#EAE6DC` (Old Manifesto Paper) → replaced with `#F8F9FA` and `#FFFFFF`.

---

## 3. Section Architecture & Wireframes

### 3.1 ASCII Layout Wireframe: The Refactored Homepage Flow

```text
====================================================================================================
 [HERO: #0B132B Midnight Navy Canvas]
  Left 5 cols: Telemetry pill ("Orion Fiatalok Informális Csoportja")
               H1: Spark something <span class="text-[#e35619]">bigger.</span> (Space Grotesk 700 Bold)
               Verbatim lead copy (max-w-[65ch])
               Dual CTAs: "Explore open calls" (white) + "Partner dossier" (outline)
  Right 7 cols: 3D Celestial Orrery Sculpture & Sleek Glass Dock
----------------------------------------------------------------------------------------------------
 [DIVIDER: MotionTrailDivider 56px SVG Horizon Rim]
  Arc cut fill="#F8F9FA" with 1px stroke rgba(11,19,43,0.12) and Ember Orange star at (1254, 25)
====================================================================================================
 [SECTION 1: ReForestStory — Position #1 Post-Hero (#0B132B / Full-Bleed Photo)]
  Full-bleed photograph (/images/projects/reforest-2.jpg and /reforest-2.jpg)
  Telemetry strip: "October 11–22, 2026 · Lacu Roșu Mountain Lodge, Harghita, Romania"
  H2: "ReForest — Erasmus+ Youth Exchange"
  Kemal quote: "ReForest showed me how non-formal education makes ecological theory real..."
  4 Impact Metrics: 1,200+ Seedlings | 36 Changemakers | 5 Nationalities | 18 km Alpine trails
  Interactive Before/After Field Impact Drawer
----------------------------------------------------------------------------------------------------
 [SECTION 2: ErasmusHorizonSlider — Zero-Widget 12-Column Architectural Comparison (#F8F9FA)]
  Kicker: Demystifying Erasmus+
  H2: Two European paths. One is open to everyone.
  Lead: Hear the word "Erasmus" and picture a 6-month university term with high rent? That is KA131...
  
  +-- 12-COLUMN ARCHITECTURAL COMPARISON MATRIX ---------------------------------------------------+
  | DIMENSION (3 cols)        | ORION YOUTH EXCHANGE (KA152) (4.5 cols) | UNIVERSITY KA131 (4.5 cols) |
  |───────────────────────────|─────────────────────────────────────────|─────────────────────────────|
  | Duration & Commitment     | 7 to 12 days (compact sprint)           | 5 to 10 months              |
  | Eligibility               | Anyone aged 18–30 (no uni status)       | Enrolled students only      |
  | Costs & Lodging           | 100% covered by Erasmus+ grant          | Partial monthly stipend     |
  | Daily Learning Method     | Non-formal experiential labs            | Academic coursework & exams |
  | Travel Support            | Group travel + dedicated leader         | Solo relocation             |
  | Formal Recognition        | European Youthpass (8 competences)      | University ECTS credits     |
  +-----------------------------------------------------------------------------------------------+
----------------------------------------------------------------------------------------------------
 [SECTION 3: NextDeparture & DailyExchangeAnatomy — Unified Live Exchange (#F8F9FA)]
  Part A: The Financial Blueprint (March 2027, Location TBA, Hungary, 32 youth + 8 leaders)
          Interactive 6-day curriculum preview + 4-step preparation roadmap
  Part B: A Day on an Exchange (08:30 Energizer -> 10:00 Simulation -> 15:00 Challenge -> 20:00 Night)
          Tabbed daily rhythm scrubber showcasing non-formal education methodology
----------------------------------------------------------------------------------------------------
 [SECTION 4: HowToApply — Static 3-Step Trajectory (#F8F9FA)]
  H2: Here's how to apply, 3 steps, 10 minutes.
  Static TrajectoryArc SVG connecting 3 step cards on #FFFFFF with border rgba(11,19,43,0.12):
  +-------------------------+ +--------------------------------+ +-------------------------+
  | Step 1: About you       | | Step 2: Your motivation        | | Step 3: Travel & confirm|
  | 2 mins                  | | 5 mins                         | | 3 mins                  |
  | Basic contact details   | | Three honest sentences.        | | Group leader pairing &  |
  | & language comfort.     | | [Permanently Embedded Sample]: | | green train booking.    |
  |                         | | "I am starting my first job... | |                         |
  |                         | | savings system..."             | |                         |
  +-------------------------+ +--------------------------------+ +-------------------------+
----------------------------------------------------------------------------------------------------
 [SECTION 5: Beliefs — What We Believe (#F8F9FA Canvas with #FFFFFF Elevated Cells)]
  H2: What We Believe
  Asymmetric 2x2 Architectural Grid (7/5, 5/7 split) — NO Roman numerals (I, II, III, IV):
  +--------------------------------------------------------+---------------------------------------+
  | [Cell 1: bg-white, 7 cols]                             | [Cell 2: bg-white, 5 cols]            |
  | SparkleStar                                            | SparkleStar                           |
  | Not a program, but memories, growth, and human conn.   | A guide that helps you find direction.|
  | We design youth mobilities that bypass noise...        | Whether first time or fifth project...|
  +--------------------------------------------------------+---------------------------------------+
  | [Cell 3: bg-white, 5 cols]                             | [Cell 4: bg-white, 7 cols]            |
  | SparkleStar                                            | SparkleStar                           |
  | A constellation of young changemakers.                 | Real impact, backed by proof.         |
  | No lone travelers here. Every exchange connects...     | Backed by accredited Erasmus+ KA152...|
  +--------------------------------------------------------+---------------------------------------+
----------------------------------------------------------------------------------------------------
 [SECTION 6: PartnerBand — Framed Island Dock on #F8F9FA Canvas]
  Outer Section: bg-[#F8F9FA] py-20 md:py-24
  Inner Container: container-orion
  Framed Island Box: bg-[#0B132B] text-[#F8F9FA] p-8 sm:p-12 border border-[#0B132B] space-y-8
  - H2: For partner organisations
  - Lead: Orion Fiatalok Informális Csoportja collaborates with European youth NGOs...
  - 2-Column Dock: Direct Email (zeid@orionyouth.eu) + Accredited Grant (2026-1-HU01-KA152-YOU-000399636)
  - CTAs: "Send a partnership inquiry" (white) + "Copy email"
  (Zero bleed into Footer because 80px of #F8F9FA daylight cushions the bottom!)
----------------------------------------------------------------------------------------------------
 [FOOTER: #0B132B Midnight Navy Canvas]
  Clean institutional footer with legal entity, grant attribution, and sitemap.
====================================================================================================
```

---

## 4. Pass 2 — Anti-Cliché Self-Critique Gate

| Banned Tell / Cliché | Audit in Plan | Architectural Solution |
| :--- | :--- | :--- |
| **Italic Serif Shift in Headline** | Hero headline previously had `italic font-serif font-normal` on `bigger.` | **PURGED**. In `HeroSection.tsx`, `<span className="text-[#e35619]">bigger.</span>` is locked in Space Grotesk 700 Bold, matching the primary headline weight and geometry. |
| **Gimmicky Slider Widget** | `ErasmusHorizonSlider.tsx` had an `<input type="range">` with scrubbed text interpolations like `~3 weeks` | **PURGED**. Replaced with a **Zero-Widget 12-Column Architectural Comparison Matrix**. Both paths are displayed side-by-side with crisp comparative rows and zero widget toys. |
| **Interactive Step Clicking for Core Copy** | `HowToApply.tsx` hid Step 2's sample motivation behind an active tab click | **PURGED**. Replaced with a **Static 3-Step Trajectory**. Step 2 permanently embeds the sample motivation statement inside its card. Zero state required. |
| **Roman Numeral Ornamentation** | `Beliefs.tsx` displayed `I, II, III, IV` in pillar cards | **PURGED**. Roman numerals removed. Clean editorial headings, SparkleStar motif, and elevated white cells command full attention. |
| **Dark Section Bleeding into Footer** | `PartnerBand.tsx` was full-bleed `bg-[#0B132B]`, merging into the `#0B132B` footer | **PURGED**. Outer section is `bg-[#F8F9FA] py-20 md:py-24`, framing the dark partnership box as an intentional architectural island. |
| **Warm Paper Token Clutter** | Disparate hex codes `#F6F4EF`, `#ECE8DF`, and `#EAE6DC` | **PURGED**. Consolidated onto unified `#F8F9FA` with elevated `#FFFFFF` cells and `border-[rgba(11,19,43,0.12)]`. |

---

## 5. Subagent Implementation Partitions (Clean & Non-Overlapping)

To execute Phase 2 concurrently with **zero merge conflicts**, the work is partitioned into three disjoint file sets:

```text
[Phase 1: Architecture Blueprint] ────► @architect (COMPLETE: plans/homepage-editorial-refactor.md)
                                            │
                                            ▼
        ┌───────────────────────────────────┼───────────────────────────────────┐
        ▼                                   ▼                                   ▼
 [Partition A: Foundations & Hero]  [Partition B: Horizon & Departure]  [Partition C: Apply, Beliefs & Band]
 @engineer-A                        @engineer-B                        @engineer-C
 Target Files:                      Target Files:                      Target Files:
 - src/app/layout.tsx               - src/components/home/             - src/components/home/
 - src/app/globals.css                  ErasmusHorizonSlider.tsx           HowToApply.tsx
 - src/components/motifs/           - src/components/home/             - src/components/home/
     MotionTrailDivider.tsx             NextDeparture.tsx                  Beliefs.tsx
 - src/components/home/             - src/components/home/             - src/components/home/
     HeroSection.tsx                    DailyExchangeAnatomy.tsx           PartnerBand.tsx
 - public/reforest-2.jpg (copy)     - src/components/home/__tests__/   - src/components/home/__tests__/
 - src/components/home/                 ErasmusHorizonSlider.test.tsx      Home.test.tsx
     ReForestStory.tsx              - src/components/home/__tests__/
 - src/app/page.tsx                     DailyExchangeAnatomy.test.tsx
```

### Partition A Tasks (`@engineer-A`):
1. **`src/app/layout.tsx`**:
   - Change `<body>` class from `bg-[#F6F4EF]` to `bg-[#F8F9FA] text-[#0B132B] font-body antialiased`.
2. **`src/app/globals.css`**:
   - Update `--color-offwhite: #F8F9FA;`.
   - Update `body { background-color: #F8F9FA; }`.
   - Remove/replace `--color-paper-warm: #ECE8DF;` and `--color-paper-manifesto: #EAE6DC;` with `#FFFFFF` or remove if unused.
3. **`src/components/motifs/MotionTrailDivider.tsx`**:
   - Update bottom daylight arc cut path from `fill="#F6F4EF"` to `fill="#F8F9FA"`.
4. **`src/components/home/HeroSection.tsx`**:
   - Change `<span className="italic font-serif font-normal text-[#E35619]">bigger.</span>` to `<span className="text-[#e35619]">bigger.</span>`.
   - Update telemetry badge text color from `text-[#F6F4EF]` to `text-[#F8F9FA]`.
5. **Asset Copy (`public/reforest-2.jpg`)**:
   - Copy `public/images/projects/reforest-2.jpg` to `public/reforest-2.jpg` via PowerShell (`Copy-Item -Path "public\images\projects\reforest-2.jpg" -Destination "public\reforest-2.jpg"`).
6. **`src/components/home/ReForestStory.tsx`**:
   - Ensure image source resolves properly to `/images/projects/reforest-2.jpg` (or `/reforest-2.jpg`).
   - Verify zero occurrences of legacy tokens.
7. **`src/app/page.tsx`**:
   - Reorder homepage sections to the exact specified post-hero order:
     1. `<HeroSection />`
     2. `<MotionTrailDivider from="navy" to="offwhite" height={56} />`
     3. `<ReForestStory />` (Position #1 post-hero)
     4. `<ErasmusHorizonSlider />`
     5. `<NextDeparture />` (unified with `<DailyExchangeAnatomy />`)
     6. `<HowToApply />`
     7. `<Beliefs />`
     8. `<PartnerBand />`

---

### Partition B Tasks (`@engineer-B`):
1. **`src/components/home/ErasmusHorizonSlider.tsx`**:
   - Refactor into a **Zero-Widget 12-Column Architectural Comparison**:
     - Remove `<input type="range">`, scrubber dragging, and interpolated duration text (`~3 weeks`, etc.).
     - Display a calm, permanent 12-column architectural matrix:
       - Header: Sentence-case kicker `Demystifying Erasmus+`, H2 `Two European paths. One is open to everyone.`, descriptive lead.
       - Desktop: 12-column comparison table/matrix on `bg-[#F8F9FA]`. Dimensions in Column 1 (3 cols), Orion Youth Exchange KA152 in Column 2 (4.5 cols, `#FFFFFF` surface with Ember beacon), University Semester KA131 in Column 3 (4.5 cols, `#FFFFFF` surface).
       - Mobile: Accessible 2-pill toggle or stacked cards for small screens.
     - Purge all instances of `#F6F4EF`, `#ECE8DF`, `#EAE6DC`. Use `bg-[#F8F9FA]`, `bg-white`, and `border-[rgba(11,19,43,0.12)]`.
2. **`src/components/home/NextDeparture.tsx`**:
   - Purge all instances of `#F6F4EF`, `#ECE8DF`, `#EAE6DC` → replace with `bg-[#F8F9FA]`, `bg-white`, `border-[rgba(11,19,43,0.12)]`.
   - Harmonize with `DailyExchangeAnatomy` so they form a unified Live Exchange narrative section.
3. **`src/components/home/DailyExchangeAnatomy.tsx`**:
   - Purge all instances of `#F6F4EF`, `#ECE8DF`, `#EAE6DC` → replace with `bg-[#F8F9FA]`, `bg-white`, `border-[rgba(11,19,43,0.12)]`.
4. **`src/components/home/__tests__/ErasmusHorizonSlider.test.tsx`**:
   - Update tests to assert the zero-widget 12-column architectural comparison layout, headers, 6 comparison dimensions, and CTAs.
5. **`src/components/home/__tests__/DailyExchangeAnatomy.test.tsx`**:
   - Verify tests pass with new `#F8F9FA` token styling.

---

### Partition C Tasks (`@engineer-C`):
1. **`src/components/home/HowToApply.tsx`**:
   - Refactor into a **Static 3-Step Trajectory** (zero active tab state, zero button clicking).
   - Trajectory arc serves as a clean, static visual bridge across the 3 step cards on desktop.
   - Permanently embed the sample motivation entry inside Step 2 (`Your motivation`):
     *"I am starting my first job next autumn and want to replace my anxiety around budgeting with a concrete savings system..."*
   - Purge all instances of `#F6F4EF`, `#ECE8DF`, `#EAE6DC` → use `bg-[#F8F9FA]`, `bg-white`, `border-[rgba(11,19,43,0.12)]`.
2. **`src/components/home/Beliefs.tsx`**:
   - Set section background to `bg-[#F8F9FA] text-[#0B132B]`.
   - Set all 4 belief cards to elevated `bg-white` with `border-[rgba(11,19,43,0.12)]`.
   - **Remove Roman numerals `I, II, III, IV` completely!**
   - Retain `SparkleStar` motif, H3 headings, and max-w-[60ch] line length discipline.
3. **`src/components/home/PartnerBand.tsx`**:
   - Update outer `<section>` to `w-full bg-[#F8F9FA] py-20 md:py-24`.
   - Wrap internal content in `container-orion`.
   - Frame the partnership dispatch dock inside a dark island container:
     `<div className="bg-[#0B132B] text-[#F8F9FA] p-8 sm:p-12 border border-[#0B132B] space-y-8">`.
   - This ensures the `#0B132B` dispatch box is completely cushioned by `#F8F9FA` daylight space, eliminating any bleed into the `#0B132B` footer!
4. **`src/components/home/__tests__/Home.test.tsx`**:
   - Update `HeroSection` tests: assert `bigger.` is Space Grotesk bold (`text-[#e35619]`) without italic or serif classes.
   - Update `HowToApply` tests: assert static 3-step cards with Step 2 permanently displaying the motivation statement.
   - Update `Beliefs` tests: assert 4 locked pillar statements on white cells without Roman numerals I–IV.
   - Update `PartnerBand` tests: assert framed dark container within `#F8F9FA` section.
   - Run `npm test` and assert all 15 test suites pass with 100% passing tests.

---

## 6. Verification & Quality Gates

1. **Token Hygiene Audit**:
   - Run grep command `Get-ChildItem -Path src -Recurse -File | Select-String -Pattern "#F6F4EF|#ECE8DF|#EAE6DC"` and assert zero occurrences in `src/app/` and `src/components/home/`.
2. **Visual Flow & Responsive Layout**:
   - Verify layout at `375px` (mobile), `768px` (tablet), and `1440px` (desktop).
   - Ensure `MotionTrailDivider` bottom arc transitions into `#F8F9FA` without seams.
   - Ensure `PartnerBand` dark dock is framed by `#F8F9FA` and does not bleed into the footer.
3. **Unit Test Suite**:
   - Run `npm test` and assert 100% passing rate across all test files.
