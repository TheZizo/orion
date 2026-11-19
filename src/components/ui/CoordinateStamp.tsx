import React from 'react';
import { Coordinates } from '@/types/orion';
import { formatCoordinates } from '@/lib/orionData';

export interface CoordinateStampProps {
  coordinates?: Coordinates;
  lat?: number;
  lng?: number;
  label?: string;
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * CoordinateStamp Component
 * Clean geographic coordinate stamp rendered in Inter with tabular figures.
 * Free of artificial boxed border or icon chrome.
 */
export function CoordinateStamp({
  coordinates,
  lat,
  lng,
  label,
  tone = 'dark',
  className = '',
}: CoordinateStampProps) {
  const coords: Coordinates = coordinates ?? {
    lat: lat ?? 47.53,
    lng: lng ?? 21.62,
  };

  const formatted = formatCoordinates(coords);
  const textColor =
    tone === 'dark' ? 'text-[rgba(248,249,250,0.72)]' : 'text-[rgba(11,19,43,0.72)]';

  return (
    <span
      className={`inline-flex items-baseline font-body tabular-nums text-[13px] md:text-[14px] leading-normal ${textColor} ${className}`.trim()}
    >
      {label && <span className="font-medium mr-1.5">{label}:</span>}
      <span>{formatted}</span>
    </span>
  );
}
