import { notFound } from 'next/navigation';
import { getProject, projects } from '@/lib/content';
import { PageHeading, TextLink } from '@/components/ui';
import { pageMetadata } from '@/lib/metadata';
import detailStyles from './seedrover-detail.module.css';
import { ProjectSnapshotRail } from './seedrover-snapshot-rail';
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const entry = getProject(slug);
  if (!entry) notFound();
  return pageMetadata(entry.meta.title, entry.meta.description, `/projects/${slug}`);
}
export default async function ProjectPage({ params }: Props) {
  const entry = getProject((await params).slug);
  if (!entry) notFound();
  const { meta, Content } = entry;
  const hasCaseStudyLayout = ['seedrover', 'ikonek-176b'].includes(meta.slug);
  const articleContent = (
    <>
      <div className="tags">
        <span>{meta.category === 'iot' ? 'IoT' : meta.category}</span>
        {meta.tags
          .filter((tag) => tag.toLowerCase() !== meta.category)
          .map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
      </div>
      {(meta.role || meta.status || meta.technologies?.length) && (
        <dl className="fact-grid">
          {meta.role && (
            <div>
              <dt>my role</dt>
              <dd>{meta.role}</dd>
            </div>
          )}
          {meta.status && (
            <div>
              <dt>status</dt>
              <dd>{meta.status}</dd>
            </div>
          )}
          {!!meta.technologies?.length && (
            <div>
              <dt>technologies</dt>
              <dd>{meta.technologies.join(', ')}</dd>
            </div>
          )}
        </dl>
      )}
      <div
        className={`prose project-prose${hasCaseStudyLayout ? ` ${detailStyles.seedroverDetail}` : ''}`}
      >
        <Content />
      </div>
      {meta.demoUrl && (
        <div className="project-links">
          <TextLink href={meta.demoUrl} external>
            live demo
          </TextLink>
        </div>
      )}
    </>
  );
  const backLink = (
    <TextLink className="project-back-link" href="/projects" arrowDirection="left">
      back to projects
    </TextLink>
  );
  const heading = (
    <PageHeading
      className={hasCaseStudyLayout ? 'seedrover-project-heading' : undefined}
      title={meta.title}
      description={hasCaseStudyLayout ? undefined : meta.description}
    />
  );

  if (hasCaseStudyLayout) {
    return (
      <div className={`${detailStyles.seedroverPage} seedrover-page`}>
        <ProjectSnapshotRail key={meta.slug} projectTitle={meta.title} />
        {backLink}
        {heading}
        <article className={`page-body ${detailStyles.seedroverLayout}`}>
          <div className={detailStyles.seedroverContent}>{articleContent}</div>
        </article>
      </div>
    );
  }

  return (
    <>
      {backLink}
      {heading}
      <article className="page-body reading-width">{articleContent}</article>
    </>
  );
}
