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

  return (
    <div
      className={`border-b border-[rgba(11,19,43,0.10)] pb-6 space-y-4 ${className}`.trim()}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        {/* Quiet Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 max-w-2xl">
          {/* Action Type */}
          <div>
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
              className="w-full h-11 px-3 border border-[rgba(11,19,43,0.18)] bg-white text-[#0B132B] rounded-none text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0B132B] transition-colors"
            >
              <option value="all">All action types</option>
              <option value="Youth Exchange">Youth Exchange</option>
              <option value="Training Course">Training Course</option>
            </select>
          </div>

          {/* Country */}
          <div>
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
              className="w-full h-11 px-3 border border-[rgba(11,19,43,0.18)] bg-white text-[#0B132B] rounded-none text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0B132B] transition-colors"
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
          <div>
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
              className="w-full h-11 px-3 border border-[rgba(11,19,43,0.18)] bg-white text-[#0B132B] rounded-none text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0B132B] transition-colors"
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
              className="h-11 px-4 border border-[rgba(11,19,43,0.18)] text-[#0B132B] rounded-none font-medium text-[13px] hover:bg-[rgba(11,19,43,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B132B] transition-colors cursor-pointer select-none"
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
        className="flex items-center justify-between pt-2 text-[13px] text-[rgba(11,19,43,0.65)]"
      >
        <span className="tabular-nums">
          Showing {filteredCount} of {totalCount} open calls
        </span>
        {isFiltered && (
          <span className="text-[12px] text-[rgba(11,19,43,0.55)]">
            Filtered by {[currentType !== 'all' && currentType, currentCountry !== 'all' && currentCountry, currentStatus !== 'all' && currentStatus].filter(Boolean).join(', ')}
          </span>
        )}
      </div>
    </div>
  );
}
