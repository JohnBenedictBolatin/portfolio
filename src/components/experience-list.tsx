import { experience } from '@/data/experience';
export function ExperienceList({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <div>
      {experience.map((item) => (
        <article className="experience-row" key={`${item.organization}-${item.role}`}>
          <span className="timeline-symbol" aria-hidden="true">
            +
          </span>
          <div>
            <Heading>{item.role}</Heading>
            <p>{item.organization}</p>
            {item.description && <p>{item.description}</p>}
            {!!item.technologies?.length && (
              <div className="tags">
                {item.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            )}
          </div>
          {item.dates && <span className="experience-duration">{item.dates}</span>}
        </article>
      ))}
    </div>
  );
}
