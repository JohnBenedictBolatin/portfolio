import { PageHeading, EmptyState } from '@/components/ui';
import { ProjectFilter } from '@/components/project-filter';
import { projects } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Projects',
  'Selected software projects and case studies by John Benedict Bolatin.',
  '/projects',
);
export default function ProjectsPage() {
  return (
    <>
      <PageHeading
        index="02"
        title="projects"
        description="Ideas made tangible. A growing collection of projects at the intersection of software, systems, and real-world problems."
      />
      <div className="page-body">
        {projects.length ? (
          <ProjectFilter projects={projects} />
        ) : (
          <EmptyState label="work in progress">
            New projects will appear here when they are ready to share.
          </EmptyState>
        )}
      </div>
    </>
  );
}
