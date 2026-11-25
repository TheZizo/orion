import type { MetadataRoute } from 'next';
import { getOpenCalls, getProjects } from '@/lib/orionData';

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.orionyouth.eu'
).replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-11-25');

  const staticRoutes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
  }> = [
    { path: '', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/open-calls', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/projects', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/partners', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.4 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const callEntries: MetadataRoute.Sitemap = getOpenCalls().map((call) => ({
    url: `${BASE_URL}/open-calls/${call.slug}`,
    lastModified,
    changeFrequency: call.status === 'Closed' ? 'yearly' : 'weekly',
    priority: call.status === 'Closed' ? 0.5 : 0.9,
  }));

  const projectEntries: MetadataRoute.Sitemap = getProjects().map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticEntries, ...callEntries, ...projectEntries];
}
