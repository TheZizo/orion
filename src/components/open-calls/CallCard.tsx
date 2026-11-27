import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { OpenCall } from '@/types/orion';
import { formatDateRange } from '@/lib/orionData';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';

export interface CallCardProps {
  call: OpenCall;
  className?: string;
}

const CORNER_STARDUST = [
  { cx: 42, cy: 24, r: 1.1, o: 0.45 },
  { cx: 76, cy: 14, r: 0.85, o: 0.3 },
  { cx: 118, cy: 36, r: 1.25, o: 0.5 },
  { cx: 148, cy: 18, r: 0.9, o: 0.35 },
  { cx: 164, cy: 58, r: 1.0, o: 0.4 },
  { cx: 132, cy: 74, r: 0.8, o: 0.25 },
  { cx: 94, cy: 62, r: 1.15, o: 0.38 },
  { cx: 174, cy: 96, r: 0.9, o: 0.3 },
];

function ObservatoryCornerStardust() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none select-none absolute top-0 right-0 w-48 h-28 opacity-75"
    >
      <path
        d="M18 110 C 62 56, 128 32, 198 22"
        stroke="rgba(248, 249, 250, 0.12)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      {CORNER_STARDUST.map((dot, idx) => (
        <circle
          key={idx}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill={`rgba(248, 249, 250, ${dot.o})`}
        />
      ))}
    </svg>
  );
}

/**
 * CallCard Component
 * Featured / opening-soon departures render as Midnight Navy Observatory Departure Cards.
 * Standard and closed trajectories render as clean daylight editorial ledger rows.
 */
export function CallCard({ call, className = '' }: CallCardProps) {
  const isClosed = call.status === 'Closed';
  const isFeatured = call.status === 'Opening soon' || call.slug === 'the-financial-blueprint';
  const isReforest = call.slug.includes('reforest');
  const dates = formatDateRange(call.startDate, call.endDate);

  const applicationHint =
    call.status === 'Opening soon'
      ? 'Applications opening soon'
      : call.applicationMode === 'internal'
        ? 'Apply via Network Portal'
        : 'Apply via partner form';

  if (isFeatured && !isClosed) {
    return (
      <article
        className={`bg-[#0B132B] text-[#F8F9FA] border-t-2 border-t-[#E35619] relative overflow-hidden p-6 md:p-8 my-6 transition-colors ${className}`.trim()}
        aria-label={`${call.title} (${call.country})`}
      >
        <ObservatoryCornerStardust />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left column (6 cols): Action type, Title, Payoff */}
          <div className="lg:col-span-6 space-y-3 min-w-0">
            <p className="type-caption font-medium text-[rgba(248,249,250,0.68)]">
              {call.actionType}
            </p>

            <h2 className="type-h2 text-[#F8F9FA] font-bold tracking-tight">
              <Link
                href={`/open-calls/${call.slug}`}
                className="hover:text-[#E35619] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F9FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B132B]"
              >
                {call.title}
              </Link>
            </h2>

            <p className="type-body text-[rgba(248,249,250,0.82)] max-w-xl leading-relaxed">
              {call.emotionalPayoff || call.summary}
            </p>
          </div>

          {/* Middle column (4 cols): Translucent metadata ledger */}
          <div className="lg:col-span-4 min-w-0">
            <dl className="bg-white/[0.04] border-t border-white/10 p-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 text-[14px]">
              <div>
                <dt className="text-[12px] text-[rgba(248,249,250,0.62)] font-normal">
                  When
                </dt>
                <dd className="font-medium text-[#F8F9FA] tabular-nums mt-0.5">
                  {dates}
                </dd>
              </div>

              <div>
                <dt className="text-[12px] text-[rgba(248,249,250,0.62)] font-normal">
                  Where
                </dt>
                <dd className="font-medium text-[#F8F9FA] mt-0.5">
                  <div>{call.city}, {call.country}</div>
                </dd>
              </div>

              <div>
                <dt className="text-[12px] text-[rgba(248,249,250,0.62)] font-normal">
                  Deadline
                </dt>
                <dd className="font-medium text-[#F8F9FA] tabular-nums mt-0.5">
                  {call.applicationDeadline}
                </dd>
              </div>
            </dl>
          </div>

          {/* Right column (2 cols): Status badge + Ember CTA */}
          <div className="lg:col-span-2 flex flex-col items-start lg:items-end justify-between gap-4 h-full min-w-0">
            <StatusBadge status={call.status} tone="dark" />

            <div className="space-y-3 w-full lg:text-right">
              <span className="block text-[13px] text-[rgba(248,249,250,0.72)] font-medium">
                {applicationHint}
              </span>

              <Button
                variant="primary"
                tone="dark"
                size="sm"
                href={`/open-calls/${call.slug}`}
                className="w-full sm:w-auto"
              >
                View call
              </Button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`border-b border-[rgba(11,19,43,0.10)] bg-[#F8F9FA] py-10 md:py-12 transition-colors ${
        isClosed ? 'opacity-75' : ''
      } ${className}`.trim()}
      aria-label={`${call.title} (${call.country})`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {isReforest && (
          <div className="lg:col-span-3 min-w-0">
            <Link
              href={`/open-calls/${call.slug}`}
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B] focus-visible:ring-offset-2"
              aria-label={`View ${call.title} visual preview`}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B132B]">
                <Image
                  src="/images/projects/reforest-2.jpg"
                  alt={`${call.title} in ${call.city}, ${call.country}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  className="object-cover object-[50%_48%]"
                />
              </div>
            </Link>
          </div>
        )}

        {/* Left column: Action type, Title, Payoff */}
        <div className={`${isReforest ? 'lg:col-span-4' : 'lg:col-span-6'} space-y-3 min-w-0`}>
          <p className="type-caption font-medium text-[rgba(11,19,43,0.60)]">
            {call.actionType}
          </p>

          <h2 className="type-h3 text-[#0B132B] font-bold tracking-tight">
            <Link
              href={`/open-calls/${call.slug}`}
              className="hover:text-[#E35619] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B]"
            >
              {call.title}
            </Link>
          </h2>

          <p className="type-body text-[rgba(11,19,43,0.78)] max-w-xl leading-relaxed">
            {call.emotionalPayoff || call.summary}
          </p>
        </div>

        {/* Middle column: Structured metadata definition list */}
        <div className={`${isReforest ? 'lg:col-span-3' : 'lg:col-span-4'} min-w-0`}>
          <dl className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 text-[14px]">
            <div>
              <dt className="text-[12px] text-[rgba(11,19,43,0.68)] font-normal">
                When
              </dt>
              <dd className="font-medium text-[#0B132B] tabular-nums mt-0.5">
                {dates}
              </dd>
            </div>

            <div>
              <dt className="text-[12px] text-[rgba(11,19,43,0.68)] font-normal">
                Where
              </dt>
              <dd className="font-medium text-[#0B132B] mt-0.5">
                <div>{call.city}, {call.country}</div>
              </dd>
            </div>

            <div>
              <dt className="text-[12px] text-[rgba(11,19,43,0.68)] font-normal">
                Deadline
              </dt>
              <dd className="font-medium text-[#0B132B] tabular-nums mt-0.5">
                {call.applicationDeadline}
              </dd>
            </div>
          </dl>
        </div>

        {/* Right column (2 cols): Status badge + Actions */}
        <div className="lg:col-span-2 flex flex-col items-start lg:items-end justify-between gap-4 h-full min-w-0">
          <StatusBadge status={call.status} tone="light" />

          <div className="space-y-3 w-full lg:text-right">
            <span className="block text-[13px] text-[rgba(11,19,43,0.65)] font-medium">
              {applicationHint}
            </span>

            <Button
              variant="secondary"
              tone="light"
              size="sm"
              href={`/open-calls/${call.slug}`}
              className="w-full sm:w-auto"
            >
              View call
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
