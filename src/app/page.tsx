import { profile } from '@/data/profile';
import { education } from '@/data/profile';
import { projects } from '@/lib/content';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ProjectRow } from '@/components/project-row';
import { ExperienceList } from '@/components/experience-list';
import { SocialLinks } from '@/components/navigation';
import { SectionHeading, TextLink } from '@/components/ui';
import { ChromeBrandMark } from '@/components/chrome-brand-mark';
import { ChromeName } from '@/components/chrome-name';
import { WelcomeMessage } from '@/components/welcome-message';
import { RotatingHeadline } from '@/components/rotating-headline';
import { InterestCard } from '@/components/interest-card';
import { ChromeSectionIcon } from '@/components/chrome-section-icon';

const homeTechnologies = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'MDX',
  'Laravel',
  'Flutter',
  'Dart',
  'Node.js',
  'WebGPU',
];
export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="intro-heading">
        <div className="hero-title-block">
          <div>
            <WelcomeMessage />
            <ChromeName first={profile.nameLines[0]} second={profile.nameLines[1]} />
            <RotatingHeadline roles={profile.headlineRoles} />
          </div>
        </div>
        <div className="hero-intro hero-stats" aria-label="Portfolio overview">
          <div className="hero-stat">
            <span className="hero-stat-value">03</span>
            <span className="hero-stat-label">projects</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">01</span>
            <span className="hero-stat-label">experience</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">03</span>
            <span className="hero-stat-label">certifications</span>
          </div>
        </div>
        <div className="hero-actions">
          <Link className="primary-link" href="/projects">
            explore my work
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <TextLink href="/about">more about me</TextLink>
          {profile.resume && <TextLink href={profile.resume}>résumé</TextLink>}
          <SocialLinks />
        </div>
        <ChromeBrandMark portraitSrc="/portfolio-photo.png" />
      </section>
      <section className="section">
        <div className="about-grid">
          <div>
            <SectionHeading number="01" title="a little context" showNumber={false} />
            <div className="about-copy">
              <p>
                I’m a fourth-year <strong>{education.degree}</strong> student at{' '}
                <strong>{education.university}</strong>, specializing in {education.specialization}.
              </p>
              <p>
                I’m drawn to the space between a useful idea and a well-built system. Right now, that
                means exploring software engineering, web development, and what intelligent
                applications can make possible.
              </p>
              <TextLink href="/about">get to know me</TextLink>
            </div>
          </div>
          <div>
            <p className="curiosity-heading">
              <ChromeSectionIcon index="04" iconName="question" />
              where my curiosity goes
            </p>
            <ul className="interest-list">
              {profile.interests.map((interest) => (
                <InterestCard interest={interest} key={interest} />
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section" id="selected-work">
        <SectionHeading
          number="02"
          title="currently working on"
          showNumber={false}
          href="/projects"
          linkLabel="all projects"
        />
        <div>
          {projects
            .filter((project) => project.featured)
            .slice(0, 1)
            .map((project, index) => (
              <ProjectRow
                key={project.slug}
                project={project}
                index={index}
                showIndex={false}
                contentOnRight
                showPreviewPlaceholder
              />
            ))}
        </div>
      </section>
      <section className="section">
        <SectionHeading
          number="03"
          title="experience"
          showNumber={false}
          href="/experience"
          linkLabel="full experience"
        />
        <ExperienceList />
      </section>
      <section className="section">
        <SectionHeading
          number="04"
          title="tools & technologies"
          showNumber={false}
          href="/stack"
          linkLabel="explore the stack"
        />
        <ul className="technology-list" aria-label="Technologies used">
          {homeTechnologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
