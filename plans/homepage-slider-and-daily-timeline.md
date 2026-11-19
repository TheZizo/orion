# Architectural Blueprint: Homepage Interactive Horizon Slider & Daily Exchange Timeline

**Document Status:** Approved Architecture Plan & Implementation Specification  
**Target File:** `plans/homepage-slider-and-daily-timeline.md`  
**Author:** `@architect` (Systems & Frontend Architect)  
**Governing Standard:** `AGENTS.md` (Two-Pass Design & Architecture Loop)  

---

## 1. Executive Summary & User Direction

Following the user's feature selection, this architectural blueprint specifies the design, tokens, layouts, accessibility contracts, and engineering partitions for two high-impact interactive homepage additions:

1. **`ErasmusHorizonSlider` (`src/components/home/ErasmusHorizonSlider.tsx`)**:
   - An interactive timeline slider / horizon scrubber contrasting **Orion Youth Exchanges (KA152)** (`7–12 days`, 100% funded, open to any young person 18–30) against **University Semester Mobilities (KA131)** (`5–10 months`, self-funded, enrolled students only).
   - Features draggable/scrubbable slider, discrete stop triggers, live delta indicators, and an expandable side-by-side ledger mode.
2. **`DailyExchangeAnatomy` (`src/components/home/DailyExchangeAnatomy.tsx`)**:
   - An interactive 4-stage daily rhythm scrubber (`08:30` Morning Energizer -> `10:00` Outdoor Simulation Lab -> `15:00` Cross-Border Team Challenge -> `20:00` Intercultural Evening) answering the visceral question: *"What does non-formal education actually feel like on the ground?"*
3. **Seamless Integration into `src/app/page.tsx`**:
   - Placed in strict narrative harmony:
     `HeroSection` → `MotionTrailDivider` → **`ErasmusHorizonSlider`** → `NextDeparture` → **`DailyExchangeAnatomy`** → `HowToApply` → `Beliefs` → `ReForestStory` → `PartnerBand`.

---

## 2. Pass 1 — Codebase Reconnaissance & Design Brief

### 2.1 Design Tokens & Palette Specifications
- **Canvas Background**: Daylight Warm Alabaster (`#F6F4EF`, `bg-[#F6F4EF]`).
- **Contrast Card Surface**: Archival Paper (`#ECE8DF`, `bg-[#ECE8DF]`) with hairline architectural borders (`border-[rgba(11,19,43,0.12)]`).
- **Typography Colors**: Primary Observatory Navy (`#0B132B`, `text-[#0B132B]`), Slate Subtext (`#1D356B`, `text-[#1D356B]`), Muted Gray (`#5A6578`).
- **Signal & Active Accents**: Ember Orange (`#E35619`) used exclusively for active waypoint markers, thumb indicators, and timeline progress beams.
- **Numbers & Metrics**: Strict `tabular-nums` on all hours (`08:30`, `10:00`), durations (`7–12 days`), costs (`€0`, `€3,000+`), and ages (`18–30`).

### 2.2 Typographic Hierarchy (Sentence Case & Left-Aligned)
- **Section Kickers**: `type-eyebrow` or `type-caption` in sentence-case editorial style (`font-medium text-[#1D356B] tracking-[0.04em]`).
- **Section Headings**: `type-h2` (26px mobile / 32px desktop) in Space Grotesk (`font-display font-semibold text-[#0B132B]`).
- **Lead / Description Copy**: `type-body` (16px) in Inter (`font-body text-[#0B132B]/85 max-w-[65ch]`).
- **Card Titles & Metrics**: `type-h3` (20px / 24px) with `tabular-nums`.

---

## 3. Component 1: `ErasmusHorizonSlider` Specification

### 3.1 Data Model & Content Matrix

```typescript
export interface ErasmusDimension {
  id: string;
  label: string;
  youthExchange: {
    highlight: string;
    description: string;
    tag?: string;
  };
  universitySemester: {
    highlight: string;
    description: string;
    tag?: string;
  };
}

export const ERASMUS_COMPARISON_DATA: ErasmusDimension[] = [
  {
    id: 'duration',
    label: 'Duration & Commitment',
    youthExchange: {
      highlight: '7 to 12 days',
      description: 'Compact immersive sprint. Fits between school terms, jobs, or annual leave.',
      tag: 'Zero career interruption',
    },
    universitySemester: {
      highlight: '5 to 10 months',
      description: 'Full academic semester or year abroad requiring long-term relocation.',
      tag: 'Half a year away',
    },
  },
  {
    id: 'eligibility',
    label: 'Eligibility & Requirements',
    youthExchange: {
      highlight: 'Any young person aged 18–30',
      description: 'No university enrollment, no diploma, and zero prior experience needed.',
      tag: 'Open to all',
    },
    universitySemester: {
      highlight: 'Enrolled university students only',
      description: 'Requires active university student status, academic transcripts, and minimum GPA.',
      tag: 'University only',
    },
  },
  {
    id: 'funding',
    label: 'Lodging & Living Costs',
    youthExchange: {
      highlight: '100% covered by Erasmus+ grant',
      description: 'Lodging, 3 meals daily, and workshops are fully funded. Travel tickets reimbursed.',
      tag: '€0 out-of-pocket costs',
    },
    universitySemester: {
      highlight: 'Partial monthly stipend (€350–€550/mo)',
      description: 'Students must find and rent private apartments and cover living deficits from personal savings.',
      tag: '€3,000+ personal savings needed',
    },
  },
  {
    id: 'learning',
    label: 'Daily Learning Method',
    youthExchange: {
      highlight: 'Non-formal experiential education',
      description: 'Simulation games, outdoor challenges, creative teamwork, and debates. Zero lectures, zero exams.',
      tag: 'No exams or lectures',
    },
    universitySemester: {
      highlight: 'Formal academic coursework',
      description: 'Attending foreign university lectures, writing academic essays, and sitting high-stress final exams.',
      tag: 'Academic exam stress',
    },
  },
  {
    id: 'support',
    label: 'Travel & Cohort Support',
    youthExchange: {
      highlight: 'National delegation with Orion group leader',
      description: 'You travel together from your home country with an experienced group leader guiding you 24/7.',
      tag: 'Never travel alone',
    },
    universitySemester: {
      highlight: 'Solo international relocation',
      description: 'You travel and settle alone, navigating foreign housing contracts and administrative bureaucracy.',
      tag: 'Solo navigation',
    },
  },
  {
    id: 'credential',
    label: 'Formal Recognition',
    youthExchange: {
      highlight: 'European Youthpass Certificate',
      description: 'Official EU credential validating 8 key lifelong learning competences for CVs and employers.',
      tag: 'EU Youthpass',
    },
    universitySemester: {
      highlight: 'University ECTS course credits',
      description: 'Credits transfer to your specific home degree syllabus upon passing exams.',
      tag: 'ECTS credits',
    },
  },
];
```

### 3.2 ASCII Wireframe: `ErasmusHorizonSlider`

```text
+---------------------------------------------------------------------------------------------------+
| [CONTAINER: max-w-[1280px] px-4 md:px-8 py-16 bg-[#F6F4EF]]                                       |
|                                                                                                   |
|  Kicker: Demystifying European Mobility                                                           |
|  Heading: Two European paths. One is open to everyone.                                            |
|  Lead: Hear the word "Erasmus" and picture a 6-month university term with high rent?              |
|        That is KA131. Orion runs KA152 Youth Exchanges: 7 to 12 days, 100% funded, zero uni needed.|
|                                                                                                   |
|  +-- CONTROLS & TIMELINE SCRUBBER -------------------------------------------------------------+  |
|  |                                                                                             |  |
|  |   [ ● Youth Exchange (7–12 Days) ]                    [ University Semester (5–10 Months) ] |  |
|  |                                                                                             |  |
|  |   Track: ══════════════════════════════════════════════════════════════════════════════════   |  |
|  |          [● Thumb: 7–12 Days] (Draggable / Clickable)                                       |  |
|  |                                                                                             |  |
|  |   [ View as side-by-side table ⇄ ]                                                         |  |
|  +---------------------------------------------------------------------------------------------+  |
|                                                                                                   |
|  +-- DYNAMIC HORIZON CARD (Active: Youth Exchange) ---------------------------------------------+ |
|  |  CURRENT PATH: Erasmus+ Youth Exchange (KA152)                                              | |
|  |  "A high-intensity, zero-cost international sprint for real young people."                   | |
|  |                                                                                             | |
|  |  +-----------------------+ +-----------------------+ +-----------------------+              | |
|  |  | Duration              | | Eligibility           | | Costs & Lodging       |              | |
|  |  | 7 to 12 days          | | Anyone aged 18–30     | | 100% covered          |              | |
|  |  | Compact sprint        | | No student status     | | Lodging & 3 meals     |              | |
|  |  | [Zero career pause]   | | [No degree needed]    | | [Save €3,000+]        |              | |
|  |  +-----------------------+ +-----------------------+ +-----------------------+              | |
|  |  +-----------------------+ +-----------------------+ +-----------------------+              | |
|  |  | Learning Style        | | Travel Support        | | Credential            |              | |
|  |  | Non-formal labs       | | National group travel | | EU Youthpass          |              | |
|  |  | Zero exams/lectures   | | Dedicated leader 24/7 | | 8 Key Competences     |              | |
|  |  | [Hands-on workshops]  | | [Never alone]         | | [CV credential]       |              | |
|  |  +-----------------------+ +-----------------------+ +-----------------------+              | |
|  +---------------------------------------------------------------------------------------------+ |
|                                                                                                   |
|  (Or when Side-by-Side Mode is toggled: renders a calm 6-row comparative ledger matrix)          |
+---------------------------------------------------------------------------------------------------+
```

### 3.3 Interaction States & Accessibility (`ErasmusHorizonSlider`)
1. **Interactive Scrubber**:
   - Continuous slider `<input type="range" min="0" max="100" />` or custom ARIA slider (`role="slider"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-valuetext`).
   - Dragging below 50 locks into Youth Exchange state; 50 and above transitions to University Semester.
   - Smooth interpolation of visual indicator and immediate content switch.
2. **Stop Buttons**:
   - Two pill buttons: `Youth Exchange (7–12 Days)` and `University Semester (5–10 Months)`.
   - Clicking immediately snaps the slider to 0 or 100 with smooth CSS transition.
3. **Side-by-Side Toggle**:
   - Secondary button with icon: `[ View side-by-side comparison ⇄ ]`.
   - Expands a calm 2-column comparison table showing both models simultaneously.
4. **Keyboard & Screen Reader Support**:
   - Full keyboard navigation with `ArrowLeft` and `ArrowRight` (or `Home`/`End`).
   - Proper focus rings (`:focus-visible` with 2px Ember `#E35619` outline).

---

## 4. Component 2: `DailyExchangeAnatomy` Specification

### 4.1 Data Model & Daily Rhythm

```typescript
export interface DailyStage {
  id: string;
  time: string; // e.g. "08:30"
  stageNumber: string; // e.g. "Stage 01"
  title: string;
  subtitle: string;
  experienceDescription: string;
  learningFocus: string;
  environment: string;
  cohortDynamic: string;
}

export const DAILY_STAGES: DailyStage[] = [
  {
    id: 'energizer',
    time: '08:30',
    stageNumber: 'Stage 01',
    title: 'Morning Energizer & Check-In',
    subtitle: 'Waking up the body, breaking social stiffness, and aligning the day.',
    experienceDescription:
      'We gather in the courtyard or open hall. Instead of silent coffee, a different national delegation leads 15 minutes of lively cultural movement, somatic games, and shared laughter that instantly dissolves morning barriers.',
    learningFocus: 'Somatic presence, peer vulnerability, and cross-cultural trust building.',
    environment: 'Open lodge courtyard or sunlit hall',
    cohortDynamic: 'All 32 participants in one circle across HU, RO, ES & CZ',
  },
  {
    id: 'simulation',
    time: '10:00',
    stageNumber: 'Stage 02',
    title: 'Hands-on Simulation & Strategy Lab',
    subtitle: 'Zero lectures, zero slides. Learning economics and leadership by doing.',
    experienceDescription:
      'Working in multinational squads of 4, participants navigate an intensive real-world simulation—such as managing an inflation-hit community budget or testing predatory interest scenarios with tangible roleplay tokens.',
    learningFocus: 'Decision-making under scarcity, critical media literacy, and collective negotiation.',
    environment: 'Collaborative workshop studio with flipcharts and visual cards',
    cohortDynamic: 'Mixed-nationality squads of 4 to 6 peers',
  },
  {
    id: 'challenge',
    time: '15:00',
    stageNumber: 'Stage 03',
    title: 'Cross-Border Team Challenge & Field Mission',
    subtitle: 'Stepping outside the seminar room into tangible civic problem-solving.',
    experienceDescription:
      'After lunch, teams leave the venue for an outdoor civic mission. Whether testing peer-budgeting tools with local Hungarian youth or co-designing Canva financial guides, learning happens through direct human contact.',
    learningFocus: 'Public communication, creative synthesis, and real-world validation.',
    environment: 'Local town center, green parks, or partner venue spaces',
    cohortDynamic: 'Independent team missions with mentor checkpoints',
  },
  {
    id: 'intercultural',
    time: '20:00',
    stageNumber: 'Stage 04',
    title: 'Intercultural Evening & Starlit Reflection',
    subtitle: 'Sharing regional heritage, folk rhythms, and recording Youthpass insights.',
    experienceDescription:
      'Evenings belong to cultural celebration and self-reflection. One delegation hosts their national night with homemade specialties, traditional dances, and folklore. The night ends around a quiet fire logging daily Youthpass competences.',
    learningFocus: 'Intercultural competence, mutual empathy, and lifelong reflection habits.',
    environment: 'Dining hall, banquet tables, and outdoor campfire circle',
    cohortDynamic: 'Warm celebratory gathering transitioning into 1-on-1 peer debriefs',
  },
];
```

### 4.2 ASCII Wireframe: `DailyExchangeAnatomy`

```text
+---------------------------------------------------------------------------------------------------+
| [CONTAINER: max-w-[1280px] px-4 md:px-8 py-16 bg-[#F6F4EF]]                                       |
|                                                                                                   |
|  Kicker: Daily Rhythm & Non-Formal Learning                                                       |
|  Heading: A day on an exchange. Zero lectures.                                                    |
|  Lead: Curious what non-formal education actually looks like between morning and night?           |
|        Here is how 32 young Europeans spend 24 hours learning together without desks or exams.   |
|                                                                                                   |
|  +-- TIMELINE SCRUBBER / STAGE TABS (role="tablist") ------------------------------------------+  |
|  |                                                                                             |  |
|  |   [ 08:30 ] ─────────── [ 10:00 ] ─────────── [ 15:00 ] ─────────── [ 20:00 ]              |  |
|  |   Energizer             Simulation            Field Mission         Intercultural Night     |  |
|  |   (Active Beam)                                                                             |  |
|  +---------------------------------------------------------------------------------------------+  |
|                                                                                                   |
|  +-- ACTIVE STAGE STAGE PANEL (role="tabpanel") ------------------------------------------------+ |
|  |  STAGE 02 OF 04                                                     TIME: 10:00 – 13:00      | |
|  |  Hands-on Simulation & Strategy Lab                                                          | |
|  |  Zero lectures, zero slides. Learning economics and leadership by doing.                      | |
|  |                                                                                             | |
|  |  What actually happens:                                                                     | |
|  |  Working in multinational squads of 4, participants navigate an intensive real-world        | |
|  |  simulation—such as managing an inflation-hit community budget or testing predatory         | |
|  |  interest scenarios with tangible roleplay tokens.                                           | |
|  |                                                                                             | |
|  |  +-------------------------------------+ +-------------------------------------+            | |
|  |  | Core Learning Focus                 | | Environment & Cohort Dynamic        |            | |
|  |  | Decision-making under scarcity,     | | Studio hall with flipcharts;        |            | |
|  |  | media literacy, collective debate.  | | mixed squads of 4–6 peers.          |            | |
|  |  +-------------------------------------+ +-------------------------------------+            | |
|  +---------------------------------------------------------------------------------------------+ |
|                                                                                                   |
|  [ Bottom Navigation: "← Previous Stage"   [ 1 / 4 ]   "Next Stage →" ]                          |
+---------------------------------------------------------------------------------------------------+
```

### 4.3 Interaction States & Accessibility (`DailyExchangeAnatomy`)
1. **Interactive Stage Tabs**:
   - Proper WAI-ARIA tab pattern (`role="tablist"`, `role="tab"`, `aria-selected="true"`, `aria-controls="panel-id"`, `id="tab-id"`).
   - Clicking any stage or time badge switches the panel immediately.
2. **Keyboard Navigation**:
   - Arrow keys (`ArrowLeft`, `ArrowRight`) shift focus and activate adjacent tabs.
   - Visible `:focus-visible` ring on tab buttons.
3. **Sequential Step Controls**:
   - Previous and Next buttons at the bottom of the card allow step-by-step reading without precision clicking.
4. **Motion Discipline**:
   - Smooth subtle opacity fade (`transition-opacity duration-200`) without jarring height jumps or disorienting translate sweeps. Respects `prefers-reduced-motion`.

---

## 5. Pass 2 — Anti-Cliché Self-Critique Gate

| Anti-Cliché Rule | Audit in Plan | Implementation Constraint |
| :--- | :--- | :--- |
| **NO single-word color spans in headlines** | Headline 1: `Two European paths. One is open to everyone.`<br>Headline 2: `A day on an exchange. Zero lectures.` | Pure `#0B132B`. Scale and weight contrast only. No `text-orange` on single words. |
| **NO tracked-out ALL-CAPS eyebrows** | Kickers: `Demystifying European mobility` and `Daily rhythm & non-formal learning` | Sentence case only. No tracked out caps like `DAILY SCHEDULE`. |
| **NO middle-dot meta strings** | No `08:30 · Energizer · Morning` or `A · B · C` | Structured `<dl>` pairs, clean tabular headers, and discrete chip badges. |
| **NO `line-clamp` copy** | Complete editorial sentences written to fit without truncation | No `line-clamp-2` or `line-clamp-3` hiding educational value. |
| **NO generic SaaS card shadows** | 1px architectural borders (`border-[rgba(11,19,43,0.12)]`) on archival paper `#ECE8DF` | Clean cartographic observatory lines. No blurry `shadow-2xl`. |
| **Strict `tabular-nums`** | `08:30`, `10:00`, `15:00`, `20:00`, `7–12 days`, `5–10 months`, `€0`, `€3,000+` | `className="tabular-nums"` on all temporal and monetary quantities. |
| **Chanel Rule** | Stripped redundant glowing icons and decorative stars | Hero element of each component is the functional interaction (the slider thumb and timeline scrubber). |

---

## 6. Implementation Partitions for Engineers

```text
[Phase 1: Architecture Blueprint] ────► @architect (COMPLETE: plans/homepage-slider-and-daily-timeline.md)
                                            │
                                            ▼
                    ┌───────────────────────┴───────────────────────┐
                    ▼                                               ▼
[Partition A: Horizon Slider]                       [Partition B: Daily Anatomy & Integration]
@engineer-A                                         @engineer-B
Files:                                              Files:
- src/components/home/ErasmusHorizonSlider.tsx      - src/components/home/DailyExchangeAnatomy.tsx
- src/components/home/__tests__/                    - src/components/home/__tests__/
    ErasmusHorizonSlider.test.tsx                       DailyExchangeAnatomy.test.tsx
                                                    - src/app/page.tsx (integrate both)
                                                    - src/components/home/__tests__/Home.test.tsx
```

### Partition A Tasks (`@engineer-A`):
1. **Create `src/components/home/ErasmusHorizonSlider.tsx`**:
   - Implement `"use client"` leaf component.
   - Interactive slider track with drag/scrub support (0 = Youth Exchange, 100 = University Semester).
   - Stop buttons for 1-click snapping.
   - Delta indicators (`Save €3,000+`, `Zero exams`, `No degree required`).
   - Side-by-side comparison toggle (`isCompareMode`) rendering complete 6-dimension table.
   - Full keyboard accessibility and visible focus states.
2. **Author `src/components/home/__tests__/ErasmusHorizonSlider.test.tsx`**:
   - Assert initial render defaults to Youth Exchange (7–12 days, 100% funded).
   - Assert clicking/dragging to University Semester updates content (5–10 months, enrolled students).
   - Assert clicking side-by-side button toggles full comparative view.
   - Assert keyboard navigation (ArrowLeft/ArrowRight).

### Partition B Tasks (`@engineer-B`):
1. **Create `src/components/home/DailyExchangeAnatomy.tsx`**:
   - Implement `"use client"` leaf component.
   - 4-stage daily timeline (`08:30`, `10:00`, `15:00`, `20:00`).
   - WAI-ARIA tablist/tabpanel structure with active step beam.
   - Detailed stage card with learning focus, environment, and cohort dynamic.
   - Previous/Next step navigation buttons.
2. **Author `src/components/home/__tests__/DailyExchangeAnatomy.test.tsx`**:
   - Assert 4 stages render in tablist.
   - Assert clicking a tab displays the correct stage panel.
   - Assert keyboard arrow navigation between tabs.
3. **Integrate into `src/app/page.tsx`**:
   - Mount `ErasmusHorizonSlider` after `MotionTrailDivider` and before `NextDeparture`.
   - Mount `DailyExchangeAnatomy` after `NextDeparture` and before `HowToApply`.
4. **Update `src/components/home/__tests__/Home.test.tsx`**:
   - Verify `HomePage` renders both components without regression.
   - Run `npm test` and assert all test suites pass.

---

## 7. Verification & Acceptance Criteria
- [ ] `npm test` executes cleanly with 100% passing tests (15 test files, 0 failures).
- [ ] Both components pass accessibility audit: visible focus rings, valid ARIA roles (`slider`, `tablist`, `tab`, `tabpanel`).
- [ ] Mobile responsive: renders cleanly at `375px`, `768px`, and `1440px`.
- [ ] Strictly zero Banned AI Tells (no single-word color spans, no tracked-out ALL-CAPS kickers, no middle dots).
- [ ] Architectural aesthetic preserved: Warm Alabaster Paper (`#F6F4EF`), Archival Paper (`#ECE8DF`), hairlines (`rgba(11,19,43,0.12)`), Ember Orange (`#E35619`) beacons.
