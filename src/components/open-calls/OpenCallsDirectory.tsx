'use client';

import React, { useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { OpenCall } from '@/types/orion';
import { CallFilterBar } from './CallFilterBar';
import { CallCard } from './CallCard';
import { Button } from '@/components/ui/Button';

export interface OpenCallsDirectoryProps {
  initialCalls: OpenCall[];
}

export function OpenCallsDirectory({ initialCalls }: OpenCallsDirectoryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const typeParam = searchParams.get('type') ?? 'all';
  const countryParam = searchParams.get('country') ?? 'all';
  const statusParam = searchParams.get('status') ?? 'all';

  // Derive unique list of countries sorted alphabetically
  const countries = useMemo(() => {
    const set = new Set<string>();
    initialCalls.forEach((call) => {
      if (call.country) set.add(call.country);
    });
    return Array.from(set).sort();
  }, [initialCalls]);

  // Apply filters
  const filteredCalls = useMemo(() => {
    return initialCalls.filter((call) => {
      if (typeParam !== 'all' && call.actionType.toLowerCase() !== typeParam.toLowerCase()) {
        return false;
      }
      if (countryParam !== 'all' && call.country.toLowerCase() !== countryParam.toLowerCase()) {
        return false;
      }
      if (statusParam !== 'all' && call.status.toLowerCase() !== statusParam.toLowerCase()) {
        return false;
      }
      return true;
    });
  }, [initialCalls, typeParam, countryParam, statusParam]);

  const handleClearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <div className="space-y-4">
      {/* Quiet filter bar */}
      <CallFilterBar
        countries={countries}
        totalCount={initialCalls.length}
        filteredCount={filteredCalls.length}
      />

      {/* Editorial rows or empty state */}
      {filteredCalls.length === 0 ? (
        <div
          className="py-16 md:py-24 text-center space-y-4 max-w-xl mx-auto"
          role="status"
        >
          <h2 className="type-h3 text-[#0B132B] font-semibold">
            No calls match these filters
          </h2>
          <p className="type-body text-[rgba(11,19,43,0.72)] leading-relaxed">
            No calls match these filters. Clear filters to see everything, or explore our past projects.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Button variant="secondary" tone="light" onClick={handleClearFilters}>
              Clear filters
            </Button>
            <Button variant="ghost" tone="light" href="/projects">
              Explore past projects
            </Button>
          </div>
        </div>
      ) : (
        <div role="feed" aria-label="Open calls directory">
          {filteredCalls.map((call) => (
            <CallCard key={call.slug} call={call} />
          ))}
        </div>
      )}
    </div>
  );
}
