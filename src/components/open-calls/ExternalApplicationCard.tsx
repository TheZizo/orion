import React from 'react';
import { ExternalLink, CheckCircle2, AlertTriangle } from 'lucide-react';
import { OpenCall } from '@/types/orion';
import { Button } from '@/components/ui/Button';

export interface ExternalApplicationCardProps {
  call: OpenCall;
  className?: string;
}

/**
 * ExternalApplicationCard Component
 * Rendered when applicationMode === 'external'.
 * Displays partner-hosted guidance, a preparation checklist, and an external form link.
 * Strictly validates that externalFormUrl starts with 'https://' before rendering an active link.
 */
export function ExternalApplicationCard({
  call,
  className = '',
}: ExternalApplicationCardProps) {
  const rawUrl = call.externalFormUrl?.trim() ?? '';
  let isSecureUrl = false;
  if (rawUrl) {
    try {
      const parsed = new URL(rawUrl);
      isSecureUrl = parsed.protocol === 'https:';
    } catch {
      isSecureUrl = false;
    }
  }

  return (
    <div
      className={`border border-[rgba(11,19,43,0.12)] bg-white p-6 md:p-8 space-y-6 ${className}`.trim()}
    >
      <div className="space-y-2">
        <div className="text-xs font-semibold text-[#0B132B]/60">
          Partner coordination
        </div>
        <h3 className="type-h3 text-[#0B132B] font-semibold">
          Apply via our partner form
        </h3>
        <p className="type-body text-[#0B132B]/80 max-w-2xl">
          This project is coordinated by our European host partner{' '}
          <strong className="text-[#0B132B] font-semibold">
            {call.partnerOrgs[0] ?? 'partner organization'}
          </strong>
          . Applications are gathered directly through their secure registration portal, while Orion supports candidate selection and travel preparation for participants from Hungary.
        </p>
      </div>

      {/* Checklist: What to prepare */}
      <div className="space-y-3 pt-4 border-t border-[rgba(11,19,43,0.08)]">
        <h4 className="type-caption font-semibold text-[#0B132B]/90">
          What to prepare before applying:
        </h4>
        <ul className="space-y-2.5">
          <li className="flex items-start gap-2.5 type-body text-[#0B132B]/85">
            <CheckCircle2
              className="w-5 h-5 text-[#0B132B] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span>
              Your national passport or EU identity document valid for travel.
            </span>
          </li>
          <li className="flex items-start gap-2.5 type-body text-[#0B132B]/85">
            <CheckCircle2
              className="w-5 h-5 text-[#0B132B] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span>
              Confirmation of availability across all mobility dates ({call.startDate} to {call.endDate}).
            </span>
          </li>
          <li className="flex items-start gap-2.5 type-body text-[#0B132B]/85">
            <CheckCircle2
              className="w-5 h-5 text-[#0B132B] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span>
              A brief reflection on your personal motivation and community learning goals (no formal CV needed).
            </span>
          </li>
          <li className="flex items-start gap-2.5 type-body text-[#0B132B]/85">
            <CheckCircle2
              className="w-5 h-5 text-[#0B132B] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span>
              Any dietary, accessibility, or learning access needs for the host venue.
            </span>
          </li>
        </ul>
      </div>

      {/* Action CTA */}
      <div className="pt-4 border-t border-[rgba(11,19,43,0.08)] flex flex-col sm:flex-row sm:items-center gap-4">
        {isSecureUrl ? (
          <Button
            variant="primary"
            href={rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <span>Open application form</span>
            <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </Button>
        ) : (
          <div className="flex items-center gap-2 border-l-2 border-[#0B132B] bg-[rgba(11,19,43,0.04)] p-3 w-full text-[#0B132B]">
            <AlertTriangle className="w-5 h-5 text-[#0B132B] shrink-0" aria-hidden="true" />
            <span className="type-caption">
              Partner application link is being updated. Please consult the Infopack PDF or contact Orion HQ for current access.
            </span>
          </div>
        )}

        <p className="type-caption text-[#0B132B]/60">
          Need support? Reach out to{' '}
          <a
            href="mailto:zeid@orionyouth.eu"
            className="text-[#0B132B] underline hover:text-[#e35619] transition-colors"
          >
            zeid@orionyouth.eu
          </a>
        </p>
      </div>
    </div>
  );
}
