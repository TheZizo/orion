'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GalleryItem } from '@/types/orion';

export interface PhotoGalleryGridProps {
  gallery: GalleryItem[];
  className?: string;
}

export function PhotoGalleryGrid({ gallery, className = '' }: PhotoGalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Extract unique categories present in the gallery items
  const categories = useMemo(() => {
    const set = new Set<string>();
    gallery.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return Array.from(set);
  }, [gallery]);

  // Filter items by selected category
  const displayedItems = useMemo(() => {
    if (selectedCategory === 'All') return gallery;
    return gallery.filter((item) => item.category === selectedCategory);
  }, [gallery, selectedCategory]);

  // Keyboard navigation & escape listener for lightbox
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % displayedItems.length
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + displayedItems.length) % displayedItems.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, displayedItems.length]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (activeLightboxIndex !== null) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [activeLightboxIndex]);

  if (!gallery || gallery.length === 0) {
    return null;
  }

  const showFilterBar = categories.length > 0 && gallery.length > 1;

  // Compute responsive column span for asymmetric editorial rhythm
  const getColSpan = (idx: number, total: number) => {
    if (total <= 1) return 'md:col-span-12';
    if (total === 2) return 'md:col-span-6';
    if (idx === 0) return 'md:col-span-8';
    if (idx === 1) return 'md:col-span-4';
    if (total === 3 && idx === 2) return 'md:col-span-12';
    const cycle = idx % 4;
    if (cycle === 0) return 'md:col-span-8';
    if (cycle === 1) return 'md:col-span-4';
    return 'md:col-span-6';
  };

  const getAspectRatio = (colSpan: string) => {
    if (colSpan.includes('col-span-8')) return 'aspect-[16/10]';
    if (colSpan.includes('col-span-12')) return 'aspect-[16/9] md:aspect-[21/9]';
    return 'aspect-[3/2]';
  };

  const activeItem =
    activeLightboxIndex !== null && displayedItems[activeLightboxIndex]
      ? displayedItems[activeLightboxIndex]
      : null;

  return (
    <div className={`space-y-6 ${className}`.trim()}>
      {/* Category Filter Bar */}
      {showFilterBar && (
        <div
          role="tablist"
          aria-label="Photo gallery category filter"
          className="flex flex-wrap items-center gap-2 border-b border-[rgba(11,19,43,0.10)] pb-4"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === 'All'}
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 text-xs font-medium border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B] ${
              selectedCategory === 'All'
                ? 'bg-[#0B132B] text-[#F8F9FA] border-[#0B132B]'
                : 'bg-transparent text-[#0B132B] border-[rgba(11,19,43,0.18)] hover:border-[#0B132B]'
            }`}
          >
            All <span className="tabular-nums ml-1 opacity-75">{gallery.length}</span>
          </button>
          {categories.map((cat) => {
            const count = gallery.filter((item) => item.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B] ${
                  isSelected
                    ? 'bg-[#0B132B] text-[#F8F9FA] border-[#0B132B]'
                    : 'bg-transparent text-[#0B132B] border-[rgba(11,19,43,0.18)] hover:border-[#0B132B]'
                }`}
              >
                {cat} <span className="tabular-nums ml-1 opacity-75">{count}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Asymmetric Editorial Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
        {displayedItems.map((item, index) => {
          const colSpan = getColSpan(index, displayedItems.length);
          const aspectRatio = getAspectRatio(colSpan);

          return (
            <figure
              key={`${item.src}-${index}`}
              className={`${colSpan} flex flex-col space-y-2`}
            >
              <div
                role="button"
                tabIndex={0}
                aria-label={`Inspect photo: ${item.caption || item.alt}`}
                onClick={() => setActiveLightboxIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveLightboxIndex(index);
                  }
                }}
                className="group relative cursor-pointer block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B]"
              >
                {/* Image container with crisp border */}
                <div
                  className={`relative ${aspectRatio} w-full bg-[#0B132B] overflow-hidden border border-[rgba(11,19,43,0.12)]`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt || item.caption || 'Orion field photograph'}
                    fill
                    sizes={
                      colSpan === 'md:col-span-12'
                        ? '100vw'
                        : colSpan === 'md:col-span-8'
                          ? '(max-width: 768px) 100vw, 66vw'
                          : '(max-width: 768px) 100vw, 33vw'
                    }
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300 ease-out motion-reduce:transform-none"
                  />

                  {/* Category Badge Tag */}
                  {item.category && (
                    <span className="absolute top-3 left-3 bg-[#0B132B]/85 text-[#F8F9FA] text-[11px] font-medium px-2 py-0.5 border border-[rgba(248,249,250,0.18)]">
                      {item.category}
                    </span>
                  )}

                  {/* "Inspect frame" overlay badge */}
                  <span className="absolute bottom-3 right-3 bg-[#0B132B]/85 text-[#F8F9FA] text-[11px] px-2.5 py-1 flex items-center gap-1.5 border border-[rgba(248,249,250,0.18)] opacity-90 group-hover:opacity-100 transition-opacity">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                    <span>Inspect</span>
                  </span>
                </div>
              </div>

              {/* Documentary Metadata */}
              {(item.location || item.date) && (
                <div className="flex flex-wrap items-center justify-between text-xs text-[rgba(11,19,43,0.65)] pt-1">
                  {item.location && <span>{item.location}</span>}
                  {item.date && <span className="tabular-nums">{item.date}</span>}
                </div>
              )}

              {/* Caption */}
              {item.caption && (
                <figcaption className="text-xs md:text-sm text-[rgba(11,19,43,0.85)] leading-snug">
                  {item.caption}
                </figcaption>
              )}

              {/* Project attribution link if provided */}
              {item.projectTitle && item.projectSlug && (
                <p className="text-xs text-[rgba(11,19,43,0.55)]">
                  <Link
                    href={`/projects/${item.projectSlug}`}
                    className="hover:text-[#e35619] transition-colors underline underline-offset-2"
                  >
                    {item.projectTitle}
                  </Link>
                </p>
              )}
            </figure>
          );
        })}
      </div>

      {/* Interactive Lightbox Modal */}
      {activeItem && activeLightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
          onClick={() => setActiveLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-[#0B132B]/95 backdrop-blur-sm flex flex-col justify-between p-4 md:p-6 lg:p-8"
        >
          {/* Top Control Bar */}
          <div
            className="flex items-center justify-between gap-4 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Frame Counter in tabular nums */}
            <div className="text-xs text-[rgba(248,249,250,0.7)] tabular-nums font-mono tracking-wider">
              {String(activeLightboxIndex + 1).padStart(2, '0')} /{' '}
              {String(displayedItems.length).padStart(2, '0')}
            </div>

            {/* Category Tag */}
            {activeItem.category && (
              <span className="text-xs text-[#F8F9FA] border border-[rgba(248,249,250,0.24)] px-2.5 py-0.5 font-medium">
                {activeItem.category}
              </span>
            )}

            {/* Close Button */}
            <button
              type="button"
              aria-label="Close dialog"
              onClick={() => setActiveLightboxIndex(null)}
              className="text-[#F8F9FA] p-2 hover:bg-[rgba(248,249,250,0.12)] border border-[rgba(248,249,250,0.2)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F9FA] cursor-pointer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Main Stage: Previous Button, Centered High-Res Image, Next Button */}
          <div
            className="relative flex-1 flex items-center justify-between gap-2 sm:gap-4 my-4 max-h-[68vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() =>
                setActiveLightboxIndex(
                  (activeLightboxIndex - 1 + displayedItems.length) %
                    displayedItems.length
                )
              }
              className="z-10 p-3 text-[#F8F9FA] border border-[rgba(248,249,250,0.2)] bg-[#0B132B]/60 hover:bg-[rgba(248,249,250,0.15)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F9FA] cursor-pointer shrink-0"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative w-full h-[52vh] sm:h-[60vh] max-w-5xl mx-auto">
                <Image
                  src={activeItem.src}
                  alt={
                    activeItem.alt ||
                    activeItem.caption ||
                    'Field photography frame'
                  }
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <button
              type="button"
              aria-label="Next photo"
              onClick={() =>
                setActiveLightboxIndex(
                  (activeLightboxIndex + 1) % displayedItems.length
                )
              }
              className="z-10 p-3 text-[#F8F9FA] border border-[rgba(248,249,250,0.2)] bg-[#0B132B]/60 hover:bg-[rgba(248,249,250,0.15)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F9FA] cursor-pointer shrink-0"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Documentary Metadata Footer */}
          <div
            className="max-w-3xl mx-auto w-full text-center space-y-2 pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            {activeItem.caption && (
              <p className="text-sm md:text-base text-[#F8F9FA] font-medium leading-relaxed">
                {activeItem.caption}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-[rgba(248,249,250,0.7)] tabular-nums">
              {activeItem.location && <span>Location: {activeItem.location}</span>}
              {activeItem.date && <span>Date: {activeItem.date}</span>}
              {activeItem.photographer && (
                <span>Photo: {activeItem.photographer}</span>
              )}
              {activeItem.projectSlug && activeItem.projectTitle && (
                <Link
                  href={`/projects/${activeItem.projectSlug}`}
                  onClick={() => setActiveLightboxIndex(null)}
                  className="text-[#F8F9FA] underline hover:text-[#e35619] transition-colors"
                >
                  View project: {activeItem.projectTitle}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
