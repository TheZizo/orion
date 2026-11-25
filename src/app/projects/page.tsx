import React from 'react';
import { Metadata } from 'next';
import { getProjects } from '@/lib/orionData';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProjectsArchive } from '@/components/projects/ProjectsArchive';

export const metadata: Metadata = {
  title: 'Projects Archive',
  description:
    'Documented European youth mobilities organized and hosted by Orion Fiatalok Informális Csoportja from Debrecen.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects Archive — Orion',
    description:
      'Documented European youth mobilities organized and hosted by Orion Fiatalok Informális Csoportja from Debrecen.',
    url: '/projects',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects Archive — Orion',
    description:
      'Documented European youth mobilities organized and hosted by Orion Fiatalok Informális Csoportja from Debrecen.',
  },
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div>
      <PageHeader
        eyebrow="Mobility archive"
        title="Past and upcoming initiatives"
        lead="A record of European youth exchanges organized and hosted by Orion Fiatalok Informális Csoportja from Debrecen."
      />

      <div className="bg-[#F8F9FA] text-[#0B132B] py-16 md:py-24">
        <div className="container-orion">
          <ProjectsArchive initialProjects={projects} />
        </div>
      </div>
    </div>
  );
}
