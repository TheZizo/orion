import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types/orion';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { SparkleStar } from '@/components/motifs/SparkleStar';
import { PhotoGalleryGrid } from './PhotoGalleryGrid';

export interface ProjectDetailViewProps {
  project: Project;
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const leadPhoto = project.gallery[0];

  const headerAside = (
    <dl className="space-y-4 text-sm tabular-nums border-t lg:border-t-0 lg:border-l border-[rgba(248,249,250,0.14)] lg:pl-8 pt-6 lg:pt-0">
      <div>
        <dt className="text-xs text-[rgba(248,249,250,0.55)]">Timeline</dt>
        <dd className="text-[#F8F9FA] font-medium mt-0.5">{project.dateLabel}</dd>
      </div>
      <div>
        <dt className="text-xs text-[rgba(248,249,250,0.55)]">Location</dt>
        <dd className="text-[#F8F9FA] font-medium mt-0.5">{project.locationLabel}</dd>
      </div>
      <div>
        <dt className="text-xs text-[rgba(248,249,250,0.55)]">Status</dt>
        <dd className="mt-1">
          <StatusBadge status={project.status} tone="dark" />
        </dd>
      </div>
      {project.grantReference && (
        <div>
          <dt className="text-xs text-[rgba(248,249,250,0.55)]">Accredited grant</dt>
          <dd
            data-testid="grant-reference-badge"
            className="text-[#F8F9FA] font-medium mt-0.5 text-xs tracking-tight"
          >
            {project.grantReference}
          </dd>
        </div>
      )}
    </dl>
  );

  return (
    <div>
      {/* PageHeader with breadcrumb, action type, title, focus lead, and aside */}
      <PageHeader
        breadcrumb={[
          { label: 'Projects', href: '/projects' },
          { label: project.title },
        ]}
        eyebrow={project.actionType}
        title={project.title}
        lead={project.focus}
        aside={headerAside}
      />

      {/* Full-bleed Lead Photo Under Header */}
      {leadPhoto && (
        <section className="w-full bg-[#0B132B]">
          <div className="relative w-full aspect-[16/9] md:aspect-[16/8] min-h-[260px] max-h-[560px] bg-[#0B132B] overflow-hidden">
            <Image
              src={leadPhoto.src}
              alt={leadPhoto.alt || project.title}
              fill
              sizes="100vw"
              className="object-cover object-[50%_38%]"
              priority
            />
          </div>
          {leadPhoto.caption && (
            <div className="bg-[#0B132B] text-[rgba(248,249,250,0.86)] border-b border-[rgba(248,249,250,0.14)] py-3 text-xs">
              <div className="container-orion">{leadPhoto.caption}</div>
            </div>
          )}
        </section>
      )}

      {/* Daylight Reading Canvas */}
      <div className="bg-[#F8F9FA] text-[#0B132B] py-16 md:py-24">
        <div className="container-orion space-y-16 md:space-y-24">
          {/* 8-col Reading Column */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-8">
              {project.emotionalSummary && (
                <p className="type-body-lg text-xl md:text-2xl text-[#0B132B] italic leading-relaxed border-l-2 border-[#0B132B] pl-6 py-1">
                  &ldquo;{project.emotionalSummary}&rdquo;
                </p>
              )}

              <div className="space-y-4">
                <h2 className="type-h3 text-[#0B132B]">Project overview</h2>
                <p className="type-body text-[#0B132B] leading-relaxed">
                  {project.summary}
                </p>
              </div>
            </div>

            {/* Quick Metadata Column */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[rgba(11,19,43,0.10)] lg:pl-8 pt-6 lg:pt-0 space-y-4 text-sm">
              <h3 className="text-xs font-semibold text-[rgba(11,19,43,0.68)]">
                Host information
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs text-[rgba(11,19,43,0.68)]">Host country</dt>
                  <dd className="font-medium text-[#0B132B] mt-0.5">{project.country}</dd>
                </div>
                {project.slug === 'reforest' && (
                  <div>
                    <dt className="text-xs text-[rgba(11,19,43,0.68)]">Official project portal</dt>
                    <dd className="mt-1">
                      <a
                        href="https://www.agoje.eu/our-projects/reforest"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-[#0B132B] underline hover:text-[#e35619] transition-colors"
                      >
                        View ReForest on Asociația Agoje
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </section>

          {/* Impact Metrics as a Calm Inline Row */}
          {project.impactMetrics && project.impactMetrics.length > 0 && (
            <section className="border-y border-[rgba(11,19,43,0.10)] py-8 md:py-12">
              <h2 className="sr-only">Measurable impact</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {project.impactMetrics.map((metric, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="font-display text-4xl md:text-5xl font-bold tracking-tight text-[#0B132B] block">
                      {metric.value}
                    </span>
                    <span className="text-sm text-[rgba(11,19,43,0.7)] block">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Gallery: Asymmetric Grid with Captions */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="space-y-6">
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[rgba(11,19,43,0.10)] pb-4">
                <div>
                  <h2 className="type-h3 text-[#0B132B]">Field documentation</h2>
                  <p className="text-xs text-[rgba(11,19,43,0.65)] mt-1">
                    Archival frames and on-site moments recorded during this mobility.
                  </p>
                </div>
                <span className="text-xs font-medium text-[rgba(11,19,43,0.7)] tabular-nums border border-[rgba(11,19,43,0.18)] px-2.5 py-0.5">
                  {project.gallery.length} {project.gallery.length === 1 ? 'frame' : 'frames'}
                </span>
              </div>
              <PhotoGalleryGrid gallery={project.gallery} showProjectAttribution={false} />
            </section>
          )}

          {/* Participant Quotes */}
          {project.quotes && project.quotes.length > 0 && (
            <section className="space-y-8">
              <h2 className="type-h3 text-[#0B132B]">Participant reflections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {project.quotes.map((quoteItem, idx) => (
                  <figure
                    key={idx}
                    className="border-t border-[rgba(11,19,43,0.10)] pt-6 space-y-4"
                  >
                    <SparkleStar size={16} color="#0B132B" />
                    <blockquote className="type-body text-[#0B132B] italic text-lg leading-relaxed">
                      &ldquo;{quoteItem.quote}&rdquo;
                    </blockquote>
                    <figcaption className="text-sm text-[rgba(11,19,43,0.7)] pt-2">
                      <span className="font-semibold text-[#0B132B]">{quoteItem.name}</span>,{' '}
                      <span>{quoteItem.country}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* Partner List as Plain Text with Country */}
          {project.partnerLogos && project.partnerLogos.length > 0 && (
            <section className="border-t border-[rgba(11,19,43,0.10)] pt-8 space-y-2">
              <h3 className="type-h3 text-[#0B132B]">Partner organisations</h3>
              <p className="type-body text-[#0B132B]">
                {project.partnerLogos
                  .map((partner) => `${partner.name} (${partner.country})`)
                  .join(', ')}
              </p>
            </section>
          )}

          {/* Bottom Navigation */}
          <section className="border-t border-[rgba(11,19,43,0.10)] pt-8 flex flex-wrap items-center justify-between gap-6">
            <Link
              href="/projects"
              className="text-sm font-semibold text-[#0B132B] hover:text-[#e35619] transition-colors underline underline-offset-4"
            >
              All projects archive
            </Link>

            <Button variant="primary" href="/open-calls">
              Explore open calls
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
