'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TeamMember } from '@/types/orion';
import { SparkleStar } from '@/components/motifs/SparkleStar';

export interface ConstellationLeadershipGridProps {
  team: TeamMember[];
}

interface StarNode {
  id: string;
  label: string;
  index: string;
  x: number;
  y: number;
}

const STAR_NODES: StarNode[] = [
  { id: 'zeid-isaac', label: 'Zeid', index: '01', x: 120, y: 86 },
  { id: 'roberta-szabo', label: 'Roberta', index: '02', x: 310, y: 52 },
  { id: 'jazmin-szabo', label: 'Jázmin', index: '03', x: 500, y: 96 },
  { id: 'jordan-smith', label: 'Jordan', index: '04', x: 690, y: 50 },
  { id: 'mehmet-ismail', label: 'Mehmet', index: '05', x: 880, y: 88 },
];

const TRAJECTORY_PATH =
  'M 120 86 C 180 62, 250 46, 310 52 C 375 58, 440 102, 500 96 C 565 90, 630 46, 690 50 C 755 54, 820 94, 880 88';

function starPath(cx: number, cy: number, r: number): string {
  return `M ${cx} ${cy - r} Q ${cx} ${cy} ${cx + r} ${cy} Q ${cx} ${cy} ${cx} ${cy + r} Q ${cx} ${cy} ${cx - r} ${cy} Q ${cx} ${cy} ${cx} ${cy - r} Z`;
}

function normalizeDisplayName(member: TeamMember): string {
  if (member.id === 'zeid-isaac' || member.name === 'Zeid George Nicola Isaac') {
    return 'Zeid Isaac';
  }
  if (member.id === 'ismail' || member.id === 'mehmet-ismail') {
    return 'Mehmet Ismail';
  }
  return member.name;
}

function getMonogram(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function isMemberMatch(activeId: string | null, memberId: string): boolean {
  if (!activeId) return false;
  if (activeId === memberId) return true;
  if (
    (activeId === 'ismail' || activeId === 'mehmet-ismail') &&
    (memberId === 'ismail' || memberId === 'mehmet-ismail')
  ) {
    return true;
  }
  return false;
}

export function ConstellationLeadershipGrid({
  team,
}: ConstellationLeadershipGridProps) {
  const [activeMemberId, setActiveMemberId] = useState<string | null>(null);

  return (
    <section className="space-y-8" aria-labelledby="constellation-team-heading">
      {/* Section Header */}
      <div className="border-b border-[rgba(11,19,43,0.10)] pb-6 space-y-1">
        <div className="type-eyebrow text-[#0B132B]/65">
          Debrecen founding leadership
        </div>
        <h2 id="constellation-team-heading" className="type-h2 text-[#0B132B]">
          Constellation team
        </h2>
        <p className="type-body text-sm text-[rgba(11,19,43,0.7)]">
          Founding leadership of Orion Fiatalok Informális Csoportja: local Hungarian and international educators, mentors, and organizers anchored in Debrecen.
        </p>
      </div>

      {/* Dark Observatory Constellation Map + Interactive Spotlight Bar */}
      <div className="bg-[#0B132B] border border-[#1D356B] overflow-hidden">
        {/* SVG Star Map Container (aria-hidden for screen readers) */}
        <div
          className="w-full h-32 sm:h-40 relative overflow-hidden"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1000 160"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Faint meridian & horizon coordinate hairlines */}
            <g stroke="rgba(248,249,250,0.06)" strokeWidth="1">
              <line x1="0" y1="80" x2="1000" y2="80" />
              <line x1="0" y1="40" x2="1000" y2="40" />
              <line x1="0" y1="120" x2="1000" y2="120" />
              {STAR_NODES.map((node) => (
                <line
                  key={`meridian-${node.id}`}
                  x1={node.x}
                  y1="0"
                  x2={node.x}
                  y2="160"
                />
              ))}
            </g>

            {/* Deterministic faint background stars */}
            <g fill="rgba(248,249,250,0.30)">
              <circle cx="50" cy="28" r="1" />
              <circle cx="200" cy="122" r="1.2" />
              <circle cx="390" cy="24" r="1" />
              <circle cx="450" cy="134" r="0.8" />
              <circle cx="590" cy="30" r="1" />
              <circle cx="610" cy="126" r="1.2" />
              <circle cx="790" cy="24" r="0.9" />
              <circle cx="830" cy="136" r="1" />
              <circle cx="950" cy="44" r="1.1" />
            </g>

            {/* Base dashed guide trajectory arc linking the nodes */}
            <path
              d={TRAJECTORY_PATH}
              stroke="rgba(248,249,250,0.18)"
              strokeWidth="1.25"
              strokeDasharray="4 4"
              fill="none"
            />

            {/* Kinetic active Ember trajectory arc when a leader is selected */}
            {activeMemberId !== null && (
              <path
                key={activeMemberId}
                d={TRAJECTORY_PATH}
                className="belief-trace"
                style={{ '--trace-len': 860 } as React.CSSProperties}
                stroke="#e35619"
                strokeWidth="1.75"
                strokeOpacity="0.9"
                strokeLinecap="round"
                fill="none"
              />
            )}

            {/* Orbital Star Nodes */}
            {STAR_NODES.map((node) => {
              const isNodeActive = isMemberMatch(activeMemberId, node.id);

              return (
                <g key={node.id}>
                  {isNodeActive ? (
                    <>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="13"
                        fill="none"
                        stroke="#E35619"
                        strokeWidth="1.2"
                        className="belief-ripple"
                      />
                      <path
                        d={starPath(node.x, node.y, 8.5)}
                        fill="#E35619"
                        className="belief-bloom"
                      />
                    </>
                  ) : (
                    <circle cx={node.x} cy={node.y} r="3.5" fill="#F8F9FA" />
                  )}
                  <text
                    x={node.x}
                    y={node.y - 16}
                    textAnchor="middle"
                    fill={isNodeActive ? '#F8F9FA' : 'rgba(248,249,250,0.72)'}
                    fontSize="11.5"
                    fontFamily="var(--font-display), sans-serif"
                    fontWeight={isNodeActive ? '700' : '600'}
                    className="tabular-nums"
                  >
                    {node.index}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 24}
                    textAnchor="middle"
                    fill="#F8F9FA"
                    fontSize="13.5"
                    fontFamily="var(--font-display), sans-serif"
                    fontWeight={isNodeActive ? '700' : '500'}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Interactive Spotlight Filter Bar */}
        <div className="bg-[#111D3B] border-t border-[#1D356B] px-4 py-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            aria-pressed={activeMemberId === null}
            onClick={() => setActiveMemberId(null)}
            className={`px-3 py-1.5 text-xs font-display transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F9FA] ${
              activeMemberId === null
                ? 'bg-[#e35619] text-[#0B132B] font-bold'
                : 'bg-transparent text-[#F8F9FA] border border-[rgba(248,249,250,0.22)] hover:border-[rgba(248,249,250,0.5)]'
            }`}
          >
            All 5 leaders
          </button>
          {team.map((member) => {
            const displayName = normalizeDisplayName(member);
            const isSelected = isMemberMatch(activeMemberId, member.id);
            return (
              <button
                key={member.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() =>
                  setActiveMemberId((prev) =>
                    isMemberMatch(prev, member.id) ? null : member.id
                  )
                }
                className={`px-3 py-1.5 text-xs font-display transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F9FA] ${
                  isSelected
                    ? 'bg-[#e35619] text-[#0B132B] font-bold'
                    : 'bg-transparent text-[#F8F9FA] border border-[rgba(248,249,250,0.22)] hover:border-[rgba(248,249,250,0.5)]'
                }`}
              >
                {displayName}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1 + 2×2 Architectural Constellation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        {team.map((member, index) => {
          const displayName = normalizeDisplayName(member);
          const monogram = getMonogram(displayName);
          const isSelected = isMemberMatch(activeMemberId, member.id);
          const isDimmed = activeMemberId !== null && !isSelected;

          if (index === 0) {
            // Card 0: Flagship full-width horizontal dossier
            return (
              <article
                key={member.id}
                id={`team-member-${member.id}`}
                className={`border bg-white p-6 md:p-8 transition-all min-w-0 md:col-span-2 lg:col-span-6 ${
                  isSelected
                    ? 'border-t-2 border-t-[#e35619] border-[#e35619] ring-1 ring-[#e35619]'
                    : isDimmed
                      ? 'border-[rgba(11,19,43,0.12)] opacity-75 hover:opacity-100'
                      : 'border-[rgba(11,19,43,0.12)] hover:border-[rgba(11,19,43,0.30)]'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                  {/* Left 5 cols: compact monogram emblem + identity + highlights */}
                  <div className="lg:col-span-5 space-y-5 min-w-0">
                    <div className="flex items-start gap-4 min-w-0">
                      <div className="shrink-0 flex flex-col items-center gap-1.5 w-20">
                        {member.photoUrl ? (
                          <div className="w-16 h-16 aspect-square relative overflow-hidden border border-[rgba(11,19,43,0.16)] bg-[#0B132B]">
                            <Image
                              src={member.photoUrl}
                              alt={displayName}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14 aspect-square bg-[#0B132B] border border-[#1D356B] flex items-center justify-center relative">
                            <span className="font-display font-semibold text-sm text-[#F8F9FA] tracking-tight">
                              {monogram}
                            </span>
                            <span
                              aria-hidden="true"
                              className="absolute -top-1.5 -right-1.5"
                            >
                              <SparkleStar size={10} color="#e35619" />
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1 space-y-1">
                        <h3 className="type-h3 text-xl text-[#0B132B]">
                          {displayName}
                        </h3>
                        {member.role && (
                          <p className="font-display text-sm font-semibold text-[#0B132B] leading-snug">
                            {member.role}
                          </p>
                        )}
                        {member.focus && (
                          <p className="type-body text-xs text-[rgba(11,19,43,0.68)] leading-normal">
                            {member.focus}
                          </p>
                        )}
                      </div>
                    </div>

                    {((member.highlights && member.highlights.length > 0) ||
                      (member.languages && member.languages.length > 0)) && (
                      <div className="border-t border-[rgba(11,19,43,0.10)] pt-4 space-y-3">
                        {member.highlights && member.highlights.length > 0 && (
                          <ul className="space-y-1.5 text-xs text-[rgba(11,19,43,0.78)]">
                            {member.highlights.map((highlight, hIndex) => (
                              <li key={hIndex} className="flex items-start gap-2">
                                <SparkleStar
                                  size={8}
                                  color="#e35619"
                                  className="shrink-0 mt-1"
                                />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {member.languages && member.languages.length > 0 && (
                          <div className="text-xs text-[rgba(11,19,43,0.72)]">
                            <span className="font-semibold text-[#0B132B]">
                              Languages:{' '}
                            </span>
                            {member.languages.join(', ')}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right 7 cols: full biography */}
                  <div className="lg:col-span-7 flex flex-col justify-between gap-4 min-w-0">
                    {member.bio && (
                      <p className="type-body text-sm md:text-base text-[rgba(11,19,43,0.84)] leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                    <div className="pt-2 text-xs text-[rgba(11,19,43,0.68)]">
                      Founding leadership anchor, Debrecen
                    </div>
                  </div>
                </div>
              </article>
            );
          }

          // Cards 1–4: Symmetric 2×2 grid cards (col-span-1 on md, col-span-3 on lg)
          return (
            <article
              key={member.id}
              id={`team-member-${member.id}`}
              className={`border bg-white p-6 md:p-8 flex flex-col justify-between gap-6 transition-all min-w-0 md:col-span-1 lg:col-span-3 ${
                isSelected
                  ? 'border-t-2 border-t-[#e35619] border-[#e35619] ring-1 ring-[#e35619]'
                  : isDimmed
                    ? 'border-[rgba(11,19,43,0.12)] opacity-75 hover:opacity-100'
                    : 'border-[rgba(11,19,43,0.12)] hover:border-[rgba(11,19,43,0.30)]'
              }`}
            >
              <div className="space-y-5 min-w-0">
                {/* Top header row */}
                <div className="flex items-start gap-4 min-w-0">
                  <div className="shrink-0 flex flex-col items-center gap-1.5 w-20">
                    {member.photoUrl ? (
                      <div className="w-16 h-16 aspect-square relative overflow-hidden border border-[rgba(11,19,43,0.16)] bg-[#0B132B]">
                        <Image
                          src={member.photoUrl}
                          alt={displayName}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 aspect-square bg-[#0B132B] border border-[#1D356B] flex items-center justify-center relative">
                        <span className="font-display font-semibold text-sm text-[#F8F9FA] tracking-tight">
                          {monogram}
                        </span>
                        <span
                          aria-hidden="true"
                          className="absolute -top-1.5 -right-1.5"
                        >
                          <SparkleStar size={10} color="#e35619" />
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="type-h3 text-xl text-[#0B132B]">
                      {displayName}
                    </h3>
                    {member.role && (
                      <p className="font-display text-sm font-semibold text-[#0B132B] leading-snug">
                        {member.role}
                      </p>
                    )}
                    {member.focus && (
                      <p className="type-body text-xs text-[rgba(11,19,43,0.68)] leading-normal">
                        {member.focus}
                      </p>
                    )}
                  </div>
                </div>

                {/* Full biography rendered completely with ZERO line-clamp truncation */}
                {member.bio && (
                  <p className="type-body text-sm text-[rgba(11,19,43,0.82)] leading-relaxed">
                    {member.bio}
                  </p>
                )}
              </div>

              {/* Footer metadata block */}
              {((member.highlights && member.highlights.length > 0) ||
                (member.languages && member.languages.length > 0)) && (
                <div className="border-t border-[rgba(11,19,43,0.10)] pt-4 space-y-3 mt-auto">
                  {member.highlights && member.highlights.length > 0 && (
                    <ul className="space-y-1.5 text-xs text-[rgba(11,19,43,0.78)]">
                      {member.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-start gap-2">
                          <SparkleStar
                            size={8}
                            color="#e35619"
                            className="shrink-0 mt-1"
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {member.languages && member.languages.length > 0 && (
                    <div className="text-xs text-[rgba(11,19,43,0.72)]">
                      <span className="font-semibold text-[#0B132B]">
                        Languages:{' '}
                      </span>
                      {member.languages.join(', ')}
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
