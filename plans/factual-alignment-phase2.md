# Architectural Blueprint: Factual Alignment & Phase 2 Execution Plan

**Document Status:** Approved Architecture Plan  
**Target File:** `plans/factual-alignment-phase2.md`  
**Author:** `@architect` (Systems & Frontend Architect)  
**Governing Standard:** `AGENTS.md` (Two-Pass Design & Architecture Loop)  
**Primary Sources:**
- User Interview Feedback (Items 1–23)
- Official Grant Proposal: `c:\Users\zeid-\OneDrive\Documents\Downloads\Project - English (Original).docx.md`
- Official ReForest Project Page: `https://www.agoje.eu/our-projects/reforest` (via `steps/366/output.txt`)

---

## Executive Summary

This architecture plan establishes the complete factual alignment of the Orion web platform to ground reality. Every synthetic placeholder, outdated distance rate, unverified board title, and orphaned artifact is replaced with verified data from Orion's official Erasmus+ KA152 grant documentation and the verified ReForest consortium portal.

### Key Strategic Realignment:
1. **Legal & Institutional Identity**: Organization name updated everywhere from `Orion Ifjúsági Egyesület` to **`Orion Fiatalok Informális Csoportja`** (Orion Informal Group of Young People), with **`zeid@orionyouth.eu`** as the sole direct dispatch address.
2. **Partnership Hub Overhaul**: Complete replacement of the OID/PIC credentials table and PIF download buttons on `/partners` and `/` (`PartnerBand.tsx`, `InstitutionalDossier.tsx`) with a high-intent, direct **Partner Email Inquiry Form** (dispatching to `zeid@orionyouth.eu`).
3. **The Financial Blueprint (TFB)**: Fully aligned with the approved KA152 grant (`2026-1-HU01-KA152-YOU-000399636`):
   - **Dates**: October 5–13, 2026 (9 project days).
   - **Venue**: Piknik Park in Mezőberény, Hungary + Békéscsaba City Visit.
   - **Cohort**: 32 participants aged 18–26 across 4 partner countries (Hungary, Romania, Spain, Czechia), with 50% fewer opportunities inclusion.
   - **Partners**: Orion (HU, Host), Asociatia Elemdiar (RO), Granota Verda (ES), Youth Group Novae (CZ). Financial Intermediary: Legáramlat Nonprofit Kft.
   - **Infopack**: No broken PDF; marked as "Infopack coming soon".
4. **ReForest Project Alignment**:
   - **Dates & Venue**: October 11–22, 2026 at Lacu Roșu Mountain Lodge, Harghita, Romania.
   - **Consortium**: Asociația Agoje (RO, Host), AzorEarth (PT), Youth Group Novae (CZ), Orion Fiatalok (HU).
   - **External Portal**: Linked to `https://www.agoje.eu/our-projects/reforest`.
   - **Participant Testimonial**: Exactly 1 testimonial, attributed to **`Kemal`**.
5. **Asset & Copy Hygiene**:
   - Deleted: `public/docs/orion-pif.pdf`, `public/docs/infopacks/the-financial-blueprint.pdf`, and 6 unused test PDFs (`alpine-navigators-georgia.pdf`, `coastal-horizons-portugal.pdf`, `danube-currents-hungary.pdf`, `mediterranean-roots-greece.pdf`, `nordic-lights-estonia.pdf`, `urban-sparks-valencia.pdf`).
   - Removed: Job Jam references and `jobjam-1.jpg`, `jobjam-2.jpg`.
   - Removed: `CoverageExplainer.tsx` and all travel distance band tables from `/open-calls` and `/`.
   - Updated FAQ: Clarified that while 100% of travel, accommodation, and food are funded, Orion may require a small refundable confirmation deposit that is returned in full upon project completion.
   - Team: Simplified to First and Last names only (Zeid Isaac, Roberta Szabó, Jázmin Szabó, Jordan Smith, Sajid Al Sami).

---

## PART I: Forensic Factual Dossier (Verified Ground Truth)

### 1. Organization & Legal Structure

| Attribute | Verified Value | Source Document & Context |
| :--- | :--- | :--- |
| **Official Name** | **`Orion Fiatalok Informális Csoportja`**<br>(English: *Orion Informal Group of Young People*) | `Project - English (Original).docx.md:34` |
| **Legal Status** | Informal Group of Young People (*fiatalok informális csoportja*) | `Project - English (Original).docx.md:34, 789` |
| **Financial Intermediary** | **Legáramlat Nonprofit Kft.** | `Project - English (Original).docx.md:789-795` (Mandatory Hungarian NA administrative intermediary for informal youth groups; grant funds transferred strictly for project execution). |
| **Headquarters / Base** | Debrecen & Eastern Hungary (`47.53° N, 21.62° E`) | `Project - English (Original).docx.md:34-42` |
| **Official Contact Email** | **`zeid@orionyouth.eu`** | User Interview Item 4 |
| **Mission Motto** | *"Create the brightest stars"* | `Project - English (Original).docx.md:34` |
| **Founding Background** | Fusion of local Hungarian and international university students (ESN, AIESEC, HÖOK Diaspora Mentoring). | `Project - English (Original).docx.md:34-54` |

---

### 2. The Financial Blueprint (TFB) — Comprehensive Project Profile

| Attribute | Verified Grant Value | Reference in `Project - English (Original).docx.md` |
| :--- | :--- | :--- |
| **Project Title & Acronym** | **The Financial Blueprint** (Acronym: **`TFB`**) | Lines 4–10 |
| **Grant Reference** | **`2026-1-HU01-KA152-YOU-000399636`** | Confirmed by User & Application |
| **Action Type** | Erasmus+ KA152-YOU (Youth Exchange in Member States) | Lines 339–340 |
| **Exact Mobility Dates** | **October 5, 2026 – October 13, 2026** (05.10.2026 – 13.10.2026)<br>Duration: 9 activity days + 2 travel days | Lines 12–14, 409 |
| **Primary Venue** | **Piknik Park, Mezőberény, Hungary** (Békés County, Eastern Hungary) | Lines 409–412, 682, 992 |
| **City Visit Destination** | **Békéscsaba, Hungary** (Civic outreach tasks, city quest) | Lines 409, 419, 908, 1000 |
| **Target Audience & Age** | Young people aged **18–26** resident in HU, RO, ES, CZ | Lines 244, 343, 345, 990 |
| **Cohort Size** | **32 participants** (8 per country) + **8 group leaders** (2 per country) = 40 total | Lines 348, 362, 990 |
| **Inclusion Standard** | **50% of participants** with fewer opportunities (social, economic, geographic, educational hurdles) | Lines 260, 348, 990 |
| **Consortium Partners** | 1. **Orion Fiatalok Informális Csoportja** (Hungary, Host & Logistics)<br>2. **Asociatia Elemdiar** (Romania, Gheorgheni, Agenda & Visibility)<br>3. **Granota Verda** (Spain, Catalonia/Basque, Infopack & Visuals)<br>4. **Youth Group Novae** (Czech Republic, Brno/Pardubice, Documentation) | Lines 640–645, 698–712 |
| **Lead Facilitators** | **Adrian Vîlcan (Coco)** (Romania, Economics & Tech)<br>**Jordan Smith** (Hungary, Youth Work & Management) | Lines 109, 364 |
| **Mentorship Lead** | **Sajid Al Sami** (Reinforced Mentorship & Conflict Resolution) | Lines 689, 772 |
| **3-Phase Pedagogical Flow** | • **Phase 1 (Days 1–2)**: Integration, Erasmus+ rules, Youthpass, Code of Conduct, Committees (Party, Social Media, Secret Friend).<br>• **Phase 2 (Days 3–7)**: Core Finance, Banking myths, Crypto realities, AI budget scenarios, Anti-fraud, Békéscsaba City Visit (Day 6), Intercultural Nights.<br>• **Phase 3 (Days 8–9)**: Financial Booklet in Canva, Kahoot Financial Quiz, DEOR Dissemination Planning, Youthpass, Final 360° Evaluation. | Lines 415–422, 996–1004 |
| **Tangible Outputs** | 1. Practical Financial Booklet (EPRP published)<br>2. Economic Dictionary & Digital Reflection Journal<br>3. 4 Local Dissemination Workshops (at least 30 youth reached per nation) | Lines 323, 836–841, 886 |

---

### 3. ReForest Project — Verified Consortium Profile

| Attribute | Verified Profile | Source: `agoje.eu/our-projects/reforest` |
| :--- | :--- | :--- |
| **Project Title** | **ReForest — Erasmus+ Youth Exchange** | Web Page Title & Header |
| **Hosting Organisation** | **Asociația Agoje** (Gheorgheni, Romania) | Lines 12–16 |
| **Consortium Partners** | 1. **Asociația Agoje** (Romania, Host)<br>2. **AzorEarth** (Portugal)<br>3. **Youth Group Novae** (Czech Republic)<br>4. **Orion Fiatalok** (Hungary) | Text Block: "Partnership" |
| **Exact Mobility Dates** | **October 11, 2026 – October 22, 2026** (10 days mobility + 2 travel days) | Text Block: "Arrival Oct 11th, Departure Oct 22nd" |
| **Venue & Accommodation** | **Lacu Roșu Mountain Lodge**, Lacu Roșu, Harghita County, Transylvania, Romania (near Cheile Bicazului National Park) | Text Block: "Accommodation Where You'll Stay" |
| **Participants** | **40 youth + 8 group leaders** (10 youth + 2 leaders per delegation from RO, HU, CZ, PT) | Text Block: "Countries and Budget" |
| **Travel Logistics** | Green Travel by rented bus for HU and CZ groups; flights to Budapest/Cluj + shared bus transfer for PT | Text Block: "Transportation" |
| **Project Methodology** | 3 Phases: Digital Transformation for Ecological Action -> Hands-on Reforestation, drone mapping, sapling planting -> Reflection, Youthpass & Community Dissemination | Text Block: "What Will the Youth Exchange Look Like?" |
| **External Portal Link** | **`https://www.agoje.eu/our-projects/reforest`** | Verified Live URL |
| **Participant Testimonial** | One single testimonial attributed to **`Kemal`** | User Interview Item 10 / Item 17 |

---

### 4. Constellation Team Roster (Simplified per User Rule C)

Per the user's explicit instruction (*"Remove the titles and just put first and last name for now, that part will get its dedicated time as well"*), `SEED_TEAM` and the leadership presentation on `/about` are streamlined to first and last names only:
1. **Zeid Isaac**
2. **Roberta Szabó**
3. **Jázmin Szabó**
4. **Jordan Smith**
5. **Sajid Al Sami**

---

## PART II: Two-Pass Design & Architecture Loop (AGENTS.md Compliance)

### Pass 1 — Codebase Reconnaissance & Design Brief

#### Visual Tokens & Surfaces
- **Deep Observatory Night**: `#0B132B` (`--color-navy`)
- **Elevated Instrument / Form Surface**: `#111D3B` (`--color-nebula`)
- **Warm Alabaster Daylight**: `#F6F4EF` (`--color-offwhite`)
- **Archival Paper**: `#ECE8DF` (`--color-paper-warm`)
- **Signal Flare Vermilion**: `#E35619` (`--color-ember`)
- **Hairlines**: `rgba(11, 19, 43, 0.12)` (Daylight) / `rgba(248, 249, 250, 0.14)` (Night)

#### Typographic Scale & Editorial Hierarchy
- **Section Heading**: Space Grotesk, 32px / 26px (`type-h2`), weight 600, sentence case (`Partner with Orion`).
- **Form Kicker**: Space Grotesk, 12px (`type-eyebrow`), sentence case: `Consortium & mobility inquiries`.
- **Primary Body**: Inter, 16px (`type-body`), max line-length `<65ch`.
- **Tabular Figures**: Strict `tabular-nums` on grant numbers, dates, and contact timings.

#### ASCII Layout Wireframes

##### Wireframe 1: Partner Inquiries Hub (`InstitutionalDossier.tsx` on `/partners`)
*Replaces the previous OID/PIC table and PIF download buttons with a dedicated email inquiry system:*

```text
+---------------------------------------------------------------------------------------------------+
| [HEADER: Alabaster Daylight #F6F4EF]                                                              |
|  Consortium & mobility inquiries · Orion Fiatalok Informális Csoportja                            |
|  Partner with our Hungarian team for Erasmus+ KA1 and KA2 mobilities.                             |
+---------------------------------------------------------------------------------------------------+
| [7 COLUMNS: Direct Partner Email Form]                 | [5 COLUMNS: Direct Dispatch Box]         |
| +----------------------------------------------------+ | +--------------------------------------+ |
| | Organization name *                                | | | DIRECT DISPATCH                      | |
| | [ e.g. Asociación Aurora                         ] | | | Primary Coordinator:                 | |
| |                                                    | | | Zeid Isaac                           | |
| | Country of registration *                          | | |                                      | |
| | [ e.g. Spain                                     ] | | | Direct Email:                        | |
| |                                                    | | | zeid@orionyouth.eu                   | |
| | Contact person & title *                           | | |                                      | |
| | [ e.g. Sofia Ruiz, Project Manager               ] | | | Response Cadence:                    | |
| |                                                    | | | ~2 business days                     | |
| | Official email *                                   | | |                                      | |
| | [ e.g. sofia@aurora-youth.es                     ] | | | Host / Sending Focus:                | |
| |                                                    | | | Financial Literacy, Green Youth      | |
| | Collaboration scope / Message *                    | | | Exchanges (KA152) & Cooperation      | |
| | [ Tell us about your project concept, target     ] | | | Partnerships (KA210/KA220).          | |
| | [ timeline, and proposed role for Orion...       ] | | +--------------------------------------+ |
| |                                                    | | | Note on Credentials:                 | |
| | [ Prepare & Send Email to zeid@orionyouth.eu ]     | | | Complete institutional information   | |
| +----------------------------------------------------+ | | exchanged directly upon inquiry.     | |
|                                                        | +--------------------------------------+ |
+---------------------------------------------------------------------------------------------------+
```

##### Wireframe 2: Home Page Partner Band (`PartnerBand.tsx`)
*Replaces the 3-column credentials dock and PIF summary box with a concise, actionable partnership dock:*

```text
+---------------------------------------------------------------------------------------------------+
| [SECTION: Midnight Navy #0B132B]                                                                  |
|  For partner organisations                                                                        |
|  Orion Fiatalok Informális Csoportja collaborates with European youth NGOs, grassroots            |
|  collectives, and educational initiatives on high-impact Erasmus+ KA1 and KA2 mobilities.        |
|                                                                                                   |
|  +---------------------------------------------------------------------------------------------+  |
|  | [Direct Email Dispatch]                             | [Active Grant Reference]              |  |
|  | zeid@orionyouth.eu                                  | 2026-1-HU01-KA152-YOU-000399636       |  |
|  | Send a partnership concept directly to our team     | Accredited KA152 Youth Exchange       |  |
|  |                                                     |                                       |  |
|  | [ Email zeid@orionyouth.eu ]   [ Open Partner Form ]                                        |  |
|  +---------------------------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------------------------+
```

---

### Pass 2 — Anti-Cliché Self-Critique Gate

| Banned Pattern | Audit Check | Resolution & Enforcement |
| :--- | :--- | :--- |
| **Single-word colored spans** | Checked `PartnerBand.tsx` & `InstitutionalDossier.tsx` | All headlines remain solid typography (`#F8F9FA` on dark, `#0B132B` on light). Zero colored keyword spans. |
| **Tracked-out ALL-CAPS eyebrows** | Checked headers | Replaced with sentence-case kickers: `Consortium & mobility inquiries`. |
| **Middle-dot meta strings** | Checked metadata tags | Replaced with structured `<dl>` definition lists or individual badge chips separated by clean 1px rules. |
| **Generic SaaS shadow cards** | Checked forms & docks | Pure architectural surfaces (`bg-[#111D3B]` or `bg-[#ECE8DF]`) with 1px hairlines. No floating grey drop shadows. |
| **Chanel Rule application** | Inspected layout clutter | Removed redundant OID badges, removed 1-click PIF summary boxes, removed redundant distance band tables so primary communication actions command focus. |

---

## PART III: Comprehensive File Modification Plan

### 1. Files to Delete (Hygiene & Unused Mocks)

```text
DELETE: public/docs/orion-pif.pdf
DELETE: public/docs/infopacks/the-financial-blueprint.pdf
DELETE: public/docs/infopacks/alpine-navigators-georgia.pdf
DELETE: public/docs/infopacks/coastal-horizons-portugal.pdf
DELETE: public/docs/infopacks/danube-currents-hungary.pdf
DELETE: public/docs/infopacks/mediterranean-roots-greece.pdf
DELETE: public/docs/infopacks/nordic-lights-estonia.pdf
DELETE: public/docs/infopacks/urban-sparks-valencia.pdf
DELETE: public/images/projects/jobjam-1.jpg
DELETE: public/images/projects/jobjam-2.jpg
```

---

### 2. Files to Modify

#### A. Core Data & Types
- **[`src/types/orion.ts`](file:///c:/Users/zeid-/Documents/antigravity/elegant-mendeleev/src/types/orion.ts)**:
  - Update `OpenCall` interface: make `infopackUrl?: string` optional or nullable (so calls without released infopacks don't require dead links).
  - Update `TeamMember` interface: make `role?: string` and `bio?: string` optional to support names-only display.
  - Update `GalleryItem`: add optional documentary fields (`category`, `date`, `location`, `photographer`, `featured`).
- **[`src/lib/orionData.ts`](file:///c:/Users/zeid-/Documents/antigravity/elegant-mendeleev/src/lib/orionData.ts)**:
  - `ORION_ORG`:
    - `legalName`: `'Orion Fiatalok Informális Csoportja'`
    - `seat`: `'Debrecen, Hungary'`
    - `email`: `'zeid@orionyouth.eu'`
    - `grantReference`: `'2026-1-HU01-KA152-YOU-000399636'`
    - Remove placeholder OID `'E103XXXXX'` (or retain as optional empty string if needed for legacy tests, but clear from UI).
  - `SEED_OPEN_CALLS`:
    - `the-financial-blueprint`:
      - `startDate`: `'2026-10-05'`, `endDate`: `'2026-10-13'`
      - `city`: `'Mezőberény & Békéscsaba'`, `venue`: `'Piknik Park, Mezőberény, Hungary'`
      - `ageRange`: `'18–26'`
      - `participantsPerCountry`: `'8 participants + 2 group leaders'`
      - `partnerOrgs`: `['Orion Fiatalok (HU)', 'Asociatia Elemdiar (RO)', 'Granota Verda (ES)', 'Youth Group Novae (CZ)']`
      - `infopackUrl`: `''` (no PDF link; marked as coming soon)
      - Remove hardcoded travel reimbursement band tables.
    - `reforest-romania`:
      - `startDate`: `'2026-10-11'`, `endDate`: `'2026-10-22'`
      - `venue`: `'Lacu Roșu Mountain Lodge, Harghita, Romania'`
      - `externalFormUrl`: `'https://www.agoje.eu/our-projects/reforest'`
      - `infopackUrl`: `'https://www.agoje.eu/our-projects/reforest'`
  - `SEED_PROJECTS`:
    - `reforest`:
      - `dateLabel`: `'October 2026'`
      - `startDate`: `'2026-10-11'`, `endDate`: `'2026-10-22'`
      - `partners`: `['Asociația Agoje (RO)', 'AzorEarth (PT)', 'Youth Group Novae (CZ)', 'Orion Fiatalok (HU)']`
      - `quotes`: single quote attributed to `Kemal`:
        `{ quote: 'ReForest showed me how non-formal education makes ecological theory real, urgent, and deeply human.', name: 'Kemal', country: 'Participant' }`
      - Remove any Job Jam gallery or mentions.
    - `the-financial-blueprint`:
      - `startDate`: `'2026-10-05'`, `endDate`: `'2026-10-13'`, `dateLabel`: `'October 2026'`
      - `locationLabel`: `'Piknik Park, Mezőberény & Békéscsaba, Hungary'`
      - `partners`: `['Orion Fiatalok (HU)', 'Asociatia Elemdiar (RO)', 'Granota Verda (ES)', 'Youth Group Novae (CZ)']`
      - `impactMetrics`: `[{ label: 'Activity duration', value: '9 days' }, { label: 'Participants', value: '32' }, { label: 'Partner nations', value: '4' }, { label: 'Age cohort', value: '18–26' }]`
  - `SEED_TEAM`:
    - Updated to 5 members with first and last names only (titles omitted/cleared):
      1. `{ id: 'zeid-isaac', name: 'Zeid Isaac' }`
      2. `{ id: 'roberta-szabo', name: 'Roberta Szabó' }`
      3. `{ id: 'jazmin-szabo', name: 'Jázmin Szabó' }`
      4. `{ id: 'jordan-smith', name: 'Jordan Smith' }`
      5. `{ id: 'sajid-al-sami', name: 'Sajid Al Sami' }`

#### B. Component Overhauls
- **[`src/components/partners/InstitutionalDossier.tsx`](file:///c:/Users/zeid-/Documents/antigravity/elegant-mendeleev/src/components/partners/InstitutionalDossier.tsx)**:
  - Remove OID/PIC table and PIF download button.
  - Mount direct Partner Inquiry Email Form dispatching to `zeid@orionyouth.eu` (or generating mailto link / saving to `partnerInquiryRepository`).
  - Update organization name to `Orion Fiatalok Informális Csoportja`.
- **[`src/components/home/PartnerBand.tsx`](file:///c:/Users/zeid-/Documents/antigravity/elegant-mendeleev/src/components/home/PartnerBand.tsx)**:
  - Remove 3-column credentials dock (OID/PIF copy buttons) and PIF summary box.
  - Render concise Partnership Dispatch block with direct email link to `zeid@orionyouth.eu`, accredited grant code `2026-1-HU01-KA152-YOU-000399636`, and CTA to open the Partner Inquiry Form on `/partners`.
- **[`src/components/home/NextDeparture.tsx`](file:///c:/Users/zeid-/Documents/antigravity/elegant-mendeleev/src/components/home/NextDeparture.tsx)**:
  - Update dates to October 2026 (or upcoming scheduled cohort).
  - Update venue to `Piknik Park, Mezőberény, Hungary`.
  - Update age range to `18–26`.
  - Update Infopack link: if no PDF exists, render a quiet pill `"Infopack coming soon"` instead of a dead `/docs/infopacks/...` link.
- **[`src/app/page.tsx`](file:///c:/Users/zeid-/Documents/antigravity/elegant-mendeleev/src/app/page.tsx)**:
  - Remove `CoverageExplainer` import and component tag.
  - Update metadata description to `Orion Fiatalok Informális Csoportja`.
- **[`src/components/open-calls/CallCard.tsx`](file:///c:/Users/zeid-/Documents/antigravity/elegant-mendeleev/src/components/open-calls/CallCard.tsx) & [`src/app/open-calls/[slug]/page.tsx`](file:///c:/Users/zeid-/Documents/antigravity/elegant-mendeleev/src/app/open-calls/%5Bslug%5D/page.tsx)**:
  - Remove travel distance band tables.
  - For Infopack download: conditionally render button only if `call.infopackUrl` is present and non-empty; otherwise render `"Infopack release pending"`.
- **[`src/components/contact/ParticipantFaq.tsx`](file:///c:/Users/zeid-/Documents/antigravity/elegant-mendeleev/src/components/contact/ParticipantFaq.tsx)**:
  - Update "Do I need to pay anything to take part?" FAQ: State that accommodation, food, and activities are 100% funded by Erasmus+, with travel reimbursed. Mention that Orion may collect a small refundable participation deposit to confirm attendance, which is returned in full upon project completion.
- **[`src/components/contact/TwoModeContactForm.tsx`](file:///c:/Users/zeid-/Documents/antigravity/elegant-mendeleev/src/components/contact/TwoModeContactForm.tsx)**:
  - Replace `hello@orion-youth.eu` with `zeid@orionyouth.eu`.
- **[`src/components/about/ConstellationLeadershipGrid.tsx`](file:///c:/Users/zeid-/Documents/antigravity/elegant-mendeleev/src/components/about/ConstellationLeadershipGrid.tsx)**:
  - Update rendering to show First and Last name only, without roles/titles, per Item C.
- **[`src/components/layout/Footer.tsx`](file:///c:/Users/zeid-/Documents/antigravity/elegant-mendeleev/src/components/layout/Footer.tsx) & [`src/components/layout/Navbar.tsx`](file:///c:/Users/zeid-/Documents/antigravity/elegant-mendeleev/src/components/layout/Navbar.tsx)**:
  - Update copyright and footer labels to `Orion Fiatalok Informális Csoportja`.
  - Remove OID readout from bottom bar.
- **[`src/components/home/HeroSection.tsx`](file:///c:/Users/zeid-/Documents/antigravity/elegant-mendeleev/src/components/home/HeroSection.tsx)**:
  - Update telemetry pill to `Orion Fiatalok Informális Csoportja — Debrecen`.

---

## PART IV: Subagent Execution Partitioning

Following the Antigravity Multi-Agent Orchestration Protocol, Phase 2 is partitioned across concurrent `@engineer` tasks:

### Partition A: Data Layer, Types, & Asset Hygiene (`@engineer-A`)
**Scope & Targets:**
1. Delete target files:
   - `public/docs/orion-pif.pdf`
   - `public/docs/infopacks/*.pdf` (all 7 mock PDFs)
   - `public/images/projects/jobjam-*.jpg`
2. Update `src/types/orion.ts`:
   - `OpenCall`: `infopackUrl?: string`
   - `TeamMember`: optional `role?: string`, `bio?: string`
   - `GalleryItem`: optional `category`, `date`, `location`, `photographer`
3. Update `src/lib/orionData.ts`:
   - `ORION_ORG`: name `Orion Fiatalok Informális Csoportja`, email `zeid@orionyouth.eu`, grant confirmed.
   - `SEED_OPEN_CALLS`: The Financial Blueprint (Mezőberény, 18–26, Oct 2026, no mock PDF) & ReForest (`https://www.agoje.eu/our-projects/reforest`).
   - `SEED_PROJECTS`: ReForest (dates Oct 11–22, 2026, partners Agoje, AzorEarth, Novae, Orion Fiatalok; Kemal testimonial only) & The Financial Blueprint (Piknik Park Mezőberény).
   - `SEED_TEAM`: 5 members, names only (Zeid Isaac, Roberta Szabó, Jázmin Szabó, Jordan Smith, Sajid Al Sami).
4. Run `npm test src/lib/__tests__/` to verify data layer stability.

### Partition B: Homepage & Open Calls Realignment (`@engineer-B`)
**Scope & Targets:**
1. Update `src/app/page.tsx`:
   - Remove `CoverageExplainer` section.
   - Update metadata description to `Orion Fiatalok Informális Csoportja`.
2. Update `src/components/home/HeroSection.tsx`:
   - Telemetry pill: `Orion Fiatalok Informális Csoportja — Debrecen`.
3. Update `src/components/home/NextDeparture.tsx`:
   - TFB dates, Mezőberény venue, 18–26 age.
   - Infopack button replaced with "Infopack coming soon" badge (no dead link).
4. Update `src/components/home/ReForestStory.tsx`:
   - Kemal quote, Oct 11–22 2026 dates, Agoje link.
5. Update `src/components/home/PartnerBand.tsx`:
   - Replace OID/PIF credentials dock with direct partnership email inquiry to `zeid@orionyouth.eu` and active grant code.
6. Update `src/app/open-calls/[slug]/page.tsx` & `CallCard.tsx`:
   - Remove travel distance band tables.
   - Guard `infopackUrl` so no broken download link appears.
7. Update `src/components/contact/ParticipantFaq.tsx`:
   - Refundable participation confirmation deposit FAQ.
8. Run `npm test src/components/home/` and `src/components/open-calls/`.

### Partition C: Partners Hub, About, Contact & Layout (`@engineer-C`)
**Scope & Targets:**
1. Overhaul `src/components/partners/InstitutionalDossier.tsx`:
   - Remove OID/PIC table and PIF download button.
   - Implement direct Partner Email Inquiry Form (submitting or generating mailto to `zeid@orionyouth.eu`).
   - Clean up `PifDownloadButton.tsx` and `OidCopyButton.tsx` usage.
2. Update `src/components/contact/TwoModeContactForm.tsx`:
   - Direct dispatch email: `zeid@orionyouth.eu`.
3. Update `src/components/about/ConstellationLeadershipGrid.tsx`:
   - Render First and Last names only for the 5 members, omitting role titles.
4. Update `src/components/layout/Footer.tsx`:
   - `Orion Fiatalok Informális Csoportja`.
   - Remove OID code from bottom bar.
5. Update all impacted test files:
   - `src/components/partners/__tests__/Partners.test.tsx`
   - `src/components/home/__tests__/Home.test.tsx`
   - `src/components/contact/__tests__/Contact.test.tsx`
   - `src/components/about/__tests__/About.test.tsx`
6. Run full test suite: `npm test`.

---

## PART V: Verification Matrix & Acceptance Criteria

1. **Test Suite Integrity**:
   - Every modified test in `Partners.test.tsx`, `Home.test.tsx`, `Contact.test.tsx`, and `About.test.tsx` passes with 0 failures (`npm test`).
2. **Zero Dead Links**:
   - Zero links to `orion-pif.pdf` or `the-financial-blueprint.pdf`.
   - ReForest link points directly to `https://www.agoje.eu/our-projects/reforest`.
3. **No OID or Job Jam References**:
   - Grep search for `E103XXXXX`, `Orion Ifjúsági Egyesület`, and `jobjam` returns 0 hits in `src/`.
4. **Deposit Policy Clarity**:
   - FAQ explicitly states Erasmus+ covers 100% of mobility costs with a refundable confirmation deposit that is returned in full upon project completion.
