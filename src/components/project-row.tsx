import Link from 'next/link';
import type { Project } from '@/lib/types';
import { ProjectPreviewStack } from './project-preview-stack';
import { TextLink } from './ui';
export function ProjectRow({
  project,
  index,
  headingLevel = 3,
  showIndex = true,
  contentOnRight = false,
  showPreviewPlaceholder = false,
}: {
  project: Project;
  index: number;
  headingLevel?: 2 | 3;
  showIndex?: boolean;
  contentOnRight?: boolean;
  showPreviewPlaceholder?: boolean;
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  const previews = project.previewImages ?? (project.image ? [project.image] : []);
  return (
    <article
      className={`project-row${project.image ? ' project-row-with-image' : ''}${showIndex ? '' : ' project-row-no-index'}${contentOnRight ? ' project-row-content-right' : ''}`}
    >
      {showIndex && (
        <span className="project-number" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
      <div>
        <div className="project-category">
          {project.category === 'iot' ? 'IoT' : project.category}
          {project.status && ` / ${project.status}`}
        </div>
        <Heading>
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </Heading>
        <p>{project.description}</p>
        {!!project.technologies?.length && (
          <div className="tags">
            {project.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        )}
        <div className="project-links">
          <TextLink href={`/projects/${project.slug}`}>explore project</TextLink>
          {project.sourceUrl && (
            <TextLink href={project.sourceUrl} external>
              source
            </TextLink>
          )}
          {project.demoUrl && (
            <TextLink href={project.demoUrl} external>
              live demo
            </TextLink>
          )}
        </div>
      </div>
      {(project.image || project.previewImages?.length || showPreviewPlaceholder) && (
        <div className="project-art">
          <ProjectPreviewStack title={project.title} previews={previews} />
        </div>
      )}
    </article>
  );
}
