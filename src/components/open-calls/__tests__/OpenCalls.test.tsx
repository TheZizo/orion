import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OpenCall } from '@/types/orion';
import { OpenCallsDirectory } from '../OpenCallsDirectory';
import { CallCard } from '../CallCard';
import { HybridApplicationFunnel } from '../HybridApplicationFunnel';
import { ExternalApplicationCard } from '../ExternalApplicationCard';
import { ParticipantFaq } from '../ParticipantFaq';

// Mock next/navigation
const mockPush = vi.fn();
let mockSearchParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/open-calls',
  useSearchParams: () => mockSearchParams,
}));

const mockCalls: OpenCall[] = [
  {
    slug: 'coastal-horizons-portugal',
    title: 'Coastal Horizons: Ocean Stewardship',
    actionType: 'Youth Exchange',
    country: 'Portugal',
    city: 'Cascais',
    coordinates: { lat: 38.72, lng: -9.42 },
    startDate: '2027-03-12',
    endDate: '2027-03-21',
    applicationDeadline: '2027-01-15',
    status: 'Open',
    ageRange: '18–30',
    participantsPerCountry: '4 participants',
    emotionalPayoff: 'Find your voice beside the Atlantic tide.',
    summary: 'A 10-day experiential youth exchange.',
    dailyExperience: [{ label: 'Dawn', description: 'Reflection' }],
    travelReimbursement: [{ distanceBand: '100–499 km', maxAmountEUR: 180 }],
    reimbursementNotes: 'Accommodation and meals covered.',
    eligibility: ['Age 18–30'],
    infopackUrl: '/docs/infopacks/coastal.pdf',
    applicationMode: 'internal',
    partnerOrgs: ['Associação Mar Adentro'],
    themes: ['Climate Action'],
  },
  {
    slug: 'alpine-navigators-georgia',
    title: 'Alpine Navigators: Non-Formal Leadership',
    actionType: 'Training Course',
    country: 'Georgia',
    city: 'Stepantsminda',
    coordinates: { lat: 42.66, lng: 44.64 },
    startDate: '2027-04-18',
    endDate: '2027-04-26',
    applicationDeadline: '2027-02-28',
    status: 'Closing soon',
    ageRange: '18+',
    participantsPerCountry: '3 participants',
    emotionalPayoff: 'Step beyond comfort zones.',
    summary: 'Advanced training course for youth workers.',
    dailyExperience: [{ label: 'Hiking', description: 'Mountain leadership' }],
    travelReimbursement: [{ distanceBand: '500–1999 km', maxAmountEUR: 275 }],
    reimbursementNotes: 'Erasmus+ funded lodge.',
    eligibility: ['Youth workers 18+'],
    infopackUrl: '/docs/infopacks/alpine.pdf',
    applicationMode: 'external',
    externalFormUrl: 'https://forms.gle/AlpineNavigators2027Geo',
    partnerOrgs: ['Academy for Peace and Development'],
    themes: ['Leadership Development'],
  },
  {
    slug: 'nordic-lights-estonia',
    title: 'Nordic Lights: Eco-Social Entrepreneurship',
    actionType: 'Training Course',
    country: 'Estonia',
    city: 'Tartu',
    coordinates: { lat: 58.38, lng: 26.72 },
    startDate: '2026-12-04',
    endDate: '2026-12-12',
    applicationDeadline: '2026-10-15',
    status: 'Closed',
    ageRange: '18+',
    participantsPerCountry: '3 representatives',
    emotionalPayoff: 'Turn social passion into viable green enterprise.',
    summary: 'Intensive lab transforming community problems.',
    dailyExperience: [{ label: 'Sprint', description: 'Canvas work' }],
    travelReimbursement: [{ distanceBand: '500–1999 km', maxAmountEUR: 275 }],
    reimbursementNotes: 'Applications closed.',
    eligibility: ['Selected participants'],
    infopackUrl: '/docs/infopacks/nordic.pdf',
    applicationMode: 'external',
    externalFormUrl: 'https://forms.gle/NordicLights',
    partnerOrgs: ['Continuous Action MTÜ'],
    themes: ['Circular Economy'],
  },
];

describe('OpenCallsDirectory & Filtering', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams = new URLSearchParams();
  });

  it('renders all calls when no query parameters are set', () => {
    render(<OpenCallsDirectory initialCalls={mockCalls} />);
    expect(screen.getByText('Coastal Horizons: Ocean Stewardship')).toBeInTheDocument();
    expect(screen.getByText('Alpine Navigators: Non-Formal Leadership')).toBeInTheDocument();
    expect(screen.getByText('Nordic Lights: Eco-Social Entrepreneurship')).toBeInTheDocument();
    expect(screen.getByText(/Showing 3 of 3 open calls/i)).toBeInTheDocument();
  });

  it('filters calls by actionType via query parameter', () => {
    mockSearchParams = new URLSearchParams('type=Youth Exchange');
    render(<OpenCallsDirectory initialCalls={mockCalls} />);
    expect(screen.getByText('Coastal Horizons: Ocean Stewardship')).toBeInTheDocument();
    expect(screen.queryByText('Alpine Navigators: Non-Formal Leadership')).not.toBeInTheDocument();
    expect(screen.queryByText('Nordic Lights: Eco-Social Entrepreneurship')).not.toBeInTheDocument();
  });

  it('filters calls by country via query parameter', () => {
    mockSearchParams = new URLSearchParams('country=Georgia');
    render(<OpenCallsDirectory initialCalls={mockCalls} />);
    expect(screen.getByText('Alpine Navigators: Non-Formal Leadership')).toBeInTheDocument();
    expect(screen.queryByText('Coastal Horizons: Ocean Stewardship')).not.toBeInTheDocument();
  });

  it('filters calls by status via query parameter', () => {
    mockSearchParams = new URLSearchParams('status=Closing soon');
    render(<OpenCallsDirectory initialCalls={mockCalls} />);
    expect(screen.getByText('Alpine Navigators: Non-Formal Leadership')).toBeInTheDocument();
    expect(screen.queryByText('Coastal Horizons: Ocean Stewardship')).not.toBeInTheDocument();
  });

  it('renders empty state when no calls match criteria and allows clearing filters', () => {
    mockSearchParams = new URLSearchParams('country=UnknownCountry');
    render(<OpenCallsDirectory initialCalls={mockCalls} />);

    expect(screen.getByRole('heading', { name: /No calls match these filters/i })).toBeInTheDocument();
    const clearBtns = screen.getAllByRole('button', { name: /Clear filters/i });
    expect(clearBtns.length).toBeGreaterThanOrEqual(1);

    fireEvent.click(clearBtns[0]);
    expect(mockPush).toHaveBeenCalledWith('/open-calls', { scroll: false });
  });
});

describe('CallCard', () => {
  it('renders architectural ledger information with accessible badge, Network Portal hint, and links', () => {
    render(<CallCard call={mockCalls[0]} />);
    expect(screen.getByText('Coastal Horizons: Ocean Stewardship')).toBeInTheDocument();
    expect(screen.getByText(/Cascais, Portugal/i)).toBeInTheDocument();
    expect(screen.getByText('Apply via Network Portal')).toBeInTheDocument();

    const viewCallLink = screen.getByRole('link', { name: /View call/i });
    expect(viewCallLink).toBeInTheDocument();
    expect(viewCallLink.getAttribute('href')).toBe('/open-calls/coastal-horizons-portugal');
  });

  it('renders closed call with muted opacity and accessible status', () => {
    const { container } = render(<CallCard call={mockCalls[2]} />);
    expect(screen.getByText('Closed')).toBeInTheDocument();
    const article = container.querySelector('article');
    expect(article).toHaveClass('opacity-75');
  });

  it('renders opening soon call with helpful hint', () => {
    const openingSoonCall: OpenCall = {
      ...mockCalls[0],
      slug: 'the-financial-blueprint',
      title: 'The Financial Blueprint',
      status: 'Opening soon',
    };
    render(<CallCard call={openingSoonCall} />);
    expect(screen.getByText('Applications opening soon')).toBeInTheDocument();
    expect(screen.queryByText('Apply via Network Portal')).not.toBeInTheDocument();
  });
});

describe('HybridApplicationFunnel & ExternalApplicationCard', () => {
  it('renders calm closed-state panel for closed call', () => {
    render(<HybridApplicationFunnel call={mockCalls[2]} />);
    expect(screen.getByText(/Applications for this mobility are closed/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explore active open calls/i })).toBeInTheDocument();
  });

  it('renders opening soon panel with early interest contact CTA and no dead portal link when gatewayPortalLive is false', () => {
    const openingSoonCall: OpenCall = {
      ...mockCalls[0],
      slug: 'the-financial-blueprint',
      title: 'The Financial Blueprint',
      status: 'Opening soon',
      country: 'Hungary',
      venue: undefined,
    };
    render(<HybridApplicationFunnel call={openingSoonCall} />);
    expect(
      screen.getByText('Applications for this project are not open yet')
    ).toBeInTheDocument();
    expect(screen.getByText(/Hungary \(Location TBA\) in March 2027/i)).toBeInTheDocument();
    expect(screen.getByText(/Orion Network Gateway Portal/i)).toBeInTheDocument();

    const earlyInterestLink = screen.getByRole('link', {
      name: /Register early interest/i,
    });
    expect(earlyInterestLink).toHaveAttribute(
      'href',
      '/contact?mode=participant&subject=Early%20interest%3A%20The%20Financial%20Blueprint'
    );
    expect(
      screen.queryByRole('link', { name: /Network Gateway Portal/i })
    ).not.toBeInTheDocument();

    const contactLink = screen.getByRole('link', {
      name: /Ask a question about this call/i,
    });
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('renders external application card for external mode with validated https url and zeid@orionyouth.eu support email', () => {
    render(<HybridApplicationFunnel call={mockCalls[1]} />);
    expect(screen.getByText('Apply via our partner form')).toBeInTheDocument();
    expect(screen.getByText(/What to prepare before applying:/i)).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /Open application form/i });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('https://forms.gle/AlpineNavigators2027Geo');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toContain('noopener');
    expect(link.getAttribute('rel')).toContain('noreferrer');

    const supportEmail = screen.getByRole('link', { name: 'zeid@orionyouth.eu' });
    expect(supportEmail).toHaveAttribute('href', 'mailto:zeid@orionyouth.eu');
  });

  it('disables external button if url does not start with https://', () => {
    const invalidUrlCall: OpenCall = {
      ...mockCalls[1],
      externalFormUrl: 'http://insecure-site.org/form',
    };
    render(<ExternalApplicationCard call={invalidUrlCall} />);
    expect(screen.getByText(/Partner application link is being updated/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Open application form/i })).not.toBeInTheDocument();
  });

  it('renders contact inquiry fallback for internal open calls when gatewayPortalLive is false and no externalFormUrl is set', () => {
    render(<HybridApplicationFunnel call={mockCalls[0]} />);

    expect(screen.getByTestId('network-gateway-portal-card')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /Apply via the Orion Network Gateway Portal/i,
      })
    ).toBeInTheDocument();

    const inquiryLink = screen.getByRole('link', {
      name: /Submit application inquiry/i,
    });
    expect(inquiryLink).toHaveAttribute(
      'href',
      '/contact?mode=participant&subject=Application%20inquiry%3A%20Coastal%20Horizons%3A%20Ocean%20Stewardship'
    );
  });

  it('renders Network Gateway Portal CTA link for internal open calls when externalFormUrl is provided', () => {
    const callWithUrl: OpenCall = {
      ...mockCalls[0],
      externalFormUrl: 'https://portal.orionyouth.eu/apply/coastal',
    };
    render(<HybridApplicationFunnel call={callWithUrl} />);

    const portalLink = screen.getByRole('link', {
      name: /Open Network Gateway Portal/i,
    });
    expect(portalLink).toHaveAttribute(
      'href',
      'https://portal.orionyouth.eu/apply/coastal'
    );
    expect(portalLink).toHaveAttribute('target', '_blank');
  });
});

describe('ParticipantFaq', () => {
  it('explains 100% Erasmus+ funding and refundable confirmation deposit policy', () => {
    render(<ParticipantFaq />);

    expect(
      screen.getByText('Do I need to pay anything to take part?')
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Erasmus\+ mobilities are 100% funded by the European Union: your accommodation, 3 meals per day, project activities, materials, and eligible travel are fully covered\./i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Orion may collect a small refundable participation deposit, which is reimbursed in full upon successful completion of the project/i
      )
    ).toBeInTheDocument();
  });
});
