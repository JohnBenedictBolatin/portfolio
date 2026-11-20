import { technologies, technologyCategories } from '@/data/technologies';
import type { Technology, TechnologyCategory } from '@/lib/types';

export type StackCategory = TechnologyCategory & { technologies: Technology[] };

export function getStackCategories(): StackCategory[] {
  const seen = new Set<string>();
  const categories = technologyCategories.map((category) => {
    const categoryTechnologies = technologies.filter((technology) => {
      return technology.category === category.id;
    });

    if (!categoryTechnologies.length) {
      throw new Error(`Stack category has no technologies: ${category.id}`);
    }

    for (const technology of categoryTechnologies) {
      if (seen.has(technology.id)) throw new Error(`Duplicate stack entry: ${technology.id}`);
      seen.add(technology.id);
    }

    return { ...category, technologies: categoryTechnologies };
  });

  if (seen.size !== technologies.length) {
    throw new Error('A technology references an unknown stack category.');
  }

  return categories;
}
