import Image from 'next/image';
import { profile, education } from '@/data/profile';
import { PageHeading, TextLink } from '@/components/ui';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'About',
  'Education, interests, and the engineering direction of John Benedict Bolatin.',
  '/about',
);
export default function AboutPage() {
  return (
    <>
      <PageHeading
        index="01"
        title="a little about me"
        description="An emerging developer, interested in the details that turn working software into useful software."
      />
      <div className="page-body reading-width">
        {profile.portrait && (
          <Image
            className="portrait"
            src={profile.portrait.src}
            alt={profile.portrait.alt}
            width={480}
            height={480}
          />
        )}
        <div className="prose">
          <p>{profile.introduction}</p>
          <h2>learning the foundations</h2>
          <p>
            I’m a fourth-year {education.degree} student at {education.university}, specializing in{' '}
            {education.specialization}. My primary interests are software engineering and web
            development, with a growing curiosity about AI and intelligent applications.
          </p>
        </div>
        <dl className="fact-grid">
          <div>
            <dt>education</dt>
            <dd>
              {education.degree}
              <br />
              {education.university}
            </dd>
          </div>
          <div>
            <dt>specialization</dt>
            <dd>
              {education.specialization}
              <br />
              {education.standing}
            </dd>
          </div>
        </dl>
        <div className="prose">
          <h2>how I want to build</h2>
          <p>
            Start with the problem. Understand who the software is for. Choose an approach that is
            clear enough to explain and practical enough to maintain.
          </p>
          <p>
            That is the direction I’m working toward: thoughtful systems, understandable code, and
            interfaces that help people do what they came to do.
          </p>
          <h2>currently exploring</h2>
          <ul>
            {profile.interests.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
          <h2>the next chapter</h2>
          <p>
            I’m developing my professional experience and looking to keep learning through useful,
            real-world applications. I want to understand both how a system works and why its design
            makes sense.
          </p>
        </div>
        <div className="article-bottom">
          <TextLink href="/projects">see what I’m working on</TextLink>
        </div>
      </div>
    </>
  );
}
