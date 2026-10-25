export type CredentialCategory = 'salesforce' | 'ai-data' | 'networking' | 'business';
export type CredentialKind = 'Superbadge' | 'Course certificate' | 'Digital badge' | 'Certificate';

export type Credential = {
  id: string;
  title: string;
  issuer: string;
  category: CredentialCategory;
  kind: CredentialKind;
  issuedOn?: string;
  image?: { src: string; alt: string };
  evidence?: { href: string; label: string };
  published: boolean;
};

const credlyBadge = (id: string) => `https://www.credly.com/badges/${id}/public_url`;
const evidenceImage = (name: string) => `/credentials/${name}.png`;
const trailheadSuperbadge = (slug: string, title: string) => ({
  src: evidenceImage(`salesforce-superbadge-${slug}`),
  alt: `Salesforce Trailhead ${title} Superbadge badge`,
});

export const credentials: Credential[] = [
  {
    id: 'trailhead-user-access-fundamentals',
    title: 'User Access Fundamentals',
    issuer: 'Salesforce Trailhead',
    category: 'salesforce',
    kind: 'Superbadge',
    image: trailheadSuperbadge('user-access-fundamentals', 'User Access Fundamentals'),
    issuedOn: '2026-08-25',
    evidence: {
      href: evidenceImage('trailhead-superbadge-user-access-fundamentals'),
      label: 'View completion evidence',
    },
    published: true,
  },
  {
    id: 'trailhead-screen-flow-fundamentals',
    title: 'Screen Flow Fundamentals',
    issuer: 'Salesforce Trailhead',
    category: 'salesforce',
    kind: 'Superbadge',
    image: trailheadSuperbadge('screen-flow-fundamentals', 'Screen Flow Fundamentals'),
    issuedOn: '2026-08-25',
    evidence: {
      href: evidenceImage('trailhead-superbadge-screen-flow-fundamentals'),
      label: 'View completion evidence',
    },
    published: true,
  },
  {
    id: 'trailhead-approval-process-management',
    title: 'Approval Process Management',
    issuer: 'Salesforce Trailhead',
    category: 'salesforce',
    kind: 'Superbadge',
    image: trailheadSuperbadge('approval-process-management', 'Approval Process Management'),
    issuedOn: '2026-08-24',
    evidence: {
      href: evidenceImage('trailhead-superbadge-approval-process-management'),
      label: 'View completion evidence',
    },
    published: true,
  },
  {
    id: 'trailhead-formulas',
    title: 'Formulas',
    issuer: 'Salesforce Trailhead',
    category: 'salesforce',
    kind: 'Superbadge',
    image: trailheadSuperbadge('formulas', 'Formulas'),
    issuedOn: '2026-08-24',
    evidence: {
      href: evidenceImage('trailhead-superbadge-formulas'),
      label: 'View completion evidence',
    },
    published: true,
  },
  {
    id: 'trailhead-flow-optimization',
    title: 'Flow Optimization',
    issuer: 'Salesforce Trailhead',
    category: 'salesforce',
    kind: 'Superbadge',
    image: trailheadSuperbadge('flow-optimization', 'Flow Optimization'),
    issuedOn: '2026-08-24',
    evidence: {
      href: evidenceImage('trailhead-superbadge-flow-optimization'),
      label: 'View completion evidence',
    },
    published: true,
  },
  {
    id: 'trailhead-flow-fundamentals',
    title: 'Flow Fundamentals',
    issuer: 'Salesforce Trailhead',
    category: 'salesforce',
    kind: 'Superbadge',
    image: trailheadSuperbadge('flow-fundamentals', 'Flow Fundamentals'),
    issuedOn: '2026-08-24',
    evidence: {
      href: evidenceImage('trailhead-superbadge-flow-fundamentals'),
      label: 'View completion evidence',
    },
    published: true,
  },
  {
    id: 'trailhead-access-governance',
    title: 'Access Governance',
    issuer: 'Salesforce Trailhead',
    category: 'salesforce',
    kind: 'Superbadge',
    image: trailheadSuperbadge('access-governance', 'Access Governance'),
    issuedOn: '2026-08-24',
    evidence: {
      href: evidenceImage('trailhead-superbadge-access-governance'),
      label: 'View completion evidence',
    },
    published: true,
  },
  {
    id: 'trailhead-data-quality-and-validation',
    title: 'Data Quality and Validation',
    issuer: 'Salesforce Trailhead',
    category: 'salesforce',
    kind: 'Superbadge',
    image: trailheadSuperbadge('data-quality-and-validation', 'Data Quality and Validation'),
    issuedOn: '2026-08-24',
    evidence: {
      href: evidenceImage('trailhead-superbadge-data-quality-and-validation'),
      label: 'View completion evidence',
    },
    published: true,
  },
  {
    id: 'trailhead-object-relationships',
    title: 'Object Relationships',
    issuer: 'Salesforce Trailhead',
    category: 'salesforce',
    kind: 'Superbadge',
    image: trailheadSuperbadge('object-relationships', 'Object Relationships'),
    issuedOn: '2026-07-31',
    evidence: {
      href: evidenceImage('trailhead-superbadge-object-relationships'),
      label: 'View completion evidence',
    },
    published: true,
  },
  {
    id: 'linkedin-salesforce-essential-training',
    title: 'Salesforce Essential Training',
    issuer: 'LinkedIn Learning',
    category: 'salesforce',
    kind: 'Course certificate',
    issuedOn: '2026-10-04',
    evidence: {
      href: evidenceImage('linkedin-salesforce-training'),
      label: 'Verify',
    },
    published: true,
  },
  {
    id: 'linkedin-crm-basics',
    title: 'CRM Basics: Unlock Business Growth through Relationships',
    issuer: 'LinkedIn Learning',
    category: 'salesforce',
    kind: 'Course certificate',
    issuedOn: '2026-10-03',
    evidence: {
      href: evidenceImage('linkedin-crm-basics'),
      label: 'Verify',
    },
    published: true,
  },
  {
    id: 'ibm-ai-customer-service',
    title: 'AI-Enabled Applications for Customer Service',
    issuer: 'IBM SkillsBuild',
    category: 'ai-data',
    kind: 'Digital badge',
    issuedOn: '2026-08-03',
    image: {
      src: evidenceImage('ibm-ai-customer-service'),
      alt: 'IBM SkillsBuild AI-Enabled Applications for Customer Service badge',
    },
    evidence: {
      href: credlyBadge('9a442668-73ad-4cd0-9cad-23466fde77e6'),
      label: 'Verify',
    },
    published: true,
  },
  {
    id: 'ibm-getting-started-generative-ai',
    title: 'Getting Started with Generative AI',
    issuer: 'IBM SkillsBuild',
    category: 'ai-data',
    kind: 'Digital badge',
    issuedOn: '2026-10-03',
    image: {
      src: evidenceImage('ibm-getting-started-with-generative-ai'),
      alt: 'IBM SkillsBuild Getting Started with Generative AI badge',
    },
    evidence: {
      href: credlyBadge('366c17fe-d9da-4a65-83b8-a705d8af081c'),
      label: 'Verify',
    },
    published: true,
  },
  {
    id: 'ibm-generative-ai-essentials-data',
    title: 'Generative AI Essentials: Using LLMs to Work with Data',
    issuer: 'IBM SkillsBuild',
    category: 'ai-data',
    kind: 'Digital badge',
    issuedOn: '2026-10-03',
    image: {
      src: evidenceImage('ibm-generative-ai-essentials'),
      alt: 'IBM SkillsBuild Generative AI Essentials badge',
    },
    evidence: {
      href: credlyBadge('2262044d-32e9-4cf3-9922-5f8840ed3ad3'),
      label: 'Verify',
    },
    published: true,
  },
  {
    id: 'cisco-networking-basics',
    title: 'Networking Basics',
    issuer: 'Cisco',
    category: 'networking',
    kind: 'Digital badge',
    issuedOn: '2025-10-11',
    image: {
      src: evidenceImage('cisco-networking-basics'),
      alt: 'Cisco Networking Basics badge',
    },
    evidence: {
      href: credlyBadge('45d32503-f4be-49ad-a48f-130a1e21acba'),
      label: 'Verify',
    },
    published: true,
  },
  {
    id: 'appkademiya-netops-certified-engineer',
    title: 'NetOps Certified Engineer (NTO-101)',
    issuer: 'Appkademiya',
    category: 'networking',
    kind: 'Certificate',
    issuedOn: '2026-08-22',
    image: {
      src: evidenceImage('appkademiya-netops-badge'),
      alt: 'Appkademiya NetOps Certified Engineer certificate badge',
    },
    evidence: {
      href: 'https://www.appkademiya.online/verify',
      label: 'Verify',
    },
    published: true,
  },
  {
    id: 'linkedin-selling-retail-consumer-products',
    title: 'Selling into Industries: Retail and Consumer Products',
    issuer: 'LinkedIn Learning',
    category: 'business',
    kind: 'Course certificate',
    issuedOn: '2026-10-03',
    evidence: {
      href: evidenceImage('linkedin-retail-sales'),
      label: 'Verify',
    },
    published: true,
  },
];

export const publishedCredentials = credentials
  .filter((credential) => credential.published)
  .toSorted((left, right) => {
    const leftSuperbadge = left.kind === 'Superbadge';
    const rightSuperbadge = right.kind === 'Superbadge';

    if (leftSuperbadge !== rightSuperbadge) return leftSuperbadge ? -1 : 1;

    const dateOrder = (right.issuedOn ?? '').localeCompare(left.issuedOn ?? '');
    return dateOrder || left.title.localeCompare(right.title);
  });
