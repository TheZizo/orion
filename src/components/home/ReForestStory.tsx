import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectBySlug } from '@/lib/orionData';

const FALLBACK_IMPACT_METRICS = [
  { label: 'Young changemakers', value: '40 + 8' },
  { label: 'Partner countries', value: '4' },
  { label: 'Mobility duration', value: '12 days' },
  { label: 'Seedlings planted', value: '1,000+' },
];

/**
 * ReForestStory Component — Daylight Editorial Spread (#F8F9FA)
 *
 * Position #1 post-hero high-contrast 12-column editorial spread:
 * - Left 7 cols: Documentary Visual Frame (/reforest-2.jpg) with coordinate badge and caption bar
 * - Right 5 cols: Memories, Proof & Story, Kemal quote, 2x2 Architectural Impact Grid, Action buttons
 */
export function ReForestStory() {
  const quote = {
    quote:
      'ReForest showed me how non-formal education makes ecological theory real, urgent, and deeply human.',
    name: 'Kemal',
    country: 'Participant, October 2026',
  };

  const impactMetrics =
    getProjectBySlug('reforest')?.impactMetrics ?? FALLBACK_IMPACT_METRICS;

  return (
    <section className="w-full bg-[#F8F9FA] text-[#0B132B] py-20 md:py-28 border-b border-[rgba(11,19,43,0.10)]">
      <div className="container-orion">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left 7 Columns: Documentary Visual Frame */}
          <div className="lg:col-span-7">
            <div className="aspect-[16/10] relative overflow-hidden border border-[rgba(11,19,43,0.12)] bg-[#0B132B]">
              <Image
                src="/images/projects/reforest-2.jpg"
                alt="All 40 international youth participants and 8 team leaders of ReForest holding official European Union and project banners on an alpine meadow in Lacu Roșu, Romania"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority
                className="object-cover object-[50%_38%]"
              />
              {/* Top-left coordinate overlay badge */}
              <div className="absolute top-3 left-3 bg-[#0B132B] text-[#F8F9FA] px-3 py-1.5 text-xs font-display tracking-tight tabular-nums z-10">
                46.78° N, 25.78° E, Lacu Roșu, Romania
              </div>
            </div>

            {/* Caption bar directly below the image */}
            <div className="bg-white border-x border-b border-[rgba(11,19,43,0.12)] px-4 py-3 text-xs text-[rgba(11,19,43,0.75)] flex flex-wrap justify-between gap-2">
              <span className="tabular-nums">
                October 11–22, 2026 (incl. travel days), Lacu Roșu, Harghita
              </span>
              <span>
                Co-funded by the European Union, hosted by Asociația Agoje with Orion
              </span>
            </div>
          </div>

          {/* Right 5 Columns: Memories, Proof & Story */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="font-display text-[12px] font-semibold tracking-[0.01em] text-[#0B132B]/60">
                Completed youth exchange
              </div>
              <h2 className="type-h2 text-[#0B132B]">
                Not a program, but memories, growth, and human connection.
              </h2>
              <div className="text-base font-semibold text-[#0B132B]">
                ReForest — Erasmus+ Youth Exchange
              </div>
            </div>

            {/* Participant Quote */}
            <figure className="border-l-2 border-[#e35619] pl-4 py-1 space-y-1.5">
              <blockquote className="type-body-lg text-[#0B132B]">
                &ldquo;{quote.quote}&rdquo;
              </blockquote>
              <figcaption className="text-xs font-medium text-[rgba(11,19,43,0.65)]">
                {quote.name}, {quote.country}
              </figcaption>
            </figure>

            {/* 2x2 Architectural Impact Grid */}
            <div className="grid grid-cols-2 border-t border-l border-[rgba(11,19,43,0.12)] bg-white">
              {impactMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="p-4 border-r border-b border-[rgba(11,19,43,0.12)] space-y-1"
                >
                  <div className="font-display text-2xl font-bold text-[#0B132B] tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-xs text-[#0B132B]/65">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/projects/reforest"
                className="inline-flex items-center justify-center bg-[#0B132B] text-[#F8F9FA] px-5 py-2.5 text-sm font-semibold hover:bg-[#111D3B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B]"
              >
                Read the ReForest story
              </Link>

              <a
                href="https://www.agoje.eu/our-projects/reforest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-xs font-semibold text-[#0B132B] underline hover:text-[#111D3B] transition-colors"
              >
                Official ReForest project page ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReForestStory;
