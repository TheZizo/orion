import React from 'react';
import { SparkleStar } from '@/components/motifs/SparkleStar';

interface BeliefPillar {
  heading: string;
  sentence: string;
  spanClass: string;
}

const BELIEFS: BeliefPillar[] = [
  {
    heading: 'Not a program, but memories, growth, and human connection.',
    sentence:
      'We design youth mobilities that bypass bureaucratic noise. You return home with lifelong cross-border friendships, deeper empathy, and stories that stay with you forever.',
    spanClass: 'md:col-span-7',
  },
  {
    heading: 'A guide that helps you find direction.',
    sentence:
      'Whether it is your very first time stepping on an international train or your fifth project, Orion navigates logistics, funding, and group safety so you can focus on self-discovery.',
    spanClass: 'md:col-span-5',
  },
  {
    heading: 'A constellation of young changemakers.',
    sentence:
      'No lone travelers here. Every exchange connects you into a growing network of European youth leaders, social entrepreneurs, and community advocates who uplift each other.',
    spanClass: 'md:col-span-5',
  },
  {
    heading: 'Real impact, backed by proof.',
    sentence:
      'Backed by accredited Erasmus+ funding and audited NGO standards, our programs produce tangible CV credentials, Youthpass certifications, and community projects that last.',
    spanClass: 'md:col-span-7',
  },
];

/**
 * Beliefs Component — Daylight Off-White (#F8F9FA) with Elevated White Cells (#FFFFFF)
 *
 * Asymmetric 2x2 Architectural Grid (7/5, 5/7 split) framing Orion's 4 locked core principles:
 * - H2 "What we believe"
 * - 4-point SparkleStar motif in #0B132B at the top of each cell (no Roman numerals)
 * - Verbatim H3 headings & sentences with max-w-[60ch] line-length discipline
 */
export function Beliefs() {
  return (
    <section className="w-full bg-[#F8F9FA] text-[#0B132B] py-20 md:py-28 border-b border-[rgba(11,19,43,0.10)]">
      <div className="container-orion space-y-12">
        <div className="space-y-3">
          <h2 className="type-h2 text-[#0B132B]">What we believe</h2>
        </div>

        {/* Asymmetric 2x2 Architectural Grid: Row 1 (7/5), Row 2 (5/7) */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-t border-l border-[rgba(11,19,43,0.12)]">
          {BELIEFS.map((item) => (
            <div
              key={item.heading}
              className={`${item.spanClass} bg-white border-r border-b border-[rgba(11,19,43,0.12)] p-8 md:p-12 flex flex-col justify-between gap-6`}
            >
              <div className="space-y-4">
                <div className="flex items-center">
                  <SparkleStar size={14} color="#0B132B" />
                </div>

                <h3 className="type-h3 text-xl md:text-2xl text-[#0B132B] leading-snug">
                  {item.heading}
                </h3>
              </div>

              <p className="type-body text-[rgba(11,19,43,0.76)] leading-relaxed max-w-[60ch]">
                {item.sentence}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Beliefs;
