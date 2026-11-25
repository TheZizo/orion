import React from 'react';
import Link from 'next/link';
import { DailyExchangeAnatomy } from '@/components/home/DailyExchangeAnatomy';

export function NextDeparture() {
  return (
    <section
      id="next-departure"
      aria-label="Next Departure and Daily Exchange Rhythm"
      className="w-full bg-[#F8F9FA] text-[#0B132B] py-20 md:py-28 border-b border-[rgba(11,19,43,0.10)]"
    >
      <div className="container-orion">
        {/* Part A: Next Departure Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 7 Columns: Blueprint Editorial Narrative & Specs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="type-eyebrow text-[#0B132B]/60">
              Next departure, March 2027
            </div>

            <h2 className="type-h2 text-[#0B132B]">
              The Financial Blueprint
            </h2>

            <p className="type-body-lg text-[rgba(11,19,43,0.85)] max-w-[65ch] leading-relaxed">
              Gain practical financial clarity, budgeting habits, and cross-cultural friendships at Orion’s hosted Youth Exchange in Hungary.
            </p>

            {/* 4-Column Key Specs Bar */}
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[rgba(11,19,43,0.12)]">
              <div>
                <dt className="text-xs text-[rgba(11,19,43,0.68)]">When</dt>
                <dd className="text-sm font-semibold text-[#0B132B] mt-1 tabular-nums">
                  March 2027 (9 days)
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[rgba(11,19,43,0.68)]">Where</dt>
                <dd className="text-sm font-semibold text-[#0B132B] mt-1">
                  Eastern Hungary
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[rgba(11,19,43,0.68)]">Who</dt>
                <dd className="text-sm font-semibold text-[#0B132B] mt-1 tabular-nums">
                  Ages 18–26 (32 youth + 8 leaders)
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[rgba(11,19,43,0.68)]">Cost</dt>
                <dd className="text-sm font-semibold text-[#0B132B] mt-1">
                  100% Erasmus+ funded
                </dd>
              </div>
            </dl>

            {/* Primary Action Row */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/open-calls/the-financial-blueprint"
                className="inline-flex items-center justify-center bg-[#e35619] hover:bg-[#ff6929] text-[#0B132B] font-bold px-6 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B]"
              >
                Register early interest
              </Link>
              <span className="border border-[rgba(11,19,43,0.16)] bg-white px-3.5 py-2 text-xs font-semibold text-[#0B132B] tabular-nums">
                Accredited Grant: 2026-1-HU01-KA152-YOU-000399636
              </span>
            </div>
          </div>

          {/* Right 5 Columns: Static Consortium & Outcome Dossier */}
          <div className="lg:col-span-5 bg-white border border-[rgba(11,19,43,0.14)] p-6 md:p-8 space-y-5">
            <div className="space-y-1.5">
              <div className="type-eyebrow text-[#0B132B]/60">
                International Consortium
              </div>
              <p className="text-sm text-[rgba(11,19,43,0.85)] leading-relaxed">
                Orion Fiatalok (Hungary), Asociația Elemdiar (Romania), Granota Verda (Spain), and Youth Group Novae (Czechia)
              </p>
            </div>

            <div className="pt-4 border-t border-[rgba(11,19,43,0.10)] space-y-1.5">
              <div className="type-eyebrow text-[#0B132B]/60">
                What You Will Master
              </div>
              <p className="text-sm text-[rgba(11,19,43,0.85)] leading-relaxed">
                Banking realities, AI budgeting tools, anti-fraud awareness, and co-publishing a practical youth financial handbook.
              </p>
            </div>

            <div className="pt-4 border-t border-[rgba(11,19,43,0.10)] space-y-1.5">
              <div className="type-eyebrow text-[#0B132B]/60">
                Official Recognition
              </div>
              <p className="text-sm text-[rgba(11,19,43,0.85)] leading-relaxed">
                Every participant receives an official European Union Youthpass Certificate validating 8 key competences for your CV.
              </p>
            </div>
          </div>
        </div>

        {/* Part B: Open 4-Column 24-Hour Exchange Rhythm */}
        <DailyExchangeAnatomy />
      </div>
    </section>
  );
}

export default NextDeparture;
