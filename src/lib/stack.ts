import { publishedCredentials } from '@/data/credentials';
import { skillCategories, skills } from '@/data/skills';
import { projects } from '@/lib/content';
import type { Skill, SkillCategory, SkillEvidence, SkillGroupId } from '@/lib/types';

export type ResolvedSkillEvidence = {
  id: string;
  label: string;
  href: string;
  external: boolean;
  kind: SkillEvidence['kind'];
};
export type ResolvedSkill = Omit<Skill, 'evidence'> & { evidence: ResolvedSkillEvidence[] };
export type StackGroup = {
  id: SkillGroupId;
  title: string;
  categories: (SkillCategory & { skills: ResolvedSkill[] })[];
};

const groupTitles: Record<SkillGroupId, string> = {
  technologies: 'Technologies & tools',
  foundations: 'Learning foundations',
};

function resolveEvidence(source: SkillEvidence): ResolvedSkillEvidence {
  if (source.kind === 'portfolio') {
    return {
      id: 'portfolio',
      kind: source.kind,
      label: 'This portfolio',
      href: 'https://github.com/JohnBenedictBolatin/portfolio',
      external: true,
    };
  }
  if (source.kind === 'project') {
    const project = projects.find((item) => item.slug === source.slug && !item.draft);
    if (!project)
      throw new Error(`Stack evidence references an unpublished project: ${source.slug}`);
    return {
      id: `project-${project.slug}`,
      kind: source.kind,
      label: project.title,
      href: `/projects/${project.slug}`,
      external: false,
    };
  }
  const credential = publishedCredentials.find((item) => item.id === source.id);
  if (!credential?.evidence) {
    throw new Error(`Stack evidence references an unavailable credential: ${source.id}`);
  }
  return {
    id: `credential-${credential.id}`,
    kind: source.kind,
    label: credential.title,
    href: credential.evidence.href,
    external: true,
  };
}

export function getStackGroups(): StackGroup[] {
  const seen = new Set<string>();
  const resolved = skills.map((skill): ResolvedSkill => {
    if (seen.has(skill.id)) throw new Error(`Duplicate stack entry: ${skill.id}`);
    seen.add(skill.id);
    if (!skillCategories.some((category) => category.id === skill.category)) {
      throw new Error(`Unknown stack category: ${skill.category}`);
    }
    if (!skill.evidence.length) throw new Error(`Stack entry needs evidence: ${skill.id}`);
    return { ...skill, evidence: skill.evidence.map(resolveEvidence) };
  });
  return (Object.keys(groupTitles) as SkillGroupId[]).map((id) => ({
    id,
    title: groupTitles[id],
    categories: skillCategories
      .filter((category) => category.group === id)
      .map((category) => ({
        ...category,
        skills: resolved.filter((skill) => skill.category === category.id),
      }))
      .filter((category) => category.skills.length > 0),
  }));
}
