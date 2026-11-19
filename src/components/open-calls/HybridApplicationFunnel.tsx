import React from 'react';
import { ExternalLink } from 'lucide-react';
import { OpenCall } from '@/types/orion';
import { ORION_ORG } from '@/lib/orionData';
import { ExternalApplicationCard } from './ExternalApplicationCard';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';

export interface HybridApplicationFunnelProps {
  call: OpenCall;
  className?: string;
}

/**
 * HybridApplicationFunnel Component
 * Orchestrates the application path based on the call's status and applicationMode:
 * 1. Closed calls -> Calm closed-state notice linking back to active open calls.
 * 2. Opening soon calls -> Welcoming "not open yet" panel routing upcoming applications to the Orion Network Gateway Portal.
 * 3. External calls -> ExternalApplicationCard with partner form instructions & secure link.
 * 4. Network open calls -> Network Gateway Portal CTA card directing applicants to the centralized portal.
 */
export function HybridApplicationFunnel({
  call,
  className = '',
}: HybridApplicationFunnelProps) {
  if (call.status === 'Closed') {
    return (
      <div
        className={`border border-[rgba(11,19,43,0.12)] bg-white p-8 md:p-10 space-y-4 text-center ${className}`.trim()}
      >
        <div className="w-10 h-10 mx-auto border border-[rgba(11,19,43,0.15)] flex items-center justify-center text-sm font-semibold text-[#0B132B]/60">
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
    return (
      <div className={`space-y-6 ${className}`.trim()}>
        <div className="border border-[rgba(11,19,43,0.12)] bg-white p-8 md:p-10 space-y-4">
          <div className="flex items-center gap-3">
            <StatusBadge status="Opening soon" tone="light" />
            <span className="type-caption text-[#0B132B]/70">
              Hosted departure
            </span>
          </div>

          <h3 className="type-h3 text-[#0B132B] font-semibold">
            Applications for this project are not open yet
          </h3>

          <p className="type-body text-[#0B132B]/80 max-w-2xl leading-relaxed">
            <strong className="text-[#0B132B] font-semibold">{call.title}</strong> will take place in{' '}
            <strong className="text-[#0B132B] font-semibold">
              {call.country} ({venueLabel}) in March 2027
            </strong>
            . Official call documentation and final participant selection criteria will be published in early 2027.
          </p>

          <p className="type-caption text-[#0B132B]/70 max-w-2xl">
            Participant applications across Orion will open through the centralized{' '}
            <strong className="text-[#0B132B]">Orion Network Gateway Portal</strong>. In the meantime, you can preview the portal or reach out with any questions.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              tone="light"
              href={ORION_ORG.gatewayPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Network Gateway Portal (coming soon)</span>
              <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </Button>

            <Button variant="ghost" tone="light" href="/contact">
              Ask a question about this call
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (call.applicationMode === 'external') {
    return <ExternalApplicationCard call={call} className={className} />;
  }

  const portalUrl = call.externalFormUrl?.trim() || ORION_ORG.gatewayPortalUrl;

  return (
    <div
      data-testid="network-gateway-portal-card"
      className={`border border-[rgba(11,19,43,0.12)] bg-white p-8 md:p-10 space-y-5 ${className}`.trim()}
    >
      <div className="space-y-2">
        <div className="text-xs font-semibold text-[#0B132B]/60">
          Centralized network applications
        </div>
        <h3 className="type-h3 text-[#0B132B] font-semibold">
          Apply via the Orion Network Gateway Portal
        </h3>
        <p className="type-body text-[#0B132B]/80 max-w-2xl leading-relaxed">
          All participant applications across the Orion network are submitted through our centralized gateway portal. Complete your profile and motivation statement there to be considered for{' '}
          <strong className="text-[#0B132B]">{call.title}</strong>.
        </p>
      </div>

      <div className="pt-4 border-t border-[rgba(11,19,43,0.08)] flex flex-col sm:flex-row sm:items-center gap-4">
        <Button
          variant="primary"
          tone="light"
          href={portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          <span>Open Network Gateway Portal</span>
          <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </Button>

        <p className="type-caption text-[#0B132B]/60">
          Questions before applying? Email{' '}
          <a
            href={`mailto:${ORION_ORG.email}`}
            className="text-[#0B132B] underline hover:text-[#e35619] transition-colors"
          >
            {ORION_ORG.email}
          </a>
        </p>
      </div>
    </div>
  );
}
