import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DailyExchangeAnatomy, DAILY_TIMELINE_BLOCKS } from '@/components/home/DailyExchangeAnatomy';

describe('DailyExchangeAnatomy Component — Open 4-Column 24-Hour Exchange Rhythm', () => {
  it('renders section header with H3 title and subcopy', () => {
    render(<DailyExchangeAnatomy />);

    expect(
      screen.getByRole('heading', { level: 3, name: /A day on an exchange\. Zero lectures\./i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Here is how 32 young Europeans spend 24 hours learning together without desks or exams\./i)
    ).toBeInTheDocument();
  });

  it('renders all 4 time blocks simultaneously in the open timeline grid', () => {
    render(<DailyExchangeAnatomy />);

    // Verify all 4 time slots
    expect(screen.getByText('08:30')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
    expect(screen.getByText('15:00')).toBeInTheDocument();
    expect(screen.getByText('20:00')).toBeInTheDocument();

    // Verify titles
    expect(screen.getByText('Morning Energizer & Check-In')).toBeInTheDocument();
    expect(screen.getByText('Simulation & Strategy Lab')).toBeInTheDocument();
    expect(screen.getByText('Cross-Border Field Mission')).toBeInTheDocument();
    expect(screen.getByText('Intercultural Night & Starlit Reflection')).toBeInTheDocument();

    // Verify descriptions
    expect(
      screen.getByText(/Outdoor movement games to wake up the group, followed by daily goal-setting with your national team\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Roleplaying real-world financial decisions, group debates, and peer-led workshops instead of slide lectures\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Stepping into local streets and parks in mixed-nationality teams to test tools and interview residents\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Sharing traditional food, music, and stories from each country, closing with Youthpass reflection circles\./i)
    ).toBeInTheDocument();
  });

  it('exports DAILY_TIMELINE_BLOCKS data structure with 4 items', () => {
    expect(DAILY_TIMELINE_BLOCKS).toHaveLength(4);
    expect(DAILY_TIMELINE_BLOCKS[0].time).toBe('08:30');
    expect(DAILY_TIMELINE_BLOCKS[1].time).toBe('10:00');
    expect(DAILY_TIMELINE_BLOCKS[2].time).toBe('15:00');
    expect(DAILY_TIMELINE_BLOCKS[3].time).toBe('20:00');
  });
});
