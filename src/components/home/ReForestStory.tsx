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
 * 3-tier cinematic documentary spread:
 * - Tier 1: Full-width panoramic lead photo (/reforest-2.jpg) with coordinate badge
 * - Tier 2: Open oversized display metrics ribbon directly on #F8F9FA
 * - Tier 3: Asymmetric 12-col story (kicker, H2, Kemal quote, action links) & sapling fieldwork photo (/reforest-3.jpg)
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
      <div className="container-orion space-y-10 md:space-y-12">
        {/* Tier 1: Full-Width Panoramic Lead Photo */}
        <div className="group aspect-[16/10] md:aspect-[16/9] relative overflow-hidden border border-[rgba(11,19,43,0.12)] bg-[#0B132B]">
          <Image
            src="/images/projects/reforest-2.jpg"
            alt="All 40 international youth participants and 8 team leaders of ReForest holding official European Union and project banners on an alpine meadow in Lacu Roșu, Romania"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
            className="object-cover object-[50%_48%] transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0B132B]/55 via-[#0B132B]/15 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute top-3 left-3 bg-[#0B132B] text-[#F8F9FA] px-3 py-1.5 text-xs font-display tracking-tight tabular-nums z-10">
            46.78° N, 25.78° E, Lacu Roșu, Romania
          </div>
        </div>

        {/* Tier 2: Open Oversized Display Metrics Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 pb-10 border-b border-[rgba(11,19,43,0.12)]">
          {impactMetrics.map((metric) => (
            <div key={metric.label} className="min-w-0">
              <div className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0B132B] tabular-nums whitespace-nowrap">
                {metric.value}
              </div>
              <div className="text-xs font-medium text-[#0B132B]/65 mt-1.5">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tier 3: Asymmetric 12-Col Story & Sapling Fieldwork Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left 6 Columns: Memories, Proof & Story */}
          <div className="lg:col-span-6 space-y-6 min-w-0">
            <div className="space-y-2">
              <div className="font-display text-[12px] font-semibold tracking-[0.01em] text-[#0B132B]/60 tabular-nums">
                Completed youth exchange, October 2026
              </div>
              <h2 className="type-h1 text-[#0B132B]">
                ReForest in the Carpathians
              </h2>
            </div>

            {/* Participant Quote */}
            <figure className="border-l-2 border-[#e35619] pl-5 py-1 space-y-2">
              <blockquote className="type-body-lg text-[#0B132B]">
                &ldquo;{quote.quote}&rdquo;
              </blockquote>
              <figcaption className="text-xs font-medium text-[rgba(11,19,43,0.65)]">
                {quote.name}, {quote.country}
              </figcaption>
            </figure>

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
                Official project page ↗
              </a>
            </div>
          </div>

          {/* Right 6 Columns: Sapling Fieldwork Photo */}
          <div className="lg:col-span-6 min-w-0">
            <div className="group aspect-[3/2] relative overflow-hidden border border-[rgba(11,19,43,0.12)] bg-[#0B132B]">
              <Image
                src="/images/projects/reforest-3.jpg"
                alt="Youth participants planting native fir and spruce saplings on a Harghita mountain slope during ReForest"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReForestStory;
