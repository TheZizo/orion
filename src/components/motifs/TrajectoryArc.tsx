import React from 'react';

export interface Point2D {
  x: number;
  y: number;
}

export interface TrajectoryArcProps {
  from: Point2D;
  to: Point2D;
  curvature?: number; // negative bows north/upward in SVG coords; positive bows south
  stroke?: string;
  strokeWidth?: number;
  dashed?: boolean;
  animated?: boolean;
  progress?: number; // 0 to 1
  className?: string;
}

/**
 * Computes a quadratic bezier curve SVG path definition between two 2D coordinates.
 * Curvature determines how high the trajectory arcs perpendicular to the straight baseline.
 */
export function arcPath(from: Point2D, to: Point2D, curvature = -0.22): string {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  // Normal perpendicular vector (-dy, dx)
  const cx = mx + -dy * curvature;
  const cy = my + dx * curvature;

  return `M ${from.x.toFixed(2)} ${from.y.toFixed(2)} Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;
}

/**
 * Accurately computes the true length of the quadratic Bezier curve via piecewise linear integration.
 */
export function computeBezierLength(
  from: Point2D,
  to: Point2D,
  curvature = -0.22,
  steps = 32
): number {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const cx = mx + -dy * curvature;
  const cy = my + dx * curvature;

  let length = 0;
  let prevX = from.x;
  let prevY = from.y;

  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const invT = 1 - t;
    const x = invT * invT * from.x + 2 * invT * t * cx + t * t * to.x;
    const y = invT * invT * from.y + 2 * invT * t * cy + t * t * to.y;
    length += Math.hypot(x - prevX, y - prevY);
    prevX = x;
    prevY = y;
  }

  return Math.max(1, Math.round(length * 100) / 100);
}

/**
 * TrajectoryArc Component
 * Renders an SVG curved path connecting navigation nodes (Debrecen HQ -> Destination).
 */
export function TrajectoryArc({
  from,
  to,
  curvature = -0.22,
  stroke = '#e35619',
  strokeWidth = 2,
  dashed = false,
  animated = false,
  progress,
  className = '',
}: TrajectoryArcProps) {
  const d = arcPath(from, to, curvature);
  const exactArcLength = computeBezierLength(from, to, curvature);

  let dashArray: string | undefined = undefined;
  let dashOffset: number | undefined = undefined;

  if (progress !== undefined) {
    const clamped = Math.max(0, Math.min(1, progress));
    dashArray = `${exactArcLength} ${exactArcLength}`;
    dashOffset = exactArcLength * (1 - clamped);
  } else if (dashed) {
    dashArray = '4 4';
  } else if (animated) {
    dashArray = `${exactArcLength} ${exactArcLength}`;
  }

  if (progress !== undefined && progress <= 0) {
    return null;
  }

  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={dashArray}
      strokeDashoffset={dashOffset}
      style={
        animated
          ? ({
              '--arc-length': exactArcLength,
            } as React.CSSProperties)
          : undefined
      }
      className={`${animated ? 'animate-arc-trace' : ''} ${className}`.trim()}
    />
  );
}
