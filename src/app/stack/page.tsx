import { PageHeading, EmptyState } from '@/components/ui';
import { skills } from '@/data/skills';
import { pageMetadata } from '@/lib/metadata';
import { ChromeSectionIcon } from '@/components/chrome-section-icon';
export const metadata = pageMetadata(
  'Stack',
  'Tools and technologies used or explored by John Benedict Bolatin.',
  '/stack',
);
export default function StackPage() {
  const categories = [...new Set(skills.map((skill) => skill.category))];
  return (
    <>
      <PageHeading
        title="tools & technologies"
        description="Tools I use to build, test ideas, and solve problems."
        visual={<ChromeSectionIcon index="04" className="page-title-chrome-icon" size={48} />}
      />
      <div className="page-body">
        {skills.length ? (
          categories.map((category) => (
            <section className="section" key={category}>
              <h2 className="stack-category">{category}</h2>
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <article className="skill-row" key={skill.name}>
                    <div>
                      <h3>{skill.name}</h3>
                      {skill.description && <p className="quiet-note">{skill.description}</p>}
                    </div>
                    <span className="micro">{skill.familiarity}</span>
                  </article>
                ))}
            </section>
          ))
        ) : (
          <EmptyState label="a toolkit taking shape">
            I’m putting together a considered overview of the tools I use and the technologies I’m
            learning. More soon.
          </EmptyState>
        )}
      </div>
    </>
  );
}
