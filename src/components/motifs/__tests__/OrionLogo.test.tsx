import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OrionLogo } from '@/components/motifs/OrionLogo';

describe('OrionLogo component', () => {
  it('renders full-dark variant with accessible name and correct title', () => {
    const { container } = render(<OrionLogo variant="full-dark" />);
    const svg = screen.getByRole('img', { name: 'Orion' });
    expect(svg).toBeInTheDocument();
    expect(container.querySelector('title')?.textContent).toBe('Orion');
    expect(svg.getAttribute('viewBox')).toBe('0 0 144 44');
    expect(container.querySelector('g')?.getAttribute('fill')).toBe('#F8F9FA');
  });

  it('renders full-light variant with navy wordmark', () => {
    const { container } = render(<OrionLogo variant="full-light" />);
    const svg = screen.getByRole('img', { name: 'Orion' });
    expect(svg).toBeInTheDocument();
    expect(container.querySelector('g')?.getAttribute('fill')).toBe('#0B132B');
  });

  it('renders star-only favicon variant', () => {
    const { container } = render(<OrionLogo variant="star-only" height={32} />);
    const svg = screen.getByRole('img', { name: 'Orion' });
    expect(svg).toBeInTheDocument();
    expect(svg.getAttribute('viewBox')).toBe('0 0 36 36');
    expect(svg.getAttribute('width')).toBe('32');
    expect(svg.getAttribute('height')).toBe('32');
    // Does not render letter group in star-only mode
    expect(container.querySelector('g')).toBeNull();
  });

  it('enforces minimum height of 24px', () => {
    render(<OrionLogo height={16} />);
    const svg = screen.getByRole('img', { name: 'Orion' });
    expect(svg.getAttribute('height')).toBe('24');
  });

  it('passes custom className and custom title', () => {
    render(<OrionLogo className="custom-class" title="Orion NGO Logo" />);
    const svg = screen.getByRole('img', { name: 'Orion NGO Logo' });
    expect(svg).toHaveClass('custom-class');
  });
});
