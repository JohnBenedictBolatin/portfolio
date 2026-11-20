import Image from 'next/image';
import { PageHeading } from '@/components/ui';
import { ChromeSectionIcon } from '@/components/chrome-section-icon';
import { pageMetadata } from '@/lib/metadata';
import { getStackCategories } from '@/lib/stack';
import type { Technology } from '@/lib/types';
import styles from './stack.module.css';

function TechnologyMark({ technology }: { technology: Technology }) {
  return (
    <>
      <Image
        className={styles.brandIcon}
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
        visual={<ChromeSectionIcon index="04" className="page-title-chrome-icon" size={48} />}
      />
      <div className="page-body">
        <div className={styles.categoryGrid}>
          {categories.map((category, index) => (
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
                  <div className={styles.technologyCarousel}>
                    <div className={`${styles.technologyTrack} ${index % 2 ? styles.reverse : ''}`}>
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
                      <div
                        className={`${styles.technologyList} ${styles.technologyCopy}`}
                        aria-hidden="true"
                      >
                        {category.technologies.map((technology) => (
                          <span className={styles.technology} key={technology.id}>
                            <TechnologyMark technology={technology} />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
