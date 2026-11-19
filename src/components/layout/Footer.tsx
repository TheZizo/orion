import React from 'react';
import Link from 'next/link';
import { ORION_ORG } from '@/lib/orionData';
import { OrionLogo } from '@/components/motifs/OrionLogo';

/**
 * Celestial Footer — Quiet Editorial Baseline
 *
 * Grounded on Midnight Navy (#0B132B) following seamlessly from the PartnerBand:
 * - OrionLogo variant="full-dark"
 * - Tagline "Spark something bigger." as H3
 * - Institutional boilerplate and official name "Orion Fiatalok Informális Csoportja"
 * - Debrecen HQ and direct email dispatch (zeid@orionyouth.eu)
 * - Navigation directory links
 * - Erasmus+ EU funding disclaimer
 * - Copyright and active grant reference (no mono, no dots, no OID readout)
 */
export function Footer() {
  return (
    <footer className="w-full bg-[#0B132B] text-[#F8F9FA] border-t border-[rgba(248,249,250,0.08)] pt-16 pb-12">
      <div className="container-orion">
        {/* Top 12-Column Grid */}
        <div className="grid-orion">
          {/* Brand & Mission Statement (5 Columns) */}
          <div className="col-span-12 lg:col-span-5 space-y-4">
            <Link
              href="/"
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F9FA]"
              aria-label="Orion Homepage"
            >
              <OrionLogo variant="full-dark" height={30} />
            </Link>

            <h3 className="type-h3 text-[#F8F9FA] pt-2">
              Spark something bigger.
            </h3>

            <p className="type-body text-[rgba(248,249,250,0.80)] max-w-md">
              {ORION_ORG.shortBoilerplate}
            </p>

            {/* Legal Entity & Location Block */}
            <div className="pt-2 space-y-1.5">
              <div className="text-xs font-semibold text-[rgba(248,249,250,0.75)]">
                Orion Fiatalok Informális Csoportja
              </div>
              <div className="type-caption text-[rgba(248,249,250,0.85)]">
                Debrecen, Hungary
              </div>
              <div>
                <a
                  href="mailto:zeid@orionyouth.eu"
                  className="type-caption text-[rgba(248,249,250,0.85)] underline hover:text-[#F8F9FA] transition-colors"
                >
                  zeid@orionyouth.eu
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links Column 1: Mobilities (3 Columns) */}
          <div className="col-span-6 sm:col-span-6 lg:col-span-3 space-y-3">
            <div className="type-eyebrow text-[rgba(248,249,250,0.50)]">
              Mobilities
            </div>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/open-calls"
                  className="type-caption text-[rgba(248,249,250,0.80)] hover:text-[#F8F9FA] transition-colors"
                >
                  Open Calls
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="type-caption text-[rgba(248,249,250,0.80)] hover:text-[#F8F9FA] transition-colors"
                >
                  Projects Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Links Column 2: Organization (4 Columns) */}
          <div className="col-span-6 sm:col-span-6 lg:col-span-4 space-y-3">
            <div className="type-eyebrow text-[rgba(248,249,250,0.50)]">
              Organization
            </div>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="type-caption text-[rgba(248,249,250,0.80)] hover:text-[#F8F9FA] transition-colors"
                >
                  About Orion
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="type-caption text-[rgba(248,249,250,0.80)] hover:text-[#F8F9FA] transition-colors"
                >
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="type-caption text-[rgba(248,249,250,0.80)] hover:text-[#F8F9FA] transition-colors"
                >
                  Contact &amp; FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="type-caption text-[rgba(248,249,250,0.80)] hover:text-[#F8F9FA] transition-colors"
                >
                  Privacy &amp; Data Protection
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Erasmus+ Funding Disclaimer */}
        <div className="mt-12 pt-8 border-t border-[rgba(248,249,250,0.10)]">
          <p className="type-caption text-[rgba(248,249,250,0.65)] text-xs leading-relaxed max-w-4xl">
            {ORION_ORG.erasmusDisclaimer}
          </p>
        </div>

        {/* Bottom Bar: Copyright & Active Grant Reference (no OID, tabular numbers) */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[rgba(248,249,250,0.50)] tabular-nums">
          <div>
            © 2026 Orion Fiatalok Informális Csoportja. All rights reserved.
          </div>
          <div>
            Grant {ORION_ORG.grantReference}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
