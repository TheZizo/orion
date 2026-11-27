'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { SparkleStar } from '@/components/motifs/SparkleStar';

type PillarId = 'pedagogy' | 'management' | 'communication' | 'inclusion';

interface OperationalPillar {
  id: PillarId;
  num: string;
  indexLabel: string;
  instrumentLabel: string;
  diagramAria: string;
  heading: string;
  summary: string;
  credential: string;
}

const PILLARS: OperationalPillar[] = [
  {
    id: 'pedagogy',
    num: '01',
    indexLabel: '01 / 04',
    instrumentLabel: 'Pedagogy & alumni',
    diagramAria: 'Twin intersecting cultural arcs linked by a central Ember bridge',
    heading: 'Cross-cultural pedagogy and educational integration',
    summary:
      'International educators actively teaching English in Hungarian schools combine hands-on classroom craft with firsthand Erasmus+ alumni insight to design structured, culturally attuned workshops.',
    credential: 'Active English educators in Hungarian schools & Erasmus+ alumni',
  },
  {
    id: 'management',
    num: '02',
    indexLabel: '02 / 04',
    instrumentLabel: 'Operations & rigor',
    diagramAria: 'Interlocking orbital gear rings and milestone tick rail',
    heading: 'Project management and organizational structure',
    summary:
      'Backgrounds in business administration, sports coaching, and AIESEC leadership bring deadline discipline, crisis-response fundraising experience, and reliable logistics to every mobility.',
    credential: 'Business administration, sports coaching & AIESEC logistics',
  },
  {
    id: 'communication',
    num: '03',
    indexLabel: '03 / 04',
    instrumentLabel: 'Archive & outreach',
    diagramAria: 'Radiating signal waves expanding from an Orion star beacon',
    heading: 'Advanced communication and information management',
    summary:
      'Specialists in ELTE Library Science and student-union PR build clear editorial, visual, and archiving workflows so project outcomes reach youth across Hungary.',
    credential: 'ELTE Information & Library Science, Knowledge Management & PR',
  },
  {
    id: 'inclusion',
    num: '04',
    indexLabel: '04 / 04',
    instrumentLabel: 'Welfare & access',
    diagramAria: 'Concentric protective rings uniting a five-star youth cluster',
    heading: 'Social inclusion and participant welfare',
    summary:
      'Years of grassroots NGO fieldwork, special-needs facilitation at Lady of Peace, and HÖOK Diaspora Mentoring equip Orion to safely support youth with fewer opportunities.',
    credential: 'Bangladesh NGO fieldwork, Lady of Peace & HÖOK Diaspora Mentoring',
  },
];

const MILESTONE_TICKS = [48, 86, 124, 162, 200, 238, 276, 312] as const;

const INCLUSION_CLUSTER_STARS = [
  { cx: 180, cy: 90, r: 10, color: '#E35619', delay: '0.08s' },
  { cx: 146, cy: 66, r: 7, color: '#F8F9FA', delay: '0.18s' },
  { cx: 214, cy: 66, r: 7, color: '#F8F9FA', delay: '0.26s' },
  { cx: 152, cy: 114, r: 7, color: '#F8F9FA', delay: '0.34s' },
  { cx: 208, cy: 114, r: 7, color: '#E35619', delay: '0.42s' },
] as const;

const INCLUSION_FILAMENTS = [
  { x1: 146, y1: 66, x2: 180, y2: 90, len: 42, delay: '0.05s' },
  { x1: 214, y1: 66, x2: 180, y2: 90, len: 42, delay: '0.12s' },
  { x1: 152, y1: 114, x2: 180, y2: 90, len: 38, delay: '0.18s' },
  { x1: 208, y1: 114, x2: 180, y2: 90, len: 38, delay: '0.24s' },
] as const;

function starPath(cx: number, cy: number, r: number): string {
  return `M ${cx} ${cy - r} Q ${cx} ${cy} ${cx + r} ${cy} Q ${cx} ${cy} ${cx} ${cy + r} Q ${cx} ${cy} ${cx - r} ${cy} Q ${cx} ${cy} ${cx} ${cy - r} Z`;
}

function renderPillarDiagram(id: PillarId) {
  switch (id) {
    case 'pedagogy':
      return (
        <g key="pedagogy">
          <ellipse
            cx="132"
            cy="90"
            rx="72"
            ry="44"
            transform="rotate(-12 132 90)"
            stroke="rgba(248,249,250,0.22)"
            strokeWidth="1.2"
          />
          <ellipse
            cx="228"
            cy="90"
            rx="72"
            ry="44"
            transform="rotate(12 228 90)"
            stroke="rgba(248,249,250,0.22)"
            strokeWidth="1.2"
          />
          <path
            d="M 96 112 Q 180 34 264 68"
            stroke="#E35619"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="belief-trace"
            style={{ '--trace-len': 220 } as React.CSSProperties}
          />
          <g className="belief-bloom" style={{ animationDelay: '0.1s' }}>
            <circle cx="96" cy="112" r="4.5" fill="#F8F9FA" />
            <circle cx="96" cy="112" r="10" stroke="rgba(248,249,250,0.3)" strokeWidth="1" />
          </g>
          <g className="belief-bloom" style={{ animationDelay: '0.24s' }}>
            <circle cx="264" cy="68" r="4.5" fill="#E35619" />
            <circle cx="264" cy="68" r="10" stroke="rgba(227,86,25,0.45)" strokeWidth="1" />
          </g>
          <g className="belief-float">
            <circle
              cx="180"
              cy="90"
              r="18"
              fill="rgba(227,86,25,0.14)"
              stroke="rgba(227,86,25,0.4)"
              strokeWidth="1"
            />
            <path d={starPath(180, 90, 12)} fill="#E35619" />
          </g>
        </g>
      );

    case 'management':
      return (
        <g key="management">
          {/* Primary and secondary interlocking orbital gear rings */}
          <circle
            cx="144"
            cy="74"
            r="46"
            stroke="rgba(248,249,250,0.2)"
            strokeWidth="1.2"
          />
          <circle
            cx="144"
            cy="74"
            r="36"
            stroke="rgba(227,86,25,0.55)"
            strokeWidth="1.5"
            strokeDasharray="10 8"
            className="belief-spin-slow"
          />
          <circle
            cx="224"
            cy="82"
            r="34"
            stroke="rgba(248,249,250,0.22)"
            strokeWidth="1.2"
          />
          <circle
            cx="224"
            cy="82"
            r="24"
            stroke="rgba(248,249,250,0.42)"
            strokeWidth="1.2"
            strokeDasharray="6 6"
            className="belief-spin-slow"
          />
          <g className="belief-bloom" style={{ animationDelay: '0.12s' }}>
            <circle cx="144" cy="74" r="12" fill="rgba(227,86,25,0.16)" />
            <path d={starPath(144, 74, 8)} fill="#E35619" />
          </g>
          <g className="belief-bloom" style={{ animationDelay: '0.24s' }}>
            <circle cx="224" cy="82" r="5" fill="#F8F9FA" />
          </g>

          {/* Milestone tick rail */}
          <line
            x1="48"
            y1="146"
            x2="312"
            y2="146"
            stroke="rgba(248,249,250,0.2)"
            strokeWidth="1"
          />
          <line
            x1="48"
            y1="146"
            x2="238"
            y2="146"
            stroke="#E35619"
            strokeWidth="2"
            strokeLinecap="round"
            className="belief-trace"
            style={{ '--trace-len': 200 } as React.CSSProperties}
          />
          {MILESTONE_TICKS.map((x, idx) => (
            <line
              key={x}
              x1={x}
              y1={idx % 2 === 0 ? 138 : 141}
              x2={x}
              y2={154}
              stroke={x <= 238 ? 'rgba(248,249,250,0.65)' : 'rgba(248,249,250,0.25)'}
              strokeWidth={idx % 2 === 0 ? '1.4' : '1'}
            />
          ))}
        </g>
      );

    case 'communication':
      return (
        <g key="communication">
          {/* Beacon ripples */}
          <circle
            cx="94"
            cy="90"
            r="26"
            stroke="rgba(227,86,25,0.55)"
            strokeWidth="1.2"
            className="belief-ripple"
          />
          <g className="belief-float">
            <circle
              cx="94"
              cy="90"
              r="16"
              fill="rgba(227,86,25,0.16)"
              stroke="rgba(227,86,25,0.45)"
              strokeWidth="1"
            />
            <path d={starPath(94, 90, 11)} fill="#E35619" />
          </g>

          {/* Radiating signal waves */}
          <path
            d="M 136 56 A 48 48 0 0 1 136 124"
            stroke="rgba(248,249,250,0.55)"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="belief-trace"
            style={{ '--trace-len': 100, animationDelay: '0.05s' } as React.CSSProperties}
          />
          <path
            d="M 164 40 A 72 72 0 0 1 164 140"
            stroke="rgba(227,86,25,0.75)"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="belief-trace"
            style={{ '--trace-len': 140, animationDelay: '0.16s' } as React.CSSProperties}
          />
          <path
            d="M 192 24 A 96 96 0 0 1 192 156"
            stroke="rgba(248,249,250,0.34)"
            strokeWidth="1.4"
            strokeLinecap="round"
            className="belief-trace"
            style={{ '--trace-len': 185, animationDelay: '0.28s' } as React.CSSProperties}
          />

          {/* Receiving dissemination nodes */}
          <line
            x1="216"
            y1="62"
            x2="274"
            y2="48"
            stroke="rgba(248,249,250,0.2)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <line
            x1="224"
            y1="90"
            x2="290"
            y2="90"
            stroke="rgba(248,249,250,0.25)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <line
            x1="216"
            y1="118"
            x2="274"
            y2="132"
            stroke="rgba(248,249,250,0.2)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <g className="belief-bloom" style={{ animationDelay: '0.25s' }}>
            <circle cx="274" cy="48" r="5" fill="#F8F9FA" />
            <circle cx="274" cy="48" r="10" stroke="rgba(248,249,250,0.26)" strokeWidth="1" />
          </g>
          <g className="belief-bloom" style={{ animationDelay: '0.35s' }}>
            <circle cx="290" cy="90" r="6" fill="#E35619" />
            <circle cx="290" cy="90" r="12" stroke="rgba(227,86,25,0.42)" strokeWidth="1" />
          </g>
          <g className="belief-bloom" style={{ animationDelay: '0.45s' }}>
            <circle cx="274" cy="132" r="5" fill="#F8F9FA" />
            <circle cx="274" cy="132" r="10" stroke="rgba(248,249,250,0.26)" strokeWidth="1" />
          </g>
        </g>
      );

    case 'inclusion':
      return (
        <g key="inclusion">
          {/* Concentric protective rings */}
          <circle
            cx="180"
            cy="90"
            r="72"
            stroke="rgba(248,249,250,0.22)"
            strokeWidth="1.2"
            strokeDasharray="12 10"
            className="belief-spin-slow"
          />
          <circle
            cx="180"
            cy="90"
            r="52"
            stroke="rgba(248,249,250,0.18)"
            strokeWidth="1"
          />
          <circle
            cx="180"
            cy="90"
            r="52"
            stroke="#E35619"
            strokeWidth="1.4"
            className="belief-ripple"
          />

          {/* Constellation filaments uniting the 5-star cluster */}
          {INCLUSION_FILAMENTS.map((line, idx) => (
            <line
              key={idx}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="rgba(248,249,250,0.34)"
              strokeWidth="1.2"
              strokeLinecap="round"
              className="belief-trace"
              style={
                {
                  '--trace-len': line.len,
                  animationDelay: line.delay,
                } as React.CSSProperties
              }
            />
          ))}

          {/* Five-star youth cluster */}
          {INCLUSION_CLUSTER_STARS.map((star, idx) => (
            <g
              key={idx}
              className="belief-bloom"
              style={{ animationDelay: star.delay }}
            >
              {star.color === '#E35619' && (
                <circle
                  cx={star.cx}
                  cy={star.cy}
                  r={star.r + 5}
                  fill="rgba(227,86,25,0.15)"
                />
              )}
              <path d={starPath(star.cx, star.cy, star.r)} fill={star.color} />
            </g>
          ))}
        </g>
      );
  }
}

/**
 * OperationalPillarsObservatory
 *
 * Interactive 12-column observatory console pairing Orion's four operational pillars
 * with live SVG astrolabe instrumentation and WCAG 2.2.2 motion controls.
 */
export function OperationalPillarsObservatory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    syncPreference();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncPreference);
      return () => mediaQuery.removeEventListener('change', syncPreference);
    }

    mediaQuery.addListener(syncPreference);
    return () => mediaQuery.removeListener(syncPreference);
  }, []);

  useEffect(() => {
    if (
      isPaused ||
      isHovering ||
      prefersReducedMotion ||
      process.env.NODE_ENV === 'test'
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PILLARS.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [isPaused, isHovering, prefersReducedMotion]);

  const activePillar = PILLARS[activeIndex] ?? PILLARS[0];
  const isAutoCycling = !isPaused && !isHovering && !prefersReducedMotion;

  const handleRowKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIdx = (idx + 1) % PILLARS.length;
      setActiveIndex(nextIdx);
      buttonRefs.current[nextIdx]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIdx = (idx - 1 + PILLARS.length) % PILLARS.length;
      setActiveIndex(prevIdx);
      buttonRefs.current[prevIdx]?.focus();
    }
  };

  return (
    <div className="space-y-10">
      {/* Header Row */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          <div className="type-eyebrow text-[rgba(248,249,250,0.7)]">
            Operational foundations
          </div>
          <h2 className="type-h2 text-[#F8F9FA]">
            Four pillars of operational capacity
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setIsPaused((p) => !p)}
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(248,249,250,0.2)] px-3.5 py-1.5 text-xs font-display font-medium text-[rgba(248,249,250,0.84)] hover:border-[rgba(248,249,250,0.45)] hover:text-[#F8F9FA] transition-colors cursor-pointer"
        >
          {isPaused ? (
            <>
              <Play className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Play motion</span>
            </>
          ) : (
            <>
              <Pause className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Pause motion</span>
            </>
          )}
        </button>
      </div>

      {/* 12-Column Split */}
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Left 6 cols: Interactive Pillar List */}
        <div className="lg:col-span-6 border-t border-[rgba(248,249,250,0.14)] min-w-0">
          {PILLARS.map((pillar, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={pillar.id}
                className="border-b border-[rgba(248,249,250,0.14)] relative"
              >
                <h3 className="m-0">
                  <button
                    ref={(el) => {
                      buttonRefs.current[idx] = el;
                    }}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onFocus={() => setActiveIndex(idx)}
                    onKeyDown={(e) => handleRowKeyDown(e, idx)}
                    aria-current={isActive ? 'true' : undefined}
                    className="w-full relative flex items-start gap-4 py-5 sm:py-6 pl-4 pr-2 text-left cursor-pointer"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-4 bottom-4 w-[2px] transition-colors duration-300 ${
                        isActive ? 'bg-[#E35619]' : 'bg-transparent'
                      }`}
                    />
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-flex items-center gap-2.5 shrink-0 font-display text-xs tabular-nums text-[rgba(248,249,250,0.58)]"
                    >
                      <span>{pillar.num}</span>
                      <SparkleStar
                        size={14}
                        color={isActive ? '#e35619' : 'rgba(248,249,250,0.3)'}
                      />
                    </span>
                    <span
                      className={`font-display text-lg sm:text-xl font-semibold leading-snug text-left transition-all duration-300 ${
                        isActive
                          ? 'text-[#F8F9FA] translate-x-1'
                          : 'text-[rgba(248,249,250,0.48)] hover:text-[rgba(248,249,250,0.8)]'
                      }`}
                    >
                      {pillar.heading}
                    </span>
                  </button>
                </h3>

                {isActive && isAutoCycling && (
                  <div
                    key={`timer-${pillar.id}`}
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E35619] belief-timer-bar"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Right 6 cols: Translucent Observatory Console */}
        <div className="lg:col-span-6 min-w-0">
          <div className="bg-[#111D3B]/70 backdrop-blur-md border border-[#1D356B] border-t-2 border-t-[#E35619] p-6 sm:p-8 space-y-6">
            {/* Top Animated SVG Instrument */}
            <div className="space-y-3">
              <div className="text-xs font-display text-[rgba(248,249,250,0.62)]">
                {activePillar.instrumentLabel}
              </div>
              <div className="w-full bg-[radial-gradient(circle,rgba(29,53,107,0.42)_0%,rgba(227,86,25,0.05)_52%,transparent_75%)]">
                <svg
                  viewBox="0 0 360 180"
                  role="img"
                  aria-label={activePillar.diagramAria}
                  className="w-full h-auto block overflow-visible"
                  fill="none"
                >
                  {/* Faint instrument frame corner ticks */}
                  <path
                    d="M 14 28 L 14 14 L 28 14"
                    stroke="rgba(248,249,250,0.18)"
                    strokeWidth="1"
                  />
                  <path
                    d="M 332 14 L 346 14 L 346 28"
                    stroke="rgba(248,249,250,0.18)"
                    strokeWidth="1"
                  />
                  <path
                    d="M 14 152 L 14 166 L 28 166"
                    stroke="rgba(248,249,250,0.18)"
                    strokeWidth="1"
                  />
                  <path
                    d="M 332 166 L 346 166 L 346 152"
                    stroke="rgba(248,249,250,0.18)"
                    strokeWidth="1"
                  />
                  {renderPillarDiagram(activePillar.id)}
                </svg>
              </div>
            </div>

            {/* Middle: Pillar Summary */}
            <p className="type-body text-[rgba(248,249,250,0.86)] leading-relaxed">
              {activePillar.summary}
            </p>

            {/* Bottom Telemetry Strip */}
            <div className="border-t border-[rgba(248,249,250,0.14)] pt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[rgba(248,249,250,0.65)] font-display tabular-nums">
              <span>{activePillar.credential}</span>
              <span>{activePillar.indexLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OperationalPillarsObservatory;
