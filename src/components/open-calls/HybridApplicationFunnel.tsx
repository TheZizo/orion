import React from 'react';
import { ExternalLink } from 'lucide-react';
import { OpenCall } from '@/types/orion';
import { ORION_ORG } from '@/lib/orionData';
import { isSafeHttpsUrl } from '@/lib/storage';
import { ExternalApplicationCard } from './ExternalApplicationCard';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';

export interface HybridApplicationFunnelProps {
  call: OpenCall;
  className?: string;
}

const DISPATCH_STARDUST = [
  { cx: 36, cy: 20, r: 1.1, o: 0.45 },
  { cx: 74, cy: 12, r: 0.85, o: 0.3 },
  { cx: 112, cy: 32, r: 1.25, o: 0.5 },
  { cx: 146, cy: 16, r: 0.9, o: 0.35 },
  { cx: 166, cy: 54, r: 1.0, o: 0.4 },
  { cx: 132, cy: 70, r: 0.8, o: 0.25 },
  { cx: 92, cy: 58, r: 1.1, o: 0.38 },
  { cx: 178, cy: 92, r: 0.9, o: 0.3 },
];

function DispatchCornerStardust() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none select-none absolute top-0 right-0 w-48 h-28 opacity-75"
    >
      <path
        d="M16 106 C 60 54, 126 30, 198 20"
        stroke="rgba(248, 249, 250, 0.12)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      {DISPATCH_STARDUST.map((dot, idx) => (
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
 * HybridApplicationFunnel Component
 * Orchestrates the application path based on the call's status and applicationMode:
 * 1. Closed calls -> Calm closed-state notice on #F8F9FA linking back to active open calls.
 * 2. Opening soon calls -> Midnight Navy Launch Dispatch Panel routing upcoming applications to the Orion Network Gateway Portal.
 * 3. External calls -> ExternalApplicationCard with partner form instructions & secure link.
 * 4. Network open calls -> Midnight Navy Launch Dispatch Panel directing applicants to the centralized portal.
 */
export function HybridApplicationFunnel({
  call,
  className = '',
}: HybridApplicationFunnelProps) {
  if (call.status === 'Closed') {
    return (
      <div
        className={`border-t border-[rgba(11,19,43,0.12)] bg-[#F8F9FA] py-10 px-6 md:px-10 space-y-4 text-center ${className}`.trim()}
      >
        <div
          aria-hidden="true"
          className="w-10 h-10 mx-auto border border-[rgba(11,19,43,0.15)] flex items-center justify-center text-sm font-semibold text-[#0B132B]/60"
        >
          ✕
        </div>
        <h3 className="type-h3 text-[#0B132B] font-semibold">
          Applications for this mobility are closed
        </h3>
        <p className="type-body text-[#0B132B]/75 max-w-xl mx-auto">
          The selection period for <strong className="text-[#0B132B]">{call.title}</strong> has concluded and the cohort is full. You can still explore the Infopack and travel details above for reference, or browse our active open calls.
        </p>
        <div className="pt-2">
          <Button variant="secondary" tone="light" href="/open-calls">
            Explore active open calls
          </Button>
        </div>
      </div>
    );
  }

  if (call.status === 'Opening soon') {
    const venueLabel = call.venue ? call.venue : 'Location TBA';
    const earlyInterestHref = `/contact?mode=participant&subject=${encodeURIComponent(
      `Early interest: ${call.title}`
    )}`;
    const parsedStart = call.startDate ? new Date(`${call.startDate}T00:00:00Z`) : null;
    const startMonthLabel =
      parsedStart && !Number.isNaN(parsedStart.getTime())
        ? parsedStart.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC',
          })
        : 'March 2027';

    return (
      <div className={`space-y-6 ${className}`.trim()}>
        <div className="bg-[#0B132B] text-[#F8F9FA] border-t-2 border-t-[#E35619] relative overflow-hidden p-8 md:p-10 space-y-4">
          <DispatchCornerStardust />

          <div className="relative space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status="Opening soon" tone="dark" />
              <span className="type-caption text-[rgba(248,249,250,0.72)]">
                Hosted departure
              </span>
            </div>

            <h3 className="type-h3 text-[#F8F9FA] font-semibold">
              Applications for this project are not open yet
            </h3>

            <p className="type-body text-[rgba(248,249,250,0.82)] max-w-2xl leading-relaxed">
              <strong className="text-[#F8F9FA] font-semibold">{call.title}</strong> will take place in{' '}
              <strong className="text-[#F8F9FA] font-semibold">
                {call.country} ({venueLabel}) in {startMonthLabel}
              </strong>
              . Official call documentation and final participant selection criteria will be published ahead of opening.
            </p>

            <p className="type-caption text-[rgba(248,249,250,0.75)] max-w-2xl">
              Participant applications across Orion will open on the{' '}
              {ORION_ORG.gatewayPortalLive ? (
                <a
                  href={ORION_ORG.gatewayPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#F8F9FA] underline hover:text-[#E35619] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F9FA]"
                >
                  Orion Network Gateway Portal
                </a>
              ) : (
                <strong className="text-[#F8F9FA]">
                  Orion Network Gateway Portal (launching early 2027)
                </strong>
              )}
              . Register early interest below or reach out with any questions.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button variant="primary" tone="dark" href={earlyInterestHref}>
                Register early interest
              </Button>

              <Button variant="secondary" tone="dark" href="/contact">
                Ask a question about this call
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (call.applicationMode === 'external') {
    return <ExternalApplicationCard call={call} className={className} />;
  }

  const customExternalUrl = call.externalFormUrl?.trim();
  const safeCustomExternalUrl = isSafeHttpsUrl(customExternalUrl)
    ? customExternalUrl
    : '';
  const portalUrl =
    safeCustomExternalUrl ||
    (ORION_ORG.gatewayPortalLive && isSafeHttpsUrl(ORION_ORG.gatewayPortalUrl)
      ? ORION_ORG.gatewayPortalUrl
      : '');
  const applicationInquiryHref = `/contact?mode=participant&subject=${encodeURIComponent(
    `Application inquiry: ${call.title}`
  )}`;

  return (
    <div
      data-testid="network-gateway-portal-card"
      className={`bg-[#0B132B] text-[#F8F9FA] border-t-2 border-t-[#E35619] relative overflow-hidden p-8 md:p-10 space-y-5 ${className}`.trim()}
    >
      <DispatchCornerStardust />

      <div className="relative space-y-5">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-[rgba(248,249,250,0.68)]">
            Centralized network applications
          </div>
          <h3 className="type-h3 text-[#F8F9FA] font-semibold">
            Apply via the Orion Network Gateway Portal
          </h3>
          <p className="type-body text-[rgba(248,249,250,0.82)] max-w-2xl leading-relaxed">
            All participant applications across the Orion network are submitted through our centralized gateway portal. Complete your profile and motivation statement there to be considered for{' '}
            <strong className="text-[#F8F9FA]">{call.title}</strong>.
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-4">
          {portalUrl ? (
            <Button
              variant="primary"
              tone="dark"
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <span>Open Network Gateway Portal</span>
              <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </Button>
          ) : (
            <Button
              variant="primary"
              tone="dark"
              href={applicationInquiryHref}
              className="w-full sm:w-auto"
            >
              Submit application inquiry
            </Button>
          )}

          <p className="type-caption text-[rgba(248,249,250,0.72)]">
            Questions before applying? Email{' '}
            <a
              href={`mailto:${ORION_ORG.email}`}
              className="text-[#F8F9FA] underline hover:text-[#E35619] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F9FA]"
            >
              {ORION_ORG.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
