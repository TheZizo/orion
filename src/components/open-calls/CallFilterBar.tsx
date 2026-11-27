'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export interface CallFilterBarProps {
  countries: string[];
  totalCount: number;
  filteredCount: number;
  className?: string;
}

/**
 * CallFilterBar Component
 * Quiet, single-row filter bar using native labelled selects and clean typography.
 * Completely free of artificial uppercase or monospace tags.
 */
export function CallFilterBar({
  countries,
  totalCount,
  filteredCount,
  className = '',
}: CallFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentType = searchParams.get('type') ?? 'all';
  const currentCountry = searchParams.get('country') ?? 'all';
  const currentStatus = searchParams.get('status') ?? 'all';

  const isFiltered =
    currentType !== 'all' || currentCountry !== 'all' || currentStatus !== 'all';

  const handleFilterChange = (key: 'type' | 'country' | 'status', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleClearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const statusPills = [
    { label: 'All', value: '' },
    { label: 'Opening soon', value: 'Opening soon' },
    { label: 'Open', value: 'Open' },
    { label: 'Closed', value: 'Closed' },
  ];

  return (
    <div
      className={`border-b border-[rgba(11,19,43,0.10)] pb-6 space-y-5 ${className}`.trim()}
    >
      {/* Quick Status Filter Pills */}
      <div
        role="group"
        aria-label="Quick status filter"
        className="flex flex-wrap items-center gap-2"
      >
        {statusPills.map((pill) => {
          const isActive =
            pill.value === ''
              ? currentStatus === 'all'
              : currentStatus === pill.value;

          return (
            <button
              key={pill.label}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleFilterChange('status', pill.value)}
              className={`h-9 px-3.5 rounded-none text-[13px] font-medium transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B] focus-visible:ring-offset-2 ${
                isActive
                  ? 'bg-[#0B132B] text-[#F8F9FA] border border-[#0B132B] border-t-2 border-t-[#E35619]'
                  : 'bg-transparent text-[rgba(11,19,43,0.75)] border border-[rgba(11,19,43,0.14)] hover:border-[rgba(11,19,43,0.35)] hover:text-[#0B132B]'
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        {/* Quiet Underline Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 flex-1 max-w-2xl min-w-0">
          {/* Action Type */}
          <div className="min-w-0">
            <label
              htmlFor="filter-type"
              className="block text-[12px] font-medium text-[rgba(11,19,43,0.7)] mb-1"
            >
              Action type
            </label>
            <select
              id="filter-type"
              name="type"
              value={currentType}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full h-11 px-0 border-0 border-b border-[rgba(11,19,43,0.22)] bg-transparent text-[#0B132B] rounded-none text-[14px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B] focus:border-b-[#0B132B] transition-colors cursor-pointer"
            >
              <option value="all">All action types</option>
              <option value="Youth Exchange">Youth Exchange</option>
              <option value="Training Course">Training Course</option>
            </select>
          </div>

          {/* Country */}
          <div className="min-w-0">
            <label
              htmlFor="filter-country"
              className="block text-[12px] font-medium text-[rgba(11,19,43,0.7)] mb-1"
            >
              Country
            </label>
            <select
              id="filter-country"
              name="country"
              value={currentCountry}
              onChange={(e) => handleFilterChange('country', e.target.value)}
              className="w-full h-11 px-0 border-0 border-b border-[rgba(11,19,43,0.22)] bg-transparent text-[#0B132B] rounded-none text-[14px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B] focus:border-b-[#0B132B] transition-colors cursor-pointer"
            >
              <option value="all">All countries</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="min-w-0">
            <label
              htmlFor="filter-status"
              className="block text-[12px] font-medium text-[rgba(11,19,43,0.7)] mb-1"
            >
              Status
            </label>
            <select
              id="filter-status"
              name="status"
              value={currentStatus}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full h-11 px-0 border-0 border-b border-[rgba(11,19,43,0.22)] bg-transparent text-[#0B132B] rounded-none text-[14px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B] focus:border-b-[#0B132B] transition-colors cursor-pointer"
            >
              <option value="all">All statuses</option>
              <option value="Open">Open</option>
              <option value="Opening soon">Opening soon</option>
              <option value="Closing soon">Closing soon</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {isFiltered && (
          <div className="shrink-0">
            <button
              type="button"
              onClick={handleClearFilters}
              className="h-11 px-4 border border-[rgba(11,19,43,0.18)] text-[#0B132B] rounded-none font-medium text-[13px] hover:bg-[rgba(11,19,43,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B] focus-visible:ring-offset-2 transition-colors cursor-pointer select-none"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Live Result Count */}
      <div
        aria-live="polite"
        role="status"
        className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[13px] text-[rgba(11,19,43,0.65)]"
      >
        <span className="tabular-nums">
          Showing {filteredCount} of {totalCount} open calls
        </span>
        {isFiltered && (
          <span className="text-[12px] text-[rgba(11,19,43,0.68)]">
            Filtered by {[currentType !== 'all' && currentType, currentCountry !== 'all' && currentCountry, currentStatus !== 'all' && currentStatus].filter(Boolean).join(', ')}
          </span>
        )}
      </div>
    </div>
  );
}
