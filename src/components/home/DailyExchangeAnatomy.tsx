'use client';

import React from 'react';

export interface TimelineBlock {
  time: string;
  title: string;
  description: string;
}

export const DAILY_TIMELINE_BLOCKS: TimelineBlock[] = [
  {
    time: '08:30',
    title: 'Morning Energizer & Check-In',
    description:
      'Outdoor movement games to wake up the group, followed by daily goal-setting with your national team.',
  },
  {
    time: '10:00',
    title: 'Simulation & Strategy Lab',
    description:
      'Roleplaying real-world financial decisions, group debates, and peer-led workshops instead of slide lectures.',
  },
  {
    time: '15:00',
    title: 'Cross-Border Field Mission',
    description:
      'Stepping into local streets and parks in mixed-nationality teams to test tools and interview residents.',
  },
  {
    time: '20:00',
    title: 'Intercultural Night & Starlit Reflection',
    description:
      'Sharing traditional food, music, and stories from each country, closing with Youthpass reflection circles.',
  },
];

export function DailyExchangeAnatomy() {
  return (
    <div
      id="daily-exchange-anatomy"
      className="pt-16 mt-16 border-t border-[rgba(11,19,43,0.12)]"
      aria-labelledby="daily-anatomy-heading"
    >
      {/* Header */}
      <div className="space-y-2 max-w-3xl">
        <h3 id="daily-anatomy-heading" className="type-h3 text-[#0B132B]">
          A day on an exchange. Zero lectures.
        </h3>
        <p className="type-body text-[rgba(11,19,43,0.80)] max-w-[65ch]">
          Here is how 32 young Europeans spend 24 hours learning together without desks or exams.
        </p>
      </div>

      {/* 4-Column Open Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[rgba(11,19,43,0.12)] bg-white mt-8">
        {DAILY_TIMELINE_BLOCKS.map((block) => (
          <div
            key={block.time}
            className="p-6 border-r border-b border-[rgba(11,19,43,0.12)] space-y-3"
          >
            <div className="text-xl font-bold tabular-nums text-[#e35619]">
              {block.time}
            </div>
            <div className="text-sm font-bold text-[#0B132B]">
              {block.title}
            </div>
            <p className="text-xs text-[rgba(11,19,43,0.75)] leading-relaxed">
              {block.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyExchangeAnatomy;
