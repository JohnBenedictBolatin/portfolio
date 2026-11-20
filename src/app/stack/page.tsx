import Image from 'next/image';
import { PageHeading } from '@/components/ui';
import { ChromeSectionIcon } from '@/components/chrome-section-icon';
import { pageMetadata } from '@/lib/metadata';
import { getStackCategories } from '@/lib/stack';
import type { Technology } from '@/lib/types';
import { PointerGlowCard } from './pointer-glow-card';
import styles from './stack.module.css';

function TechnologyMark({ technology }: { technology: Technology }) {
  const isMonochromeBrand =
    technology.icon.slug === 'nextdotjs' || technology.icon.slug === 'github';

  return (
    <>
      <Image
        className={`${styles.brandIcon} ${isMonochromeBrand ? styles.monochromeBrandIcon : ''}`}
        src={`https://cdn.simpleicons.org/${technology.icon.slug}/${technology.icon.color}`}
        alt=""
        aria-hidden="true"
        width={32}
        height={32}
        loading="lazy"
        unoptimized
        referrerPolicy="no-referrer"
      />
      <span>{technology.name}</span>
    </>
  );
}

export const metadata = pageMetadata(
  'Stack',
  'Technologies and tools used across my projects.',
  '/stack',
);

export default function StackPage() {
  const categories = getStackCategories();

  return (
    <>
      <PageHeading
        title="tools & technologies"
        description="Tools and technologies behind my projects, with foundations built through continued learning."
        visual={<ChromeSectionIcon index="04" className="page-title-chrome-icon" size={48} />}
      />
      <div className="page-body">
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <PointerGlowCard
              className={`interest-card credential-card ${styles.categoryCard}`}
              key={category.id}
              labelledBy={`stack-${category.id}`}
            >
              <div className={`credential-card-surface ${styles.cardSurface}`}>
                <span className="credential-card-glow" aria-hidden="true" />
                <div className={`credential-card-content ${styles.cardContent}`}>
                  <h2 className={styles.categoryHeading} id={`stack-${category.id}`}>
                    {category.label}
                  </h2>
                  <ul
                    className={styles.technologyList}
                    aria-label={`${category.label} technologies`}
                  >
                    {category.technologies.map((technology) => (
                      <li className={styles.technology} key={technology.id}>
                        <TechnologyMark technology={technology} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </PointerGlowCard>
          ))}
        </div>
      </div>
    </>
  );
}
