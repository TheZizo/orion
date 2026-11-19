import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Download, MapPin } from 'lucide-react';
import {
  SEED_OPEN_CALLS,
  getOpenCallBySlug,
  formatDateRange,
} from '@/lib/orionData';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { HybridApplicationFunnel } from '@/components/open-calls/HybridApplicationFunnel';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SEED_OPEN_CALLS.map((call) => ({
    slug: call.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const call = getOpenCallBySlug(slug);

  if (!call) {
    return {
      title: 'Call not found | Orion',
      description: 'The requested open call trajectory could not be found.',
    };
  }

  return {
    title: `${call.title} | Orion Open Calls`,
    description: call.summary,
  };
}

export default async function OpenCallDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const call = getOpenCallBySlug(slug);

  if (!call) {
    notFound();
  }

  const datesFormatted = formatDateRange(call.startDate, call.endDate);

  const headerAside = (
    <aside aria-label="Key details" className="border-t border-[rgba(248,249,250,0.14)] pt-4 lg:border-t-0 lg:pt-0">
      <dl className="space-y-3 type-caption text-[rgba(248,249,250,0.85)]">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-[rgba(248,249,250,0.65)]">Status</dt>
          <dd><StatusBadge status={call.status} tone="dark" /></dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-[rgba(248,249,250,0.65)]">When</dt>
          <dd className="tabular-nums font-medium text-[#F8F9FA]">{datesFormatted}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-[rgba(248,249,250,0.65)]">Where</dt>
          <dd className="font-medium text-[#F8F9FA] text-right">
            <span>{call.city}, {call.country}</span>
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-[rgba(248,249,250,0.65)]">Deadline</dt>
          <dd className="tabular-nums font-medium text-[#F8F9FA]">{call.applicationDeadline}</dd>
        </div>
      </dl>
    </aside>
  );

  return (
    <>
      {/* Page Header on Midnight Navy with Deterministic Stardust & Elliptical Orbit */}
      <PageHeader
        breadcrumb={[
          { label: 'Open calls', href: '/open-calls' },
          { label: call.title },
        ]}
        eyebrow={call.actionType}
        title={call.title}
        lead={call.summary}
        aside={headerAside}
      />

      {/* Main Content on Off-White Canvas */}
      <Section tone="light" spacing="lg">
        <Container>
          <div className="grid-orion">
            {/* Left 8 Columns: Narrative, Timeline & Logistics */}
            <div className="col-span-12 lg:col-span-8 space-y-12">
              {/* Emotional Payoff */}
              <div className="space-y-4">
                <p className="type-body-lg text-[#0B132B] font-medium leading-relaxed">
                  {call.emotionalPayoff}
                </p>
              </div>

              {/* A day in the exchange (Vertical Timeline with real numbering 1, 2, 3...) */}
              <div className="space-y-6 pt-6 border-t border-[rgba(11,19,43,0.10)]">
                <div>
                  <h2 className="type-h2 text-[#0B132B] font-bold">
                    A day in the exchange
                  </h2>
                  <p className="type-caption text-[#0B132B]/70 mt-1">
                    Non-formal learning schedule balancing immersive workshops, group reflection, and intercultural connection.
                  </p>
                </div>

                <ol className="relative pl-8 border-l border-[rgba(11,19,43,0.18)] ml-3 space-y-8 my-6 list-none">
                  {call.dailyExperience.map((item, idx) => (
                    <li key={idx} className="relative">
                      {/* Real sequential numeral marker */}
                      <span
                        className="absolute -left-[45px] top-0.5 w-6 h-6 border border-[#0B132B] bg-[#F8F9FA] text-[#0B132B] flex items-center justify-center text-xs font-bold tabular-nums"
                        aria-hidden="true"
                      >
                        {idx + 1}
                      </span>
                      <h3 className="type-h3 text-[#0B132B] font-semibold text-lg">
                        {item.label}
                      </h3>
                      <p className="type-body text-[#0B132B]/80 mt-1">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Venue */}
              <div className="space-y-4 pt-6 border-t border-[rgba(11,19,43,0.10)]">
                <h2 className="type-h2 text-[#0B132B] font-bold">
                  Venue
                </h2>

                <div className="border border-[rgba(11,19,43,0.12)] bg-white p-6 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 type-body font-semibold text-[#0B132B]">
                      <MapPin className="w-5 h-5 text-[#e35619]" aria-hidden="true" />
                      <span>{call.city}, {call.country}</span>
                    </div>
                  </div>

                  <p className="type-body text-[#0B132B]/80">
                    <strong className="text-[#0B132B] font-medium">Venue:</strong>{' '}
                    {call.venue ?? 'Host center details provided in official Infopack'}
                  </p>
                  <p className="type-caption text-[#0B132B]/70">
                    Host accommodation, full board (3 meals per day + coffee breaks), and workshop facilities are 100% funded by Erasmus+.
                  </p>
                </div>
              </div>

              {/* Travel Reimbursement Policy (Distance Band Table Removed per Item 21) */}
              <div className="space-y-4 pt-6 border-t border-[rgba(11,19,43,0.10)]">
                <div>
                  <h2 className="type-h2 text-[#0B132B] font-bold">
                    Travel reimbursement
                  </h2>
                  <p className="type-body text-[#0B132B]/80 mt-1 leading-relaxed">
                    Roundtrip travel costs are reimbursed up to the official Erasmus+ standard limits upon submission of valid travel tickets, boarding passes, and receipts.
                  </p>
                </div>

                {call.reimbursementNotes && (
                  <p className="type-caption text-[#0B132B]/75 italic border-l-2 border-[#0B132B]/20 pl-4 py-1">
                    {call.reimbursementNotes}
                  </p>
                )}
              </div>

              {/* Who Can Apply */}
              <div className="space-y-4 pt-6 border-t border-[rgba(11,19,43,0.10)]">
                <h2 className="type-h2 text-[#0B132B] font-bold">
                  Who can apply
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
                  <div className="border border-[rgba(11,19,43,0.12)] bg-white p-4">
                    <span className="block text-xs text-[#0B132B]/60 font-medium">
                      Age eligibility
                    </span>
                    <span className="type-h3 text-[#0B132B] font-bold mt-1 block">
                      {call.ageRange}
                    </span>
                  </div>

                  <div className="border border-[rgba(11,19,43,0.12)] bg-white p-4">
                    <span className="block text-xs text-[#0B132B]/60 font-medium">
                      Cohort per partner
                    </span>
                    <span className="type-body font-bold text-[#0B132B] mt-1 block">
                      {call.participantsPerCountry}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="type-caption font-semibold text-[#0B132B]">
                    Eligibility checklist:
                  </h3>
                  <ul className="space-y-2 list-disc pl-5">
                    {call.eligibility.map((item, idx) => (
                      <li key={idx} className="type-body text-[#0B132B]/85">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Partner Organizations & Themes */}
              <div className="space-y-6 pt-6 border-t border-[rgba(11,19,43,0.10)]">
                <div className="space-y-2">
                  <h3 className="type-caption font-semibold text-[#0B132B]">
                    Partner organizations:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {call.partnerOrgs.map((org, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 border border-[rgba(11,19,43,0.14)] bg-white text-xs text-[#0B132B]"
                      >
                        {org}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="type-caption font-semibold text-[#0B132B]">
                    Thematic focus:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {call.themes.map((theme, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 border border-[rgba(11,19,43,0.14)] bg-white text-xs text-[#0B132B]/80"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Infopack Access Block */}
              <div className="pt-6 border-t border-[rgba(11,19,43,0.10)]">
                {call.infopackUrl && call.infopackUrl.startsWith('http') ? (
                  <a
                    href={call.infopackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-none px-5 py-2.5 text-sm md:text-base font-semibold tracking-tight border border-[rgba(11,19,43,0.18)] text-[#0B132B] hover:bg-[rgba(11,19,43,0.05)] hover:border-[rgba(11,19,43,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B] focus-visible:ring-offset-2 transition-colors duration-150 cursor-pointer select-none w-full sm:w-auto"
                  >
                    <span>View official ReForest page &amp; infopack ↗</span>
                  </a>
                ) : call.infopackUrl ? (
                  <a
                    href={call.infopackUrl}
                    download
                    className="inline-flex items-center justify-center rounded-none px-5 py-2.5 text-sm md:text-base font-semibold tracking-tight border border-[rgba(11,19,43,0.18)] text-[#0B132B] hover:bg-[rgba(11,19,43,0.05)] hover:border-[rgba(11,19,43,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B] focus-visible:ring-offset-2 transition-colors duration-150 cursor-pointer select-none w-full sm:w-auto"
                  >
                    <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                    <span>Download Infopack PDF</span>
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 border border-[rgba(11,19,43,0.14)] bg-white text-xs font-semibold text-[rgba(11,19,43,0.7)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E35619]" aria-hidden="true" />
                    <span>Infopack coming soon</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right 4 Columns: Sticky Quick Navigator & Meta */}
            <aside className="col-span-12 lg:col-span-4 space-y-6">
              <div className="border border-[rgba(11,19,43,0.12)] bg-white p-6 space-y-4 lg:sticky lg:top-24">
                <h3 className="type-h3 text-base font-semibold text-[#0B132B]">
                  Trajectory details
                </h3>

                <dl className="space-y-3 type-caption text-[#0B132B]/85">
                  <div className="flex justify-between py-1.5 border-b border-[rgba(11,19,43,0.06)]">
                    <dt className="text-[#0B132B]/60">Status</dt>
                    <dd><StatusBadge status={call.status} tone="light" /></dd>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-[rgba(11,19,43,0.06)]">
                    <dt className="text-[#0B132B]/60">Type</dt>
                    <dd className="font-semibold text-[#0B132B]">{call.actionType}</dd>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-[rgba(11,19,43,0.06)]">
                    <dt className="text-[#0B132B]/60">Destination</dt>
                    <dd className="font-semibold text-[#0B132B]">{call.city}, {call.country}</dd>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-[rgba(11,19,43,0.06)]">
                    <dt className="text-[#0B132B]/60">Cohort size</dt>
                    <dd className="font-medium text-[#0B132B]">{call.participantsPerCountry}</dd>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-[rgba(11,19,43,0.06)]">
                    <dt className="text-[#0B132B]/60">Application</dt>
                    <dd className="font-medium text-[#0B132B]">
                      {call.status === 'Opening soon'
                        ? 'Opening soon'
                        : call.applicationMode === 'internal'
                          ? 'Network portal'
                          : 'Partner portal'}
                    </dd>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-[rgba(11,19,43,0.06)]">
                    <dt className="text-[#0B132B]/60">Deadline</dt>
                    <dd className="font-semibold text-[#0B132B]">{call.applicationDeadline}</dd>
                  </div>
                </dl>

                <div className="pt-2">
                  <a
                    href="#apply"
                    className="block w-full py-2.5 px-4 text-center text-xs font-semibold bg-[#0B132B] text-[#F8F9FA] hover:bg-[#111D3B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B]"
                  >
                    Jump to application
                  </a>
                </div>
              </div>
            </aside>
          </div>

          {/* Dedicated Application Funnel Section */}
          <div id="apply" className="mt-16 pt-10 border-t border-[rgba(11,19,43,0.14)]">
            <HybridApplicationFunnel call={call} />
          </div>
        </Container>
      </Section>
    </>
  );
}
