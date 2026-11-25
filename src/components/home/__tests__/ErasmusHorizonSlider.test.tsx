import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErasmusHorizonSlider } from '../ErasmusHorizonSlider';

describe('ErasmusHorizonSlider Component — Zero-Widget 12-Column Architectural Comparison', () => {
  it('renders section header with eyebrow, H2 display headline, and explanatory lead', () => {
    render(<ErasmusHorizonSlider />);

    expect(screen.getByText('Demystifying Erasmus+')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Two European paths\. One is open to everyone\./i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Hear the word “Erasmus” and picture a 6-month university term with high rent\? That is KA131\./i)
    ).toBeInTheDocument();
  });

  it('renders the left 5-column University Semester (KA131) misconception ledger', () => {
    render(<ErasmusHorizonSlider />);

    expect(screen.getByText('University semester (KA131)')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /Academic relocation/i })
    ).toBeInTheDocument();

    // 5 comparison rows
    expect(screen.getByText(/5 to 10 months:/i)).toBeInTheDocument();
    expect(screen.getByText(/Full semester away from home and work\./i)).toBeInTheDocument();

    expect(screen.getByText(/University students only:/i)).toBeInTheDocument();
    expect(screen.getByText(/Requires active degree enrollment and GPA transcripts\./i)).toBeInTheDocument();

    expect(screen.getByText(/Partial monthly stipend:/i)).toBeInTheDocument();
    expect(screen.getByText(/Requires €3,000\+ in personal savings for private rent\./i)).toBeInTheDocument();

    expect(screen.getByText(/Formal university lectures:/i)).toBeInTheDocument();
    expect(screen.getByText(/Academic coursework, essays, and final exams\./i)).toBeInTheDocument();

    expect(screen.getByText(/Solo navigation:/i)).toBeInTheDocument();
    expect(screen.getByText(/You relocate and handle foreign housing contracts alone\./i)).toBeInTheDocument();
  });

  it('renders the right 7-column Orion Youth Exchange (KA152) reality panel with verified funding badge', () => {
    render(<ErasmusHorizonSlider />);

    expect(screen.getByText('Orion Youth Exchange (KA152)')).toBeInTheDocument();
    expect(screen.getByText('100% Erasmus+ funded')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /Short, immersive cross-border adventure/i })
    ).toBeInTheDocument();

    // 5 comparison rows
    expect(screen.getByText(/7 to 12 days:/i)).toBeInTheDocument();
    expect(screen.getByText(/Fits cleanly between school terms, jobs, or annual leave\./i)).toBeInTheDocument();

    expect(screen.getByText(/Open to anyone aged 18–30:/i)).toBeInTheDocument();
    expect(screen.getByText(/No university enrollment, diploma, or prior experience needed\./i)).toBeInTheDocument();

    expect(screen.getByText(/€0 out-of-pocket lodging & food:/i)).toBeInTheDocument();
    expect(screen.getByText(/Accommodation, 3 meals a day, and workshops are 100% covered/i)).toBeInTheDocument();

    expect(screen.getByText(/Non-formal learning:/i)).toBeInTheDocument();
    expect(screen.getByText(/Outdoor challenges, simulations, and creative teamwork/i)).toBeInTheDocument();

    expect(screen.getByText(/Never travel alone:/i)).toBeInTheDocument();
    expect(screen.getByText(/You travel as a Hungarian delegation with an experienced Orion group leader/i)).toBeInTheDocument();
  });

  it('renders primary call to action buttons inside the dark panel', () => {
    render(<ErasmusHorizonSlider />);

    const openCallsBtn = screen.getByRole('link', { name: /Explore open calls/i });
    expect(openCallsBtn).toHaveAttribute('href', '/open-calls');

    const supportLink = screen.getByRole('link', { name: /Learn how we support you/i });
    expect(supportLink).toHaveAttribute('href', '/about');
  });
});
