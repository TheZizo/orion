# Orion — "Exceptional" design pass (frontend-design skill)

## 0. Subject, audience, job
- **Subject:** Orion Ifjúsági Egyesület, a young Erasmus+ youth NGO in Debrecen. Real track record: one completed partnership (ReForest, Romania, Oct 2026) and one upcoming hosted exchange (The Financial Blueprint, Hungary, venue TBA, Mar 2027, applications not open yet).
- **Primary audience:** 18–30 year olds who have never done an exchange. **Job:** make them feel "this is for me, it costs nothing, and I know what to do next" (register interest).
- **Secondary audience:** partner NGOs / National Agencies. **Job:** credible, quick-copy credentials.

## 1. Token system (brief-locked; restated)
| Name | Hex | Role |
|---|---|---|
| Midnight | `#0B132B` | Night canvas, text on light |
| Nebula | `#111D3B` | Elevated surface on night |
| Off-white | `#F8F9FA` | Day canvas, text on night |
| Ember | `#e35619` | ONE focal object per viewport (never text on navy, never large fills) |
| Orbit-dark | `rgba(248,249,250,0.14)` | Hairlines on night |
| Orbit-light | `rgba(11,19,43,0.10)` | Hairlines on day |

**Banned (palette violations found in audit):** any `emerald-*`, `amber-*`, `zinc-*`, `green`, `white` (use off-white), Tailwind default greys. Status is communicated by shape + word, not by extra hues.

**Type:** Space Grotesk (display/headings), Inter (body/UI). Locked scale in `globals.css` (`.type-*`).
- **No monospace anywhere.** Coordinates, dates and refs use Inter with `font-variant-numeric: tabular-nums`.
- ALL CAPS only for the ORION wordmark and the 12px eyebrow — and eyebrows are used **at most once per page** (the hero/page header). Section headings stand on their own.

## 2. Anti-template review (what we are removing and why)
The current build reads as generated because of template chrome, not because of the brand:
1. `WORD // fragment` labels (`ORBIT // 02`, `01 // NAVIGATION`, `VERIFIED METRICS // 2026`) → delete. Labels must carry information in plain words.
2. Middle-dot meta strings (`Mar 2027 · Hungary`) → use separate lines or natural commas.
3. Monospace data labels → Inter tabular figures.
4. `01–04` numbering on the four pillars → they are not a sequence; remove numbers. Numbering is kept ONLY for real sequences: the 3 application steps and the Financial Blueprint roadmap.
5. Identical bordered cards / cramped 6-column table for two rows of data → replaced by one editorial feature for the one thing that matters (the next departure).
6. Coloured check-pills, emerald/amber badges → plain-language list rows.
7. Browser focus rectangle around SVG nodes after click → circular `:focus-visible` ring only.

## 3. The one bold thing: a true 3D orrery
The hero's right side becomes a **perspective-projected orrery** — not ellipses drawn at a fixed angle, but circular orbits in a 3D plane projected through a camera:
- Rings are sampled (≈96 pts) in 3D, rotated by camera pitch/yaw, perspective-projected. Each ring is split into a **back half** (behind the core, dim) and **front half** (in front of the core, brighter) so the core genuinely sits *inside* the system.
- Pointer movement eases camera yaw (±14°) and pitch (60°–72°) — the whole system turns in space as you move. This is user-triggered motion (allowed). Reduced motion → static camera.
- Nodes are upright stars at projected positions; size and opacity scale with depth.
- **Signature load moment (the only autonomous motion on the site):** the ember shooting star leaves Debrecen and traces the arc to The Financial Blueprint (~1.8s), which then begins its gentle pulse.
- The orrery bleeds past the container toward the right viewport edge; no box, no border, no dock chrome. Below it, a single quiet caption: tab row (plain text, underline on active) + title + one sentence + one link.

Everything else on the page is quiet, disciplined, editorial.

## 4. Home page layout (top → bottom)
```
NIGHT ┌─────────────────────────────────────────────────────────────┐
      │ eyebrow                              .   ·        *          │
      │ Spark something                ╭── 3D orrery bleeding ──────│
      │ bigger.                      ✦ HQ   ✦ Financial Blueprint   │
      │ lead (brief copy)                                            │
      │ [Explore open calls] [Partner dossier]   caption: tabs/title │
      └──────────────── planetary horizon curve ─────────────────────┘
DAY   1 Next departure  — 7/5 split
        H2 "The Financial Blueprint" + payoff | roadmap (real sequence 1–4)
        <dl> When / Where / Who / Cost        | vertical trajectory line
        [Get notified when applications open] (ember, sole focal) · Read infopack
      2 It costs you nothing — 5/7 split
        H2 statement | 4 plain rows: Travel / Stay & meals / Programme / Youthpass
      3 Here's how to apply, 3 steps, 10 minutes. — 3 columns joined by one arc
      4 What we believe — single left column, 4 statements (H3) + 1 sentence each
NIGHT 5 ReForest story — full-bleed photo, navy gradient foot, participant quote,
        2 real numbers from data, "Read the ReForest story"
      6 For partner organisations — formal credentials row + PIF + dossier link
      footer
```
Alignment: everything left-aligned, 12-col grid, generous vertical rhythm (96–128px between day sections on desktop, 64px mobile).

## 5. Site-wide
- New shared `PageHeader` (night band, eyebrow once, H1, lead, optional aside slot, faint deterministic starfield + one thin orbit arc as the only decoration). All inner pages adopt it.
- Inner pages: remove the same template tells (mono, `//`, dots, extra eyebrows, non-palette colours), keep functionality and tests.

## 6. Quality floor
Responsive to 360px, visible keyboard focus everywhere (off-white ring on night, navy ring on day), reduced motion respected, AA contrast, no hydration mismatches, all existing tests green (update tests only where copy intentionally changed).
