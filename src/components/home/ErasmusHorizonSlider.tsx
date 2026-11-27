import React from 'react';
import Link from 'next/link';
import { SparkleStar } from '@/components/motifs/SparkleStar';

const KA131_ROWS = [
  { term: 'Duration', detail: '5–10 months', tabular: true },
  { term: 'Eligibility', detail: 'Enrolled uni students', tabular: false },
  { term: 'Cost', detail: 'Partial stipend, own rent', tabular: false },
  { term: 'Format', detail: 'Lectures, essays & exams', tabular: false },
] as const;

const KA152_ROWS = [
  { term: 'Duration', detail: '7–12 days', tabular: true },
  { term: 'Eligibility', detail: 'Anyone aged 18–30', tabular: true },
  { term: 'Cost', detail: '€0 lodging, food & workshops', tabular: true },
  { term: 'Format', detail: 'Hands-on labs, group leader', tabular: false },
] as const;

export function ErasmusHorizonSlider() {
  return (
    <section
      id="erasmus-horizon"
      aria-label="Erasmus Horizon Comparison"
      className="w-full bg-[#F8F9FA] text-[#0B132B] py-20 md:py-28 border-b border-[rgba(11,19,43,0.10)]"
    >
      <div className="container-orion space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2.5">
          <h2 className="type-h2 text-[#0B132B]">
            Two European paths. One is open to everyone.
          </h2>
          <p className="type-body-lg text-[rgba(11,19,43,0.80)] max-w-[65ch]">
            Not a six-month university term—an Orion Youth Exchange takes a week and costs nothing.
          </p>
        </div>

        {/* 12-Column Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left 5 Columns — Receded Borderless University semester (KA131) */}
          <div className="lg:col-span-5 py-4 lg:py-8 lg:pr-6 flex flex-col justify-between min-w-0">
            <div>
              <div className="type-eyebrow text-[#0B132B]/55">
                University semester (KA131)
              </div>
              <h3 className="type-h3 text-[#0B132B]/70 mt-1">
                Academic relocation
              </h3>
              <dl className="divide-y divide-[rgba(11,19,43,0.10)] text-sm mt-6">
                {KA131_ROWS.map((row) => (
                  <div
                    key={row.term}
                    className="py-3.5 first:pt-0 last:pb-0 flex items-baseline justify-between gap-4"
                  >
                    <dt className="text-[rgba(11,19,43,0.60)] shrink-0">
                      {row.term}
                    </dt>
                    <dd
                      className={`font-medium text-[#0B132B]/75 text-right ${
                        row.tabular ? 'tabular-nums' : ''
                      }`}
                    >
                      {row.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Right 7 Columns — Elevated Midnight Navy Orion Youth Exchange (KA152) */}
          <div className="lg:col-span-7 relative overflow-hidden bg-[#0B132B] text-[#F8F9FA] p-8 md:p-10 border-t-2 border-t-[#E35619] border-x border-b border-[#0B132B] flex flex-col justify-between min-w-0">
            {/* Subtle static corner star-dust SVG */}
            <svg
              viewBox="0 0 96 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none absolute top-4 right-5 w-24 h-20 opacity-45"
              aria-hidden="true"
            >
              <circle cx="76" cy="14" r="1.5" fill="#E35619" fillOpacity="0.85" />
              <circle cx="58" cy="24" r="1" fill="#F8F9FA" fillOpacity="0.6" />
              <circle cx="84" cy="36" r="1.25" fill="#F8F9FA" fillOpacity="0.5" />
              <circle cx="42" cy="12" r="1" fill="#F8F9FA" fillOpacity="0.4" />
              <circle cx="68" cy="48" r="1" fill="#E35619" fillOpacity="0.65" />
              <circle cx="24" cy="20" r="0.8" fill="#F8F9FA" fillOpacity="0.35" />
              <circle cx="88" cy="60" r="0.9" fill="#F8F9FA" fillOpacity="0.35" />
            </svg>

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="type-eyebrow text-[#F8F9FA]/60">
                  Orion Youth Exchange (KA152)
                </div>
                <span className="bg-[#E35619] text-[#0B132B] font-bold px-2.5 py-1 text-xs tabular-nums">
                  100% Erasmus+ funded
                </span>
              </div>
              <h3 className="type-h3 text-[#F8F9FA] mt-2">
                Short, immersive cross-border adventure
              </h3>
              <dl className="divide-y divide-[rgba(248,249,250,0.12)] text-sm mt-6">
                {KA152_ROWS.map((row) => (
                  <div
                    key={row.term}
                    className="py-3.5 first:pt-0 last:pb-0 flex items-baseline justify-between gap-4"
                  >
                    <dt className="flex items-center gap-2.5 text-[rgba(248,249,250,0.72)] shrink-0">
                      <SparkleStar size={12} color="#e35619" className="shrink-0" />
                      <span>{row.term}</span>
                    </dt>
                    <dd
                      className={`font-display text-base md:text-lg font-bold text-[#F8F9FA] text-right ${
                        row.tabular ? 'tabular-nums' : ''
                      }`}
                    >
                      {row.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Bottom CTA inside the dark panel */}
            <div className="relative z-10 pt-6 mt-6 border-t border-[rgba(248,249,250,0.12)] flex flex-wrap items-center gap-4">
              <Link
                href="/open-calls"
                className="inline-flex items-center justify-center bg-[#e35619] hover:bg-[#ff6929] text-[#0B132B] font-bold px-5 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F9FA]"
              >
                Explore open calls
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center text-sm font-medium text-[#F8F9FA]/80 hover:text-[#F8F9FA] underline underline-offset-4 transition-colors"
              >
                Learn how we support you
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ErasmusHorizonSlider;
