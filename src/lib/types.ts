export type Profile = {
  name: string;
  nameLines: [string, string];
  shortName: string;
  headline: string;
  headlineRoles: string[];
  introduction: string;
  location: string;
  email?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  resume?: string;
  portrait?: { src: string; alt: string };
  availability?: string;
  interests: string[];
};
export type Experience = {
  organization: string;
  role: string;
  kind: 'internship' | 'employment' | 'academic';
  dates?: string;
  description?: string;
  technologies?: string[];
};
export type SkillGroupId = 'technologies' | 'foundations';
export type SkillCategoryId =
  | 'frontend'
  | 'backend'
  | 'mobile'
  | 'embedded'
  | 'environment'
  | 'quality'
  | 'content'
  | 'crm'
  | 'crm-foundations'
  | 'ai-data'
  | 'networking';
export type SkillGlyph =
  | 'code'
  | 'server'
  | 'smartphone'
  | 'cpu'
  | 'terminal'
  | 'check'
  | 'file'
  | 'workflow'
  | 'brain'
  | 'network'
  | 'shield'
  | 'sunMoon'
  | 'appWindow'
  | 'accessibility'
  | 'fileCode'
  | 'bot'
  | 'cloud';
export type SkillIcon =
  { kind: 'brand'; slug: string; color: string } | { kind: 'lucide'; name: SkillGlyph };
export type SkillEvidence =
  { kind: 'project'; slug: string } | { kind: 'portfolio' } | { kind: 'credential'; id: string };
export type SkillCategory = {
  id: SkillCategoryId;
  label: string;
  group: SkillGroupId;
  icon: SkillGlyph;
};
export type Skill = {
  id: string;
  name: string;
  category: SkillCategoryId;
  typeLabel: string;
  description: string;
  icon: SkillIcon;
  evidence: [SkillEvidence, ...SkillEvidence[]];
};
export type ContentBase = {
  slug: string;
  title: string;
  description: string;
  draft: boolean;
  tags: string[];
};
export type Project = ContentBase & {
  category: 'web' | 'mobile' | 'ai' | 'iot';
  featured?: boolean;
  technologies?: string[];
  status?: string;
  role?: string;
  sourceUrl?: string;
  demoUrl?: string;
  image?: { src: string; alt: string };
  previewImages?: Array<{ src: string; alt: string }>;
};
export type ArticleMetadata = ContentBase & {
  date: string;
  readingMinutes: number;
};
