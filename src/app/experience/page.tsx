import { PageHeading } from '@/components/ui';
import { ExperienceList } from '@/components/experience-list';
import { pageMetadata } from '@/lib/metadata';
import { ChromeSectionIcon } from '@/components/chrome-section-icon';
export const metadata = pageMetadata(
  'Experience',
  'Professional experience and the software engineering journey of John Benedict Bolatin.',
  '/experience',
);
export default function ExperiencePage() {
  return (
    <>
      <PageHeading
        title="experience"
        description="My journey through a changing world of work and ideas."
        visual={<ChromeSectionIcon index="03" className="page-title-chrome-icon" size={48} />}
      />
      <div className="page-body experience-page-body">
        <section className="section">
          <ExperienceList headingLevel={2} />
        </section>
      </div>
    </>
  );
}
