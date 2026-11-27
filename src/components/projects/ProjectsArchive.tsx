'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project, ProjectStatus } from '@/types/orion';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { SparkleStar } from '@/components/motifs/SparkleStar';
import { PhotoGalleryGrid } from './PhotoGalleryGrid';

export interface ProjectsArchiveProps {
  initialProjects: Project[];
}

export function ProjectsArchive({ initialProjects }: ProjectsArchiveProps) {
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');

  // Derive unique filter options
  const uniqueActionTypes = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => {
      if (p.actionType) set.add(p.actionType);
    });
    return Array.from(set).sort();
  }, [initialProjects]);

  const uniqueCountries = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => {
      if (p.country) set.add(p.country);
    });
    return Array.from(set).sort();
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      if (statusFilter !== 'all' && project.status !== statusFilter) {
        return false;
      }
      if (actionFilter !== 'all' && project.actionType !== actionFilter) {
        return false;
      }
      if (
        countryFilter !== 'all' &&
        project.country.toLowerCase() !== countryFilter.toLowerCase()
      ) {
        return false;
      }
      return true;
    });
  }, [initialProjects, statusFilter, actionFilter, countryFilter]);

  const allGalleryItems = useMemo(() => {
    return initialProjects.flatMap((project) =>
      project.gallery.map((item) => ({
        ...item,
        projectTitle: item.projectTitle || project.title,
        projectSlug: item.projectSlug || project.slug,
      }))
    );
  }, [initialProjects]);

  const handleResetFilters = () => {
    setStatusFilter('all');
    setActionFilter('all');
    setCountryFilter('all');
  };

  const isFiltered =
    statusFilter !== 'all' || actionFilter !== 'all' || countryFilter !== 'all';

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Visually Quiet Filter Bar */}
      <div className="border-b border-[rgba(11,19,43,0.10)] pb-6 space-y-6">
        {/* Quick Status Filter Pills */}
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Mobility state filter"
        >
          {(
            [
              { label: 'All', value: 'all' },
              { label: 'Completed', value: 'Completed' },
              { label: 'Upcoming', value: 'Upcoming' },
            ] as const
          ).map((pill) => {
            const isActive = statusFilter === pill.value;
            return (
              <button
                key={pill.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => setStatusFilter(pill.value)}
                className={`px-3.5 py-1.5 text-xs font-medium border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B] ${
                  isActive
                    ? 'bg-[#0B132B] text-[#F8F9FA] border-[#0B132B] border-t-2 border-t-[#E35619]'
                    : 'bg-transparent text-[#0B132B] border-[rgba(11,19,43,0.18)] hover:border-[#0B132B]'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Status Filter */}
          <div>
            <label
              htmlFor="filter-status"
              className="block text-xs font-semibold text-[#0B132B] mb-2 tracking-normal"
            >
              Status
            </label>
            <select
              id="filter-status"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as ProjectStatus | 'all')
              }
              className="w-full h-11 px-0 border-0 border-b border-[rgba(11,19,43,0.22)] bg-transparent text-[#0B132B] font-body text-sm rounded-none focus-visible:outline-none focus:border-[#0B132B] transition-colors cursor-pointer"
            >
              <option value="all">All statuses</option>
              <option value="Completed">Completed</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>

          {/* Action Type Filter */}
          <div>
            <label
              htmlFor="filter-action"
              className="block text-xs font-semibold text-[#0B132B] mb-2 tracking-normal"
            >
              Action type
            </label>
            <select
              id="filter-action"
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="w-full h-11 px-0 border-0 border-b border-[rgba(11,19,43,0.22)] bg-transparent text-[#0B132B] font-body text-sm rounded-none focus-visible:outline-none focus:border-[#0B132B] transition-colors cursor-pointer"
            >
              <option value="all">All action types</option>
              {uniqueActionTypes.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </div>

          {/* Country Filter */}
          <div>
            <label
              htmlFor="filter-country"
              className="block text-xs font-semibold text-[#0B132B] mb-2 tracking-normal"
            >
              Country
            </label>
            <select
              id="filter-country"
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="w-full h-11 px-0 border-0 border-b border-[rgba(11,19,43,0.22)] bg-transparent text-[#0B132B] font-body text-sm rounded-none focus-visible:outline-none focus:border-[#0B132B] transition-colors cursor-pointer"
            >
              <option value="all">All countries</option>
              {uniqueCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Result Count Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <p
            className="text-[rgba(11,19,43,0.65)] tabular-nums"
            aria-live="polite"
            id="projects-count"
          >
            Showing {filteredProjects.length}{' '}
            {filteredProjects.length === 1 ? 'project' : 'projects'}
            {isFiltered && ` (filtered from ${initialProjects.length})`}
          </p>

          {isFiltered && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-[#0B132B] underline hover:text-[#e35619] cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Editorial Entries */}
      {filteredProjects.length === 0 ? (
        <div className="border border-[rgba(11,19,43,0.10)] p-12 text-center space-y-4">
          <p className="type-h3 text-[#0B132B]">
            No mobilities found matching the selected filters.
          </p>
          <p className="type-body text-[rgba(11,19,43,0.7)] max-w-md mx-auto">
            Try adjusting your search criteria or resetting filters to explore all
            completed and upcoming Orion initiatives.
          </p>
          <div>
            <Button
              variant="secondary"
              tone="light"
              onClick={handleResetFilters}
            >
              Reset all filters
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-20 md:space-y-32">
          {filteredProjects.map((project, idx) => {
            const thumbnail = project.gallery[0];
            const isReversed = idx % 2 === 1;

            return (
              <article
                key={project.slug}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
              >
                {/* Image Column: 7 columns (alternating left/right) */}
                <div
                  className={`lg:col-span-7 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="group relative aspect-[16/10] w-full bg-[#0B132B] overflow-hidden border border-[rgba(11,19,43,0.10)]">
                    {thumbnail ? (
                      <Link
                        href={`/projects/${project.slug}`}
                        className="block relative w-full h-full focus-visible:outline-none"
                      >
                        <Image
                          src={thumbnail.src}
                          alt={thumbnail.alt || project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover object-[50%_48%] group-hover:scale-[1.02] transition-transform duration-300 ease-out motion-reduce:transform-none"
                          priority={idx === 0}
                        />
                      </Link>
                    ) : (
                      <div className="relative w-full h-full bg-[#0B132B] text-[#F8F9FA] border-t-2 border-t-[#E35619] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
                        {/* Living Observatory Blueprint SVG */}
                        <svg
                          viewBox="0 0 480 300"
                          className="absolute inset-0 w-full h-full pointer-events-none"
                          aria-hidden="true"
                        >
                          {/* Subtle coordinate graticule */}
                          <line
                            x1="0"
                            y1="150"
                            x2="480"
                            y2="150"
                            stroke="rgba(248,249,250,0.06)"
                            strokeWidth="1"
                          />
                          <line
                            x1="336"
                            y1="0"
                            x2="336"
                            y2="300"
                            stroke="rgba(248,249,250,0.06)"
                            strokeWidth="1"
                          />

                          {/* Slow-rotating outer orbital ring */}
                          <g className="belief-spin-slow">
                            <circle
                              cx="336"
                              cy="150"
                              r="112"
                              fill="none"
                              stroke="rgba(248,249,250,0.18)"
                              strokeWidth="1"
                              strokeDasharray="3 6"
                            />
                            <circle
                              cx="336"
                              cy="38"
                              r="2"
                              fill="rgba(248,249,250,0.45)"
                            />
                          </g>

                          {/* Inner structural orbit */}
                          <circle
                            cx="336"
                            cy="150"
                            r="72"
                            fill="none"
                            stroke="#1D356B"
                            strokeWidth="1"
                          />

                          {/* Drawn constellation trajectory arcs */}
                          <path
                            d="M 224 74 Q 284 96 336 150"
                            fill="none"
                            stroke="rgba(248,249,250,0.34)"
                            strokeWidth="1.25"
                            className="belief-trace"
                            style={{ '--trace-len': 160 } as React.CSSProperties}
                          />
                          <path
                            d="M 412 68 Q 382 114 336 150"
                            fill="none"
                            stroke="rgba(248,249,250,0.34)"
                            strokeWidth="1.25"
                            className="belief-trace"
                            style={
                              {
                                '--trace-len': 140,
                                animationDelay: '120ms',
                              } as React.CSSProperties
                            }
                          />
                          <path
                            d="M 426 218 Q 380 194 336 150"
                            fill="none"
                            stroke="rgba(248,249,250,0.34)"
                            strokeWidth="1.25"
                            className="belief-trace"
                            style={
                              {
                                '--trace-len': 140,
                                animationDelay: '220ms',
                              } as React.CSSProperties
                            }
                          />
                          <path
                            d="M 254 228 Q 294 196 336 150"
                            fill="none"
                            stroke="rgba(227,86,25,0.55)"
                            strokeWidth="1.25"
                            className="belief-trace"
                            style={
                              {
                                '--trace-len': 150,
                                animationDelay: '320ms',
                              } as React.CSSProperties
                            }
                          />

                          {/* 4 Consortium Star Nodes */}
                          <g className="belief-bloom">
                            <circle cx="224" cy="74" r="3" fill="#F8F9FA" />
                            <circle
                              cx="224"
                              cy="74"
                              r="7"
                              fill="none"
                              stroke="rgba(248,249,250,0.28)"
                              strokeWidth="1"
                            />
                            <circle cx="412" cy="68" r="3" fill="#F8F9FA" />
                            <circle
                              cx="412"
                              cy="68"
                              r="7"
                              fill="none"
                              stroke="rgba(248,249,250,0.28)"
                              strokeWidth="1"
                            />
                            <circle cx="426" cy="218" r="3" fill="#F8F9FA" />
                            <circle
                              cx="426"
                              cy="218"
                              r="7"
                              fill="none"
                              stroke="rgba(248,249,250,0.28)"
                              strokeWidth="1"
                            />
                            <circle cx="254" cy="228" r="3" fill="#F8F9FA" />
                            <circle
                              cx="254"
                              cy="228"
                              r="7"
                              fill="none"
                              stroke="rgba(248,249,250,0.28)"
                              strokeWidth="1"
                            />
                          </g>

                          {/* Ember Debrecen Core with Ripple + Bloom 4-point star */}
                          <circle
                            cx="336"
                            cy="150"
                            r="18"
                            fill="none"
                            stroke="#E35619"
                            strokeWidth="1.25"
                            className="belief-ripple"
                          />
                          <g
                            transform="translate(324, 138)"
                            className="belief-bloom"
                          >
                            <path
                              d="M 12 2 Q 12 12 22 12 Q 12 12 12 22 Q 12 12 2 12 Q 12 12 12 2 Z"
                              fill="#E35619"
                            />
                          </g>
                        </svg>

                        {/* Legibility gradient scrim behind typography */}
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/90 via-[#0B132B]/60 to-transparent pointer-events-none"
                          aria-hidden="true"
                        />

                        <div className="relative z-10 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 text-xs font-medium text-[rgba(248,249,250,0.85)]">
                            <SparkleStar size={12} color="#E35619" />
                            <span>{project.actionType}</span>
                          </div>
                          <span className="text-xs text-[rgba(248,249,250,0.8)] tabular-nums">
                            {project.dateLabel}
                          </span>
                        </div>

                        <div className="relative z-10 max-w-[75%] my-auto py-2">
                          <div className="font-display font-bold text-lg sm:text-xl text-[#F8F9FA] leading-snug">
                            {project.title}
                          </div>
                        </div>

                        {project.grantReference && (
                          <div className="relative z-10 border-t border-[rgba(248,249,250,0.16)] pt-3 text-xs text-[rgba(248,249,250,0.8)] tabular-nums">
                            Grant {project.grantReference}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Text Content Column: 5 columns */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  {/* Meta strip */}
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={project.status} tone="light" />
                    <span className="text-sm text-[rgba(11,19,43,0.7)] tabular-nums">
                      {project.dateLabel}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="type-h2 text-[#0B132B]">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="hover:underline underline-offset-4"
                    >
                      {project.title}
                    </Link>
                  </h2>

                  {/* Location */}
                  <div className="text-sm text-[rgba(11,19,43,0.72)]">
                    <p className="font-medium text-[#0B132B]">
                      {project.locationLabel}
                    </p>
                  </div>

                  {/* Focus line / summary */}
                  <p className="type-body text-[#0B132B] leading-relaxed">
                    {project.focus}
                  </p>

                  {/* Action Link */}
                  <div className="pt-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center text-sm font-semibold text-[#0B132B] hover:text-[#e35619] transition-colors underline underline-offset-4"
                    >
                      Read project details
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Field Photography Showcase across all initiatives */}
      {allGalleryItems.length > 0 && (
        <section className="border-t border-[rgba(11,19,43,0.12)] pt-16 md:pt-24 space-y-8">
          <div className="space-y-3">
            <h2 className="type-h2 text-[#0B132B]">
              Field Photography Showcase
            </h2>
            <p className="type-body text-[rgba(11,19,43,0.7)] max-w-2xl leading-relaxed">
              Documentary photography from our European mobilities, capturing field action, workshops, and daily cross-cultural life on location.
            </p>
          </div>
          <PhotoGalleryGrid gallery={allGalleryItems} showProjectAttribution />
        </section>
      )}
    </div>
  );
}
