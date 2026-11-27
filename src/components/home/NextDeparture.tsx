import React from 'react';
import Link from 'next/link';
import { DailyExchangeAnatomy } from '@/components/home/DailyExchangeAnatomy';

export function NextDeparture() {
  return (
    <section
      id="next-departure"
      aria-label="Next Departure and Daily Exchange Rhythm"
      className="w-full bg-[#F8F9FA] text-[#0B132B] py-16 md:py-24 border-b border-[rgba(11,19,43,0.10)]"
    >
      <div className="container-orion">
        {/* Part A: Next Departure Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left 7 Columns: Blueprint Editorial Narrative & Actions */}
          <div className="lg:col-span-7 space-y-5 min-w-0">
            <div className="type-eyebrow text-[#0B132B]/60 tabular-nums">
              Next departure, March 2027
            </div>

            <h2 className="type-h2 text-[#0B132B]">
              The Financial Blueprint
            </h2>

            <p className="type-body-lg text-[rgba(11,19,43,0.85)] max-w-[65ch] leading-relaxed">
              Nine days of practical budgeting, AI money tools, and European teamwork in Eastern Hungary.
            </p>

            {/* Primary Action Row */}
            <div className="pt-1 flex flex-wrap items-center gap-4 min-w-0">
              <Link
                href="/open-calls/the-financial-blueprint"
                className="inline-flex items-center justify-center bg-[#e35619] hover:bg-[#ff6929] text-[#0B132B] font-bold px-6 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B]"
              >
                Register early interest
              </Link>
              <span className="border border-[rgba(11,19,43,0.16)] bg-white px-3.5 py-2 text-xs font-semibold text-[#0B132B] tabular-nums">
                Grant 2026-1-HU01-KA152-YOU-000399636
              </span>
            </div>
          </div>

          {/* Right 5 Columns: 2x2 Architectural Specs & Metadata Bar */}
          <div className="lg:col-span-5 bg-white border border-[rgba(11,19,43,0.12)] min-w-0">
            <dl className="grid grid-cols-2">
              <div className="p-5 border-b border-r border-[rgba(11,19,43,0.10)]">
                <dt className="text-xs text-[rgba(11,19,43,0.68)]">When</dt>
                <dd className="text-sm font-semibold text-[#0B132B] mt-1 tabular-nums">
                  March 2027 (9 days)
                </dd>
              </div>
              <div className="p-5 border-b border-[rgba(11,19,43,0.10)]">
                <dt className="text-xs text-[rgba(11,19,43,0.68)]">Where</dt>
                <dd className="text-sm font-semibold text-[#0B132B] mt-1">
                  Eastern Hungary
                </dd>
              </div>
              <div className="p-5 border-r border-[rgba(11,19,43,0.10)]">
                <dt className="text-xs text-[rgba(11,19,43,0.68)]">Who</dt>
                <dd className="text-sm font-semibold text-[#0B132B] mt-1 tabular-nums">
                  Ages 18–26 (32 + 8)
                </dd>
              </div>
              <div className="p-5">
                <dt className="text-xs text-[rgba(11,19,43,0.68)]">Cost</dt>
                <dd className="text-sm font-semibold text-[#0B132B] mt-1">
                  100% Erasmus+ funded
                </dd>
              </div>
            </dl>

            <div className="border-t border-[rgba(11,19,43,0.10)] px-5 py-3.5 flex flex-wrap items-center justify-between gap-2 text-xs text-[rgba(11,19,43,0.72)]">
              <span>Hungary, Romania, Spain, Czechia</span>
              <span>Youthpass certified</span>
            </div>
          </div>
        </div>

        {/* Part B: 24-Hour Exchange Rhythm */}
        <DailyExchangeAnatomy />
      </div>
    </section>
  );
}

export default NextDeparture;
