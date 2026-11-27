import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErasmusHorizonSlider } from '../ErasmusHorizonSlider';

describe('ErasmusHorizonSlider Component — Zero-Widget 12-Column Architectural Comparison', () => {
  it('renders tightened section header with H2 display headline, 1-line lead, and no eyebrow', () => {
    render(<ErasmusHorizonSlider />);

    expect(screen.queryByText('Demystifying Erasmus+')).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Two European paths\. One is open to everyone\./i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Not a six-month university term—an Orion Youth Exchange takes a week and costs nothing\./i
      )
    ).toBeInTheDocument();
  });

  it('renders the left 5-column University Semester (KA131) 4-row comparison ledger', () => {
    render(<ErasmusHorizonSlider />);

    expect(screen.getByText('University semester (KA131)')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /Academic relocation/i })
    ).toBeInTheDocument();

    expect(screen.getByText('5–10 months')).toBeInTheDocument();
    expect(screen.getByText('Enrolled uni students')).toBeInTheDocument();
    expect(screen.getByText('Partial stipend, own rent')).toBeInTheDocument();
    expect(screen.getByText('Lectures, essays & exams')).toBeInTheDocument();
  });

  it('renders the right 7-column Orion Youth Exchange (KA152) 4-row reality panel with verified funding badge', () => {
    render(<ErasmusHorizonSlider />);

    expect(screen.getByText('Orion Youth Exchange (KA152)')).toBeInTheDocument();
    expect(screen.getByText('100% Erasmus+ funded')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /Short, immersive cross-border adventure/i })
    ).toBeInTheDocument();

    expect(screen.getAllByText('Duration')).toHaveLength(2);
    expect(screen.getAllByText('Eligibility')).toHaveLength(2);
    expect(screen.getAllByText('Cost')).toHaveLength(2);
    expect(screen.getAllByText('Format')).toHaveLength(2);

    expect(screen.getByText('7–12 days')).toBeInTheDocument();
    expect(screen.getByText('Anyone aged 18–30')).toBeInTheDocument();
    expect(screen.getByText('€0 lodging, food & workshops')).toBeInTheDocument();
    expect(screen.getByText('Hands-on labs, group leader')).toBeInTheDocument();
  });

  it('renders primary call to action buttons inside the dark panel', () => {
    render(<ErasmusHorizonSlider />);

    const openCallsBtn = screen.getByRole('link', { name: /Explore open calls/i });
    expect(openCallsBtn).toHaveAttribute('href', '/open-calls');

    const supportLink = screen.getByRole('link', { name: /Learn how we support you/i });
    expect(supportLink).toHaveAttribute('href', '/about');
  });
});
