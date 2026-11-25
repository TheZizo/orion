import React from 'react';
import Link from 'next/link';
import { SparkleStar } from '@/components/motifs/SparkleStar';

export function ErasmusHorizonSlider() {
  return (
    <section
      id="erasmus-horizon"
      aria-label="Erasmus Horizon Comparison"
      className="w-full bg-[#F8F9FA] text-[#0B132B] py-20 md:py-28 border-b border-[rgba(11,19,43,0.10)]"
    >
      <div className="container-orion space-y-12">
        {/* Section Header (Left-aligned, max-w-3xl space-y-3) */}
        <div className="max-w-3xl space-y-3">
          <div className="type-eyebrow text-[#0B132B]/60">
            Demystifying Erasmus+
          </div>
          <h2 className="type-h2 text-[#0B132B]">
            Two European paths. One is open to everyone.
          </h2>
          <p className="type-body-lg text-[rgba(11,19,43,0.80)] max-w-[65ch] leading-relaxed">
            Hear the word “Erasmus” and picture a 6-month university term with high rent? That is KA131. Orion runs KA152 Youth Exchanges: 7 to 12 days, 100% funded, zero university enrollment required.
          </p>
        </div>

        {/* 12-Column Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">
          {/* Left 5 Columns — The Common Misconception */}
          <div className="lg:col-span-5 bg-white border border-[rgba(11,19,43,0.12)] p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <div className="type-eyebrow text-[#0B132B]/60">
                  University semester (KA131)
                </div>
                <h3 className="type-h3 text-[#0B132B]/75 mt-1">
                  Academic relocation
                </h3>
              </div>
              <ul className="divide-y divide-[rgba(11,19,43,0.08)] text-sm text-[rgba(11,19,43,0.75)]">
                <li className="py-3.5 first:pt-0 last:pb-0">
                  <span className="font-semibold text-[#0B132B] tabular-nums">5 to 10 months:</span>{' '}
                  Full semester away from home and work.
                </li>
                <li className="py-3.5 first:pt-0 last:pb-0">
                  <span className="font-semibold text-[#0B132B]">University students only:</span>{' '}
                  Requires active degree enrollment and GPA transcripts.
                </li>
                <li className="py-3.5 first:pt-0 last:pb-0">
                  <span className="font-semibold text-[#0B132B] tabular-nums">Partial monthly stipend:</span>{' '}
                  Requires €3,000+ in personal savings for private rent.
                </li>
                <li className="py-3.5 first:pt-0 last:pb-0">
                  <span className="font-semibold text-[#0B132B]">Formal university lectures:</span>{' '}
                  Academic coursework, essays, and final exams.
                </li>
                <li className="py-3.5 first:pt-0 last:pb-0">
                  <span className="font-semibold text-[#0B132B]">Solo navigation:</span>{' '}
                  You relocate and handle foreign housing contracts alone.
                </li>
              </ul>
            </div>
          </div>

          {/* Right 7 Columns — The Orion Reality */}
          <div className="lg:col-span-7 bg-[#0B132B] text-[#F8F9FA] p-8 md:p-10 flex flex-col justify-between border border-[#0B132B]">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="type-eyebrow text-[#F8F9FA]/60">
                  Orion Youth Exchange (KA152)
                </div>
                <span className="bg-[#E35619] text-[#0B132B] font-bold px-2.5 py-1 text-xs tabular-nums">
                  100% Erasmus+ funded
                </span>
              </div>
              <div>
                <h3 className="type-h3 text-[#F8F9FA] mt-1">
                  Short, immersive cross-border adventure
                </h3>
              </div>
              <ul className="divide-y divide-[rgba(248,249,250,0.12)] text-sm text-[#F8F9FA]/85">
                <li className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3">
                  <SparkleStar size={14} color="#e35619" className="shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-[#F8F9FA] tabular-nums">7 to 12 days:</span>{' '}
                    Fits cleanly between school terms, jobs, or annual leave.
                  </div>
                </li>
                <li className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3">
                  <SparkleStar size={14} color="#e35619" className="shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-[#F8F9FA] tabular-nums">Open to anyone aged 18–30:</span>{' '}
                    No university enrollment, diploma, or prior experience needed.
                  </div>
                </li>
                <li className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3">
                  <SparkleStar size={14} color="#e35619" className="shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-[#F8F9FA] tabular-nums">€0 out-of-pocket lodging & food:</span>{' '}
                    Accommodation, 3 meals a day, and workshops are 100% covered, with travel tickets reimbursed.
                  </div>
                </li>
                <li className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3">
                  <SparkleStar size={14} color="#e35619" className="shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-[#F8F9FA]">Non-formal learning:</span>{' '}
                    Outdoor challenges, simulations, and creative teamwork—zero lectures or exams.
                  </div>
                </li>
                <li className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3">
                  <SparkleStar size={14} color="#e35619" className="shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-[#F8F9FA]">Never travel alone:</span>{' '}
                    You travel as a Hungarian delegation with an experienced Orion group leader guiding you 24/7.
                  </div>
                </li>
              </ul>
            </div>

            {/* Bottom CTA inside the dark panel */}
            <div className="pt-8 mt-8 border-t border-[rgba(248,249,250,0.12)] flex flex-wrap items-center gap-4">
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
