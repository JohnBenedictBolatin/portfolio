import type { Skill, SkillCategory } from '@/lib/types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend & web',
    group: 'technologies',
    icon: 'code',
  },
  {
    id: 'backend',
    label: 'Backend & databases',
    group: 'technologies',
    icon: 'server',
  },
  {
    id: 'mobile',
    label: 'Mobile development',
    group: 'technologies',
    icon: 'smartphone',
  },
  {
    id: 'embedded',
    label: 'Embedded & IoT',
    group: 'technologies',
    icon: 'cpu',
  },
  {
    id: 'environment',
    label: 'Environment & build tools',
    group: 'technologies',
    icon: 'terminal',
  },
  {
    id: 'quality',
    label: 'Testing & code quality',
    group: 'technologies',
    icon: 'check',
  },
  {
    id: 'content',
    label: 'Content & animation',
    group: 'technologies',
    icon: 'file',
  },
  {
    id: 'crm',
    label: 'CRM & automation',
    group: 'technologies',
    icon: 'workflow',
  },
  {
    id: 'crm-foundations',
    label: 'CRM & administration',
    group: 'foundations',
    icon: 'shield',
  },
  {
    id: 'ai-data',
    label: 'AI & data',
    group: 'foundations',
    icon: 'brain',
  },
  {
    id: 'networking',
    label: 'Networking',
    group: 'foundations',
    icon: 'network',
  },
];

// Curated from published case studies, portfolio source, and completed credentials.
// Evidence describes usage or learning, rather than a proficiency rating.
export const skills: Skill[] = [
  {
    id: 'html',
    name: 'HTML',
    category: 'frontend',
    typeLabel: 'Markup language',
    description:
      'Used in this portfolio for semantic page structure, navigation, and accessible content.',
    icon: { kind: 'brand', slug: 'html5', color: 'e34f26' },
    evidence: [
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'frontend',
    typeLabel: 'Style language',
    description:
      'Used in this portfolio for responsive layouts, light and dark themes, and motion.',
    icon: { kind: 'brand', slug: 'css', color: '1572b6' },
    evidence: [
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    typeLabel: 'Language',
    description:
      'Used in iKonek 176B for its web interface and in this portfolio for build scripts.',
    icon: {
      kind: 'brand',
      slug: 'javascript',
      color: 'f7df1e',
    },
    evidence: [
      {
        kind: 'project',
        slug: 'ikonek-176b',
      },
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    typeLabel: 'Language',
    description: 'Used in SeedRover and this portfolio for typed components and application data.',
    icon: {
      kind: 'brand',
      slug: 'typescript',
      color: '3178c6',
    },
    evidence: [
      {
        kind: 'project',
        slug: 'seedrover',
      },
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    typeLabel: 'UI library',
    description:
      'Used in SeedRover and this portfolio to compose interfaces from reusable components.',
    icon: {
      kind: 'brand',
      slug: 'react',
      color: '61dafb',
    },
    evidence: [
      {
        kind: 'project',
        slug: 'seedrover',
      },
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    typeLabel: 'Framework',
    description:
      'Used for the SeedRover web portal and this portfolio’s routes and server-rendered pages.',
    icon: {
      kind: 'brand',
      slug: 'nextdotjs',
      color: 'ffffff',
    },
    evidence: [
      {
        kind: 'project',
        slug: 'seedrover',
      },
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'vue',
    name: 'Vue.js',
    category: 'frontend',
    typeLabel: 'Framework',
    description: 'Used in iKonek 176B for the resident and barangay staff web interface.',
    icon: {
      kind: 'brand',
      slug: 'vuedotjs',
      color: '4fc08d',
    },
    evidence: [
      {
        kind: 'project',
        slug: 'ikonek-176b',
      },
    ],
  },
  {
    id: 'inertia',
    name: 'Inertia.js',
    category: 'frontend',
    typeLabel: 'Library',
    description: 'Used in iKonek 176B to connect its Laravel backend with Vue pages.',
    icon: {
      kind: 'brand',
      slug: 'inertia',
      color: '9553e9',
    },
    evidence: [
      {
        kind: 'project',
        slug: 'ikonek-176b',
      },
    ],
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    typeLabel: 'CSS framework',
    description: 'Used in iKonek 176B and included in this portfolio’s styling pipeline.',
    icon: {
      kind: 'brand',
      slug: 'tailwindcss',
      color: '06b6d4',
    },
    evidence: [
      {
        kind: 'project',
        slug: 'ikonek-176b',
      },
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'lucide',
    name: 'Lucide',
    category: 'frontend',
    typeLabel: 'Icon library',
    description: 'Used in this portfolio for navigation, actions, and section icons.',
    icon: { kind: 'brand', slug: 'lucide', color: 'f56565' },
    evidence: [
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'next-themes',
    name: 'next-themes',
    category: 'frontend',
    typeLabel: 'Library',
    description:
      'Used in this portfolio to follow the device theme and remember a chosen appearance.',
    icon: {
      kind: 'lucide',
      name: 'sunMoon',
    },
    evidence: [
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'backend',
    typeLabel: 'Language',
    description: 'Used in iKonek 176B for server-side application logic.',
    icon: {
      kind: 'brand',
      slug: 'php',
      color: '777bb4',
    },
    evidence: [
      {
        kind: 'project',
        slug: 'ikonek-176b',
      },
    ],
  },
  {
    id: 'laravel',
    name: 'Laravel',
    category: 'backend',
    typeLabel: 'Framework',
    description:
      'Used in iKonek 176B to support community services and document-request workflows.',
    icon: {
      kind: 'brand',
      slug: 'laravel',
      color: 'ff2d20',
    },
    evidence: [
      {
        kind: 'project',
        slug: 'ikonek-176b',
      },
    ],
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'backend',
    typeLabel: 'Backend platform',
    description: 'Used as SeedRover’s shared backend for its mobile app and web portal.',
    icon: {
      kind: 'brand',
      slug: 'supabase',
      color: '3ecf8e',
    },
    evidence: [
      {
        kind: 'project',
        slug: 'seedrover',
      },
    ],
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'backend',
    typeLabel: 'Database',
    description: 'Used in SeedRover’s Supabase-backed data layer for farm operations.',
    icon: {
      kind: 'brand',
      slug: 'postgresql',
      color: '4169e1',
    },
    evidence: [
      {
        kind: 'project',
        slug: 'seedrover',
      },
    ],
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'mobile',
    typeLabel: 'Framework',
    description:
      'Used to build SeedRover’s mobile app for farm activity and rover-assisted planting.',
    icon: {
      kind: 'brand',
      slug: 'flutter',
      color: '02569b',
    },
    evidence: [
      {
        kind: 'project',
        slug: 'seedrover',
      },
    ],
  },
  {
    id: 'dart',
    name: 'Dart',
    category: 'mobile',
    typeLabel: 'Language',
    description: 'Used in SeedRover’s Flutter app for its mobile interface and application logic.',
    icon: {
      kind: 'brand',
      slug: 'dart',
      color: '0175c2',
    },
    evidence: [
      {
        kind: 'project',
        slug: 'seedrover',
      },
    ],
  },
  {
    id: 'esp32',
    name: 'ESP32',
    category: 'embedded',
    typeLabel: 'Microcontroller',
    description: 'Used in SeedRover’s planting rover, connected to the phone over local Wi-Fi.',
    icon: {
      kind: 'brand',
      slug: 'espressif',
      color: 'e7352c',
    },
    evidence: [
      {
        kind: 'project',
        slug: 'seedrover',
      },
    ],
  },
  {
    id: 'arduino-cpp',
    name: 'Arduino C++',
    category: 'embedded',
    typeLabel: 'Embedded programming',
    description: 'Used in SeedRover to program the ESP32 rover’s planting behavior.',
    icon: {
      kind: 'brand',
      slug: 'arduino',
      color: '00979d',
    },
    evidence: [
      {
        kind: 'project',
        slug: 'seedrover',
      },
    ],
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'environment',
    typeLabel: 'Runtime',
    description:
      'Used to run this portfolio’s development server, content generation, and build tools.',
    icon: { kind: 'brand', slug: 'nodedotjs', color: '5fa04e' },
    evidence: [
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'npm',
    name: 'npm',
    category: 'environment',
    typeLabel: 'Package manager',
    description:
      'Used in this portfolio to manage dependencies and run development and validation scripts.',
    icon: { kind: 'brand', slug: 'npm', color: 'cb3837' },
    evidence: [
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'environment',
    typeLabel: 'Build tool',
    description: 'Used in iKonek 176B’s frontend development and asset build workflow.',
    icon: {
      kind: 'brand',
      slug: 'vite',
      color: '646cff',
    },
    evidence: [
      {
        kind: 'project',
        slug: 'ikonek-176b',
      },
    ],
  },
  {
    id: 'postcss',
    name: 'PostCSS',
    category: 'environment',
    typeLabel: 'CSS processor',
    description:
      'Configured in this portfolio’s build pipeline through the Tailwind CSS PostCSS plugin.',
    icon: { kind: 'brand', slug: 'postcss', color: 'dd3a0a' },
    evidence: [
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'git',
    name: 'Git',
    category: 'environment',
    typeLabel: 'Version control',
    description: 'Used to track this portfolio’s changes and maintain its commit history.',
    icon: { kind: 'brand', slug: 'git', color: 'f05032' },
    evidence: [
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'environment',
    typeLabel: 'Development platform',
    description: 'Used to host this portfolio’s source repository and published commit history.',
    icon: { kind: 'brand', slug: 'github', color: 'ffffff' },
    evidence: [
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'playwright',
    name: 'Playwright',
    category: 'quality',
    typeLabel: 'Browser testing',
    description:
      'Used in this portfolio’s browser checks for routes, navigation, themes, and responsive layouts.',
    icon: {
      kind: 'lucide',
      name: 'appWindow',
    },
    evidence: [
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'axe-core',
    name: 'axe-core',
    category: 'quality',
    typeLabel: 'Accessibility testing',
    description:
      'Used with Playwright to audit this portfolio’s public routes for accessibility issues.',
    icon: {
      kind: 'lucide',
      name: 'accessibility',
    },
    evidence: [
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'lighthouse',
    name: 'Lighthouse',
    category: 'quality',
    typeLabel: 'Auditing tool',
    description:
      'Included in this portfolio’s audit script to generate desktop and mobile quality reports.',
    icon: { kind: 'brand', slug: 'lighthouse', color: 'f44b21' },
    evidence: [
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'eslint',
    name: 'ESLint',
    category: 'quality',
    typeLabel: 'Linter',
    description: 'Used in this portfolio to check TypeScript, React, and Next.js code conventions.',
    icon: { kind: 'brand', slug: 'eslint', color: '4b32c3' },
    evidence: [
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'prettier',
    name: 'Prettier',
    category: 'quality',
    typeLabel: 'Formatter',
    description: 'Used in this portfolio’s formatting workflow to keep source files consistent.',
    icon: { kind: 'brand', slug: 'prettier', color: 'f7b93e' },
    evidence: [
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'mdx',
    name: 'MDX',
    category: 'content',
    typeLabel: 'Content format',
    description:
      'Used in this portfolio to combine project case-study writing with React components.',
    icon: { kind: 'brand', slug: 'mdx', color: '1b1f24' },
    evidence: [
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'yaml',
    name: 'YAML',
    category: 'content',
    typeLabel: 'Data format & parser',
    description:
      'Used in this portfolio to author and parse project metadata from MDX frontmatter.',
    icon: { kind: 'brand', slug: 'yaml', color: 'cb171e' },
    evidence: [
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'remark-gfm',
    name: 'remark-gfm',
    category: 'content',
    typeLabel: 'Markdown plugin',
    description: 'Configured in this portfolio’s MDX pipeline for GitHub-flavored Markdown.',
    icon: { kind: 'brand', slug: 'remark', color: '9e9e9e' },
    evidence: [
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'rehype-pretty-code',
    name: 'rehype-pretty-code',
    category: 'content',
    typeLabel: 'Content plugin',
    description: 'Used in this portfolio’s MDX configuration to format highlighted code blocks.',
    icon: { kind: 'brand', slug: 'markdown', color: '083fa1' },
    evidence: [
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'shiki',
    name: 'Shiki',
    category: 'content',
    typeLabel: 'Syntax highlighter',
    description:
      'Used through this portfolio’s code-block pipeline with light and dark syntax themes.',
    icon: {
      kind: 'lucide',
      name: 'fileCode',
    },
    evidence: [
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'wobnimo',
    name: 'Wobnimo',
    category: 'content',
    typeLabel: 'Animation library',
    description: 'Used in this portfolio to render the mascot and respond to page activity.',
    icon: {
      kind: 'lucide',
      name: 'bot',
    },
    evidence: [
      {
        kind: 'portfolio',
      },
    ],
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'crm',
    typeLabel: 'CRM platform',
    description: 'Learned through Salesforce Essential Training on LinkedIn Learning.',
    icon: {
      kind: 'lucide',
      name: 'cloud',
    },
    evidence: [
      {
        kind: 'credential',
        id: 'linkedin-salesforce-essential-training',
      },
    ],
  },
  {
    id: 'salesforce-flow',
    name: 'Salesforce Flow',
    category: 'crm',
    typeLabel: 'Automation tool',
    description:
      'Practiced through Trailhead superbadges in flow fundamentals, screen flows, and optimization.',
    icon: {
      kind: 'lucide',
      name: 'workflow',
    },
    evidence: [
      {
        kind: 'credential',
        id: 'trailhead-flow-fundamentals',
      },
      {
        kind: 'credential',
        id: 'trailhead-screen-flow-fundamentals',
      },
      {
        kind: 'credential',
        id: 'trailhead-flow-optimization',
      },
    ],
  },
  {
    id: 'crm-fundamentals',
    name: 'CRM fundamentals',
    category: 'crm-foundations',
    typeLabel: 'Foundation',
    description:
      'Learned through LinkedIn Learning, focusing on customer relationships and the role of CRM.',
    icon: {
      kind: 'lucide',
      name: 'shield',
    },
    evidence: [
      {
        kind: 'credential',
        id: 'linkedin-crm-basics',
      },
    ],
  },
  {
    id: 'salesforce-administration',
    name: 'Salesforce administration',
    category: 'crm-foundations',
    typeLabel: 'Applied learning',
    description:
      'Practiced through Trailhead: user access, governance, object relationships, validation, formulas, and approvals.',
    icon: {
      kind: 'lucide',
      name: 'shield',
    },
    evidence: [
      {
        kind: 'credential',
        id: 'trailhead-user-access-fundamentals',
      },
      {
        kind: 'credential',
        id: 'trailhead-access-governance',
      },
      {
        kind: 'credential',
        id: 'trailhead-object-relationships',
      },
      {
        kind: 'credential',
        id: 'trailhead-data-quality-and-validation',
      },
      {
        kind: 'credential',
        id: 'trailhead-formulas',
      },
      {
        kind: 'credential',
        id: 'trailhead-approval-process-management',
      },
    ],
  },
  {
    id: 'generative-ai',
    name: 'Generative AI fundamentals',
    category: 'ai-data',
    typeLabel: 'Foundation',
    description: 'Learned through IBM SkillsBuild’s Getting Started with Generative AI credential.',
    icon: {
      kind: 'lucide',
      name: 'brain',
    },
    evidence: [
      {
        kind: 'credential',
        id: 'ibm-getting-started-generative-ai',
      },
    ],
  },
  {
    id: 'llms-data',
    name: 'LLMs for working with data',
    category: 'ai-data',
    typeLabel: 'Foundation',
    description:
      'Learned through IBM SkillsBuild’s Generative AI Essentials course on using LLMs with data.',
    icon: {
      kind: 'lucide',
      name: 'brain',
    },
    evidence: [
      {
        kind: 'credential',
        id: 'ibm-generative-ai-essentials-data',
      },
    ],
  },
  {
    id: 'ai-customer-service',
    name: 'AI-enabled customer service',
    category: 'ai-data',
    typeLabel: 'Foundation',
    description:
      'Learned through IBM SkillsBuild’s credential on AI-enabled customer service applications.',
    icon: {
      kind: 'lucide',
      name: 'brain',
    },
    evidence: [
      {
        kind: 'credential',
        id: 'ibm-ai-customer-service',
      },
    ],
  },
  {
    id: 'networking-fundamentals',
    name: 'Networking fundamentals',
    category: 'networking',
    typeLabel: 'Foundation',
    description: 'Learned through Cisco’s Networking Basics credential.',
    icon: {
      kind: 'lucide',
      name: 'network',
    },
    evidence: [
      {
        kind: 'credential',
        id: 'cisco-networking-basics',
      },
    ],
  },
  {
    id: 'network-operations',
    name: 'Network operations',
    category: 'networking',
    typeLabel: 'Foundation',
    description: 'Learned through Appkademiya’s NetOps Certified Engineer (NTO-101) credential.',
    icon: {
      kind: 'lucide',
      name: 'network',
    },
    evidence: [
      {
        kind: 'credential',
        id: 'appkademiya-netops-certified-engineer',
      },
    ],
  },
];
