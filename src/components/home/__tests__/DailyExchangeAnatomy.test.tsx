import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DailyExchangeAnatomy, DAILY_TIMELINE_BLOCKS } from '@/components/home/DailyExchangeAnatomy';

describe('DailyExchangeAnatomy Component — Editorial 2x2 Exchange Rhythm', () => {
  it('renders section header with H3 title and removes old subcopy', () => {
    render(<DailyExchangeAnatomy />);

    expect(
      screen.getByRole('heading', { level: 3, name: /A day on an exchange\. Zero lectures\./i })
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/Here is how 32 young Europeans spend 24 hours learning together without desks or exams\./i)
    ).toBeNull();
  });

  it('renders the documentary workshop photo reforest-1.jpg with alt text', () => {
    render(<DailyExchangeAnatomy />);

    const img = screen.getByRole('img', {
      name: /Participants presenting their illustrated nature poster during an intercultural workshop in the mountain lodge/i,
    });
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toContain('reforest-1.jpg');
  });

  it('renders all 4 time blocks simultaneously in the 2x2 timeline grid', () => {
    render(<DailyExchangeAnatomy />);

    // Verify all 4 time slots
    expect(screen.getByText('08:30')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
    expect(screen.getByText('15:00')).toBeInTheDocument();
    expect(screen.getByText('20:00')).toBeInTheDocument();

    // Verify titles
    expect(screen.getByText('Morning energizer')).toBeInTheDocument();
    expect(screen.getByText('Simulation lab')).toBeInTheDocument();
    expect(screen.getByText('Field mission')).toBeInTheDocument();
    expect(screen.getByText('Intercultural night')).toBeInTheDocument();

    // Verify concise descriptions
    expect(
      screen.getByText(/Outdoor games and daily team check-in\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Peer workshops and real-world debates\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Mixed-nationality challenges in town\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Traditional food, music, and reflection\./i)
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
