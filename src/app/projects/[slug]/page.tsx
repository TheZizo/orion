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
      title: 'Project Not Found — Orion',
    };
  }

  return {
    title: `${project.title} — Orion Projects`,
    description: project.summary,
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
