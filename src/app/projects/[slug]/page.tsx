import { notFound } from 'next/navigation';
import { getProject, projects } from '@/lib/content';
import { PageHeading, TextLink } from '@/components/ui';
import { pageMetadata } from '@/lib/metadata';
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
  return (
    <>
      <PageHeading index="02" title={meta.title} description={meta.description} />
      <article className="page-body reading-width">
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
        <div className="prose project-prose">
          <Content />
        </div>
        {(meta.sourceUrl || meta.demoUrl) && (
          <div className="project-links">
            {meta.sourceUrl && (
              <TextLink href={meta.sourceUrl} external>
                source code
              </TextLink>
            )}
            {meta.demoUrl && (
              <TextLink href={meta.demoUrl} external>
                live demo
              </TextLink>
            )}
          </div>
        )}
        <div className="article-bottom">
          <TextLink href="/projects">back to projects</TextLink>
        </div>
      </article>
    </>
  );
}
