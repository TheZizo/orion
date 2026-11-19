import React from 'react';
import { Metadata } from 'next';
import { getProjects } from '@/lib/orionData';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProjectsArchive } from '@/components/projects/ProjectsArchive';

export const metadata: Metadata = {
  title: 'Projects Archive — Orion',
  description:
    'Documented European youth mobilities organized and hosted by Orion Fiatalok Informális Csoportja from Debrecen.',
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

      <main className="bg-[#F8F9FA] text-[#0B132B] py-16 md:py-24">
        <div className="container-orion">
          <ProjectsArchive initialProjects={projects} />
        </div>
      </main>
    </div>
  );
}
