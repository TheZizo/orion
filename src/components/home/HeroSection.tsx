import React from 'react';
import Link from 'next/link';
import { CelestialAtlas } from '@/components/motifs/CelestialAtlas';

/**
 * Deterministic celestial star-dust coordinates for hero background.
 * Fixed non-random positions prevent SSR hydration mismatch.
 */
const STATIC_STAR_DUST = [
  { top: '8%', left: '4%', size: 2, opacity: 0.25 },
  { top: '15%', left: '22%', size: 1.5, opacity: 0.35 },
  { top: '28%', left: '11%', size: 2, opacity: 0.2 },
  { top: '42%', left: '38%', size: 1, opacity: 0.3 },
  { top: '65%', left: '7%', size: 2.5, opacity: 0.25 },
  { top: '80%', left: '25%', size: 1.5, opacity: 0.2 },
  { top: '12%', left: '55%', size: 2, opacity: 0.15 },
  { top: '35%', left: '75%', size: 1.5, opacity: 0.2 },
  { top: '85%', left: '60%', size: 2, opacity: 0.25 },
  { top: '92%', left: '88%', size: 1, opacity: 0.3 },
];

/**
 * HeroSection Component — Option 2: "The Orbital System" (Editorial Sculpture)
 *
 * Grounded on Midnight Navy (#0B132B) night-sky canvas.
 * Perfectly poised 12-column 5 / 7 layout:
 * - Left 5 cols: Quiet editorial statement with Eyebrow, Display headline with locked
 *   Ember Orange keyword "bigger.", verbatim lead copy, and high-contrast dual CTAs.
 * - Right 7 cols: Floating 3D Tilted Elliptical Celestial Atlas & Sleek Glass Dock.
 * - Atmospheric cosmic nebula glow radiating behind the right stage.
 */
export function HeroSection() {
  return (
    <section className="relative w-full bg-[#0B132B] text-[#F8F9FA] overflow-hidden">
      {/* Deterministic Star Dust Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10" aria-hidden="true">
        {STATIC_STAR_DUST.map((star, idx) => (
          <span
            key={`stardust-${idx}`}
            className="absolute rounded-full bg-[#F8F9FA]"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* Atmospheric Cosmic Ambient Glow behind right planetary system */}
      <div
        className="pointer-events-none absolute -right-[5%] top-[10%] w-[640px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(29,53,107,0.55)_0%,rgba(227,86,25,0.08)_40%,transparent_72%)] blur-2xl z-0"
        aria-hidden="true"
      />

      <div className="container-orion py-10 md:py-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left 5 Columns: Pure Editorial Poise & Breathing Room */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 bg-[#111D3B] border border-[#1D356B] text-xs text-[#F8F9FA]">
              <span className="w-2 h-2 rounded-full bg-[#E35619] animate-pulse" aria-hidden="true" />
              <span>Orion Fiatalok Informális Csoportja, Debrecen</span>
            </div>

            <h1 className="type-display text-[#F8F9FA] tracking-[-0.02em]">
              Spark something <span className="text-[#e35619]">bigger.</span>
            </h1>

            <p className="type-body-lg text-[rgba(248,249,250,0.85)] leading-relaxed max-w-[65ch]">
              Orion helps young people find direction, cross borders, and grow, together. We are a constellation of young changemakers turning European mobility into memories, growth, and human connection.
            </p>

            {/* Dual CTAs: Off-White Primary (respecting single-orange budget) + Outline Secondary */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/open-calls"
                className="inline-flex items-center justify-center bg-[#F8F9FA] text-[#0B132B] font-bold text-base px-6 py-3 rounded-none hover:bg-white active:bg-zinc-200 transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F9FA]"
              >
                Explore open calls
              </Link>
              <Link
                href="/partners"
                className="inline-flex items-center justify-center border border-[rgba(248,249,250,0.25)] text-[#F8F9FA] font-semibold text-base px-6 py-3 rounded-none hover:bg-[rgba(248,249,250,0.08)] hover:border-[rgba(248,249,250,0.5)] transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F9FA]"
              >
                Partner dossier
              </Link>
            </div>
          </div>

          {/* Right 7 Columns: Floating 3D Celestial Sculpture & Glass Dock */}
          <div className="lg:col-span-7 w-full">
            <CelestialAtlas />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
