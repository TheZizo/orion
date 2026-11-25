import React from 'react';
import Link from 'next/link';
import { OpenCall } from '@/types/orion';
import { formatDateRange } from '@/lib/orionData';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';

export interface CallCardProps {
  call: OpenCall;
  className?: string;
}

/**
 * CallCard Component
 * Full-width editorial ledger row with 1px orbit-light hairlines and generous padding.
 * Avoids sparse SaaS cards; presents clear editorial layout across 12 columns.
 */
export function CallCard({ call, className = '' }: CallCardProps) {
  const isClosed = call.status === 'Closed';
  const isFeatured = call.status === 'Opening soon' || call.slug === 'the-financial-blueprint';
  const dates = formatDateRange(call.startDate, call.endDate);

  const applicationHint =
    call.status === 'Opening soon'
      ? 'Applications opening soon'
      : call.applicationMode === 'internal'
        ? 'Apply via Network Portal'
        : 'Apply via partner form';

  return (
    <article
      className={`border-b border-[rgba(11,19,43,0.10)] py-10 md:py-12 transition-colors ${
        isClosed ? 'opacity-75' : ''
      } ${className}`.trim()}
      aria-label={`${call.title} (${call.country})`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left column (6 cols): Action type, Title, Payoff */}
        <div className="lg:col-span-6 space-y-3">
          <p className="type-caption font-medium text-[rgba(11,19,43,0.60)]">
            {call.actionType}
          </p>

          <h2
            className={`${
              isFeatured ? 'type-h2' : 'type-h3'
            } text-[#0B132B] font-bold tracking-tight`}
          >
            <Link
              href={`/open-calls/${call.slug}`}
              className="hover:text-[#e35619] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B]"
            >
              {call.title}
            </Link>
          </h2>

          <p className="type-body text-[rgba(11,19,43,0.78)] max-w-xl leading-relaxed">
            {call.emotionalPayoff || call.summary}
          </p>
        </div>

        {/* Middle column (4 cols): Structured metadata definition list */}
        <div className="lg:col-span-4">
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
        <div className="lg:col-span-2 flex flex-col items-start lg:items-end justify-between gap-4 h-full">
          <StatusBadge status={call.status} tone="light" />

          <div className="space-y-3 w-full lg:text-right">
            <span className="block text-[13px] text-[rgba(11,19,43,0.65)] font-medium whitespace-nowrap">
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
