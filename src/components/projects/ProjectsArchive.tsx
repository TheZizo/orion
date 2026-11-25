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
      <div className="border-b border-[rgba(11,19,43,0.10)] pb-6">
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
              className="w-full h-12 px-3.5 bg-transparent border border-[rgba(11,19,43,0.14)] text-[#0B132B] font-body text-sm rounded-none focus-visible:outline-none focus:border-[#0B132B] focus:ring-1 focus:ring-[#0B132B]"
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
              className="w-full h-12 px-3.5 bg-transparent border border-[rgba(11,19,43,0.14)] text-[#0B132B] font-body text-sm rounded-none focus-visible:outline-none focus:border-[#0B132B] focus:ring-1 focus:ring-[#0B132B]"
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
              className="w-full h-12 px-3.5 bg-transparent border border-[rgba(11,19,43,0.14)] text-[#0B132B] font-body text-sm rounded-none focus-visible:outline-none focus:border-[#0B132B] focus:ring-1 focus:ring-[#0B132B]"
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
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
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
                  <div className="relative aspect-[16/10] w-full bg-[#0B132B] overflow-hidden border border-[rgba(11,19,43,0.10)]">
                    {thumbnail ? (
                      <Image
                        src={thumbnail.src}
                        alt={thumbnail.alt || project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover"
                        priority={idx === 0}
                      />
                    ) : (
                      <div className="relative w-full h-full bg-[#0B132B] text-[#F8F9FA] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
                        <svg
                          viewBox="0 0 400 250"
                          className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
                          aria-hidden="true"
                        >
                          <circle
                            cx="320"
                            cy="40"
                            r="110"
                            fill="none"
                            stroke="#1D356B"
                            strokeWidth="1"
                          />
                          <ellipse
                            cx="210"
                            cy="130"
                            rx="170"
                            ry="72"
                            transform="rotate(-12 210 130)"
                            fill="none"
                            stroke="rgba(248,249,250,0.35)"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                          />
                        </svg>

                        <div className="relative z-10 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 text-xs font-medium text-[rgba(248,249,250,0.78)]">
                            <SparkleStar size={12} color="#e35619" />
                            <span>{project.actionType}</span>
                          </div>
                          <span className="text-xs text-[rgba(248,249,250,0.72)] tabular-nums">
                            {project.dateLabel}
                          </span>
                        </div>

                        <div className="relative z-10 space-y-2 my-auto py-2">
                          <div className="font-display font-bold text-lg sm:text-xl text-[#F8F9FA] leading-snug">
                            {project.title}
                          </div>
                        </div>

                        {project.grantReference && (
                          <div className="relative z-10 border-t border-[rgba(248,249,250,0.14)] pt-3 text-[11px] text-[rgba(248,249,250,0.72)] tabular-nums">
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
              Documentary photography from our completed and ongoing European mobilities.
              Explore real field activities, collaborative workshops, and cross-cultural moments
              captured on location across Central and Eastern Europe.
            </p>
          </div>
          <PhotoGalleryGrid gallery={allGalleryItems} showProjectAttribution />
        </section>
      )}
    </div>
  );
}
