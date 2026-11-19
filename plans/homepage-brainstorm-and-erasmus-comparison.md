# Architectural Blueprint: Homepage Brainstorming, Erasmus+ Demystification & Factual Realignment

**Document Status:** Working Architectural Blueprint & Design Brief  
**Target File:** `plans/homepage-brainstorm-and-erasmus-comparison.md`  
**Author:** `@architect` (Systems & Frontend Architect)  
**Governing Standard:** `AGENTS.md` (Two-Pass Design & Architecture Loop)  

---

## Executive Summary

This architecture brief accomplishes two primary objectives:
1. **Immediate Factual Corrections**:
   - **The Financial Blueprint**: Venue is confirmed as **`Location TBA, Hungary`** (removing specific venue Mezőberény/Békéscsaba from public facing commitments until final contracts are signed), and timing is confirmed for **`March 2027`** (not October 2026).
   - **Leadership Team Roster**: Team member Sajid Al Sami is removed and replaced with **`Mehmet Ismail`**. The 5 core team members are: **Zeid Isaac**, **Roberta Szabó**, **Jázmin Szabó**, **Jordan Smith**, and **Mehmet Ismail**.
2. **Core Homepage Architectural Innovation — "Not the Erasmus You Think"**:
   - Directly solves the single largest user friction point in youth mobility: **over 90% of young people hear "Erasmus" and mistakenly believe they must be enrolled university students going abroad for 5–10 months at high personal expense.**
   - Details **Youth Exchanges (KA152)** vs. **University Semester Exchanges (KA131)** with 3 distinct architectural/editorial UX concepts.
   - Proposes 4 sharp narrative elevation ideas to complete the homepage narrative without cluttering the aesthetic.

---

## PART I: Factual Realignment Audit

| Subject | Previous / Temporary Code Value | User-Corrected Ground Truth | Action in Codebase (`orionData.ts`, `NextDeparture.tsx`, etc.) |
| :--- | :--- | :--- | :--- |
| **The Financial Blueprint Venue** | `Piknik Park, Mezőberény & Békéscsaba, Hungary` | **`Location TBA, Hungary`** | Revert venue and city labels to `Location TBA, Hungary` / `Hungary (Venue announced soon)`. Keep Debrecen as the coordination anchor. |
| **The Financial Blueprint Timing** | `October 5–13, 2026` | **`March 2027`** | Set `startDate: '2027-03-15'`, `endDate: '2027-03-23'`, `dateLabel: 'March 2027'` in `SEED_OPEN_CALLS` and `SEED_PROJECTS`. |
| **Team Member 5** | `Sajid Al Sami` | **`Mehmet Ismail`** | Replace `sajid-al-sami` with `mehmet-ismail` in `SEED_TEAM`. Render First and Last name only (`Mehmet Ismail`). |

### Aligned 5-Member Core Roster:
1. **Zeid Isaac**
2. **Roberta Szabó**
3. **Jázmin Szabó**
4. **Jordan Smith**
5. **Mehmet Ismail**

---

## PART II: Core Feature — Youth Exchange (KA152) vs. University Semester (KA131)

### 1. The Core Communication Problem
Across Central and Eastern Europe, the word *"Erasmus"* is almost universally associated with the **Erasmus+ Higher Education Mobility (KA131)** program:
- *"I'm not in university, so I can't participate."*
- *"I can't leave my job or family for 5 or 10 months."*
- *"I can't afford rent and living costs in another European country."*
- *"My English isn't academic enough to pass foreign university exams."*

**The Reality of Orion Youth Exchanges (KA152):**
- **Duration**: **7 to 12 days** — a focused, immersive sprint that fits around work, school, or holidays.
- **Eligibility**: Open to **any young person aged 18–30** residing in the partner countries — no student status, no diploma, and zero prior international experience required.
- **Funding**: **100% Erasmus+ covered** — lodging, 3 daily meals, local workshops, and travel ticket reimbursement are provided. Orion only requires a modest refundable attendance deposit that is returned in full upon project completion.
- **Learning Format**: **Non-formal experiential education** — outdoor challenges, team simulations, debates, intercultural cooking and dance nights, and creative labs. Zero exams, zero lectures.
- **Safety & Cohesion**: Participants travel together as a national delegation supported by a dedicated group leader.

---

### 2. Pass 1 — Codebase Reconnaissance & Design Brief

#### Visual Tokens & Palette
- **Background Surface**: Warm Alabaster Paper (`#F6F4EF`) or Archival Bento Paper (`#ECE8DF`).
- **Text & Structure**: Deep Observatory Navy (`#0B132B`) with hairline rules (`border-[rgba(11,19,43,0.12)]`).
- **Signal Accents**: Subtle Ember Orange (`#E35619`) used exclusively for active waypoint markers and live toggle beacons.
- **Typographic Scale**: Space Grotesk (`type-h2`, 32px / 26px) for the display heading; Inter (`type-body`, 16px) for comparative rows.
- **Strict Numbering**: Tabular figures (`tabular-nums`) on all durations (`7–12 days` vs. `5–10 months`) and costs (`€0` vs. `€3,000+`).

---

### 3. Three Distinct Editorial & Interactive UX Concepts

#### Concept A: The "Two European Paths" Architectural Ledger (Recommended)
*A calm, side-by-side comparative ledger with an interactive toggle that highlights the stark contrast without shouting.*

##### ASCII Wireframe (Concept A)

```text
+---------------------------------------------------------------------------------------------------+
| [SECTION: #F6F4EF Warm Alabaster Daylight]                                                        |
|                                                                                                   |
|  Kicker: Demystifying Erasmus+                                                                    |
|  Heading: Two completely different ways Europe supports young people.                             |
|  Lead: Hear the word "Erasmus" and think of a 5-month university exchange?                        |
|        That's only half the story. Here is what Orion actually does.                              |
|                                                                                                   |
|  +---------------------------------------------------------------------------------------------+  |
|  | Dimension             | University Semester (KA131)       | Orion Youth Exchange (KA152)    |  |
|  |───────────────────────|───────────────────────────────────|─────────────────────────────────|  |
|  | Duration              | 5 to 10 months (academic term)    | 7 to 12 days (compact sprint)   |  |
|  |───────────────────────|───────────────────────────────────|─────────────────────────────────|  |
|  | Who can join          | Enrolled university students only | Any young person aged 18–30     |  |
|  |                       | (strict GPA/academic criteria)    | (students, working youth, all)  |  |
|  |───────────────────────|───────────────────────────────────|─────────────────────────────────|  |
|  | Food & Accommodation  | Self-funded (find your own flat)  | 100% provided & covered         |  |
|  |                       | Partial monthly EU grant          | Shared rooms + 3 meals daily    |  |
|  |───────────────────────|───────────────────────────────────|─────────────────────────────────|  |
|  | Daily Experience      | University lectures & exam stress | Non-formal experiential labs,   |  |
|  |                       | in a foreign language             | outdoor challenges & campfires  |  |
|  |───────────────────────|───────────────────────────────────|─────────────────────────────────|  |
|  | Travel Support        | Travel alone to a new city        | Travel with your national group |  |
|  |                       | Solo navigation & paperwork       | & dedicated Orion group leader  |  |
|  |───────────────────────|───────────────────────────────────|─────────────────────────────────|  |
|  | Credential Issued     | University ECTS course credits    | European Youthpass Certificate  |  |
|  +---------------------------------------------------------------------------------------------+  |
|                                                                                                   |
|  [Reassuring Footer Pill: "No university enrollment required. 100% covered. Zero prior experience."]
+---------------------------------------------------------------------------------------------------+
```

##### Interaction States:
- **Desktop**: Full 12-column architectural matrix with subtle hover highlighting across rows.
- **Mobile (`<768px`)**: Interactive 2-tab segmented control: `[ University Semester ]` vs. `[ ● Orion Youth Exchange ]`, defaulting to Orion's model with a toggle to inspect the comparison.

---

#### Concept B: The "Myth vs. Reality" Deconstructer Deck
*A 4-card interactive bento grid tackling the top four mental objections directly.*

##### ASCII Wireframe (Concept B)

```text
+---------------------------------------------------------------------------------------------------+
| [SECTION: #ECE8DF Archival Bento Canvas]                                                          |
|  Kicker: Common misconceptions                                                                    |
|  Heading: What nobody tells you about European mobility.                                          |
|                                                                                                   |
|  [ Card 1: "I'm not in university." ]   [ Card 2: "I can't afford to live abroad." ]             |
|  Myth: Only university students go.    Myth: You need €3,000+ savings for rent.                  |
|  Reality: Open to ANY young person     Reality: Lodging, 3 meals/day, and activities             |
|  aged 18–30, employed or not.          are 100% covered by the Erasmus+ grant.                    |
|                                                                                                   |
|  [ Card 3: "I don't have 6 months." ]   [ Card 4: "My English isn't academic." ]                 |
|  Myth: It takes up half a year.        Myth: You must write academic essays.                     |
|  Reality: Mobilities last 7 to 12      Reality: Conversational English only.                     |
|  days—designed for real schedules.     Workshops use team games, movement & art.                 |
+---------------------------------------------------------------------------------------------------+
```

---

#### Concept C: The "Interactive Horizon Slider"
*A tactile interactive slider where users drag a timeline handle from "10 Days" to "10 Months", watching the requirements, cost, and lifestyle dynamically shift between Orion Youth Exchanges and University Semesters.*

---

### 4. Pass 2 — Anti-Cliché Self-Critique Gate

| Potential Cliché / AI Tell | Self-Critique Audit | Revision in Proposed Architecture |
| :--- | :--- | :--- |
| **Tracked-out ALL-CAPS kicker** | Banned: `ERASMUS+ CLARIFICATION` | Sentence-case kicker: `Demystifying Erasmus+`. |
| **Single-word color spans in headlines** | Banned: `Two completely <span class="text-orange">different</span> paths.` | Heading is pure `#0B132B`. Typographic scale provides all necessary impact. |
| **Middle-dot meta strings** | Banned: `7-12 Days · Zero Cost · 18-30 Age` | Replaced with clean tabular columns and discrete definition lists (`<dl>`). |
| **Generic SaaS pricing table styling** | Banned: Rounded cards with checkmarks/crosses and soft drop shadows. | Crisp 1px architectural grid hairlines (`border-[rgba(11,19,43,0.12)]`) matching Orion's cartographic observatory aesthetic. |
| **Truncated `line-clamp` copy** | Banned: Cutting off the explanation with ellipsis. | Clear, concise editorial copy written to fit container bounds without truncation. |

---

## PART III: Additional Homepage Narrative Brainstorming

Inspecting the complete homepage narrative flow:
1. `HeroSection`: Deep Observatory Night (`#0B132B`), 3D Celestial Orrery, core purpose statement.
2. `MotionTrailDivider`: Smooth geometric transition into Daylight Alabaster (`#F6F4EF`).
3. **NEW SECTION: "Not the Erasmus You Think"** *(Placement Recommendation 1)*: Demystifies eligibility and zero-cost funding *before* presenting specific projects!
4. `NextDeparture`: The Financial Blueprint (March 2027, Hungary, 6-day curriculum, roadmap).
5. `HowToApply`: 3 steps, 10 minutes, interactive flight-path arc.
6. `Beliefs`: 4 foundational pillars on manifesto paper (`#EAE6DC`).
7. `ReForestStory`: Verified impact proof from October 2026 with Kemal's testimonial.
8. `PartnerBand`: Direct institutional dispatch to `zeid@orionyouth.eu`.

---

### 4 High-Impact Homepage Narrative Elevators

#### Idea 1: The "First-Timer Anxiety Barrier" Reassurance Band
- **Insight**: Even when young people know a project is 100% funded and only 9 days long, the #1 reason they abandon the form is fear of traveling alone to a foreign country.
- **Proposed Feature**: A quiet, confident editorial guarantee row:
  - *National Delegation Travel*: You never travel alone; you meet your group at the station/airport and journey together.
  - *Dedicated Group Leader*: Every Orion group has an experienced youth worker by your side 24/7.
  - *Language Buddy*: No tests, no pressure; participants translate for one another in every workshop.

#### Idea 2: "A Day in Non-Formal Education" Visual Anatomy
- **Insight**: Most young people have only ever experienced traditional classroom schooling (boredom, memorization, tests). They cannot picture what "non-formal learning" actually looks like.
- **Proposed Feature**: An interactive 4-stage daily timeline widget:
  - `08:30` — Breakfast & morning energizer with peers from 4 nations.
  - `10:00` — Hands-on outdoor simulation / budgeting lab (no lectures).
  - `15:00` — Small group problem-solving & creative presentation.
  - `20:00` — Intercultural Night: traditional food, folklore, and friendships.

#### Idea 3: Interactive "Am I Eligible?" 10-Second Micro-Checker
- **Insight**: Reduces cognitive load to zero.
- **Proposed Feature**: 3 simple toggle buttons:
  - Age: `[ 18–30 ]`
  - Residence: `[ Hungary / Partner Country ]`
  - Experience: `[ First-timer ]`
  - Result: *"You are 100% eligible for Orion's March 2027 hosted exchange. 100% accommodation and food covered."*

#### Idea 4: The Orion Constellation Field Metric Strip
- **Insight**: High-density evidence replaces marketing adjectives.
- **Proposed Feature**: A disciplined 4-cell architectural metric bar between the Hero and the comparison section:
  - Cell 1: `100%` Erasmus+ Funded
  - Cell 2: `7–12 Days` Mobility Sprint Duration
  - Cell 3: `€0` University Degree Prerequisite
  - Cell 4: `March 2027` Next Hosted Convening

---

## PART IV: Implementation Architecture & File Partitions

When ready for `@engineer` execution, the work divides cleanly into the following partitions:

```text
[Phase 1: Architecture Brief] ────────► @architect (COMPLETE)
                                            │
                                            ▼
                        plans/homepage-brainstorm-and-erasmus-comparison.md
                                            │
    ┌───────────────────────────────────────┴───────────────────────────────────────┐
    ▼                                                                               ▼
[Partition A: Factual Realignment & Clean-up]                       [Partition B: Comparison Component]
@engineer                                                           @engineer
- Update src/lib/orionData.ts:                                      - Create src/components/home/ErasmusComparison.tsx
  * TFB: Location TBA, March 2027                                     * Concept A: Architectural Ledger
  * Team: Mehmet Ismail replacing Sajid Al Sami                       * Mobile responsive 2-tab switcher
- Update src/components/home/NextDeparture.tsx                      - Mount in src/app/page.tsx between
- Update src/components/about/ConstellationLeadershipGrid.tsx         HeroSection and NextDeparture
- Update test fixtures & assert 0 failures                          - Author unit test: ErasmusComparison.test.tsx
```

---

## Conclusion & Next Step

This architecture blueprint is ready for user review. Once the user selects their preferred concept for the **Youth Exchange vs. University Semester** section (Concept A recommended), execution can proceed immediately.
