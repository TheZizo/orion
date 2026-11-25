'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { AtlasNode } from '@/types/orion';
import { getAtlasNodes } from '@/lib/orionData';
import { SparkleStar } from '@/components/motifs/SparkleStar';
import { TrajectoryArc } from '@/components/motifs/TrajectoryArc';
import { NodeInspector } from '@/components/motifs/NodeInspector';

export interface ProjectionBounds {
  minLng: number;
  maxLng: number;
  minLat: number;
  maxLat: number;
}

/**
 * Standard Atlas Projection Bounds covering Europe and the Mediterranean.
 * Retained for unit test and geographic projection contract.
 */
export const ATLAS_BOUNDS: ProjectionBounds = {
  minLng: -12,
  maxLng: 45,
  minLat: 33,
  maxLat: 62,
};

export const ATLAS_VIEWBOX = {
  width: 800,
  height: 550,
};

/**
 * Equirectangular projection mapping geographic lat/lng to SVG 2D space.
 * Export signature and default bounds preserved for unit test contract.
 */
export function project(
  lat: number,
  lng: number,
  width = ATLAS_VIEWBOX.width,
  height = ATLAS_VIEWBOX.height
): { x: number; y: number } {
  const x = ((lng - ATLAS_BOUNDS.minLng) / (ATLAS_BOUNDS.maxLng - ATLAS_BOUNDS.minLng)) * width;
  const y = ((ATLAS_BOUNDS.maxLat - lat) / (ATLAS_BOUNDS.maxLat - ATLAS_BOUNDS.minLat)) * height;
  return {
    x: Math.round(x * 100) / 100,
    y: Math.round(y * 100) / 100,
  };
}

export interface CelestialAtlasProps {
  className?: string;
  children?: React.ReactNode;
  defaultActiveId?: string;
}

/* ==========================================================================
   3D Perspective Projection Mathematics (XZ Orbital Plane)
   ========================================================================== */

const DISTANCE_D = 900;
const ROLL_RAD = -10 * (Math.PI / 180); // -10° cinematic camera tilt
const BASE_YAW_RAD = -18 * (Math.PI / 180); // -18° base azimuth
const BASE_ELEV_RAD = 22 * (Math.PI / 180); // 22° base pitch

const MAX_YAW_OFFSET = (12 * Math.PI) / 180; // ±12° horizontal deflection
const MAX_ELEV_OFFSET = (8 * Math.PI) / 180; // ±8° vertical deflection
const LERP_FACTOR = 0.08;
const EPSILON = 0.0001; // Radians threshold for stationary rest

const R1_RADIUS = 130; // Orbit 01 (ReForest)
const R2_RADIUS = 215; // Orbit 02 (The Financial Blueprint)
const R3_RADIUS = 300; // Orbit 03 (Partner Horizon)

// Phase angles θ on circular rings (radians)
const THETA_ORBIT_01 = 145 * (Math.PI / 180); // Upper-left
const THETA_ORBIT_02 = 22 * (Math.PI / 180);  // Upper-right
const THETA_ORBIT_03 = -120 * (Math.PI / 180); // Lower-left

interface ProjectedPoint {
  x: number;
  y: number;
  depth: number;
  scale: number;
}

function project3D(
  px: number,
  pz: number,
  yawRad: number,
  elevRad: number,
  cx: number,
  cy: number
): ProjectedPoint {
  // Yaw rotation about Y axis:
  const x1 = px * Math.cos(yawRad) - pz * Math.sin(yawRad);
  const z1 = px * Math.sin(yawRad) + pz * Math.cos(yawRad);

  // Elevation:
  const ys = -z1 * Math.sin(elevRad);
  const depth = z1 * Math.cos(elevRad);

  // Perspective:
  const scale = DISTANCE_D / (DISTANCE_D + depth);
  const xs = x1 * scale;
  const ys_proj = ys * scale;

  // 2D roll around (cx, cy):
  const cosRoll = Math.cos(ROLL_RAD);
  const sinRoll = Math.sin(ROLL_RAD);
  const rx = xs * cosRoll - ys_proj * sinRoll;
  const ry = xs * sinRoll + ys_proj * cosRoll;

  return {
    x: Math.round((cx + rx) * 100) / 100,
    y: Math.round((cy + ry) * 100) / 100,
    depth: Math.round(depth * 100) / 100,
    scale: Math.round(scale * 1000) / 1000,
  };
}

/**
 * Generates a continuous closed SVG path for a circle of radius R in the XZ plane.
 */
function generateRingPath(
  radius: number,
  yawRad: number,
  elevRad: number,
  cx: number,
  cy: number,
  samples = 72
): string {
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = (2 * Math.PI * i) / samples;
    const px = radius * Math.cos(t);
    const pz = radius * Math.sin(t);
    const pt = project3D(px, pz, yawRad, elevRad, cx, cy);
    pts.push(`${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`);
  }
  pts.push('Z');
  return pts.join(' ');
}

const STATIC_STARS = [
  { x: 40, y: 50, r: 1.0, o: 0.2 },
  { x: 120, y: 90, r: 0.8, o: 0.25 },
  { x: 70, y: 280, r: 1.1, o: 0.2 },
  { x: 210, y: 40, r: 1.2, o: 0.3 },
  { x: 310, y: 30, r: 0.8, o: 0.2 },
  { x: 470, y: 45, r: 1.3, o: 0.35 },
  { x: 590, y: 70, r: 1.0, o: 0.25 },
  { x: 680, y: 150, r: 0.9, o: 0.2 },
  { x: 710, y: 310, r: 1.2, o: 0.3 },
  { x: 560, y: 390, r: 0.9, o: 0.2 },
  { x: 420, y: 410, r: 1.1, o: 0.25 },
  { x: 260, y: 400, r: 0.8, o: 0.2 },
  { x: 140, y: 370, r: 1.0, o: 0.25 },
  { x: 620, y: 30, r: 1.1, o: 0.3 },
  { x: 380, y: 65, r: 0.8, o: 0.2 },
  { x: 500, y: 210, r: 0.9, o: 0.2 },
];

/**
 * CelestialAtlas Component — The True 3D Orrery
 *
 * Perspective-projected concentric orrery floating borderless in the night sky:
 * - Stable, deterministic 3D projection of concentric XZ orbits
 * - Continuous, uniform orbital rings with active ring emphasis
 * - Clean single trajectory arc from Debrecen Core to the active destination node
 * - Focus-visible circular ring (no browser rectangle)
 * - Quiet caption below the stage (plain underline tabs + quiet NodeInspector)
 */
export function CelestialAtlas({
  className = '',
  children,
  defaultActiveId,
}: CelestialAtlasProps) {
  const allNodes = useMemo(() => {
    return getAtlasNodes().map((node) => {
      if (node.id === 'orion-hq') {
        return {
          ...node,
          summary:
            'Orion Fiatalok Informális Csoportja home base in Debrecen, Hungary (Grant 2026-1-HU01-KA152-YOU-000399636).',
        };
      }
      if (node.id === 'call-the-financial-blueprint') {
        return {
          ...node,
          title: 'The Financial Blueprint — Hungary',
          dateLabel: 'March 2027, Location TBA, Hungary',
          summary:
            'Our upcoming Orion-hosted project in Hungary in March 2027. Practical financial literacy, budgeting confidence, and real-world economic navigation skills.',
        };
      }
      if (node.id === 'project-reforest') {
        return {
          ...node,
          title: 'ReForest — Transylvania, Romania',
          dateLabel: 'October 11–22, 2026, Lacu Roșu Mountain Lodge, Harghita',
          summary:
            'Ecological regeneration youth exchange in Lacu Roșu Mountain Lodge, Harghita, Romania with Asociația Agoje, AzorEarth, Youth Group Novae & Orion Fiatalok.',
        };
      }
      if (node.id === 'partner-horizon') {
        return {
          ...node,
          title: 'Next Horizon — Partner With Orion',
          dateLabel: 'Erasmus+ KA1 & KA2 Consortia',
          summary:
            'Represent an international youth NGO? Partner with Orion Fiatalok Informális Csoportja for upcoming mobilities. Direct consortium inquiries to zeid@orionyouth.eu.',
        };
      }
      return node;
    });
  }, []);

  // Default active node: prefer The Financial Blueprint
  const initialNode = useMemo(() => {
    if (defaultActiveId) {
      const found = allNodes.find((n) => n.id === defaultActiveId);
      if (found) return found;
    }
    const featured = allNodes.find((n) => n.id === 'call-the-financial-blueprint');
    return featured ?? allNodes[0];
  }, [allNodes, defaultActiveId]);

  const [activeNode, setActiveNode] = useState<AtlasNode | null>(initialNode);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState<{ yaw: number; elev: number }>({
    yaw: 0,
    elev: 0,
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentOffsetRef = useRef<{ yaw: number; elev: number }>({ yaw: 0, elev: 0 });
  const targetOffsetRef = useRef<{ yaw: number; elev: number }>({ yaw: 0, elev: 0 });
  const rafIdRef = useRef<number | null>(null);
  const isRunningRef = useRef<boolean>(false);
  const stepRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const frameId = requestAnimationFrame(() => {
      setPrefersReducedMotion(mediaQuery.matches);
    });
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setParallaxOffset({ yaw: 0, elev: 0 });
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      cancelAnimationFrame(frameId);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const updatePhysics = useCallback(() => {
    const current = currentOffsetRef.current;
    const target = targetOffsetRef.current;

    const dy = target.yaw - current.yaw;
    const de = target.elev - current.elev;

    if (Math.abs(dy) < EPSILON && Math.abs(de) < EPSILON) {
      current.yaw = target.yaw;
      current.elev = target.elev;
      setParallaxOffset({ yaw: target.yaw, elev: target.elev });
      isRunningRef.current = false;
      rafIdRef.current = null;
      return; // ZERO autonomous drift when mouse stops moving
    }

    current.yaw += dy * LERP_FACTOR;
    current.elev += de * LERP_FACTOR;

    setParallaxOffset({ yaw: current.yaw, elev: current.elev });

    if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'test') {
      rafIdRef.current = requestAnimationFrame(() => stepRef.current());
    } else {
      isRunningRef.current = false;
      rafIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    stepRef.current = updatePhysics;
  }, [updatePhysics]);

  const isReducedMotionActive = useCallback(() => {
    if (prefersReducedMotion) return true;
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  }, [prefersReducedMotion]);

  const startLoop = useCallback(() => {
    if (isReducedMotionActive()) return;
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'test') {
        updatePhysics();
      } else {
        rafIdRef.current = requestAnimationFrame(() => stepRef.current());
      }
    }
  }, [updatePhysics, isReducedMotionActive]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isReducedMotionActive() || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const width = rect && rect.width > 0 ? rect.width : 440;
      const height = rect && rect.height > 0 ? rect.height : 320;
      const left = rect ? rect.left : 0;
      const top = rect ? rect.top : 0;

      const nx = Math.max(-1, Math.min(1, ((e.clientX - left) / width) * 2 - 1));
      const ny = Math.max(-1, Math.min(1, ((e.clientY - top) / height) * 2 - 1));

      targetOffsetRef.current = {
        yaw: nx * MAX_YAW_OFFSET,
        elev: -ny * MAX_ELEV_OFFSET,
      };

      startLoop();
    },
    [isReducedMotionActive, startLoop]
  );

  const handlePointerLeave = useCallback(() => {
    if (isReducedMotionActive()) return;

    targetOffsetRef.current = { yaw: 0, elev: 0 };
    startLoop();
  }, [isReducedMotionActive, startLoop]);

  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      isRunningRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      isRunningRef.current = false;
      currentOffsetRef.current = { yaw: 0, elev: 0 };
      targetOffsetRef.current = { yaw: 0, elev: 0 };
    }
  }, [prefersReducedMotion]);

  const handleSelectNode = useCallback((node: AtlasNode) => {
    setActiveNode(node);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, node: AtlasNode) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveNode(node);
      }
    },
    []
  );

  // Stage center on 740x440 viewBox
  const cx = 360;
  const cy = 210;

  // Active projection angles incorporating mouse-tracking parallax
  const currentYaw = BASE_YAW_RAD + (prefersReducedMotion ? 0 : parallaxOffset.yaw);
  const currentElev = BASE_ELEV_RAD + (prefersReducedMotion ? 0 : parallaxOffset.elev);

  // Project continuous circular orbits with perspective + mouse parallax
  const ring1Path = useMemo(
    () => generateRingPath(R1_RADIUS, currentYaw, currentElev, cx, cy),
    [cx, cy, currentYaw, currentElev]
  );
  const ring2Path = useMemo(
    () => generateRingPath(R2_RADIUS, currentYaw, currentElev, cx, cy),
    [cx, cy, currentYaw, currentElev]
  );
  const ring3Path = useMemo(
    () => generateRingPath(R3_RADIUS, currentYaw, currentElev, cx, cy),
    [cx, cy, currentYaw, currentElev]
  );

  // Project nodes in 3D with perspective + mouse parallax
  const corePos = useMemo(() => ({ x: cx, y: cy, depth: 0, scale: 1 }), [cx, cy]);

  const orbit01Pos = useMemo(() => {
    const px = R1_RADIUS * Math.cos(THETA_ORBIT_01);
    const pz = R1_RADIUS * Math.sin(THETA_ORBIT_01);
    return project3D(px, pz, currentYaw, currentElev, cx, cy);
  }, [cx, cy, currentYaw, currentElev]);

  const orbit02Pos = useMemo(() => {
    const px = R2_RADIUS * Math.cos(THETA_ORBIT_02);
    const pz = R2_RADIUS * Math.sin(THETA_ORBIT_02);
    return project3D(px, pz, currentYaw, currentElev, cx, cy);
  }, [cx, cy, currentYaw, currentElev]);

  const orbit03Pos = useMemo(() => {
    const px = R3_RADIUS * Math.cos(THETA_ORBIT_03);
    const pz = R3_RADIUS * Math.sin(THETA_ORBIT_03);
    return project3D(px, pz, currentYaw, currentElev, cx, cy);
  }, [cx, cy, currentYaw, currentElev]);

  // Node position map
  const nodePositionMap = useMemo(() => {
    return {
      'orion-hq': { pos: corePos, labelOffset: { x: 0, y: 28 }, align: 'middle' as const, sub: 'Debrecen, Hungary' },
      'project-reforest': { pos: orbit01Pos, labelOffset: { x: -20, y: -18 }, align: 'end' as const, sub: 'October 11–22, 2026, Romania' },
      'call-the-financial-blueprint': { pos: orbit02Pos, labelOffset: { x: 22, y: 2 }, align: 'start' as const, sub: 'March 2027, Hungary' },
      'partner-horizon': { pos: orbit03Pos, labelOffset: { x: 18, y: 14 }, align: 'start' as const, sub: 'Consortium Horizon' },
    };
  }, [corePos, orbit01Pos, orbit02Pos, orbit03Pos]);

  // Active target position for dynamic trajectory arc
  const activeTargetPos = useMemo(() => {
    if (!activeNode || activeNode.id === 'orion-hq') {
      return null;
    }
    const target = nodePositionMap[activeNode.id as keyof typeof nodePositionMap];
    return target ? target.pos : null;
  }, [activeNode, nodePositionMap]);

  // Tab definitions for test compatibility
  const TAB_ITEMS = [
    { id: 'orion-hq', label: 'Debrecen HQ', aria: 'Core: Debrecen HQ' },
    { id: 'project-reforest', label: 'ReForest ’26', aria: 'Orbit 01: ReForest' },
    { id: 'call-the-financial-blueprint', label: 'The Financial Blueprint', aria: 'Orbit 02: The Financial Blueprint' },
    { id: 'partner-horizon', label: 'Partner Horizon', aria: 'Orbit 03: Partner Horizon' },
  ];

  const renderNodeLabel = (
    nodeId: string,
    data: { labelOffset: { x: number; y: number }; align: 'middle' | 'end' | 'start'; sub: string }
  ) => {
    const isBlueprint = nodeId === 'call-the-financial-blueprint';
    const title =
      nodeId === 'orion-hq'
        ? 'Debrecen HQ'
        : nodeId === 'project-reforest'
          ? 'ReForest ’26'
          : nodeId === 'call-the-financial-blueprint'
            ? 'The Financial Blueprint'
            : 'Partner Horizon';

    const hitX = data.align === 'middle' ? -75 : data.align === 'end' ? -170 : -6;
    const hitWidth = data.align === 'middle' ? 150 : data.align === 'end' ? 176 : 190;

    return (
      <g transform={`translate(${data.labelOffset.x}, ${data.labelOffset.y})`}>
        <rect
          x={hitX}
          y="-15"
          width={hitWidth}
          height="36"
          fill="transparent"
          aria-hidden="true"
        />
        <text
          x="0"
          y="0"
          textAnchor={data.align}
          fill="#F8F9FA"
          fontSize={isBlueprint ? '14.5' : '13.5'}
          fontFamily="var(--font-display), sans-serif"
          fontWeight={isBlueprint ? '700' : '600'}
          paintOrder="stroke"
          stroke="#0B132B"
          strokeWidth="4"
          strokeLinejoin="round"
        >
          {title}
        </text>
        <text
          x="0"
          y="15"
          textAnchor={data.align}
          fill="rgba(248,249,250,0.65)"
          fontSize="11"
          fontFamily="var(--font-body), sans-serif"
          paintOrder="stroke"
          stroke="#0B132B"
          strokeWidth="4"
          strokeLinejoin="round"
        >
          {data.sub}
        </text>
      </g>
    );
  };

  return (
    <div className={`w-full flex flex-col gap-6 items-stretch ${className}`.trim()}>
      {children && <div className="w-full">{children}</div>}

      {/* Bleeding 3D Orrery Stage (Unboxed, floats freely) */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="w-full relative select-none bg-transparent lg:-mr-12 xl:-mr-16 touch-pan-y"
      >
        <svg
          viewBox="0 0 740 440"
          className="w-full h-auto block overflow-visible"
          role="region"
          aria-label="Celestial Atlas: Interactive European mobility chart"
        >
          <defs>
            {/* Soft Celestial Core Halo */}
            <radialGradient id="coreAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F8F9FA" stopOpacity="0.45" />
              <stop offset="35%" stopColor="#1D356B" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#0B132B" stopOpacity="0" />
            </radialGradient>

            {/* Ember Radial Aura */}
            <radialGradient id="blueprintEmberAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E35619" stopOpacity="0.50" />
              <stop offset="45%" stopColor="#E35619" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0B132B" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. Subtle Deterministic Starfield */}
          <g aria-hidden="true">
            {STATIC_STARS.map((star, i) => (
              <circle
                key={`star-${i}`}
                cx={star.x}
                cy={star.y}
                r={star.r}
                fill="#F8F9FA"
                opacity={star.o}
              />
            ))}
          </g>

          {/* 2. Continuous Concentric Orbital Rings */}
          <g aria-hidden="true" fill="none">
            {/* Orbit 03 (Outer) */}
            <path
              d={ring3Path}
              stroke={activeNode?.id === 'partner-horizon' ? 'rgba(248,249,250,0.55)' : '#1D356B'}
              strokeOpacity={activeNode?.id === 'partner-horizon' ? 1 : 0.65}
              strokeWidth={activeNode?.id === 'partner-horizon' ? 1.5 : 1.15}
              strokeDasharray="4 6"
            />
            {/* Orbit 02 (Middle) */}
            <path
              d={ring2Path}
              stroke={activeNode?.id === 'call-the-financial-blueprint' ? 'rgba(248,249,250,0.55)' : '#1D356B'}
              strokeOpacity={activeNode?.id === 'call-the-financial-blueprint' ? 1 : 0.75}
              strokeWidth={activeNode?.id === 'call-the-financial-blueprint' ? 1.5 : 1.25}
            />
            {/* Orbit 01 (Inner) */}
            <path
              d={ring1Path}
              stroke={activeNode?.id === 'project-reforest' ? 'rgba(248,249,250,0.55)' : '#1D356B'}
              strokeOpacity={activeNode?.id === 'project-reforest' ? 1 : 0.75}
              strokeWidth={activeNode?.id === 'project-reforest' ? 1.5 : 1.25}
            />
          </g>

          {/* 3. Active Trajectory Arc from Debrecen HQ to Selected Orbital Node */}
          {activeNode && activeTargetPos && (
            <>
              <TrajectoryArc
                key={`active-arc-glow-${activeNode.id}`}
                from={{ x: corePos.x, y: corePos.y }}
                to={{ x: activeTargetPos.x, y: activeTargetPos.y }}
                curvature={activeTargetPos.x >= corePos.x ? -0.18 : 0.18}
                stroke="#E35619"
                strokeWidth={4}
                className="opacity-25 pointer-events-none"
              />
              <TrajectoryArc
                key={`active-arc-${activeNode.id}`}
                from={{ x: corePos.x, y: corePos.y }}
                to={{ x: activeTargetPos.x, y: activeTargetPos.y }}
                curvature={activeTargetPos.x >= corePos.x ? -0.18 : 0.18}
                stroke="#E35619"
                strokeWidth={2}
                animated={!prefersReducedMotion}
              />
            </>
          )}

          {/* 4. Core Anchor: Debrecen Sun (physically inside the system) */}
          {(() => {
            const hqNode = allNodes.find((n) => n.id === 'orion-hq') ?? allNodes[0];
            const hqData = nodePositionMap['orion-hq'];
            const isSelected = activeNode?.id === hqNode.id;

            return (
              <g
                role="button"
                tabIndex={0}
                aria-label={`${hqNode.title} — ${hqNode.statusLabel}`}
                className="outline-none group focus:outline-none cursor-pointer"
                onClick={() => handleSelectNode(hqNode)}
                onKeyDown={(e) => handleKeyDown(e, hqNode)}
                transform={`translate(${corePos.x}, ${corePos.y})`}
              >
                {/* Outer Celestial Glow Disc */}
                <circle cx="0" cy="0" r="42" fill="url(#coreAura)" aria-hidden="true" />

                {/* Touch Target */}
                <circle cx="0" cy="0" r="24" fill="transparent" />

                {/* Focus Ring */}
                <circle
                  cx="0"
                  cy="0"
                  r="24"
                  fill="none"
                  stroke="#F8F9FA"
                  strokeWidth="1.5"
                  className="opacity-0 group-focus-visible:opacity-100 transition-opacity"
                />

                {isSelected && (
                  <circle
                    cx="0"
                    cy="0"
                    r="23"
                    fill="none"
                    stroke="#E35619"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Core Star Body */}
                <circle cx="0" cy="0" r="18" fill="none" stroke="rgba(248,249,250,0.28)" strokeWidth="1" />
                <circle cx="0" cy="0" r="13" fill="#111D3B" stroke="#F8F9FA" strokeWidth="1.5" />
                <g transform="translate(-13, -13)">
                  <SparkleStar size={26} color="#F8F9FA" />
                </g>

                {renderNodeLabel(hqNode.id, hqData)}
              </g>
            );
          })()}

          {/* 5. Orbital Nodes (Unified Layer with Clickable Typography Labels) */}
          {allNodes.map((node) => {
            if (node.id === 'orion-hq') return null;
            const data = nodePositionMap[node.id as keyof typeof nodePositionMap];
            if (!data) return null;
            const isSelected = activeNode?.id === node.id;
            const isBlueprint = node.id === 'call-the-financial-blueprint';

            return (
              <g
                key={node.id}
                role="button"
                tabIndex={0}
                aria-label={`${node.title} — ${node.statusLabel}`}
                className="outline-none group focus:outline-none cursor-pointer"
                onClick={() => handleSelectNode(node)}
                onKeyDown={(e) => handleKeyDown(e, node)}
                transform={`translate(${data.pos.x}, ${data.pos.y})`}
              >
                {/* 44x44 Touch Target */}
                <circle cx="0" cy="0" r="24" fill="transparent" />

                {/* Focus Ring */}
                <circle
                  cx="0"
                  cy="0"
                  r="24"
                  fill="none"
                  stroke="#F8F9FA"
                  strokeWidth="1.5"
                  className="opacity-0 group-focus-visible:opacity-100 transition-opacity"
                />

                {isSelected && (
                  <circle
                    cx="0"
                    cy="0"
                    r={isBlueprint ? 22 : 19}
                    fill="none"
                    stroke="#E35619"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                )}

                {isBlueprint ? (
                  /* The Financial Blueprint — Primary Ember Star */
                  <g>
                    <circle cx="0" cy="0" r="26" fill="url(#blueprintEmberAura)" />
                    <circle cx="0" cy="0" r="14" fill="#0B132B" stroke="#E35619" strokeWidth="1.75" />
                    <g transform="translate(-12, -12)">
                      <SparkleStar size={24} color="#E35619" pulse={!prefersReducedMotion} />
                    </g>
                  </g>
                ) : (
                  /* Other Orbital Nodes */
                  <g>
                    <circle
                      cx="0"
                      cy="0"
                      r="13"
                      fill="#111D3B"
                      stroke={isSelected ? '#E35619' : 'rgba(248,249,250,0.6)'}
                      strokeWidth={isSelected ? '1.5' : '1.25'}
                    />
                    <g transform="translate(-9, -9)">
                      <SparkleStar size={18} color={isSelected ? '#E35619' : '#F8F9FA'} />
                    </g>
                  </g>
                )}

                {renderNodeLabel(node.id, data)}
              </g>
            );
          })}
        </svg>

        {/* Quiet Caption: Text Tabs Row + Editorial NodeInspector */}
        <div className="mt-4 pt-3 border-t border-[rgba(248,249,250,0.12)]">
          {/* Plain Text Tab Strip */}
          <div
            role="tablist"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 pb-2 text-sm"
          >
            {TAB_ITEMS.map((tab) => {
              const node = allNodes.find((n) => n.id === tab.id);
              if (!node) return null;
              const isSelected = activeNode?.id === node.id;
              const isEmber = node.id === 'call-the-financial-blueprint';

              return (
                <button
                  key={`tab-${node.id}`}
                  type="button"
                  role="tab"
                  aria-label={tab.aria}
                  aria-selected={isSelected}
                  onClick={() => handleSelectNode(node)}
                  onMouseEnter={() => handleSelectNode(node)}
                  className={`pb-1 text-sm font-medium transition-colors border-b-2 rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F8F9FA] ${
                    isSelected
                      ? isEmber
                        ? 'border-[#E35619] text-[#F8F9FA]'
                        : 'border-[#F8F9FA] text-[#F8F9FA]'
                      : 'border-transparent text-[rgba(248,249,250,0.60)] hover:text-[#F8F9FA]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Quiet Caption NodeInspector */}
          <NodeInspector node={activeNode} />
        </div>
      </div>
    </div>
  );
}

export default CelestialAtlas;
