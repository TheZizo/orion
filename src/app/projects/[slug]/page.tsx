import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjects, getProjectBySlug } from '@/lib/orionData';
import { ProjectDetailView } from '@/components/projects/ProjectDetailView';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Orion`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      type: 'article',
      images: project.gallery[0]
        ? [{ url: project.gallery[0].src, alt: project.gallery[0].alt }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Orion`,
      description: project.summary,
      images: project.gallery[0] ? [project.gallery[0].src] : undefined,
    },
  };
}

export default async function ProjectSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}
