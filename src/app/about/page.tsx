import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTeam, ORION_ORG, formatCoordinates } from '@/lib/orionData';
import { PageHeader } from '@/components/ui/PageHeader';
import { MotionTrailDivider } from '@/components/motifs/MotionTrailDivider';
import { SparkleStar } from '@/components/motifs/SparkleStar';
import { Button } from '@/components/ui/Button';
import { ConstellationLeadershipGrid } from '@/components/about/ConstellationLeadershipGrid';

export const metadata: Metadata = {
  title: 'About Orion — Origin, Capacity & Leadership',
  description:
    'Official profile of Orion Fiatalok Informális Csoportja (Orion Informal Group of Young People) in Debrecen, Hungary: dual hosting and sending mandate, four operational pillars, and founding leadership team.',
};

// 8 deterministic fixed stars for the Deep Observatory Night canvas (percentage coordinates)
const FIXED_NIGHT_STARS = [
  { x: 12, y: 20, r: 1.0, o: 0.35 },
  { x: 28, y: 75, r: 1.2, o: 0.25 },
  { x: 45, y: 15, r: 0.8, o: 0.4 },
  { x: 62, y: 65, r: 1.1, o: 0.3 },
  { x: 75, y: 30, r: 0.9, o: 0.45 },
  { x: 88, y: 80, r: 1.2, o: 0.3 },
  { x: 92, y: 18, r: 0.8, o: 0.35 },
  { x: 35, y: 45, r: 1.0, o: 0.25 },
];

/**
 * AboutPage (Server Component)
 *
 * Implements the dramatic Night → Daylight → Night → Daylight observatory rhythm:
 * 1. Band 1: PageHeader (#0B132B) with Observatory Anchor Dock + MotionTrailDivider transition
 * 2. Band 2: Daylight Field Journal (#F8F9FA) with Origin Spread & Juxtaposed Dual Mandate
 * 3. Band 3: Deep Observatory Night (#0B132B) with Charter Quote & 2x2 Operational Pillars Grid
 * 4. Band 4: Daylight Constellation Leadership (#F8F9FA) with Leadership Grid & Closing Action Strip
 */
export default function AboutPage() {
  const team = getTeam();

  return (
    <div className="w-full">
      {/* =========================================================================
          Band 1: Observatory Night Header (#0B132B) + MotionTrailDivider
          ========================================================================= */}
      <PageHeader
        className="!border-b-0"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
        ]}
        eyebrow="Origin, capacity & leadership"
        title="The constellation rooted in Debrecen"
        lead="Founded by a dynamic fusion of local Hungarian and international university students, Orion Fiatalok Informális Csoportja empowers young people to reach their full potential through non-formal education and cross-border mobility."
        aside={
          <aside className="bg-[#111D3B] border border-[#1D356B] p-6 space-y-3 text-xs text-[rgba(248,249,250,0.85)] tabular-nums">
            <div className="flex items-center gap-2 text-[#F8F9FA] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#E35619]" aria-hidden="true" />
              <span>Debrecen Anchor Station</span>
            </div>
            <div className="text-[rgba(248,249,250,0.72)] tabular-nums">
              {formatCoordinates(ORION_ORG.coordinates)}, {ORION_ORG.region}
            </div>
            <div className="border-t border-[rgba(248,249,250,0.12)] pt-3 space-y-1.5">
              <div className="font-semibold text-[#F8F9FA]">{ORION_ORG.legalName}</div>
              <div className="text-[rgba(248,249,250,0.78)]">{ORION_ORG.legalNameLatin}</div>
              <div className="text-[rgba(248,249,250,0.72)]">Mission: &ldquo;{ORION_ORG.tagline}&rdquo;</div>
              <div className="text-[rgba(248,249,250,0.65)]">Grant {ORION_ORG.grantReference}</div>
            </div>
          </aside>
        }
      />

      {/* Planetary Horizon Curve Divider: Navy -> #F8F9FA */}
      <MotionTrailDivider from="navy" to="offwhite" height={56} />

      {/* =========================================================================
          Band 2: Daylight Field Journal (#F8F9FA)
          ========================================================================= */}
      <section className="bg-[#F8F9FA] text-[#0B132B] py-20 md:py-28">
        <div className="container-orion space-y-16 md:space-y-24">
          {/* Part A: Origin Spread (12-col split: 6/6) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left 6 Columns */}
            <div className="lg:col-span-6 space-y-6 min-w-0">
              <div className="type-eyebrow text-[#0B132B]/65">Founded in Debrecen, Hungary</div>
              <h2 className="type-h2 text-[#0B132B]">
                Bridging local reality and European mobility
              </h2>

              <div className="border-l-2 border-[#e35619] pl-4 py-1">
                <p className="type-body-lg text-[#0B132B] font-medium">
                  Our mission is to &ldquo;create the brightest stars&rdquo;: empowering youth to reach their full potential through non-formal education and cross-border experiences.
                </p>
              </div>

              <div className="space-y-4 type-body text-[rgba(11,19,43,0.84)] leading-relaxed">
                <p>
                  <strong>Orion Fiatalok Informális Csoportja</strong> (<em>Orion Informal Group of Young People</em>) was founded in Debrecen, Hungary by a dynamic fusion of local Hungarian and international university students. Guided by the mission to create the brightest stars, our initiative empowers young people to reach their full potential through non-formal experiential education, intercultural dialogue, and cross-border mobility.
                </p>
                <p>
                  Although recently established, Orion operates on the collective voluntary and professional portfolios of its founding members across major international student networks (<strong>ESN</strong>, <strong>AIESEC</strong>), the National Union of Students in Hungary (<strong>HÖOK</strong>), university foreign affairs offices, and private-sector project execution. We combine professional teaching experience with firsthand insight from participating in Erasmus+ youth exchanges, giving us an intimate understanding of the participant journey from both sides of the table.
                </p>
                <p>
                  By leveraging our diverse cultural and academic backgrounds, Orion serves as an accessible peer-to-peer platform for personal growth, active citizenship, and global networking. We actively bridge the linguistic and cultural gaps between European programs and local youth reality, ensuring that life-changing international opportunities reach those who might otherwise miss out.
                </p>
              </div>
            </div>

            {/* Right 6 Columns */}
            <div className="lg:col-span-6 space-y-0 min-w-0">
              {/* Documentary Photo Frame */}
              <div className="aspect-[16/10] relative overflow-hidden border border-[rgba(11,19,43,0.12)] bg-[#0B132B]">
                <Image
                  src="/images/projects/debrecen-1.jpg"
                  alt="Orion team workshop and coordination session at Debrecen headquarters"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover object-center"
                  priority
                />
                {/* Top-left coordinate badge (comma-separated, zero spaced em-dash) */}
                <div className="absolute top-3 left-3 bg-[#0B132B] text-[#F8F9FA] px-3 py-1.5 text-xs font-display tracking-tight tabular-nums z-10">
                  47.53° N, 21.62° E, Debrecen, Hungary
                </div>
              </div>

              {/* Attached Caption Strip */}
              <div className="bg-white border-x border-b border-[rgba(11,19,43,0.12)] px-4 py-3 text-xs text-[rgba(11,19,43,0.72)]">
                Orion team strategy and community workshop at Debrecen headquarters.
              </div>

              {/* Attached Institutional Profile Spec Matrix */}
              <div className="bg-white border-x border-b border-[rgba(11,19,43,0.12)] p-6 space-y-4">
                <h3 className="font-display font-semibold text-base text-[#0B132B]">
                  Institutional profile
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm pt-2 border-t border-[rgba(11,19,43,0.08)]">
                  <div>
                    <dt className="text-xs text-[rgba(11,19,43,0.65)]">Legal name (Hungarian)</dt>
                    <dd className="font-medium text-[#0B132B] mt-0.5">{ORION_ORG.legalName}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[rgba(11,19,43,0.65)]">Legal name (English)</dt>
                    <dd className="font-medium text-[#0B132B] mt-0.5">{ORION_ORG.legalNameLatin}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[rgba(11,19,43,0.65)]">Organisation type</dt>
                    <dd className="font-medium text-[#0B132B] mt-0.5">{ORION_ORG.organisationType}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[rgba(11,19,43,0.65)]">Main sector</dt>
                    <dd className="font-medium text-[#0B132B] mt-0.5">{ORION_ORG.mainSector}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[rgba(11,19,43,0.65)]">Base &amp; region</dt>
                    <dd className="font-medium text-[#0B132B] mt-0.5 tabular-nums">
                      {ORION_ORG.seat}, {ORION_ORG.region} ({ORION_ORG.postCode})
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[rgba(11,19,43,0.65)]">Network foundations</dt>
                    <dd className="font-medium text-[#0B132B] mt-0.5">ESN, AIESEC, HÖOK</dd>
                  </div>
                  <div className="sm:col-span-2 pt-2 border-t border-[rgba(11,19,43,0.08)]">
                    <dt className="text-xs text-[rgba(11,19,43,0.65)]">Coordination email</dt>
                    <dd className="mt-0.5">
                      <a
                        href={`mailto:${ORION_ORG.email}`}
                        className="font-semibold text-[#0B132B] underline underline-offset-4 hover:text-[#e35619] transition-colors"
                      >
                        {ORION_ORG.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Part B: Juxtaposed Dual Mandate Split (Daylight vs. Night Contrast, 12-col grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 6 cols: Hosting in Hungary (Daylight Card) */}
            <div className="lg:col-span-6 bg-white border border-[rgba(11,19,43,0.12)] p-8 md:p-10 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="type-eyebrow text-[#0B132B]/65">Domestic &amp; incoming projects</div>
                <h3 className="type-h3 text-2xl text-[#0B132B]">Hosting in Hungary</h3>
                <p className="type-body text-[rgba(11,19,43,0.82)] leading-relaxed">
                  Designing and implementing local community projects and hosted Erasmus+ KA1 youth exchanges inside Hungary to foster civic engagement, financial confidence, and inclusive peer dialogue.
                </p>
              </div>
              <div className="border-t border-[rgba(11,19,43,0.10)] pt-4 text-xs text-[rgba(11,19,43,0.72)] tabular-nums">
                Upcoming hosted exchange: The Financial Blueprint (Grant 2026-1-HU01-KA152-YOU-000399636)
              </div>
            </div>

            {/* Right 6 cols: Sending across Europe (Night Card) */}
            <div className="lg:col-span-6 bg-[#0B132B] text-[#F8F9FA] border border-[#0B132B] p-8 md:p-10 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="type-eyebrow text-[#F8F9FA]/70">Cross-border outgoing mandate</div>
                  <SparkleStar size={14} color="#e35619" />
                </div>
                <h3 className="type-h3 text-2xl text-[#F8F9FA]">Sending across Europe</h3>
                <p className="type-body text-[rgba(248,249,250,0.82)] leading-relaxed">
                  Partnering actively with European youth organizations to send young residents abroad, providing arrival preparation and mentoring so participants who might otherwise miss out travel with confidence.
                </p>
              </div>
              <div className="border-t border-[rgba(248,249,250,0.14)] pt-4 text-xs text-[rgba(248,249,250,0.78)]">
                Completed sending partnership: ReForest in Lacu Roșu, Romania (October 2026)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          Band 3: Deep Observatory Night: Charter & Four Pillars of Operational Capacity
          ========================================================================= */}
      <section className="bg-[#0B132B] text-[#F8F9FA] py-20 md:py-28 border-y border-[rgba(248,249,250,0.14)] relative overflow-hidden">
        {/* Deterministic Faint Background Star-Dust */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {FIXED_NIGHT_STARS.map((star, idx) => (
              <circle
                key={idx}
                cx={`${star.x}%`}
                cy={`${star.y}%`}
                r={star.r}
                fill="#F8F9FA"
                opacity={star.o}
              />
            ))}
          </svg>
        </div>

        <div className="container-orion relative z-10 space-y-12">
          {/* Charter Blockquote */}
          <blockquote className="type-h3 text-[#F8F9FA] leading-snug max-w-4xl border-l-2 border-[#e35619] pl-6">
            &ldquo;{ORION_ORG.longBoilerplate}&rdquo;
          </blockquote>

          {/* Section Header */}
          <div className="space-y-2 max-w-3xl">
            <div className="type-eyebrow text-[rgba(248,249,250,0.7)]">Operational foundations</div>
            <h2 className="type-h2 text-[#F8F9FA]">
              Four pillars of operational capacity
            </h2>
            <p className="type-body text-[rgba(248,249,250,0.80)]">
              Though newly established as an informal group, Orion delivers hosting and sending partnerships backed by four core team competencies.
            </p>
          </div>

          {/* 2x2 Asymmetric Observatory Instrument Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-t border-l border-[#1D356B]">
            {/* Pillar 1: 7 cols */}
            <div className="md:col-span-7 bg-[#111D3B] border-r border-b border-[#1D356B] p-8 md:p-10 flex flex-col justify-between gap-6 min-w-0">
              <div className="space-y-4">
                <div className="flex items-center">
                  <SparkleStar size={14} color="#e35619" />
                </div>
                <h3 className="type-h3 text-xl md:text-2xl text-[#F8F9FA] leading-snug">
                  Cross-cultural pedagogy and educational integration
                </h3>
                <p className="type-body text-[rgba(248,249,250,0.82)] leading-relaxed">
                  Our leadership team includes international residents actively employed as English teachers for Hungarian children. Navigating the Hungarian school system daily develops advanced non-verbal communication skills and deep understanding of local youth culture. We unite this pedagogical foundation with extensive firsthand experience as Erasmus+ participants, designing learning environments that are structured, engaging, and culturally attuned.
                </p>
              </div>
              <div className="border-t border-[rgba(248,249,250,0.12)] pt-4 text-xs text-[rgba(248,249,250,0.68)]">
                Active English educators in Hungarian schools &amp; Erasmus+ alumni
              </div>
            </div>

            {/* Pillar 2: 5 cols */}
            <div className="md:col-span-5 bg-[#111D3B] border-r border-b border-[#1D356B] p-8 md:p-10 flex flex-col justify-between gap-6 min-w-0">
              <div className="space-y-4">
                <div className="flex items-center">
                  <SparkleStar size={14} color="#e35619" />
                </div>
                <h3 className="type-h3 text-xl md:text-2xl text-[#F8F9FA] leading-snug">
                  Project management and organizational structure
                </h3>
                <p className="type-body text-[rgba(248,249,250,0.82)] leading-relaxed">
                  Combining professional backgrounds in business administration, sports coaching, and NGO leadership, our members bring operational rigor to every mobility. High-level leadership experience from global networks like AIESEC—directing marketing teams, executing crisis-response fundraising, and managing complex logistics—ensures structured workflows, deadline discipline, and dependable risk management.
                </p>
              </div>
              <div className="border-t border-[rgba(248,249,250,0.12)] pt-4 text-xs text-[rgba(248,249,250,0.68)]">
                Business administration, sports coaching &amp; AIESEC logistics
              </div>
            </div>

            {/* Pillar 3: 5 cols */}
            <div className="md:col-span-5 bg-[#111D3B] border-r border-b border-[#1D356B] p-8 md:p-10 flex flex-col justify-between gap-6 min-w-0">
              <div className="space-y-4">
                <div className="flex items-center">
                  <SparkleStar size={14} color="#e35619" />
                </div>
                <h3 className="type-h3 text-xl md:text-2xl text-[#F8F9FA] leading-snug">
                  Advanced communication and information management
                </h3>
                <p className="type-body text-[rgba(248,249,250,0.82)] leading-relaxed">
                  Rather than treating dissemination as an afterthought, Orion maintains dedicated internal capacity for knowledge organization and digital strategy. Led by specialists in Information and Library Science (ELTE) alongside experienced student-union PR managers, we build systematic editorial, graphic, and archiving workflows that ensure project results reach general youth across Hungary.
                </p>
              </div>
              <div className="border-t border-[rgba(248,249,250,0.12)] pt-4 text-xs text-[rgba(248,249,250,0.68)]">
                ELTE Information &amp; Library Science, Knowledge Management &amp; PR
              </div>
            </div>

            {/* Pillar 4: 7 cols */}
            <div className="md:col-span-7 bg-[#111D3B] border-r border-b border-[#1D356B] p-8 md:p-10 flex flex-col justify-between gap-6 min-w-0">
              <div className="space-y-4">
                <div className="flex items-center">
                  <SparkleStar size={14} color="#e35619" />
                </div>
                <h3 className="type-h3 text-xl md:text-2xl text-[#F8F9FA] leading-snug">
                  Social inclusion and participant welfare
                </h3>
                <p className="type-body text-[rgba(248,249,250,0.82)] leading-relaxed">
                  Our inclusion mandate is grounded in years of direct fieldwork: volunteering with grassroots NGOs in Bangladesh, facilitating activities for children with special needs and learning disabilities at Lady of Peace, and mentoring international students through the HÖOK Diaspora Mentoring Program. This trained empathy and arrival-support expertise makes Orion an exceptionally safe partner for participants facing fewer opportunities.
                </p>
              </div>
              <div className="border-t border-[rgba(248,249,250,0.12)] pt-4 text-xs text-[rgba(248,249,250,0.68)]">
                Bangladesh NGO fieldwork, Lady of Peace &amp; HÖOK Diaspora Mentoring
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          Band 4: Daylight Constellation Leadership & Closing Dispatch (#F8F9FA)
          ========================================================================= */}
      <section className="bg-[#F8F9FA] text-[#0B132B] py-20 md:py-28">
        <div className="container-orion space-y-20 md:space-y-24">
          {/* Constellation Leadership Grid */}
          <ConstellationLeadershipGrid team={team} />

          {/* Closing Consortium & Mobility Action Strip */}
          <section className="bg-[#0B132B] text-[#F8F9FA] border border-[#1D356B] p-8 md:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-2 max-w-2xl">
              <h2 className="type-h2 text-[#F8F9FA]">
                Partner with Orion or join an upcoming exchange
              </h2>
              <p className="type-body text-[rgba(248,249,250,0.78)]">
                We collaborate with European youth organizations on KA152 and KA2 mobilities and welcome first-time participants across our open calls.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Button variant="primary" href="/partners">
                Partner dossier &amp; inquiry
              </Button>
              <Button variant="secondary" tone="dark" href="/open-calls">
                Explore open calls
              </Button>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
