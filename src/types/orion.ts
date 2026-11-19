/**
 * ORION "The Celestial Atlas" — Shared TypeScript Contracts
 * Single source of truth for open calls, projects, team members,
 * submissions, and interactive celestial map nodes.
 */

export type ActionType = 'Youth Exchange' | 'Training Course';

export type CallStatus = 'Open' | 'Opening soon' | 'Closing soon' | 'Closed';

export type ApplicationMode = 'internal' | 'external';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface DailyExperienceItem {
  label: string;
  description: string;
}

export interface TravelReimbursementBand {
  distanceBand: string;
  maxAmountEUR: number;
}

export interface OpenCall {
  slug: string;
  title: string;
  actionType: ActionType;
  country: string;
  city: string;
  venue?: string;
  coordinates: Coordinates;
  startDate: string; // ISO YYYY-MM-DD
  endDate: string; // ISO YYYY-MM-DD
  applicationDeadline: string; // ISO YYYY-MM-DD or descriptive string
  deadline?: string;
  status: CallStatus;
  ageRange: string; // e.g. "18–30" or "18+"
  participantsPerCountry: number | string; // e.g. 4 or "TBA"
  emotionalPayoff: string;
  summary: string;
  dailyExperience: DailyExperienceItem[];
  travelReimbursement?: TravelReimbursementBand[];
  travelBands?: TravelReimbursementBand[];
  reimbursementNotes: string;
  eligibility: string[];
  infopackUrl?: string;
  applicationMode: ApplicationMode;
  externalFormUrl?: string;
  partnerOrgs: string[];
  themes: string[];
}

export type ProjectStatus = 'Completed' | 'Ongoing' | 'Upcoming';

export interface ImpactMetric {
  label: string;
  value: string;
  detail?: string;
}

export type GalleryCategory = 'Field Action' | 'Workshops' | 'Community & Culture';

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  category?: GalleryCategory;
  date?: string;
  location?: string;
  photographer?: string;
  featured?: boolean;
  projectTitle?: string;
  projectSlug?: string;
}

export interface ParticipantQuote {
  quote: string;
  name: string;
  country: string;
  age?: number;
  role?: string;
}

export interface PartnerLogo {
  name: string;
  country: string;
}

export interface Project {
  slug: string;
  title: string;
  actionType: string;
  status: ProjectStatus;
  locationLabel: string;
  country: string;
  coordinates: Coordinates;
  startDate: string;
  endDate: string;
  dateLabel: string;
  partners: string[];
  grantReference?: string;
  focus: string;
  summary: string;
  emotionalSummary: string;
  impactMetrics: ImpactMetric[];
  gallery: GalleryItem[];
  quotes: ParticipantQuote[];
  partnerLogos: PartnerLogo[];
}

export interface OrionOrgCredentials {
  legalName: string;
  legalNameLatin?: string;
  shortName?: string;
  seat: string;
  region?: string;
  postCode?: string;
  organisationType?: string;
  mainSector?: string;
  email?: string;
  oid?: string;
  grantReference?: string;
  pifUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role?: string;
  bio?: string;
  focus?: string;
  languages?: string[];
  highlights?: string[];
  coordinates?: Coordinates;
  avatarUrl?: string;
  photoUrl?: string;
}

export interface PartnerInquiry {
  id: string;
  createdAt: string; // ISO string
  organizationName: string;
  country: string;
  contactPerson: string;
  email: string;
  projectType: string;
  topic: string;
  message: string;
  oid?: string;
}

export type ContactMode = 'participant' | 'partner';

export interface ContactMessage {
  id: string;
  createdAt: string; // ISO string
  mode: ContactMode;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type AtlasNodeKind = 'hq' | 'open-call' | 'project';

export interface AtlasNode {
  id: string;
  kind: AtlasNodeKind;
  title: string;
  coordinates: Coordinates;
  dateLabel: string;
  statusLabel: string;
  summary: string;
  href: string;
  ctaLabel: string;
}

export interface OpenCallFilters {
  actionType?: ActionType | 'all';
  country?: string;
  status?: CallStatus | 'all';
}

export interface ProjectFilters {
  actionType?: string;
  status?: ProjectStatus | 'all';
  country?: string;
}
