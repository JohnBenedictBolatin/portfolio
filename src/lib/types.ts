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
export type Skill = {
  name: string;
  category: string;
  familiarity: 'currently using' | 'previously used' | 'currently learning';
  description?: string;
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
