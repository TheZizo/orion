# Architectural Blueprint: Orion Homepage Elevation ("Cartographic Observatory Meets Editorial Field Journal")

## 1. Pass 1 — Codebase Reconnaissance & Design Brief

### File & Token Audit
- **App Entry & Layout**: [`src/app/page.tsx`](file:///c:/Users/zeid-/Documents/antigravity/elegant-mendeleev/src/app/page.tsx), [`src/app/layout.tsx`](file:///c:/Users/zeid-/Documents/antigravity/elegant-mendeleev/src/app/layout.tsx), [`src/app/globals.css`](file:///c:/Users/zeid-/Documents/antigravity/elegant-mendeleev/src/app/globals.css)
- **Typography Variables**: `--font-space-grotesk` (`--font-display`) and `--font-inter` (`--font-body`), with `<68ch` (`65ch`) measure and `tabular-nums` for coordinates, grant codes, and metrics.
- **Refined Palette Tokens**:
  - **Deep Observatory Night**: `#0B132B` (primary dark surface) & `#111D3B` (elevated dark instrument surface)
  - **Warm Alabaster Paper**: `#F6F4EF` (daylight primary archival surface) & `#ECE8DF` (secondary bento/instrument surface) & `#EAE6DC` (manifesto surface)
  - **Signal Flare Vermilion**: `#E35619` (active orbital trajectories, primary triggers, live status beacons)
  - **Ionosphere Slate**: `#1D356B` (orbital vector rings and structural hairlines)

### ASCII Layout Wireframe
```text
+-----------------------------------------------------------------------------------+
| [HERO: #0B132B Deep Observatory Night]                                            |
|  [● Orion Ifjúsági Egyesület — Debrecen, 47.53° N, 21.62° E]                      |
|  Spark something *bigger.*                         (   3D Celestial Astrolabe   ) |
|  Lead paragraph (<68ch)                            (   HQ (360,210) ──► Active  ) |
|  [Explore open calls] [Partner dossier]            +-----------------------------+ |
|                                                    | 4-Cell Geodesic Telemetry   | |
|                                                    | Full Readout (No Clamp!)    | |
+-----------------------------------------------------------------------------------+
| [SECTION 2: #F6F4EF Blueprint Spec Sheet — border-x architectural frame]          |
|  Left 7 Cols: Metadata <dl> + 6-Day Programme Switcher (Day 1 .. Day 6)           |
|  Right 5 Cols: Expandable 4-Step Preparation Roadmap + Grant 2026-1-HU01-...      |
+-----------------------------------------------------------------------------------+
| [SECTION 3: #F6F4EF Zero-Cost Mobility Breakdown & Travel Band Explorer]          |
|  Left 5 Cols: Origin Band Selector + Green Travel Toggle -> Live €28–€417 Readout |
|  Right 7 Cols: 4 Core Erasmus+ Coverage Pillars                                   |
+-----------------------------------------------------------------------------------+
| [SECTION 4: #F6F4EF How to Apply — Interactive Flight-Path Track (3 Steps)]       |
|  Interactive SVG TrajectoryArc (33% / 66% / 100%) + Live Field Examples           |
+-----------------------------------------------------------------------------------+
| [SECTION 5: #EAE6DC What We Believe — 2x2 Asymmetric Editorial Manifesto Grid]    |
|  [ I. Memories & Growth (7 cols)        | II. Finding Direction (5 cols)        ] |
|  [ III. Constellation of Youth (5 cols) | IV. Real Impact & Proof (7 cols)      ] |
+-----------------------------------------------------------------------------------+
| [SECTION 6: #0B132B ReForest Field Report — Full-Bleed Lacu Roșu Photography]     |
|  [46.78° N, 25.78° E | Oct 2026 | Asociația Agoje & Orion] + Before/After Drawer  |
+-----------------------------------------------------------------------------------+
| [SECTION 7: #0B132B Consortium Verification Dock — 1-Click Copyable PIF & OID]    |
|  [Legal Name + Copy] | [Erasmus+ OID + Copy] | [Accredited Grant + Copy]          |
|  [Pre-written PIF Background Summary Snippet + 1-Click Copy]                      |
+-----------------------------------------------------------------------------------+
```

## 2. Pass 2 — Anti-Cliché Self-Critique Gate
1. **Removed single-word orange headline span**: Replaced `<span class="text-[#e35619]">bigger.</span>` in `HeroSection.tsx` with an editorial italic serif shift in warm alabaster (`#F6F4EF`).
2. **Removed tracked-out ALL-CAPS eyebrow**: Replaced `"INTERNATIONAL YOUTH INITIATIVE"` with the sentence-case telemetry pill `"Orion Ifjúsági Egyesület — Debrecen, 47.53° N, 21.62° E"`.
3. **Eliminated `line-clamp-2` truncation bug**: Removed `line-clamp-2` from `NodeInspector.tsx` so `<aside aria-live="polite">` never clips mission copy mid-sentence.
4. **Broke up sterile `#F8F9FA` repetition**: Shifted daylight sections to Warm Alabaster Paper (`#F6F4EF`), secondary interactive docks to `#ECE8DF`, and the Manifesto Grid to `#EAE6DC` with 2x2 asymmetric architectural hairlines.

## 3. Parallel File Partitions
- **Partition A (`@engineer`)**: `src/app/globals.css`, `src/app/layout.tsx`, `src/components/motifs/MotionTrailDivider.tsx`, `src/components/home/HeroSection.tsx`, `src/components/motifs/CelestialAtlas.tsx`, `src/components/motifs/NodeInspector.tsx`
- **Partition B (`@engineer`)**: `src/components/home/NextDeparture.tsx`, `src/components/home/CoverageExplainer.tsx`, `src/components/home/HowToApply.tsx`, `src/components/home/Beliefs.tsx`
- **Partition C (`@engineer`)**: `src/components/home/ReForestStory.tsx`, `src/components/home/PartnerBand.tsx`, `src/components/home/__tests__/Home.test.tsx`, `src/components/motifs/__tests__/CelestialAtlas.test.tsx`
