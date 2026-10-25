import { PageHeading, EmptyState } from '@/components/ui';
import { ProjectRow } from '@/components/project-row';
import { projects } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import { ChromeSectionIcon } from '@/components/chrome-section-icon';
export const metadata = pageMetadata(
  'Projects',
  'Selected software projects and case studies by John Benedict Bolatin.',
  '/projects',
);
export default function ProjectsPage() {
  const orderedProjects = [...projects].sort(
    (first, second) => Number(Boolean(second.featured)) - Number(Boolean(first.featured)),
  );

  return (
    <>
      <PageHeading
        title="projects"
        description="Web, mobile, and connected projects built for real-world use."
        visual={<ChromeSectionIcon index="02" className="page-title-chrome-icon" size={48} />}
      />
      <div className="page-body projects-list">
        {orderedProjects.length ? (
          orderedProjects.map((project, index) => (
            <ProjectRow
              key={project.slug}
              project={project}
              index={index}
              headingLevel={2}
              showPreviewPlaceholder
            />
          ))
        ) : (
          <EmptyState label="work in progress">
            New projects will appear here when they are ready to share.
          </EmptyState>
        )}
      </div>
    </>
  );
}
