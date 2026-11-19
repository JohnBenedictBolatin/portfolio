import Image from 'next/image';
import {
  Accessibility,
  AppWindow,
  Bot,
  Brain,
  Check,
  Cloud,
  Code,
  Cpu,
  FileCode,
  FileText,
  Network,
  Server,
  Shield,
  Smartphone,
  SunMoon,
  Terminal,
  Workflow,
} from 'lucide-react';
import { PageHeading } from '@/components/ui';
import { ChromeSectionIcon } from '@/components/chrome-section-icon';
import { pageMetadata } from '@/lib/metadata';
import { getStackGroups } from '@/lib/stack';
import type { SkillGlyph } from '@/lib/types';
import styles from './stack.module.css';

const glyphs = {
  code: Code,
  server: Server,
  smartphone: Smartphone,
  cpu: Cpu,
  terminal: Terminal,
  check: Check,
  file: FileText,
  workflow: Workflow,
  brain: Brain,
  network: Network,
  shield: Shield,
  sunMoon: SunMoon,
  appWindow: AppWindow,
  accessibility: Accessibility,
  fileCode: FileCode,
  bot: Bot,
  cloud: Cloud,
} satisfies Record<SkillGlyph, typeof Code>;

export const metadata = pageMetadata(
  'Stack',
  'Technologies and tools used across my projects.',
  '/stack',
);

export default function StackPage() {
  const groups = getStackGroups();
  const categories = groups.find((group) => group.id === 'technologies')?.categories ?? [];

  return (
    <>
      <PageHeading
        title="tools & technologies"
        visual={<ChromeSectionIcon index="04" className="page-title-chrome-icon" size={48} />}
      />
      <div className="page-body">
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <section
              className={`interest-card credential-card ${styles.categoryCard}`}
              key={category.id}
              aria-labelledby={`stack-${category.id}`}
            >
              <div className={`credential-card-surface ${styles.cardSurface}`}>
                <span className="credential-card-glow" aria-hidden="true" />
                <div className={`credential-card-content ${styles.cardContent}`}>
                  <h2 className={styles.categoryHeading} id={`stack-${category.id}`}>
                    {category.label}
                  </h2>
                  <ul className={styles.technologyList}>
                    {category.skills.map((skill) => {
                      const SkillIcon =
                        skill.icon.kind === 'lucide' ? glyphs[skill.icon.name] : null;

                      return (
                        <li className={styles.technology} key={skill.id}>
                          {skill.icon.kind === 'brand' ? (
                            <Image
                              className={`credential-badge-art ${styles.brandIcon}`}
                              src={`https://cdn.simpleicons.org/${skill.icon.slug}/${skill.icon.color}`}
                              alt=""
                              aria-hidden="true"
                              width={32}
                              height={32}
                              loading="lazy"
                              unoptimized
                              referrerPolicy="no-referrer"
                            />
                          ) : SkillIcon ? (
                            <SkillIcon
                              className={styles.skillIcon}
                              size={28}
                              strokeWidth={1.5}
                              aria-hidden="true"
                            />
                          ) : null}
                          <span>{skill.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
