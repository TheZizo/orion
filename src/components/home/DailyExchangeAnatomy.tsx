import React from 'react';
import Image from 'next/image';

export interface TimelineBlock {
  time: string;
  title: string;
  description: string;
}

export const DAILY_TIMELINE_BLOCKS: TimelineBlock[] = [
  {
    time: '08:30',
    title: 'Morning energizer',
    description: 'Outdoor games and daily team check-in.',
  },
  {
    time: '10:00',
    title: 'Simulation lab',
    description: 'Peer workshops and real-world debates.',
  },
  {
    time: '15:00',
    title: 'Field mission',
    description: 'Mixed-nationality challenges in town.',
  },
  {
    time: '20:00',
    title: 'Intercultural night',
    description: 'Traditional food, music, and reflection.',
  },
];

export function DailyExchangeAnatomy() {
  return (
    <div
      id="daily-exchange-anatomy"
      className="pt-14 mt-14 border-t border-[rgba(11,19,43,0.12)]"
      aria-labelledby="daily-anatomy-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left 5 Columns: Documentary Workshop Frame */}
        <div className="lg:col-span-5 min-w-0">
          <div className="group aspect-[4/3] lg:aspect-auto lg:min-h-[380px] h-full relative overflow-hidden border border-[rgba(11,19,43,0.12)] bg-[#0B132B]">
            <Image
              src="/images/projects/reforest-1.jpg"
              alt="Participants presenting their illustrated nature poster during an intercultural workshop in the mountain lodge"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Right 7 Columns: Heading & Borderless Vertical Hairline Timeline */}
        <div className="lg:col-span-7 flex flex-col justify-center gap-6 min-w-0 lg:pl-4">
          <h3 id="daily-anatomy-heading" className="type-h2 text-[#0B132B]">
            A day on an exchange. Zero lectures.
          </h3>

          <ol className="divide-y divide-[rgba(11,19,43,0.12)] border-t border-b border-[rgba(11,19,43,0.12)]">
            {DAILY_TIMELINE_BLOCKS.map((block) => (
              <li
                key={block.time}
                className="py-4 sm:py-5 grid grid-cols-12 gap-4 items-baseline"
              >
                <span className="col-span-3 sm:col-span-2 font-display text-xl sm:text-2xl font-bold tabular-nums text-[#e35619]">
                  {block.time}
                </span>
                <div className="col-span-9 sm:col-span-10 space-y-0.5 min-w-0">
                  <div className="font-display text-base font-semibold text-[#0B132B]">
                    {block.title}
                  </div>
                  <p className="text-sm text-[rgba(11,19,43,0.72)] leading-relaxed">
                    {block.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default DailyExchangeAnatomy;
