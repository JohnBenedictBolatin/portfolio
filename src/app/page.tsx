import { profile } from '@/data/profile';
import { education } from '@/data/profile';
import { projects } from '@/lib/content';
import Link from '@/components/activity-link';
import { ArrowUpRight } from 'lucide-react';
import { ProjectRow } from '@/components/project-row';
import { ExperienceList } from '@/components/experience-list';
import { SectionHeading, TextLink } from '@/components/ui';
import { ChromeBrandMark } from '@/components/chrome-brand-mark';
import { ChromeName } from '@/components/chrome-name';
import { RotatingHeadline } from '@/components/rotating-headline';
import { InterestCard } from '@/components/interest-card';
import { ChromeSectionIcon } from '@/components/chrome-section-icon';
import { PortfolioMascot } from '@/components/portfolio-mascot';
import { publishedCertifications } from '@/data/credentials';
import { HomeMetrics } from '@/components/home-metrics';

const technologies = [
  { name: 'Next.js', icon: 'nextdotjs', color: 'ffffff' },
  { name: 'React', icon: 'react', color: '61dafb' },
  { name: 'TypeScript', icon: 'typescript', color: '3178c6' },
  { name: 'Tailwind CSS', icon: 'tailwindcss', color: '06b6d4' },
  { name: 'Laravel', icon: 'laravel', color: 'ff2d20' },
  { name: 'Flutter', icon: 'flutter', color: '02569b' },
  { name: 'Dart', icon: 'dart', color: '0175c2' },
];

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="intro-heading">
        <div className="hero-title-block">
          <div>
            <ChromeName first={profile.nameLines[0]} second={profile.nameLines[1]} />
            <RotatingHeadline roles={profile.headlineRoles} />
          </div>
        </div>
        <HomeMetrics
          metrics={[
            { label: 'projects', value: 3 },
            { label: 'experience', value: 1 },
            { label: 'certifications', value: publishedCertifications.length },
          ]}
        />
        <div className="hero-actions">
          <Link className="primary-link" href="/projects">
            explore my work
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <TextLink href="/certifications">certifications</TextLink>
          {profile.resume && <TextLink href={profile.resume}>résumé</TextLink>}
        </div>
        <div className="hero-portrait-composition">
          <ChromeBrandMark
            portraitMonoSrc="/portfolio-photo-mono.png"
            portraitColorSrc="/portfolio-photo.png"
            portraitAlt="Portrait of John Benedict"
          />
          <PortfolioMascot />
        </div>
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
            </div>
          </div>
          <div>
            <p className="curiosity-heading">
              <ChromeSectionIcon index="04" iconName="compass" />
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
                showHoverMascot
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
        <div
          className="technology-carousel"
          role="region"
          aria-label="Technology carousel"
          tabIndex={0}
        >
          <div className="technology-track">
            {[false, true].map((isDuplicate) => (
              <ul
                className={`technology-list${isDuplicate ? ' technology-list-copy' : ''}`}
                aria-label={isDuplicate ? undefined : 'Technologies used'}
                aria-hidden={isDuplicate ? true : undefined}
                key={isDuplicate ? 'duplicate' : 'original'}
              >
                {technologies.map((technology) => (
                  <li key={technology.name}>
                    <img
                      className={
                        technology.icon === 'nextdotjs'
                          ? 'technology-icon technology-icon--monochrome'
                          : 'technology-icon'
                      }
                      src={`https://cdn.simpleicons.org/${technology.icon}/${technology.color}`}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    <span>{technology.name}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
