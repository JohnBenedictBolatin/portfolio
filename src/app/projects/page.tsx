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
const ikonPreviewImages = [
  {
    src: '/images/ikon1.png',
    alt: 'iKonek 176B resident welcome and sign-in screen.',
  },
  {
    src: '/images/ikon2.png',
    alt: 'iKonek 176B resident discussion feed with posts and trending tags.',
  },
  {
    src: '/images/ikon3.png',
    alt: 'iKonek 176B barangay announcements feed with a community update.',
  },
];
const seedroverPreviewImages = [
  {
    src: '/images/seed1.png',
    alt: 'SeedRover operations dashboard with sales, inventory, and crop summaries.',
  },
  {
    src: '/images/seed2.png',
    alt: 'SeedRover inventory screen with item quantities, pricing, and stock cards.',
  },
  {
    src: '/images/seed3.png',
    alt: 'SeedRover costing screen with farm cost records and investment performance.',
  },
];

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
              project={
                project.slug === 'ikonek-176b'
                  ? { ...project, previewImages: ikonPreviewImages }
                  : project.slug === 'seedrover'
                    ? { ...project, previewImages: seedroverPreviewImages }
                    : project
              }
              index={index}
              headingLevel={2}
              showPreviewPlaceholder
              showHoverMascot
              previewImageSizes="(max-width: 465px) calc(96vw - 38px), (max-width: 639px) 408px, (max-width: 1023px) 40vw, (max-width: 1199px) calc(45vw - 133px), 430px"
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
