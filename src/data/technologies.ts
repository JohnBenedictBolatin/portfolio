import type { Technology, TechnologyCategory } from '@/lib/types';

export const technologyCategories: TechnologyCategory[] = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'developer-tools', label: 'Developer tools' },
  { id: 'embedded-iot', label: 'Embedded & IoT' },
];

export const technologies: Technology[] = [
  { id: 'html', name: 'HTML', category: 'frontend', icon: { slug: 'html5', color: 'e34f26' } },
  { id: 'css', name: 'CSS', category: 'frontend', icon: { slug: 'css', color: '1572b6' } },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    icon: { slug: 'javascript', color: 'f7df1e' },
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    icon: { slug: 'typescript', color: '3178c6' },
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    icon: { slug: 'nextdotjs', color: '000000' },
  },
  { id: 'vue', name: 'Vue.js', category: 'frontend', icon: { slug: 'vuedotjs', color: '4fc08d' } },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    icon: { slug: 'tailwindcss', color: '06b6d4' },
  },
  { id: 'php', name: 'PHP', category: 'backend', icon: { slug: 'php', color: '777bb4' } },
  {
    id: 'laravel',
    name: 'Laravel',
    category: 'backend',
    icon: { slug: 'laravel', color: 'ff2d20' },
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'backend',
    icon: { slug: 'supabase', color: '3ecf8e' },
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'backend',
    icon: { slug: 'postgresql', color: '4169e1' },
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'developer-tools',
    icon: { slug: 'nodedotjs', color: '5fa04e' },
  },
  {
    id: 'npm',
    name: 'npm',
    category: 'developer-tools',
    icon: { slug: 'npm', color: 'cb3837' },
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'developer-tools',
    icon: { slug: 'vite', color: '646cff' },
  },
  { id: 'git', name: 'Git', category: 'developer-tools', icon: { slug: 'git', color: 'f05032' } },
  {
    id: 'github',
    name: 'GitHub',
    category: 'developer-tools',
    icon: { slug: 'github', color: '181717' },
  },
  {
    id: 'esp32',
    name: 'ESP32',
    category: 'embedded-iot',
    icon: { slug: 'espressif', color: 'e7352c' },
  },
  {
    id: 'arduino-cpp',
    name: 'Arduino C++',
    category: 'embedded-iot',
    icon: { slug: 'arduino', color: '00878f' },
  },
];
