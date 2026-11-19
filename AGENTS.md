# AGENTS.md — Antigravity Agentic Workflow & Frontend Design Protocol

## 1. Two-Pass Design & Architecture Loop (MANDATORY)
Never write component code on Pass 1. For every UI or feature task, execute this exact sequence:
1. **Pass 1 — Codebase Reconnaissance & Design Brief:**
   - Inspect existing Next.js App Router files (`app/`, `components/`, `tailwind.config.*`, `globals.css`) to understand current tokens, font variables (`_31b5sa_variable`, `VfRU_W_variable`), and component boundaries before proposing changes.
   - Write a compact Design Plan specifying: Palette tokens, Typographic scale/lockups, ASCII layout wireframe, and Interaction states.
2. **Pass 2 — Anti-Cliché Self-Critique Gate:**
   - Audit your own plan against the **Banned AI Tells List** below. Explicitly state what you revised and why before touching a single `.tsx` file.
3. **Pass 3 — Modular Implementation:**
   - Isolate interactive client state (`"use client"`) into leaf components (e.g., `CelestialAtlas.tsx`, `FundingExplorer.tsx`, `PartnerDossierDock.tsx`) while keeping page layouts as fast Next.js Server Components.
4. **Pass 4 — Live DOM & Visual Verification:**
   - Run the dev server / build check (`npm run build` or typecheck) and inspect the rendered DOM at `375px` (mobile), `768px` (tablet), and `1440px` (desktop).
   - Apply the **Chanel Rule**: inspect the final layout and remove one redundant border, badge, or decorative glow per section so the hero interaction commands 100% of the visual memory.

## 2. Banned AI Design Tells (Zero Tolerance)
- **NO single-word color spans in headlines** (e.g., never do `Spark something <span class="text-[#e35619]">bigger.</span>`). Use typographic weight, scale, or an editorial serif italic shift if contrast is needed.
- **NO tracked-out ALL-CAPS eyebrow labels** above every section heading. Use sentence-case editorial kickers or numbered sequence coordinates only when the content is an actual chronological sequence.
- **NO middle-dot meta strings** (`A · B · C`) or `WORD — fragment` labels with spaced em-dashes.
- **NO `line-clamp-*` truncation on critical hero or dossier copy** that cuts off sentences mid-thought. Size containers properly and write crisp, complete copy.
- **NO generic SaaS card grids** with identical `rounded-xl` corners and soft grey drop shadows, and **NO scattered fade-up-on-scroll animations** on every block. Spend motion budgets on user-triggered physics, SVG trajectory drawing, and tactile state changes.

## 3. CSS & Tailwind Specificity Discipline
- Never mix competing spacing utilities on wrapper `.container-orion` and child grid elements that cancel each other out.
- Maintain strict `tabular-nums` on all coordinates (`47.53° N, 21.62° E`), grant codes (`2026-1-HU01-KA152-YOU-000399636`), dates, and metrics.
- Respect `prefers-reduced-motion: reduce` on all SVG stroke-dashoffset and orbital animations, and maintain visible `:focus-visible` keyboard rings on all custom SVG `<g role="button">` nodes.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
