import React from 'react';
import { AtlasNode } from '@/types/orion';
import { StatusBadge, StatusBadgeValue } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';

export interface NodeInspectorProps {
  node?: AtlasNode | null;
  className?: string;
  seamless?: boolean;
}

const VALID_STATUSES: readonly StatusBadgeValue[] = [
  'Open',
  'Closing soon',
  'Closed',
  'Completed',
  'Ongoing',
];

function isValidStatus(status: string): status is StatusBadgeValue {
  return VALID_STATUSES.includes(status as StatusBadgeValue);
}

function getVectorFromHq(id: string): string {
  switch (id) {
    case 'orion-hq':
      return '0 km, Origin Core';
    case 'project-reforest':
      return '328 km ESE, Lacu Roșu';
    case 'call-the-financial-blueprint':
      return 'Host Venue, Hungary';
    case 'partner-horizon':
      return 'Pan-European, KA1 & KA2';
    default:
      return 'Origin Core';
  }
}

function getActionType(id: string): string {
  switch (id) {
    case 'orion-hq':
      return 'Accredited NGO Seat';
    case 'project-reforest':
      return 'KA152 Youth Exchange';
    case 'call-the-financial-blueprint':
      return 'KA152 Youth Exchange';
    case 'partner-horizon':
      return 'Consortium Dossier';
    default:
      return 'KA152 Youth Exchange';
  }
}

/**
 * NodeInspector Component — Quiet Editorial Caption & Geodesic Telemetry
 *
 * Sits below the 3D celestial orrery as a quiet, disciplined caption with NO panel,
 * NO background, and NO border:
 * - 3-cell geodesic telemetry bar (Vector from HQ, Action Type, Status)
 * - Complete untruncated mission description (<65ch)
 * - Single high-contrast action CTA
 */
export function NodeInspector({
  node,
  className = '',
}: NodeInspectorProps) {
  if (!node) {
    return (
      <aside aria-live="polite" className={`pt-2.5 text-[#F8F9FA] ${className}`.trim()}>
        <h3 className="type-h3 text-[#F8F9FA]">Select a mission</h3>
        <p className="type-body text-sm text-[rgba(248,249,250,0.72)] mt-1 max-w-[65ch]">
          Explore Orion&apos;s Debrecen core, completed Transylvanian mobilities, and upcoming hosted projects.
        </p>
      </aside>
    );
  }

  const vectorStr = getVectorFromHq(node.id);
  const actionTypeStr = getActionType(node.id);

  return (
    <aside
      aria-live="polite"
      className={`pt-2.5 text-[#F8F9FA] space-y-3.5 ${className}`.trim()}
    >
      {/* 3-cell structured geodesic telemetry bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 pb-3 border-b border-[rgba(248,249,250,0.12)]">
        <div>
          <span className="block text-[11px] font-medium text-[rgba(248,249,250,0.55)] font-display">
            Vector from HQ
          </span>
          <span className="text-xs text-[#F8F9FA] tabular-nums font-medium">
            {vectorStr}
          </span>
        </div>
        <div>
          <span className="block text-[11px] font-medium text-[rgba(248,249,250,0.55)] font-display">
            Action Type
          </span>
          <span className="text-xs text-[#F8F9FA] font-medium">
            {actionTypeStr}
          </span>
        </div>
        <div>
          <span className="block text-[11px] font-medium text-[rgba(248,249,250,0.55)] font-display mb-1">
            Status
          </span>
          {isValidStatus(node.statusLabel) ? (
            <StatusBadge status={node.statusLabel} tone="dark" />
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-normal border border-white/20 text-[#F8F9FA]">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  node.statusLabel === 'Opening soon' ? 'bg-[#E35619]' : 'bg-[#F8F9FA]'
                }`}
                aria-hidden="true"
              />
              <span>{node.statusLabel}</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Row: Title & Summary on Left, Action CTA on Right */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pt-0.5">
        <div className="space-y-1.5 max-w-xl">
          <div className="text-xs text-[rgba(248,249,250,0.65)] font-normal tabular-nums">
            {node.dateLabel}
          </div>
          <h3 className="type-h3 text-[#F8F9FA] leading-tight">
            {node.title}
          </h3>
          <p className="type-body text-sm text-[rgba(248,249,250,0.82)] leading-relaxed max-w-[65ch]">
            {node.summary}
          </p>
        </div>

        <div className="shrink-0 pt-1 sm:pt-0">
          <Button
            variant="secondary"
            tone="dark"
            size="sm"
            href={node.href}
            className="w-full sm:w-auto text-center whitespace-nowrap"
          >
            {node.ctaLabel}
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default NodeInspector;
