'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ORION_ORG } from '@/lib/orionData';

/**
 * PartnerBand Component — Framed Institutional Dossier on Daylight Off-White (#F8F9FA)
 *
 * Outer section is set on #F8F9FA (py-20 md:py-24) so the framed #0B132B dossier
 * container never collides visually with the #0B132B footer:
 * - H2 "For partner organisations"
 * - Locked long-form boilerplate + Orion Fiatalok Informális Csoportja collaboration note
 * - 2-Column Institutional Dock:
 *   1. Direct Email Dispatch: zeid@orionyouth.eu with 1-click copy
 *   2. Active Grant Reference: 2026-1-HU01-KA152-YOU-000399636
 * - Primary & Secondary CTAs: "Send a partnership inquiry" and "Partner dossier"
 */
export function PartnerBand() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const copyToClipboard = async (fieldKey: string, textToCopy: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else if (typeof document !== 'undefined') {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedField(fieldKey);
      timerRef.current = setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    } catch (err) {
      console.warn('[PartnerBand] Clipboard copy failed:', err);
    }
  };

  const directEmail = 'zeid@orionyouth.eu';
  const grantRef = ORION_ORG.grantReference || '2026-1-HU01-KA152-YOU-000399636';

  return (
    <section className="w-full bg-[#F8F9FA] py-20 md:py-24">
      <div className="container-orion">
        <div className="bg-[#0B132B] text-[#F8F9FA] p-8 sm:p-12 border border-[#0B132B] space-y-8">
          {/* Editorial Header & Locked Boilerplate */}
          <div className="max-w-[65ch] space-y-4">
            <h2 className="type-h2 text-[#F8F9FA]">
              For partner organisations
            </h2>
            <p className="type-body text-[#F8F9FA] leading-relaxed">
              Orion is an international youth initiative that turns participation into memories, growth, and human connection. Guided by the idea of a constellation of young changemakers who help each other navigate and move upward, we create programs that deliver measurable personal and cross-cultural impact.
            </p>
            <p className="type-body text-[rgba(248,249,250,0.80)] leading-relaxed">
              Orion Fiatalok Informális Csoportja collaborates with European youth NGOs, grassroots collectives, and educational initiatives on high-impact Erasmus+ KA1 and KA2 mobilities.
            </p>
          </div>

          {/* 2-Column Architectural Dispatch Dock */}
          <div className="bg-[#111D3B] border border-[#1D356B] divide-y sm:divide-y-0 sm:divide-x divide-[#1D356B] grid grid-cols-1 sm:grid-cols-2">
            {/* Direct Email Dispatch */}
            <div className="p-6 flex flex-col justify-between gap-4">
              <div>
                <span className="text-xs text-[rgba(248,249,250,0.55)] font-display block">
                  Direct coordinator dispatch
                </span>
                <div className="text-lg font-semibold text-[#F8F9FA] mt-1 break-all">
                  {directEmail}
                </div>
                <p className="text-xs text-[rgba(248,249,250,0.65)] mt-1">
                  Reach coordinator Zeid Isaac directly for Erasmus+ KA152 consortia and project cooperation.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard('email', directEmail)}
                  aria-label="Copy coordinator email"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[rgba(248,249,250,0.22)] text-[rgba(248,249,250,0.85)] hover:text-[#F8F9FA] hover:border-[rgba(248,249,250,0.50)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F8F9FA] cursor-pointer"
                >
                  <span aria-hidden="true">⧉</span>
                  <span>{copiedField === 'email' ? 'Copied' : 'Copy email'}</span>
                </button>

                <a
                  href={`mailto:${directEmail}?subject=Erasmus%2B%20Partnership%20Inquiry%20%E2%80%94%20Orion`}
                  className="text-xs text-[rgba(248,249,250,0.75)] hover:text-[#F8F9FA] underline transition-colors"
                >
                  Send email directly ↗
                </a>

                {copiedField === 'email' && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="px-2.5 py-1 text-xs bg-[#0B132B] border border-[rgba(248,249,250,0.28)] text-[#F8F9FA] font-medium"
                  >
                    Copied to clipboard
                  </div>
                )}
              </div>
            </div>

            {/* Active Grant Reference */}
            <div className="p-6 flex flex-col justify-between gap-4">
              <div>
                <span className="text-xs text-[rgba(248,249,250,0.55)] font-display block">
                  Confirmed grant reference
                </span>
                <div className="text-lg font-semibold text-[#F8F9FA] tabular-nums mt-1 break-words">
                  {grantRef}
                </div>
                <p className="text-xs text-[rgba(248,249,250,0.65)] mt-1">
                  Accredited Erasmus+ KA152 Youth Exchange hosted by Orion in Eastern Hungary.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard('grant', grantRef)}
                  aria-label="Copy accredited grant reference"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[rgba(248,249,250,0.22)] text-[rgba(248,249,250,0.85)] hover:text-[#F8F9FA] hover:border-[rgba(248,249,250,0.50)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F8F9FA] cursor-pointer"
                >
                  <span aria-hidden="true">⧉</span>
                  <span>{copiedField === 'grant' ? 'Copied' : 'Copy grant code'}</span>
                </button>

                {copiedField === 'grant' && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="px-2.5 py-1 text-xs bg-[#0B132B] border border-[rgba(248,249,250,0.28)] text-[#F8F9FA] font-medium"
                  >
                    Copied to clipboard
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/partners#partner-inquiry"
              className="inline-flex items-center justify-center bg-[#F8F9FA] text-[#0B132B] font-semibold text-sm px-6 py-3 hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F9FA]"
            >
              Send a partnership inquiry
            </Link>
            <Link
              href="/partners"
              className="inline-flex items-center justify-center border border-[rgba(248,249,250,0.25)] text-[#F8F9FA] font-medium text-sm px-5 py-3 hover:bg-[rgba(248,249,250,0.08)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F8F9FA]"
            >
              Partner dossier
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PartnerBand;
