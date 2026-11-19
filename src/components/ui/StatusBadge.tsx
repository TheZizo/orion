import React from 'react';

export type StatusBadgeValue =
  | 'Open'
  | 'Opening soon'
  | 'Closing soon'
  | 'Closed'
  | 'Completed'
  | 'Ongoing'
  | 'Upcoming';

export interface StatusBadgeProps {
  status: StatusBadgeValue;
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Renders the small 8x8 leading SVG glyph for each lifecycle status.
 * Visual shape semantics (brand-locked palette: currentColor):
 * - Open: filled dot
 * - Closing soon: half-filled dot
 * - Opening soon: ring with 1px inner dot
 * - Closed / Completed: hollow ring
 * - Ongoing / Upcoming: ring with inner dot
 */
function StatusGlyph({ status }: { status: StatusBadgeValue }) {
  let content: React.ReactNode = null;

  switch (status) {
    case 'Open':
      content = <circle cx="4" cy="4" r="3.25" fill="currentColor" />;
      break;
    case 'Closing soon':
      content = (
        <>
          <circle cx="4" cy="4" r="3" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M4 1 A3 3 0 0 1 4 7 Z" fill="currentColor" />
        </>
      );
      break;
    case 'Opening soon':
      content = (
        <>
          <circle cx="4" cy="4" r="3" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="4" cy="4" r="1" fill="currentColor" />
        </>
      );
      break;
    case 'Closed':
    case 'Completed':
      content = (
        <circle cx="4" cy="4" r="3" stroke="currentColor" strokeWidth="1.2" fill="none" />
      );
      break;
    case 'Ongoing':
    case 'Upcoming':
      content = (
        <>
          <circle cx="4" cy="4" r="3.25" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="4" cy="4" r="1.5" fill="currentColor" />
        </>
      );
      break;
    default:
      content = <circle cx="4" cy="4" r="3" stroke="currentColor" strokeWidth="1" fill="none" />;
      break;
  }

  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      {content}
    </svg>
  );
}

/**
 * StatusBadge Component
 *
 * PALETTE-ONLY SPECIFICATION:
 * - Strictly forbidden: emerald, amber, zinc, green, pure white.
 * - Light tone: navy on transparent with rgba(11,19,43,0.22) border
 * - Dark tone: off-white on transparent with rgba(248,249,250,0.28) border
 * - Typography: Inter font-body, text-[12px] md:text-[13px], font-medium, sentence case (no monospace, no uppercase)
 * - Leading inline 8x8 SVG glyph indicating status by shape
 */
export function StatusBadge({
  status,
  tone = 'dark',
  className = '',
}: StatusBadgeProps) {
  const toneClasses =
    tone === 'light'
      ? 'border-[rgba(11,19,43,0.22)] text-[#0B132B] bg-transparent'
      : 'border-[rgba(248,249,250,0.28)] text-[#F8F9FA] bg-transparent';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[12px] md:text-[13px] font-medium font-body border rounded-full leading-normal ${toneClasses} ${className}`.trim()}
    >
      <StatusGlyph status={status} />
      <span>{status}</span>
    </span>
  );
}

export default StatusBadge;
