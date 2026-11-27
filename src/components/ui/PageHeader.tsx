import React from 'react';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SparkleStar } from '@/components/motifs/SparkleStar';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  breadcrumb?: BreadcrumbItem[];
  aside?: React.ReactNode;
  children?: React.ReactNode;
  id?: string;
  className?: string;
}

// 18 deterministic fixed star coordinates (percentage based, zero Math.random to prevent hydration mismatch)
const FIXED_STARS = [
  { x: 8, y: 18, r: 1.2, o: 0.35 },
  { x: 19, y: 35, r: 0.9, o: 0.25 },
  { x: 27, y: 12, r: 1.0, o: 0.4 },
  { x: 38, y: 68, r: 1.1, o: 0.3 },
  { x: 45, y: 22, r: 0.8, o: 0.25 },
  { x: 52, y: 80, r: 1.0, o: 0.35 },
  { x: 61, y: 15, r: 1.3, o: 0.5 },
  { x: 68, y: 48, r: 0.9, o: 0.3 },
  { x: 74, y: 28, r: 1.1, o: 0.4 },
  { x: 81, y: 72, r: 0.8, o: 0.25 },
  { x: 86, y: 19, r: 1.2, o: 0.45 },
  { x: 92, y: 55, r: 1.0, o: 0.35 },
  { x: 96, y: 88, r: 0.9, o: 0.3 },
  { x: 14, y: 78, r: 0.8, o: 0.2 },
  { x: 33, y: 44, r: 1.0, o: 0.3 },
  { x: 57, y: 52, r: 0.8, o: 0.25 },
  { x: 78, y: 92, r: 1.1, o: 0.35 },
  { x: 88, y: 40, r: 0.9, o: 0.3 },
];

/**
 * PageHeader (Server Component)
 *
 * Locked editorial night band header shared by all inner pages.
 * Layout:
 * - 12-column grid inside container-orion
 * - Left 7 columns: Breadcrumb, optional Eyebrow, H1 title, Lead copy, optional children
 * - Right 4 columns (col 9–12): Optional aside slot aligned to the bottom
 * - Background: #0B132B with deterministic faint stardust and an elliptical orbit arc
 * - Bottom edge: 1px orbit-dark hairline
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  breadcrumb,
  aside,
  children,
  id,
  className = '',
}: PageHeaderProps) {
  return (
    <section
      id={id}
      className={`relative bg-[#0B132B] text-[#F8F9FA] overflow-hidden pt-16 pb-16 md:pt-24 md:pb-20 border-b border-[rgba(248,249,250,0.14)] ${className}`.trim()}
    >
      {/* Background celestial decoration: deterministic star dots and one thin elliptical orbit arc */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="page-header-graticule-fade" cx="72%" cy="48%" r="60%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="55%" stopColor="white" stopOpacity="0.55" />
              <stop offset="100%" stopColor="black" stopOpacity="0" />
            </radialGradient>
            <mask id="page-header-graticule-mask">
              <rect width="100%" height="100%" fill="url(#page-header-graticule-fade)" />
            </mask>
          </defs>

          {/* Subtle radial-masked celestial coordinate graticule */}
          <g
            mask="url(#page-header-graticule-mask)"
            fill="none"
            stroke="rgba(248,249,250,0.055)"
            strokeWidth="1"
          >
            <line x1="0%" y1="52%" x2="100%" y2="52%" />
            <line x1="72%" y1="0%" x2="72%" y2="100%" />
            <line x1="48%" y1="0%" x2="48%" y2="100%" strokeDasharray="3 6" />
            <line x1="0%" y1="26%" x2="100%" y2="26%" strokeDasharray="3 6" />
            <path d="M 420 -40 Q 920 140 1520 340" />
            <path d="M 580 420 Q 1000 180 1480 -20" />
            <path d="M 720 0 A 480 480 0 0 0 1320 420" />
          </g>

          {FIXED_STARS.map((s, idx) => (
            <circle
              key={idx}
              cx={`${s.x}%`}
              cy={`${s.y}%`}
              r={s.r}
              fill="#F8F9FA"
              opacity={s.o}
            />
          ))}
          {/* Thin elliptical orbit arc sweeping off right edge */}
          <ellipse
            cx="92%"
            cy="52%"
            rx="360"
            ry="210"
            fill="none"
            stroke="rgba(248,249,250,0.10)"
            strokeWidth="1"
          />
        </svg>

        {/* Single 10px off-white star marker sitting on the orbit arc */}
        <div className="absolute right-[18%] top-[34%] opacity-80">
          <SparkleStar size={10} color="#F8F9FA" />
        </div>
      </div>

      <div className="container-orion relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Main content block: 7 columns */}
          <div className="lg:col-span-7 space-y-4">
            {breadcrumb && breadcrumb.length > 0 && (
              <nav aria-label="Breadcrumb" className="mb-2">
                <ol className="flex flex-wrap items-center gap-2 text-[14px] font-body text-[rgba(248,249,250,0.7)]">
                  {breadcrumb.map((item, idx) => {
                    const isLast = idx === breadcrumb.length - 1;
                    return (
                      <li
                        key={idx}
                        className={`flex items-center gap-2${isLast ? ' min-w-0' : ''}`}
                      >
                        {idx > 0 && (
                          <span
                            className="text-[rgba(248,249,250,0.35)] select-none text-xs whitespace-nowrap shrink-0"
                            aria-hidden="true"
                          >
                            /
                          </span>
                        )}
                        {item.href && !isLast ? (
                          <Link
                            href={item.href}
                            className="whitespace-nowrap hover:text-[#F8F9FA] transition-colors underline-offset-4 hover:underline"
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <span
                            className={
                              isLast
                                ? 'text-[#F8F9FA] font-medium min-w-0 break-words'
                                : 'whitespace-nowrap'
                            }
                            aria-current={isLast ? 'page' : undefined}
                          >
                            {item.label}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            )}

            {eyebrow && (
              <div>
                <Eyebrow tone="dark">{eyebrow}</Eyebrow>
              </div>
            )}

            <h1 className="type-h1 text-[#F8F9FA] tracking-tight">{title}</h1>

            {lead && (
              <p className="type-body-lg text-[rgba(248,249,250,0.8)] max-w-[60ch] leading-relaxed">
                {lead}
              </p>
            )}

            {children && <div className="pt-2">{children}</div>}
          </div>

          {/* Aside block: col 9-12 aligned to bottom */}
          {aside && (
            <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end">
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PageHeader;
