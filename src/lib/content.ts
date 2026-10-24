import { projectsEntries } from '@/generated/content';
export const projects = projectsEntries.map((entry) => entry.meta);
export function getProject(slug: string) {
  return projectsEntries.find((entry) => entry.meta.slug === slug);
}
