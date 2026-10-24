import { PageHeading, TextLink } from '@/components/ui';
import { ExperienceList } from '@/components/experience-list';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Experience',
  'Professional experience and the software engineering journey of John Benedict Bolatin.',
  '/experience',
);
export default function ExperiencePage() {
  return (
    <>
      <PageHeading
        index="03"
        title="experience"
        description="Learning through practice. The professional chapter of my software engineering journey."
      />
      <div className="page-body">
        <section className="section">
          <ExperienceList headingLevel={2} />
        </section>
        <div className="article-bottom">
          <TextLink href="/about">more about my background</TextLink>
        </div>
      </div>
    </>
  );
}
