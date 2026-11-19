# ORION — "The Celestial Atlas" — Full Client Brief (verbatim, source of truth)

Build a complete, production-ready, multi-page website for **Orion (Orion Ifjúsági Egyesület)**, an international Erasmus+ youth NGO based in Debrecen, Hungary, built around the core concept **"The Celestial Atlas" (Interactive Trajectory & Wayfinding)**.

## 1. TECH STACK & ARCHITECTURE
- Framework: Next.js (App Router) with TypeScript and Tailwind CSS.
- Icons: `lucide-react` + custom inline SVG components for Orion's locked brand motifs.
- State & Data Layer (Admin-Ready for Phase 2): Create a clean, typed data layer in `/src/types/orion.ts` and `/src/lib/orionData.ts` with local state persistence (`localStorage` fallback) for built-in application submissions so Phase 2's Supabase Admin Dashboard can plug in seamlessly.

## 2. STRICT BRAND GUIDELINES & DESIGN TOKENS (DO NOT DEVIATE)
### Locked Color Palette
- **Midnight Navy (`#0B132B` / RGB 11, 19, 43):** Primary dark anchor background (hero, navbar, footer) and default heading/body text color on light backgrounds.
- **Off-White (`#F8F9FA` / RGB 248, 249, 250):** Primary daylight background for content sections and knockout text color on Midnight Navy.
- **Ember Orange (`#e35619` / RGB 227, 86, 25):** High-energy accent ONLY.
- **Derived Surface Tokens:**
  - `orbit-dark`: `rgba(248, 249, 250, 0.14)` (1px borders and constellation grid hairlines on `#0B132B`)
  - `orbit-light`: `rgba(11, 19, 43, 0.10)` (1px structural borders on `#F8F9FA`)
  - `nebula-surface`: `#111D3B` (Elevated drawer/card surface on `#0B132B`)
- **Strict WCAG 2.1 AA Guardrails:**
  - NEVER use `#e35619` (Ember Orange) as a large background fill.
  - NEVER set small body text in orange, and NEVER put orange text directly on `#0B132B` (Midnight Navy).
  - Cap Ember Orange at ONE focal highlight per viewport (e.g., a single highlighted word in the Display headline, the active shooting star node, or the primary CTA button fill).

### Locked Typography & Scale
Load Google Fonts `Space Grotesk` (Display/Headings, fallback `Sora, system-ui, sans-serif`) and `Inter` (Body/UI, fallback `system-ui, sans-serif`).
- **Display / Hero:** `Space Grotesk`, `64px` (mobile `40px`), `700 Bold`, line-height `1.05`, tracking `-0.01em` (-1%).
- **H1:** `Space Grotesk`, `40px` (mobile `32px`), `700 Bold`, line-height `1.1`, tracking `-0.005em` (-0.5%).
- **H2:** `Space Grotesk`, `32px` (mobile `26px`), `600 SemiBold`, line-height `1.15`, tracking `0`.
- **H3:** `Space Grotesk`, `24px` (mobile `20px`), `600 SemiBold`, line-height `1.2`, tracking `0`.
- **Body Large:** `Inter`, `18px`, `400 Regular`, line-height `1.6`, max line length `65ch`.
- **Body:** `Inter`, `16px`, `400 Regular`, line-height `1.6`, max line length `65ch`.
- **Caption / UI:** `Inter`, `14px`, `500 Medium`, line-height `1.4`.
- **Eyebrow / Overline:** `Space Grotesk`, `12px`, `600 SemiBold`, line-height `1.3`, tracking `+0.08em` (+8%), ALL CAPS.
- **Formatting Rules:** Left-align all body copy and headings by default (never justify text). Use sentence case for all headings and UI; reserve ALL CAPS strictly for the `ORION` wordmark and `12px` eyebrows.

### Layout, Grid & Visual Restraint
- **8px Spatial System:** Use spacing multiples of `4px, 8px, 16px, 24px, 32px, 48px, 64px` inside a 12-column responsive grid with generous negative space.
- **No Generic SaaS Cards:** Avoid rounded drop-shadow cards. Use crisp `1px` astronomical chart borders (`orbit-light` / `orbit-dark`), geographic coordinate stamps (`47.53° N, 21.62° E`), and architectural tables.
- **Single Orchestrated Motion:** Do NOT put fade-up scroll animations on every section. Spend motion on ONE signature moment: on load, the SVG shooting star traces a curved trajectory arc from the Debrecen HQ star node to the active Open Call node on the Celestial Atlas.

## 3. CUSTOM SVG BRAND MOTIF COMPONENTS (`/src/components/motifs/`)
1. `<OrionLogo variant="full-light" | "full-dark" | "star-only" />`:
   - Full wordmark `ORION` in bold geometric uppercase (`letter-spacing: 0.08em`, min height `24px`) with a sleek diagonal Ember Orange (`#e35619`) shooting star and 3 tapered motion trails sweeping upward to a crisp 4-point sparkle star above the right side of the wordmark.
   - Maintain clear space around the logo equal to the height of the star sparkle.
2. `<CelestialAtlas />`:
   - Interactive SVG map of Europe/Med region set on `#0B132B` with subtle latitude/longitude graticule lines (`rgba(248, 249, 250, 0.08)`).
   - Plots Debrecen, Hungary (`47.53° N, 21.62° E`) as the anchor hub.
   - Connects Debrecen via curved SVG `<TrajectoryArc />` paths to active Open Calls (pulsing `#e35619` 4-point star nodes) and completed Projects (crisp `#F8F9FA` 4-point star nodes).
   - Clicking or keyboard-focusing any star node opens/updates the interactive **Node Inspector Panel** beside the map showing project title, coordinates, dates, status badge, emotional summary, and direct CTA button.
3. `<MotionTrailDivider />`:
   - Full-width section divider featuring sweeping tapered `#e35619` motion streaks.

## 4. PAGES, COPYWRITING & FEATURES TO BUILD

### Global Navigation & Footer
- **Navbar (`#0B132B`):** `<OrionLogo variant="full-dark" />` on the left; links to `Open Calls` (`/open-calls`), `Projects` (`/projects`), `Partner With Us` (`/partners`), `About` (`/about`), `Contact` (`/contact`), and a primary CTA button `Explore open calls`.
- **Footer (`#0B132B`):** Locked tagline `"Spark something bigger."`, short boilerplate (`"Orion helps young people find direction, cross borders, and grow, together. Spark something bigger."`), Debrecen HQ coordinates, Erasmus+ disclaimer, and a subtle link to `/admin-preview` (showing the Phase 2 Admin readiness state).

### Page 1: Home (`/`)
1. **Hero Section (`#0B132B` Night-Sky Canvas, 12-Column Split):**
   - Left 5 Columns:
     - Eyebrow: `INTERNATIONAL YOUTH INITIATIVE`
     - Display Headline: `Spark something ` + `<span class="text-[#e35619]">bigger.</span>`
     - Lead Copy: `"Orion helps young people find direction, cross borders, and grow, together. We are a constellation of young changemakers turning European mobility into memories, growth, and human connection."`
     - CTAs: Primary button `Explore open calls` (`/open-calls`) + Secondary outline button `Partner dossier` (`/partners`).
   - Right 7 Columns: The interactive `<CelestialAtlas />` component with the live Node Inspector Panel.
2. **`<MotionTrailDivider />`**
3. **Active Departures Ledger (`#F8F9FA` Daylight Canvas):**
   - Left 4 Columns: Impact proof with 4-point sparkle markers (`200+ participants connected`, `14 partner countries navigated`, `100% Erasmus+ funded mobilities`). Defines Erasmus+ clearly in plain English for first-time readers.
   - Right 8 Columns: Architectural table/list of active Open Calls with dates, country coordinates, status badge (`Open` / `Closing soon`), and `"Here's how to apply, 3 steps, 10 minutes"` micro-copy.
4. **The 4 Messaging Pillars Grid (`#F8F9FA`):**
   - Pillar 1: *Not a program, but memories, growth, and human connection.*
   - Pillar 2: *A guide that helps you find direction.*
   - Pillar 3: *A constellation of young changemakers.*
   - Pillar 4: *Real impact, backed by proof.*
5. **Recent Constellations (Past Projects Preview):**
   - Editorial showcase of recent youth exchanges (*ReForest* in Lacu Roșu, Romania & *Job Jam* in Czechia) linking to `/projects`.

### Page 2: Open Calls Directory (`/open-calls`) & Single Call + Hybrid Application (`/open-calls/[slug]`)
- **Directory (`/open-calls`):** Filterable by Action Type (`Youth Exchange`, `Training Course`), Country, and Status (`Open`, `Closing soon`, `Closed`).
- **Single Call Detail (`/open-calls/[slug]`):**
  - Displays emotional payoff, daily experience, venue coordinates, travel reimbursement rules, age eligibility, and a `Download Infopack PDF` button.
  - **Hybrid Application Funnel (must support both modes per call):**
    - If `applicationMode === 'internal'`: Renders a reassuring, built-in **3-Step Application Form** connected by an SVG `<TrajectoryArc />` progress header (`Step 1: About you` -> `Step 2: Your motivation` -> `Step 3: Travel & confirmation`) with the heading `"Here's how to apply, 3 steps, 10 minutes."` Saves submissions to local state and shows a clear confirmation screen (`"Application received. You've got this, and we've got you."`).
    - If `applicationMode === 'external'`: Renders a clean external application card with a button linking to `externalFormUrl` (Google Forms) while still showing the full Infopack and logistics on-page.

### Page 3: Projects Portfolio (`/projects` & `/projects/[slug]`)
- Filterable archive of completed and ongoing mobilities.
- Pre-populate with realistic Orion seed projects:
  1. **ReForest — Erasmus+ Youth Exchange** (Lacu Roșu, Miercurea Ciuc & Băgaciu, Transylvania, Romania · Oct 2026 · Coordinates `46.78° N, 25.78° E` · Partner: *Asociatia Agoje* · Focus: Environmental stewardship, reforestation hikes, and cross-cultural leadership).
  2. **KA152 Youth Mobility Initiative** (Debrecen, Hungary · Grant Ref: `2026-1-HU01-KA152-YOU-000399636` · Coordinates `47.53° N, 21.62° E` · Focus: Empowering local and international youth changemakers).
  3. **Job Jam — Youth Employability Exchange** (Sudislav nad Orlicí & Prague, Czechia · May 2026 · Coordinates `50.01° N, 16.25° E` · Focus: Youth entrepreneurship, digital storytelling, and career navigation).
- Each `/projects/[slug]` page includes impact metrics, photo gallery grid, participant quotes, partner logos, and grant reference badge.

### Page 4: Partner With Us — Institutional Dossier (`/partners`)
- Written in **Formal Mode** (polished, precise, evidence-led for international NGOs and National Agencies).
- **Mandatory Long Boilerplate Lead:** `"Orion is an international youth initiative that turns participation into memories, growth, and human connection. Guided by the idea of a constellation of young changemakers who help each other navigate and move upward, we create programs that deliver measurable personal and cross-cultural impact."`
- **Quick-Copy NGO Credentials Ledger:**
  - Legal Name: `Orion Ifjúsági Egyesület`
  - Legal Seat: `Debrecen, Hungary (47.53° N, 21.62° E)`
  - Erasmus+ OID: `E103XXXXX (Click to copy)` -> interactive copy button with toast `"OID copied"`.
  - Accredited Grant Track Record: `2026-1-HU01-KA152-YOU-000399636`
  - Action Button: `Download Official PIF (PDF)`
- **Partner Inquiry Form:** Structured form for KA1/KA2 partnership proposals.

### Page 5: About & Constellation Team (`/about`)
- Origin story of Orion in Debrecen, mission, and a **Constellation Leadership Grid** featuring:
  - **Zeid George Nicola Isaac** — Founder & President
  - **Roberta Szabó** — Co-Founder & Board Member
  - **Jázmin Szabó** — Co-Founder & Operations Coordinator
  - **Jordan Smith** — Co-Founder & International Outreach
  - **Ismail** — Core Team & Mobility Coordinator

### Page 6: Contact (`/contact`)
- Interactive 2-mode toggle: `"I'm a young person applying"` (warm peer tone + first-timer FAQ) vs. `"I represent a partner organization"` (formal institutional inquiry).

---
Context: current date is 2026-10-24. Open Call dates must be in the future relative to this (Nov 2026 – mid 2027). "Closing soon" = deadline within 14 days of today.
