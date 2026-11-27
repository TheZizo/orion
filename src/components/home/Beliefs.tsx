'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { SparkleStar } from '@/components/motifs/SparkleStar';

type BeliefId = 'connection' | 'direction' | 'constellation' | 'proof';

interface BeliefPillar {
  id: BeliefId;
  num: string;
  indexLabel: string;
  instrumentLabel: string;
  diagramAria: string;
  heading: string;
}

const BELIEFS: BeliefPillar[] = [
  {
    id: 'connection',
    num: '01',
    indexLabel: '01 / 04',
    instrumentLabel: 'Shared trajectory',
    diagramAria:
      'Two separate orbital paths joined by a luminous trajectory bridge and central star',
    heading: 'Not a program, but memories, growth, and human connection.',
  },
  {
    id: 'direction',
    num: '02',
    indexLabel: '02 / 04',
    instrumentLabel: 'North bearing',
    diagramAria:
      'Celestial astrolabe compass rotating to align with a North Ember star',
    heading: 'A guide that helps you find direction.',
  },
  {
    id: 'constellation',
    num: '03',
    indexLabel: '03 / 04',
    instrumentLabel: 'Orion cluster',
    diagramAria:
      'Seven stars of the Orion constellation illuminating sequentially along connecting lines',
    heading: 'A constellation of young changemakers.',
  },
  {
    id: 'proof',
    num: '04',
    indexLabel: '04 / 04',
    instrumentLabel: 'Verified lock',
    diagramAria:
      'Concentric geodesic calibration rings locking onto a central verified beacon',
    heading: 'Real impact, backed by proof.',
  },
];

const STAR_DUST = [
  { cx: 110, cy: 48, r: 1.2, opacity: 0.28 },
  { cx: 340, cy: 92, r: 1.5, opacity: 0.22 },
  { cx: 590, cy: 36, r: 1.1, opacity: 0.36 },
  { cx: 880, cy: 74, r: 1.4, opacity: 0.24 },
  { cx: 1180, cy: 52, r: 1.3, opacity: 0.34 },
  { cx: 210, cy: 310, r: 1.4, opacity: 0.2 },
  { cx: 760, cy: 340, r: 1.2, opacity: 0.32 },
  { cx: 1090, cy: 295, r: 1.6, opacity: 0.4 },
] as const;

const COMPASS_TICKS = Array.from({ length: 24 }, (_, idx) => {
  const angleRad = (idx * 15 * Math.PI) / 180;
  const isMajor = idx % 6 === 0;
  const innerR = isMajor ? 134 : 141;
  const outerR = 148;
  return {
    x1: Number((220 + Math.cos(angleRad) * innerR).toFixed(2)),
    y1: Number((220 + Math.sin(angleRad) * innerR).toFixed(2)),
    x2: Number((220 + Math.cos(angleRad) * outerR).toFixed(2)),
    y2: Number((220 + Math.sin(angleRad) * outerR).toFixed(2)),
    isMajor,
  };
});

const ORION_STARS = [
  { name: 'Betelgeuse', x: 152, y: 118, r: 12, color: '#E35619', delay: '0.18s' },
  { name: 'Bellatrix', x: 282, y: 130, r: 9, color: '#F8F9FA', delay: '0.28s' },
  { name: 'Alnitak', x: 190, y: 222, r: 8, color: '#F8F9FA', delay: '0.38s' },
  { name: 'Alnilam', x: 220, y: 214, r: 11, color: '#E35619', delay: '0.46s' },
  { name: 'Mintaka', x: 250, y: 206, r: 8, color: '#F8F9FA', delay: '0.54s' },
  { name: 'Saiph', x: 168, y: 322, r: 9, color: '#F8F9FA', delay: '0.64s' },
  { name: 'Rigel', x: 292, y: 308, r: 11, color: '#F8F9FA', delay: '0.72s' },
] as const;

const ORION_LINES = [
  { x1: 152, y1: 118, x2: 282, y2: 130, len: 132, delay: '0s', ember: false },
  { x1: 152, y1: 118, x2: 190, y2: 222, len: 112, delay: '0.12s', ember: false },
  { x1: 282, y1: 130, x2: 250, y2: 206, len: 84, delay: '0.2s', ember: false },
  { x1: 190, y1: 222, x2: 168, y2: 322, len: 104, delay: '0.34s', ember: false },
  { x1: 250, y1: 206, x2: 292, y2: 308, len: 112, delay: '0.42s', ember: false },
  { x1: 168, y1: 322, x2: 292, y2: 308, len: 126, delay: '0.5s', ember: false },
  { x1: 190, y1: 222, x2: 220, y2: 214, len: 32, delay: '0.28s', ember: true },
  { x1: 220, y1: 214, x2: 250, y2: 206, len: 32, delay: '0.34s', ember: true },
] as const;

function starPath(cx: number, cy: number, r: number): string {
  return `M ${cx} ${cy - r} Q ${cx} ${cy} ${cx + r} ${cy} Q ${cx} ${cy} ${cx} ${cy + r} Q ${cx} ${cy} ${cx - r} ${cy} Q ${cx} ${cy} ${cx} ${cy - r} Z`;
}

function renderDiagram(id: BeliefId) {
  switch (id) {
    case 'connection':
      return (
        <g key="connection">
          <ellipse
            cx="170"
            cy="220"
            rx="96"
            ry="46"
            transform="rotate(-18 170 220)"
            stroke="rgba(248,249,250,0.22)"
            strokeWidth="1.2"
          />
          <ellipse
            cx="270"
            cy="220"
            rx="96"
            ry="46"
            transform="rotate(18 270 220)"
            stroke="rgba(248,249,250,0.22)"
            strokeWidth="1.2"
          />
          <path
            d="M 122 252 Q 220 148 318 188"
            stroke="#E35619"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="belief-trace"
            style={{ '--trace-len': 260 } as React.CSSProperties}
          />
          <g className="belief-bloom" style={{ animationDelay: '0.12s' }}>
            <circle cx="122" cy="252" r="5" fill="#F8F9FA" />
            <circle cx="122" cy="252" r="11" stroke="rgba(248,249,250,0.3)" strokeWidth="1" />
          </g>
          <g className="belief-bloom" style={{ animationDelay: '0.28s' }}>
            <circle cx="318" cy="188" r="5" fill="#E35619" />
            <circle cx="318" cy="188" r="11" stroke="rgba(227,86,25,0.45)" strokeWidth="1" />
          </g>
          <g className="belief-float">
            <circle
              cx="220"
              cy="220"
              r="24"
              fill="rgba(227,86,25,0.12)"
              stroke="rgba(227,86,25,0.38)"
              strokeWidth="1"
            />
            <path d={starPath(220, 220, 16)} fill="#E35619" />
          </g>
        </g>
      );

    case 'direction':
      return (
        <g key="direction">
          <circle
            cx="220"
            cy="220"
            r="148"
            stroke="rgba(248,249,250,0.18)"
            strokeWidth="1"
          />
          {COMPASS_TICKS.map((tick, idx) => (
            <line
              key={idx}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              stroke={tick.isMajor ? 'rgba(248,249,250,0.55)' : 'rgba(248,249,250,0.22)'}
              strokeWidth={tick.isMajor ? '1.5' : '1'}
            />
          ))}
          <circle
            cx="220"
            cy="220"
            r="100"
            stroke="rgba(248,249,250,0.24)"
            strokeWidth="1.2"
            strokeDasharray="6 8"
            className="belief-spin-slow"
          />
          <path
            d="M 220 220 L 220 72"
            stroke="rgba(227,86,25,0.55)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="belief-trace"
            style={{ '--trace-len': 160 } as React.CSSProperties}
          />
          <g className="belief-compass">
            <polygon points="220,92 230,220 220,236 210,220" fill="#E35619" />
            <polygon
              points="220,340 226,220 214,220"
              fill="rgba(248,249,250,0.28)"
            />
            <circle cx="220" cy="220" r="6" fill="#0B132B" stroke="#F8F9FA" strokeWidth="1.8" />
          </g>
          <g className="belief-bloom" style={{ animationDelay: '0.25s' }}>
            <circle cx="220" cy="60" r="14" fill="rgba(227,86,25,0.15)" />
            <path d={starPath(220, 60, 11)} fill="#E35619" />
          </g>
        </g>
      );

    case 'constellation':
      return (
        <g key="constellation">
          {ORION_LINES.map((line, idx) => (
            <line
              key={idx}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={line.ember ? '#E35619' : 'rgba(248,249,250,0.34)'}
              strokeWidth={line.ember ? '2.2' : '1.2'}
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
          {ORION_STARS.map((star) => (
            <g
              key={star.name}
              className="belief-bloom"
              style={{ animationDelay: star.delay }}
            >
              {star.color === '#E35619' && (
                <circle
                  cx={star.x}
                  cy={star.y}
                  r={star.r + 5}
                  fill="rgba(227,86,25,0.16)"
                />
              )}
              <path d={starPath(star.x, star.y, star.r)} fill={star.color} />
            </g>
          ))}
        </g>
      );

    case 'proof':
      return (
        <g key="proof">
          <circle
            cx="220"
            cy="220"
            r="58"
            stroke="rgba(248,249,250,0.26)"
            strokeWidth="1.2"
          />
          <circle
            cx="220"
            cy="220"
            r="108"
            stroke="rgba(248,249,250,0.2)"
            strokeWidth="1.2"
          />
          <circle
            cx="220"
            cy="220"
            r="158"
            stroke="rgba(248,249,250,0.15)"
            strokeWidth="1"
          />
          <circle
            cx="220"
            cy="220"
            r="158"
            stroke="rgba(227,86,25,0.45)"
            strokeWidth="1.5"
            strokeDasharray="18 28 8 24"
            className="belief-spin-slow"
          />
          <circle
            cx="220"
            cy="220"
            r="108"
            stroke="#E35619"
            strokeWidth="1.4"
            className="belief-ripple"
          />
          <path
            d="M 102 132 L 102 102 L 132 102"
            stroke="#F8F9FA"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="belief-trace"
            style={{ '--trace-len': 70 } as React.CSSProperties}
          />
          <path
            d="M 308 102 L 338 102 L 338 132"
            stroke="#F8F9FA"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="belief-trace"
            style={{ '--trace-len': 70, animationDelay: '0.1s' } as React.CSSProperties}
          />
          <path
            d="M 338 308 L 338 338 L 308 338"
            stroke="#F8F9FA"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="belief-trace"
            style={{ '--trace-len': 70, animationDelay: '0.2s' } as React.CSSProperties}
          />
          <path
            d="M 132 338 L 102 338 L 102 308"
            stroke="#F8F9FA"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="belief-trace"
            style={{ '--trace-len': 70, animationDelay: '0.3s' } as React.CSSProperties}
          />
          <text
            x="220"
            y="48"
            textAnchor="middle"
            fill="rgba(248,249,250,0.48)"
            fontSize="10"
            letterSpacing="0.12em"
          >
            N
          </text>
          <text
            x="394"
            y="224"
            textAnchor="middle"
            fill="rgba(248,249,250,0.48)"
            fontSize="10"
            letterSpacing="0.12em"
          >
            E
          </text>
          <text
            x="220"
            y="398"
            textAnchor="middle"
            fill="rgba(248,249,250,0.48)"
            fontSize="10"
            letterSpacing="0.12em"
          >
            S
          </text>
          <text
            x="46"
            y="224"
            textAnchor="middle"
            fill="rgba(248,249,250,0.48)"
            fontSize="10"
            letterSpacing="0.12em"
          >
            W
          </text>
          <circle
            cx="220"
            cy="220"
            r="22"
            fill="rgba(227,86,25,0.16)"
            stroke="rgba(227,86,25,0.45)"
            strokeWidth="1"
          />
          <path d={starPath(220, 220, 14)} fill="#E35619" />
        </g>
      );
  }
}

/**
 * Beliefs Component — Living Star Chart Observatory (#0B132B)
 *
 * Interactive 12-column split pairing Orion's 4 locked core principles
 * with a live SVG astrolabe & constellation stage.
 */
export function Beliefs() {
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
      setActiveIndex((prev) => (prev + 1) % BELIEFS.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [isPaused, isHovering, prefersReducedMotion]);

  const activeBelief = BELIEFS[activeIndex] ?? BELIEFS[0];

  const handleRowKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIdx = (idx + 1) % BELIEFS.length;
      setActiveIndex(nextIdx);
      buttonRefs.current[nextIdx]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIdx = (idx - 1 + BELIEFS.length) % BELIEFS.length;
      setActiveIndex(prevIdx);
      buttonRefs.current[prevIdx]?.focus();
    }
  };

  return (
    <section className="w-full relative overflow-hidden bg-[#0B132B] text-[#F8F9FA] py-20 md:py-28 border-y border-[rgba(248,249,250,0.12)]">
      {/* Deterministic Star-Dust Field */}
      <svg
        viewBox="0 0 1280 400"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 w-full h-full"
        fill="none"
        aria-hidden="true"
      >
        {STAR_DUST.map((star, idx) => (
          <circle
            key={idx}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill="#F8F9FA"
            opacity={star.opacity}
          />
        ))}
      </svg>

      <div className="container-orion relative z-10 space-y-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="type-h2 text-[#F8F9FA]">What we believe</h2>

          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(248,249,250,0.2)] px-3.5 py-1.5 text-xs font-display font-medium text-[rgba(248,249,250,0.84)] hover:border-[rgba(248,249,250,0.45)] hover:text-[#F8F9FA] transition-colors"
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

        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Left 6 cols: Interactive Pillar List */}
          <div className="lg:col-span-6 border-t border-[rgba(248,249,250,0.14)] min-w-0">
            {BELIEFS.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={item.id}
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
                      className="w-full relative flex items-start gap-4 py-6 sm:py-7 pl-4 pr-2 text-left cursor-pointer"
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute left-0 top-4 bottom-4 w-[2px] transition-colors duration-300 ${
                          isActive ? 'bg-[#E35619]' : 'bg-transparent'
                        }`}
                      />
                      <span className="mt-1.5 inline-flex items-center gap-2.5 shrink-0 font-display text-xs tabular-nums text-[rgba(248,249,250,0.58)]">
                        <span>{item.num}</span>
                        <SparkleStar
                          size={14}
                          color={isActive ? '#e35619' : 'rgba(248,249,250,0.3)'}
                        />
                      </span>
                      <span
                        className={`font-display text-xl sm:text-2xl font-semibold leading-snug text-left transition-all duration-300 ${
                          isActive
                            ? 'text-[#F8F9FA] translate-x-1'
                            : 'text-[rgba(248,249,250,0.44)] hover:text-[rgba(248,249,250,0.78)]'
                        }`}
                      >
                        {item.heading}
                      </span>
                    </button>
                  </h3>

                  {isActive &&
                    !isPaused &&
                    !isHovering &&
                    !prefersReducedMotion && (
                      <div
                        key={`timer-${item.id}`}
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E35619] belief-timer-bar"
                      />
                    )}
                </div>
              );
            })}
          </div>

          {/* Right 6 cols: Observatory Stage */}
          <div className="lg:col-span-6 min-w-0">
            <div className="relative max-w-[440px] mx-auto w-full">
              <div className="relative aspect-square w-full flex items-center justify-center bg-[radial-gradient(circle,rgba(29,53,107,0.45)_0%,rgba(227,86,25,0.06)_48%,transparent_72%)]">
                <svg
                  viewBox="0 0 440 440"
                  role="img"
                  aria-label={activeBelief.diagramAria}
                  className="w-full h-full block overflow-visible"
                  fill="none"
                >
                  {/* Persistent Faint Astrolabe Frame */}
                  <circle
                    cx="220"
                    cy="220"
                    r="196"
                    stroke="rgba(248,249,250,0.09)"
                    strokeWidth="1"
                  />
                  <line
                    x1="220"
                    y1="16"
                    x2="220"
                    y2="32"
                    stroke="rgba(248,249,250,0.22)"
                    strokeWidth="1.2"
                  />
                  <line
                    x1="220"
                    y1="408"
                    x2="220"
                    y2="424"
                    stroke="rgba(248,249,250,0.22)"
                    strokeWidth="1.2"
                  />
                  <line
                    x1="16"
                    y1="220"
                    x2="32"
                    y2="220"
                    stroke="rgba(248,249,250,0.22)"
                    strokeWidth="1.2"
                  />
                  <line
                    x1="408"
                    y1="220"
                    x2="424"
                    y2="220"
                    stroke="rgba(248,249,250,0.22)"
                    strokeWidth="1.2"
                  />
                  <line
                    x1="220"
                    y1="32"
                    x2="220"
                    y2="408"
                    stroke="rgba(248,249,250,0.05)"
                    strokeWidth="1"
                  />
                  <line
                    x1="32"
                    y1="220"
                    x2="408"
                    y2="220"
                    stroke="rgba(248,249,250,0.05)"
                    strokeWidth="1"
                  />

                  {renderDiagram(activeBelief.id)}
                </svg>
              </div>

              {/* Quiet Bottom Telemetry Strip */}
              <div className="mt-3 flex items-center justify-between text-xs text-[rgba(248,249,250,0.58)] font-display tabular-nums border-t border-[rgba(248,249,250,0.12)] pt-3">
                <span>{activeBelief.indexLabel}</span>
                <span>{activeBelief.instrumentLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Beliefs;
