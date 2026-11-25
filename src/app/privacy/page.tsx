import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ORION_ORG } from '@/lib/orionData';

export const metadata: Metadata = {
  title: 'Privacy & Data Protection',
  description:
    'GDPR privacy notice and data protection practices for Orion Fiatalok Informális Csoportja in Debrecen, Hungary.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy & Data Protection — Orion',
    description:
      'GDPR privacy notice and data protection practices for Orion Fiatalok Informális Csoportja in Debrecen, Hungary.',
    url: '/privacy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy & Data Protection — Orion',
    description:
      'GDPR privacy notice and data protection practices for Orion Fiatalok Informális Csoportja in Debrecen, Hungary.',
  },
};

export default function PrivacyPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Privacy & Data Protection', href: '/privacy' },
        ]}
        eyebrow="Data protection & GDPR"
        title="Privacy & Data Protection"
        lead="How Orion Fiatalok Informális Csoportja handles personal information submitted through our public website, Erasmus+ coordination dispatches, and mobility workflows."
        aside={
          <div className="border border-[rgba(248,249,250,0.18)] p-5 text-xs text-[rgba(248,249,250,0.85)] space-y-2 tabular-nums">
            <div className="font-semibold text-[#F8F9FA]">Data Controller</div>
            <div className="text-[rgba(248,249,250,0.75)]">
              Orion Fiatalok Informális Csoportja
            </div>
            <div className="text-[rgba(248,249,250,0.65)]">
              Debrecen, Hungary (47.53° N, 21.62° E)
            </div>
          </div>
        }
      />

      <Section tone="light" spacing="lg">
        <Container>
          <div className="max-w-3xl space-y-12">
            {/* 1. Data Controller */}
            <section className="space-y-3 border-b border-[rgba(11,19,43,0.10)] pb-8">
              <h2 className="type-h2 text-[#0B132B]">1. Data controller identity</h2>
              <p className="type-body text-[rgba(11,19,43,0.85)] leading-relaxed">
                This website (<span className="font-medium">orionyouth.eu</span>) is operated by{' '}
                <strong>Orion Fiatalok Informális Csoportja</strong>, an informal youth group anchored in Debrecen, Hungary (<span className="tabular-nums">47.53° N, 21.62° E</span>).
              </p>
              <p className="type-body text-[rgba(11,19,43,0.85)] leading-relaxed">
                For any questions regarding personal data, Erasmus+ participant records, or requests to exercise your rights under the European Union General Data Protection Regulation (GDPR, Regulation (EU) 2016/679), contact our coordination desk directly at{' '}
                <a
                  href={`mailto:${ORION_ORG.email}`}
                  className="font-semibold text-[#0B132B] underline hover:text-[#E35619] transition-colors"
                >
                  {ORION_ORG.email}
                </a>
                .
              </p>
            </section>

            {/* 2. Scope & Purpose of Processing */}
            <section className="space-y-4 border-b border-[rgba(11,19,43,0.10)] pb-8">
              <h2 className="type-h2 text-[#0B132B]">
                2. Scope and purpose of data processing
              </h2>
              <div className="space-y-4 type-body text-[rgba(11,19,43,0.85)] leading-relaxed">
                <div className="border border-[rgba(11,19,43,0.12)] bg-white p-5 space-y-2">
                  <h3 className="type-h3 text-[#0B132B]">
                    Contact &amp; Partner Consortium Inquiries (orionyouth.eu)
                  </h3>
                  <p className="text-sm text-[rgba(11,19,43,0.80)] leading-relaxed">
                    When you submit the inquiry form on{' '}
                    <Link href="/contact" className="underline hover:text-[#E35619]">
                      Contact &amp; FAQ
                    </Link>{' '}
                    or{' '}
                    <Link href="/partners" className="underline hover:text-[#E35619]">
                      Partner With Us
                    </Link>
                    , we process your name, email address, organization details (if applicable), subject, and message strictly to evaluate and respond to your inquiry or partnership request.
                  </p>
                </div>

                <div className="border border-[rgba(11,19,43,0.12)] bg-white p-5 space-y-2">
                  <h3 className="type-h3 text-[#0B132B]">
                    Erasmus+ Mobility Applications &amp; Administration
                  </h3>
                  <p className="text-sm text-[rgba(11,19,43,0.80)] leading-relaxed">
                    Participant applications for active mobilities are collected through our centralized{' '}
                    {ORION_ORG.gatewayPortalLive ? (
                      <a
                        href={ORION_ORG.gatewayPortalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-[#E35619]"
                      >
                        Orion Network Gateway Portal (portal.orionyouth.eu)
                      </a>
                    ) : (
                      <span className="font-medium text-[#0B132B]">
                        Orion Network Gateway Portal (portal.orionyouth.eu, launching early 2027)
                      </span>
                    )}{' '}
                    or designated host-partner registration forms. Selected participants’ mobility records, Youthpass certification details, and travel reimbursement documentation are administered in accordance with Erasmus+ National Agency rules under accredited grant{' '}
                    <span className="font-semibold text-[#0B132B] tabular-nums">
                      {ORION_ORG.grantReference}
                    </span>
                    .
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Legal Basis */}
            <section className="space-y-3 border-b border-[rgba(11,19,43,0.10)] pb-8">
              <h2 className="type-h2 text-[#0B132B]">3. Legal basis under GDPR</h2>
              <ul className="space-y-3 list-disc pl-5 type-body text-[rgba(11,19,43,0.85)] leading-relaxed">
                <li>
                  <strong>Consent (Art. 6(1)(a) GDPR):</strong> When you voluntarily send a question, contact inquiry, or partnership dossier to our coordination team.
                </li>
                <li>
                  <strong>Pre-contractual and programme participation steps (Art. 6(1)(b) GDPR):</strong> When administering participant selection, travel arrangements, and accommodation logistics for an Erasmus+ Youth Exchange.
                </li>
                <li>
                  <strong>Legal obligation (Art. 6(1)(c) GDPR):</strong> Reporting participant numbers, Youthpass records, and financial travel reimbursements required by the Tempus Public Foundation and European Commission grant rules.
                </li>
              </ul>
            </section>

            {/* 4. Data Storage & Retention */}
            <section className="space-y-3 border-b border-[rgba(11,19,43,0.10)] pb-8">
              <h2 className="type-h2 text-[#0B132B]">4. Storage, dispatch, and retention</h2>
              <p className="type-body text-[rgba(11,19,43,0.85)] leading-relaxed">
                <strong>No third-party advertising trackers:</strong>{' '}
                <span className="font-medium">orionyouth.eu</span> does not embed third-party behavioral advertising cookies or cross-site tracking pixels. Optional submission history convenience entries saved locally in your browser via{' '}
                <code className="text-xs bg-[rgba(11,19,43,0.06)] px-1.5 py-0.5">
                  localStorage
                </code>{' '}
                remain exclusively on your device and can be cleared at any time in your browser settings.
              </p>
              <p className="type-body text-[rgba(11,19,43,0.85)] leading-relaxed">
                Contact and partnership form submissions are transmitted via encrypted HTTPS to our coordination inbox ({ORION_ORG.email}) using transactional email delivery (Resend). General inquiries are retained only as long as necessary to conclude correspondence; official Erasmus+ project and reimbursement records are kept for the statutory audit window mandated by the European Commission and National Agency.
              </p>
            </section>

            {/* 5. Data Subject Rights */}
            <section className="space-y-3">
              <h2 className="type-h2 text-[#0B132B]">5. Your rights under GDPR</h2>
              <p className="type-body text-[rgba(11,19,43,0.85)] leading-relaxed">
                Under the GDPR, you have the right to request access to your personal data, request rectification or erasure, restrict or object to processing, and receive your data in a portable format. You may exercise any of these rights free of charge by emailing{' '}
                <a
                  href={`mailto:${ORION_ORG.email}`}
                  className="font-semibold text-[#0B132B] underline hover:text-[#E35619] transition-colors"
                >
                  {ORION_ORG.email}
                </a>
                .
              </p>
              <p className="type-body text-[rgba(11,19,43,0.85)] leading-relaxed">
                If you believe our processing infringes data protection law, you also have the right to lodge a complaint with the Hungarian National Authority for Data Protection and Freedom of Information (NAIH, Nemzeti Adatvédelmi és Információszabadság Hatóság).
              </p>
            </section>
          </div>
        </Container>
      </Section>
    </div>
  );
}
