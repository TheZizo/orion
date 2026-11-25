import {
  OpenCall,
  Project,
  TeamMember,
  AtlasNode,
  Coordinates,
  OpenCallFilters,
  ProjectFilters,
  GalleryItem,
} from '@/types/orion';

export const ORION_ORG = {
  legalName: 'Orion Fiatalok Informális Csoportja',
  legalNameLatin: 'Orion Informal Group of Young People',
  shortName: 'Orion',
  seat: 'Debrecen, Hungary',
  region: 'Észak-Alföld',
  postCode: '4027',
  organisationType: 'Group of Young People (Non-profit)',
  mainSector: 'Youthwork / Non-formal education',
  coordinates: { lat: 47.53, lng: 21.62 } as Coordinates,
  email: 'zeid@orionyouth.eu',
  gatewayPortalUrl: 'https://portal.orionyouth.eu',
  gatewayPortalLive: false as boolean,
  oid: '',
  grantReference: '2026-1-HU01-KA152-YOU-000399636',
  pifUrl: '',
  pifSummary:
    'Orion Fiatalok Informális Csoportja accredited Erasmus+ documentation and partner profile.',
  tagline: 'Create the brightest stars',
  shortBoilerplate:
    'Orion Fiatalok Informális Csoportja helps young people find direction, cross borders, and grow together.',
  boilerplateShort:
    'Orion Fiatalok Informális Csoportja helps young people find direction, cross borders, and grow together.',
  longBoilerplate:
    'Orion Fiatalok Informális Csoportja is an international youth initiative based in Debrecen, Hungary, that turns participation into memories, growth, and cross-cultural leadership. Guided by the idea of a constellation of young changemakers, we design high-impact Erasmus+ KA1 youth exchanges and non-formal educational mobilities.',
  boilerplateLong:
    'Orion Fiatalok Informális Csoportja is an international youth initiative based in Debrecen, Hungary, that turns participation into memories, growth, and cross-cultural leadership. Guided by the idea of a constellation of young changemakers, we design high-impact Erasmus+ KA1 youth exchanges and non-formal educational mobilities.',
  erasmusDisclaimer:
    'Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Education and Culture Executive Agency (EACEA). Neither the European Union nor EACEA can be held responsible for them.',
  impactStats: [
    { label: 'First partnership completed', value: 'ReForest ’26' },
    { label: 'Next hosted exchange', value: 'The Financial Blueprint' },
    { label: 'Erasmus+ funded mobilities', value: '100%' },
  ],
} as const;

export const SEED_OPEN_CALLS: OpenCall[] = [
  {
    slug: 'the-financial-blueprint',
    title: 'The Financial Blueprint — Erasmus+ Youth Exchange',
    actionType: 'Youth Exchange',
    country: 'Hungary',
    city: 'Location TBA',
    venue: 'Location TBA, Hungary',
    coordinates: { lat: 47.53, lng: 21.62 },
    startDate: '2027-03-01',
    endDate: '2027-03-09',
    applicationDeadline: '2027-01-31',
    deadline: '2027-01-31',
    status: 'Opening soon',
    ageRange: '18–26',
    participantsPerCountry: '8 participants + 2 group leaders',
    emotionalPayoff:
      'Gain practical financial clarity, budgeting habits, and cross-cultural friendships at Orion’s hosted Youth Exchange in Hungary.',
    summary:
      'Hosted by Orion Fiatalok Informális Csoportja in Hungary in March 2027 (Location TBA). Bringing together 32 young people aged 18–26 across Hungary, Romania, Spain, and Czechia (with 50% fewer opportunities inclusion) across 9 activity days exploring banking realities, AI budgeting tools, anti-fraud awareness, and collaborative financial booklet publishing.',
    dailyExperience: [
      {
        label: 'Phase 1: Foundations & Group Cohesion',
        description:
          'Integration, Erasmus+ rules, Youthpass introduction, Code of Conduct, and working committees.',
      },
      {
        label: 'Phase 2: Financial Literacy & AI Tools',
        description:
          'Deconstructing banking myths, AI budgeting scenarios, anti-fraud lab, civic problem-solving, and intercultural evenings.',
      },
      {
        label: 'Phase 3: Co-Creation & Dissemination',
        description:
          'Co-designing a practical Financial Booklet in Canva, interactive financial quizzes, DEOR dissemination plans, and 360° evaluation.',
      },
    ],
    travelReimbursement: [],
    travelBands: [],
    reimbursementNotes:
      '100% of accommodation, meals, and educational activities funded by Erasmus+. Travel reimbursed per official Erasmus+ standards upon submission of original tickets.',
    eligibility: [
      'Young people aged 18–26 resident in Hungary, Romania, Spain, or Czechia',
      'Committed to full active attendance across all 9 activity days in Hungary (Location TBA)',
      'Motivated to explore personal finance, AI budgeting tools, and cross-cultural teamwork',
      '50% of places reserved for participants facing fewer opportunities (social, economic, educational, or geographical hurdles)',
    ],
    infopackUrl: '',
    applicationMode: 'internal',
    partnerOrgs: [
      'Orion Fiatalok Informális Csoportja (HU)',
      'Asociatia Elemdiar (RO)',
      'Granota Verda (ES)',
      'Youth Group Novae (CZ)',
    ],
    themes: ['Financial Literacy', 'Digital Tools', 'Social Inclusion', 'Erasmus+ Youth Exchange'],
  },
  {
    slug: 'reforest-romania',
    title: 'ReForest — Erasmus+ Youth Exchange (Completed Cohort)',
    actionType: 'Youth Exchange',
    country: 'Romania',
    city: 'Lacu Roșu, Harghita',
    venue: 'Lacu Roșu Mountain Lodge, Harghita, Romania',
    coordinates: { lat: 46.78, lng: 25.78 },
    startDate: '2026-10-11',
    endDate: '2026-10-22',
    applicationDeadline: '2026-09-01',
    status: 'Closed',
    ageRange: '18–30',
    participantsPerCountry: '10 participants + 2 group leaders',
    emotionalPayoff:
      'Our completed October 2026 partnership mobility in the Carpathian Mountains with Asociația Agoje.',
    summary:
      'Orion’s partnership Youth Exchange in Harghita, Romania, hosted by Asociația Agoje alongside AzorEarth (Portugal) and Youth Group Novae (Czechia). Bringing together 40 youth changemakers and 8 group leaders across 12 days of ecological stream surveys, hands-on reforestation, and digital environmental campaigning.',
    dailyExperience: [
      {
        label: 'Digital Transformation for Ecology',
        description: 'Mapping environmental challenges and learning digital campaigning tools.',
      },
      {
        label: 'Hands-on Reforestation',
        description:
          'Fieldwork planting native saplings and alpine trail conservation near Cheile Bicazului.',
      },
      {
        label: 'Reflection & Community Action',
        description:
          'Youthpass self-assessment, intercultural reflection circles, and local follow-up initiatives.',
      },
    ],
    travelReimbursement: [],
    travelBands: [],
    reimbursementNotes: 'Completed in October 2026.',
    eligibility: ['Completed cohort (October 2026)'],
    infopackUrl: 'https://www.agoje.eu/our-projects/reforest',
    applicationMode: 'external',
    externalFormUrl: 'https://www.agoje.eu/our-projects/reforest',
    partnerOrgs: [
      'Asociația Agoje (RO)',
      'AzorEarth (PT)',
      'Youth Group Novae (CZ)',
      'Orion Fiatalok Informális Csoportja (HU)',
    ],
    themes: ['Reforestation', 'Environmental Stewardship', 'Youth Exchange'],
  },
];

export const SEED_PROJECTS: Project[] = [
  {
    slug: 'reforest',
    title: 'ReForest — Erasmus+ Youth Exchange',
    actionType: 'Youth Exchange',
    status: 'Completed',
    locationLabel: 'Lacu Roșu Mountain Lodge, Harghita, Romania',
    country: 'Romania',
    coordinates: { lat: 46.78, lng: 25.78 },
    startDate: '2026-10-11',
    endDate: '2026-10-22',
    dateLabel: 'October 11–22, 2026',
    partners: [
      'Asociația Agoje (RO)',
      'AzorEarth (PT)',
      'Youth Group Novae (CZ)',
      'Orion Fiatalok Informális Csoportja (HU)',
    ],
    focus: 'Environmental stewardship, hands-on reforestation, and digital ecological transformation',
    summary:
      '40 young people and 8 leaders from Romania, Portugal, Czechia, and Hungary convened in the Harghita mountains for 12 days (October 11–22, 2026, including arrival and departure days) to plant native saplings, conduct ecological stream surveys, and build lasting European solidarity.',
    emotionalSummary:
      'In the quiet mist of Lacu Roșu, we learned that planting trees is really planting faith in each other.',
    impactMetrics: [
      {
        label: 'Young changemakers',
        value: '40 + 8',
        detail: '10 youth + 2 leaders per delegation',
      },
      {
        label: 'Partner countries',
        value: '4',
        detail: 'Romania, Portugal, Czechia, Hungary',
      },
      {
        label: 'Mobility duration',
        value: '12 days',
        detail: 'October 11–22, 2026 at Lacu Roșu',
      },
      {
        label: 'Seedlings planted',
        value: '1,000+',
        detail: 'Native fir & spruce across Harghita',
      },
    ],
    gallery: [
      {
        src: '/images/projects/reforest-2.jpg',
        alt: 'The international cohort of 40 youth participants and 8 group leaders holding official European Union, ReForest, and Asociația Agoje banners on an alpine meadow in Lacu Roșu',
        caption: 'European solidarity in the Carpathians: 40 youth changemakers and 8 group leaders from Romania, Portugal, Czechia, and Hungary at the completion of ReForest in Lacu Roșu',
        category: 'Community & Culture',
        date: 'October 2026',
        location: 'Lacu Roșu, Harghita, Romania',
        photographer: 'Asociația Agoje & Orion Fiatalok Informális Csoportja',
        featured: true,
        projectTitle: 'ReForest — Erasmus+ Youth Exchange',
        projectSlug: 'reforest',
      },
      {
        src: '/images/projects/reforest-3.jpg',
        alt: 'Youth participants using mattocks and spades to plant native fir and spruce saplings on a steep Harghita mountain slope',
        caption: 'Hands-on ecological action: volunteers planting native fir and spruce saplings across the upper Harghita mountain slopes',
        category: 'Field Action',
        date: 'October 2026',
        location: 'Harghita Mountains, Romania',
        photographer: 'Orion Field Archive',
        projectTitle: 'ReForest — Erasmus+ Youth Exchange',
        projectSlug: 'reforest',
      },
      {
        src: '/images/projects/reforest-1.jpg',
        alt: 'Participants laughing and proudly presenting their illustrated Česko nature poster during an intercultural delegation workshop in the mountain lodge',
        caption: 'Intercultural learning night: national delegation presentation exploring Czech biodiversity, folklore, and youth climate advocacy inside the lodge',
        category: 'Workshops',
        date: 'October 2026',
        location: 'Lacu Roșu Mountain Lodge, Romania',
        photographer: 'Asociația Agoje & Orion Fiatalok Informális Csoportja',
        projectTitle: 'ReForest — Erasmus+ Youth Exchange',
        projectSlug: 'reforest',
      },
    ],
    quotes: [
      {
        quote:
          'ReForest showed me how non-formal education makes ecological theory real, urgent, and deeply human. Waking up in the Carpathian mist to plant saplings alongside peers from across Europe changed how I see citizenship.',
        name: 'Kemal',
        age: 22,
        country: 'Participant',
        role: 'Youth Exchange Participant',
      },
    ],
    partnerLogos: [
      { name: 'Asociația Agoje', country: 'Romania' },
      { name: 'AzorEarth', country: 'Portugal' },
      { name: 'Youth Group Novae', country: 'Czechia' },
      { name: 'Orion Fiatalok Informális Csoportja', country: 'Hungary' },
    ],
  },
  {
    slug: 'the-financial-blueprint',
    title: 'The Financial Blueprint — Erasmus+ Youth Exchange',
    actionType: 'Youth Exchange',
    status: 'Upcoming',
    locationLabel: 'Location TBA, Hungary',
    country: 'Hungary',
    coordinates: { lat: 47.53, lng: 21.62 },
    startDate: '2027-03-01',
    endDate: '2027-03-09',
    dateLabel: 'March 2027',
    partners: [
      'Orion Fiatalok Informális Csoportja (HU)',
      'Asociatia Elemdiar (RO)',
      'Granota Verda (ES)',
      'Youth Group Novae (CZ)',
    ],
    grantReference: '2026-1-HU01-KA152-YOU-000399636',
    focus:
      'Youth financial literacy, AI budgeting tools, consumer rights, and inclusive economic autonomy',
    summary:
      'Orion’s hosted Erasmus+ Youth Exchange in Hungary in March 2027 (Location TBA). Equipping 32 young people (aged 18–26) across Hungary, Romania, Spain, and Czechia with practical money management skills, AI budgeting workflows, and collective publication of a youth financial handbook.',
    emotionalSummary:
      'Demystifying money and building real financial confidence together before adulthood’s biggest decisions.',
    impactMetrics: [
      {
        label: 'Participants',
        value: '32 + 8',
        detail: '8 youth + 2 group leaders per country',
      },
      {
        label: 'Partner nations',
        value: '4',
        detail: 'Hungary, Romania, Spain, Czechia',
      },
      {
        label: 'Activity duration',
        value: '9 days',
        detail: 'March 2027 in Hungary (Location TBA)',
      },
      {
        label: 'Target age range',
        value: '18–26',
        detail: '50% inclusion of youth with fewer opportunities',
      },
    ],
    gallery: [],
    quotes: [
      {
        quote:
          'We created The Financial Blueprint because every young person deserves practical tools to manage money and plan their future with confidence.',
        name: 'Zeid Isaac',
        country: 'Hungary',
        role: 'Orion Fiatalok Informális Csoportja',
      },
    ],
    partnerLogos: [
      { name: 'Orion Fiatalok Informális Csoportja', country: 'Hungary' },
      { name: 'Asociatia Elemdiar', country: 'Romania' },
      { name: 'Granota Verda', country: 'Spain' },
      { name: 'Youth Group Novae', country: 'Czechia' },
    ],
  },
];

export const SEED_TEAM: TeamMember[] = [
  {
    id: 'zeid-isaac',
    name: 'Zeid Isaac',
    role: 'Group Leader, Strategic Planning & Cross-Cultural Pedagogy',
    focus: 'Commerce & Marketing, International English Educator, Fencing Coach',
    bio: 'Zeid combines the discipline of a competitive athlete with the adaptability of an international educator. A Commerce and Marketing student with three years of entrepreneurial experience, he oversees Orion’s strategic planning and partnership management. As an international resident actively teaching English to Hungarian children, he bridges linguistic and cultural gaps in high-pressure environments, drawing on five years of competitive fencing coaching and volunteer work with special needs youth to lead projects that are as inclusive as they are organized.',
    highlights: [
      'Strategic planning & partnerships',
      'English educator for Hungarian youth',
      '5 years competitive fencing coaching',
      'Special needs youth volunteering',
    ],
    coordinates: { lat: 47.53, lng: 21.62 },
  },
  {
    id: 'roberta-szabo',
    name: 'Roberta Szabó',
    role: 'Intercultural Communication & Community Building',
    focus: 'HÖOK Diaspora Mentoring & Hungarian Cultural Heritage',
    bio: 'Roberta is an expert in intercultural communication with a deep commitment to community building. As an active member of the National Union of Students in Hungary (HÖOK) Diaspora Mentoring Program, she supports students from diverse backgrounds in navigating their life in Hungary. She brings over a decade of discipline from Hungarian folk dancing to foster teamwork and cultural pride, and is fluent in Dutch, German, and English.',
    languages: ['Hungarian', 'English', 'Dutch', 'German'],
    highlights: [
      'HÖOK Diaspora Mentoring Program',
      '10+ years Hungarian folk dancing',
      'Fluent in Dutch, German & English',
    ],
    coordinates: { lat: 47.53, lng: 21.62 },
  },
  {
    id: 'jazmin-szabo',
    name: 'Jázmin Szabó',
    role: 'Information Management & Public Relations',
    focus: 'Library Science (ELTE), Knowledge Management & Student Union Outreach',
    bio: 'Jázmin specializes in Information Management and Public Relations. A graduate in Library Science (ELTE) with a focus on Knowledge Management, she served in the Foreign Affairs office of the Students’ Union, managing outreach and community building for international students. With practical experience in photography, advertising, peer mentoring, and her own Erasmus semester, she leads Orion’s knowledge archiving and mobility advocacy.',
    highlights: [
      'ELTE Library Science & Knowledge Management',
      'Students’ Union Foreign Affairs outreach',
      'Photography, PR & peer mentoring',
    ],
    coordinates: { lat: 47.53, lng: 21.62 },
  },
  {
    id: 'jordan-smith',
    name: 'Jordan Smith',
    role: 'Facilitator, Operations & Event Management',
    focus: 'AIESEC Marketing Leadership, Crisis-Relief Fundraising & English Education',
    bio: 'Jordan offers strong operational leadership and event management skills. During his time with AIESEC, he held a leadership role overseeing a marketing team and organizing successful fundraising events for crisis relief. With a background in teaching English and supporting peers academically, he adapts seamlessly to different learning styles and brings a business mindset to efficient logistics, team cohesion, and practical problem-solving.',
    highlights: [
      'AIESEC marketing & event leadership',
      'Crisis-relief fundraising coordination',
      'English teaching & academic peer support',
    ],
    coordinates: { lat: 47.53, lng: 21.62 },
  },
  {
    id: 'mehmet-ismail',
    name: 'Mehmet Ismail',
    role: 'Organizational Leadership & Narrative Dissemination',
    focus: 'Professional Writing, Literary Society Management & Cross-Border Logistics',
    bio: 'Mehmet combines proven organizational leadership with professional writing expertise. With several years of ghostwriting experience, he possesses the narrative skills to document and disseminate project results effectively. His track record includes founding acting and environmental clubs, serving two years as Manager during a four-year tenure in a student literary society, securing top awards in competitive public speaking, and coordinating cross-border travel as a DiscoverEU team leader.',
    highlights: [
      'Professional writing & result dissemination',
      'Literary society manager & public speaking',
      'DiscoverEU cross-border travel coordination',
    ],
    coordinates: { lat: 47.53, lng: 21.62 },
  },
];

/* ==========================================================================
   Helper & Formatter Functions
   ========================================================================== */

export function formatCoordinates(coords: Coordinates): string {
  const latStr = `${Math.abs(coords.lat).toFixed(2)}° ${coords.lat >= 0 ? 'N' : 'S'}`;
  const lngStr = `${Math.abs(coords.lng).toFixed(2)}° ${coords.lng >= 0 ? 'E' : 'W'}`;
  return `${latStr}, ${lngStr}`;
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export function formatDateRange(startIso: string, endIso: string): string {
  if (!startIso) return '';
  if (!endIso) return startIso;

  const [sYear, sMonth, sDay] = startIso.split('-').map((v) => parseInt(v, 10));
  const [eYear, eMonth, eDay] = endIso.split('-').map((v) => parseInt(v, 10));

  if (!sYear || !sMonth || !sDay || !eYear || !eMonth || !eDay) {
    return `${startIso} – ${endIso}`;
  }

  const sMonthLabel = MONTHS[sMonth - 1] ?? '';
  const eMonthLabel = MONTHS[eMonth - 1] ?? '';

  if (sYear === eYear && sMonth === eMonth) {
    return `${sDay}–${eDay} ${sMonthLabel} ${sYear}`;
  }
  if (sYear === eYear) {
    return `${sDay} ${sMonthLabel} – ${eDay} ${eMonthLabel} ${sYear}`;
  }
  return `${sDay} ${sMonthLabel} ${sYear} – ${eDay} ${eMonthLabel} ${eYear}`;
}

/* ==========================================================================
   Data Accessors
   ========================================================================== */

export function getOpenCalls(filters?: OpenCallFilters): OpenCall[] {
  let list = [...SEED_OPEN_CALLS];

  if (!filters) return list;

  if (filters.actionType && filters.actionType !== 'all') {
    list = list.filter((call) => call.actionType === filters.actionType);
  }
  if (filters.status && filters.status !== 'all') {
    list = list.filter((call) => call.status === filters.status);
  }
  if (filters.country && filters.country !== 'all') {
    const norm = filters.country.trim().toLowerCase();
    list = list.filter((call) => call.country.toLowerCase() === norm);
  }

  return list;
}

export function getOpenCallBySlug(slug: string): OpenCall | undefined {
  return SEED_OPEN_CALLS.find((call) => call.slug === slug);
}

export function getProjects(filters?: ProjectFilters): Project[] {
  let list = [...SEED_PROJECTS];

  if (!filters) return list;

  if (filters.actionType && filters.actionType !== 'all') {
    const norm = filters.actionType.trim().toLowerCase();
    list = list.filter((p) => p.actionType.toLowerCase().includes(norm));
  }
  if (filters.status && filters.status !== 'all') {
    list = list.filter((p) => p.status === filters.status);
  }
  if (filters.country && filters.country !== 'all') {
    const norm = filters.country.trim().toLowerCase();
    list = list.filter((p) => p.country.toLowerCase() === norm);
  }

  return list;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return SEED_PROJECTS.find((p) => p.slug === slug);
}

export function getAllGalleryItems(): GalleryItem[] {
  return SEED_PROJECTS.flatMap((project) =>
    project.gallery.map((item) => ({
      ...item,
      projectTitle: item.projectTitle || project.title,
      projectSlug: item.projectSlug || project.slug,
    }))
  );
}

export function getTeam(): TeamMember[] {
  return [...SEED_TEAM];
}

export function getAtlasNodes(): AtlasNode[] {
  const hqNode: AtlasNode = {
    id: 'orion-hq',
    kind: 'hq',
    title: 'Orion Headquarters — Debrecen',
    coordinates: ORION_ORG.coordinates,
    dateLabel: 'Core Anchor, Debrecen, HU',
    statusLabel: 'HQ Anchor',
    summary:
      'Orion Fiatalok Informális Csoportja home base in Debrecen, Hungary (Grant 2026-1-HU01-KA152-YOU-000399636).',
    href: '/about',
    ctaLabel: 'Meet our team',
  };

  const reforestProjectNode: AtlasNode = {
    id: 'project-reforest',
    kind: 'project',
    title: 'ReForest — Transylvania, Romania',
    coordinates: { lat: 46.78, lng: 25.78 },
    dateLabel: 'October 11–22, 2026, Partnership with Asociația Agoje',
    statusLabel: 'Completed',
    summary:
      'Our first partnership Erasmus+ Youth Exchange in Lacu Roșu Mountain Lodge, Harghita, Romania.',
    href: '/projects/reforest',
    ctaLabel: 'Read ReForest story',
  };

  const blueprintCallNode: AtlasNode = {
    id: 'call-the-financial-blueprint',
    kind: 'open-call',
    title: 'The Financial Blueprint — Hungary',
    coordinates: { lat: 47.53, lng: 21.62 },
    dateLabel: 'March 2027, Location TBA, Hungary',
    statusLabel: 'Opening soon',
    summary:
      'Our upcoming Orion-hosted project in Hungary in March 2027 (Location TBA). Applications are not open yet—preview the mission and register early interest.',
    href: '/open-calls/the-financial-blueprint',
    ctaLabel: 'Preview March 2027 project',
  };

  const partnerNode: AtlasNode = {
    id: 'partner-horizon',
    kind: 'open-call',
    title: 'Next Horizon — Partner With Orion',
    coordinates: { lat: 47.53, lng: 21.62 },
    dateLabel: '2026–2027 Erasmus+ KA1 & KA2 Consortia',
    statusLabel: 'Open',
    summary:
      'Represent an international youth NGO? Partner with Orion Fiatalok Informális Csoportja for upcoming Youth Exchanges and training courses.',
    href: '/partners',
    ctaLabel: 'Partner dossier',
  };

  return [hqNode, reforestProjectNode, blueprintCallNode, partnerNode];
}
