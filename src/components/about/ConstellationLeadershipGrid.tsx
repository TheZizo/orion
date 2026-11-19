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
  { id: 'zeid-isaac', label: 'Zeid', index: '01', x: 120, y: 74 },
  { id: 'roberta-szabo', label: 'Roberta', index: '02', x: 310, y: 42 },
  { id: 'jazmin-szabo', label: 'Jázmin', index: '03', x: 500, y: 84 },
  { id: 'jordan-smith', label: 'Jordan', index: '04', x: 690, y: 40 },
  { id: 'mehmet-ismail', label: 'Mehmet', index: '05', x: 880, y: 76 },
];

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
          className="w-full h-28 sm:h-36 relative overflow-hidden"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1000 132"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Deterministic faint background stars */}
            <g fill="rgba(248,249,250,0.30)">
              <circle cx="50" cy="24" r="1" />
              <circle cx="200" cy="105" r="1.2" />
              <circle cx="390" cy="20" r="1" />
              <circle cx="450" cy="115" r="0.8" />
              <circle cx="590" cy="28" r="1" />
              <circle cx="610" cy="110" r="1.2" />
              <circle cx="790" cy="22" r="0.9" />
              <circle cx="830" cy="118" r="1" />
              <circle cx="950" cy="40" r="1.1" />
            </g>

            {/* Sweeping trajectory arc linking the nodes */}
            <path
              d="M 120 74 C 180 50, 250 36, 310 42 C 375 48, 440 90, 500 84 C 565 78, 630 36, 690 40 C 755 44, 820 82, 880 76"
              stroke="rgba(248,249,250,0.20)"
              strokeWidth="1.25"
              strokeDasharray="4 4"
              fill="none"
            />

            {/* Active trajectory arc when a leader is selected */}
            {activeMemberId !== null && (
              <path
                d="M 120 74 C 180 50, 250 36, 310 42 C 375 48, 440 90, 500 84 C 565 78, 630 36, 690 40 C 755 44, 820 82, 880 76"
                stroke="#e35619"
                strokeWidth="1.5"
                strokeOpacity="0.85"
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
                        r="11"
                        fill="none"
                        stroke="#e35619"
                        strokeWidth="1.25"
                        strokeDasharray="2 2"
                      />
                      <circle cx={node.x} cy={node.y} r="5" fill="#e35619" />
                    </>
                  ) : (
                    <circle cx={node.x} cy={node.y} r="3.5" fill="#F8F9FA" />
                  )}
                  <text
                    x={node.x}
                    y={node.y - 12}
                    textAnchor="middle"
                    fill={isNodeActive ? '#e35619' : 'rgba(248,249,250,0.55)'}
                    fontSize="10"
                    fontFamily="monospace"
                    className="tabular-nums font-semibold"
                  >
                    {node.index}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 20}
                    textAnchor="middle"
                    fill={isNodeActive ? '#e35619' : '#F8F9FA'}
                    fontSize="12"
                    fontWeight="500"
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
                    ? 'border-[#e35619] ring-1 ring-[#e35619]'
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
                          <>
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
                            <span className="text-[10px] leading-tight text-center font-medium text-[rgba(11,19,43,0.52)]">
                              Portrait placeholder
                            </span>
                          </>
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
                    <div className="pt-2 text-xs text-[rgba(11,19,43,0.52)]">
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
                  ? 'border-[#e35619] ring-1 ring-[#e35619]'
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
                      <>
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
                        <span className="text-[10px] leading-tight text-center font-medium text-[rgba(11,19,43,0.52)]">
                          Portrait placeholder
                        </span>
                      </>
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
