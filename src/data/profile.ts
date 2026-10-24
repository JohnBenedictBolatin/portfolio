import type { Profile } from '@/lib/types';

export const profile: Profile = {
  name: 'John Benedict Bolatin',
  nameLines: ['John Benedict', 'Bolatin'],
  shortName: 'John Benedict',
  headline: 'student / software engineer in the making',
  headlineRoles: [
    'software engineer in the making',
    'web developer in the making',
    'full stack developer in the making',
    'mobile app developer in the making',
    'UI/UX designer in the making',
    'IoT developer in the making',
  ],
  introduction:
    'I notice when a task feels harder than it should. I like figuring out why and building a simpler way through it—with software, clear interfaces, and AI when it genuinely helps.',
  location: 'Philippines',
  // Add verified email, github, linkedin, resume, portrait, and availability here.
  // Missing values intentionally produce no links or availability claims.
  interests: [
    'Software engineering',
    'Full-stack development',
    'Artificial intelligence',
    'Software architecture',
  ],
};

export const education = {
  university: 'National University – Fairview',
  degree: 'BS Information Technology',
  specialization: 'Mobile and Internet Technology',
  standing: 'Fourth-year student',
};
