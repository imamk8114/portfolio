import resume from './resume.json';

export const skills = resume.skills;
export const experience = resume.experience;

export const profile = {
  name: 'Imam Khan',
  role: 'Senior Frontend Engineer',
  location: 'Bengaluru, India',
  email: 'imamk8114@gmail.com',
  linkedin: 'https://www.linkedin.com/in/imamk8114',
  resumeUrl: '/Imam_Khan_Resume.pdf',
  headline: 'I build the interfaces other engineers build with.',
  heroBlurb: "i'm a senior frontend engineer. i build low-code platforms, design systems and data-heavy products that are fast, accessible and easy to extend.",
  aboutParagraph:
    "the story of every great interface begins with restraint. i'm imam, a frontend engineer with six years across low-code platforms, logistics software and design systems. i care about the details people never notice: the focus order, the first paint, the edge case at row fifty thousand.",
};

export const stats = [
  { value: '6+', label: "years i've spent building production uis" },
  { value: '4', label: 'employers: three product companies and one consultancy' },
  { value: '6', label: 'engineers i led at freight tiger' },
  { value: '~90', label: 'components in the shared library i maintained' },
];

/** Official marks, shown on the dark UI: Freight Tiger's own white-wordmark logo, and brand-coloured (white for Dassault) icon marks. */
export const logos: Record<string, string> = {
  Salesforce: '/logos/salesforce.svg',
  'Freight Tiger': '/logos/freight-tiger.svg',
  'Dassault Systèmes': '/logos/dassault-systemes.svg',
  'Tata Consultancy Services': '/logos/tcs.svg',
};

/** Deployed demos and source repos. Clinic Desk's repo is private, so it has no source link. */
export const links: Record<string, { live?: string; repo?: string }> = {
  syncboard: { live: 'https://syncboard-imamk8114.netlify.app/', repo: 'https://github.com/imamk8114/syncboard' },
  pulse: { live: 'https://pulse-imamk8114.netlify.app/', repo: 'https://github.com/imamk8114/pulse' },
  flowgraph: { live: 'https://flowgraph-imamk8114.netlify.app/', repo: 'https://github.com/imamk8114/flowgraph' },
  'a11y-kit': { live: 'https://a11y-kit-imamk8114.netlify.app/', repo: 'https://github.com/imamk8114/a11y-kit' },
  pipeline: { live: 'https://pipeline4sales-demo.netlify.app/', repo: 'https://github.com/imamk8114/sales-pipeline' },
  'clinic-desk': { live: 'https://clinic-desk-imamk8114.netlify.app/' },
  'clinic-rag': { live: 'https://clinic-rag-imamk8114.netlify.app/', repo: 'https://github.com/imamk8114/clinic-rag' },
};

export const names: Record<string, string> = {
  syncboard: 'Syncboard',
  pulse: 'Pulse',
  flowgraph: 'Flowgraph',
  'a11y-kit': 'A11y Kit',
  'clinic-desk': 'Clinic Desk',
  'clinic-rag': 'Clinic Protocol Assistant',
  pipeline: 'Pipeline',
};

export const categories: Record<string, string> = {
  syncboard: 'Local-first collaboration',
  pulse: 'Observability',
  flowgraph: 'Workflow automation',
  'a11y-kit': 'Design system',
  'clinic-desk': 'Healthcare PWA',
  'clinic-rag': 'Retrieval-augmented generation',
  pipeline: 'Sales CRM',
};

/** Whole months between 'YYYY-MM' start and end (null end = today). */
export function tenureMonths(start: string, end: string | null) {
  const [sy, sm] = start.split('-').map(Number);
  const now = new Date();
  const [ey, em] = end ? end.split('-').map(Number) : [now.getFullYear(), now.getMonth() + 1];
  return (ey - sy) * 12 + (em - sm);
}
export const formatTenure = (m: number) => `${Math.floor(m / 12) ? `${Math.floor(m / 12)}y ` : ''}${m % 12 ? `${m % 12}m` : ''}`.trim();

export type Project = {
  slug: string; title: string; tagline: string; summary: string; role: string;
  highlights: string[]; stack: string[]; resumeLinks: string[]; run: string; port: number;
  screenshots: { file: string; caption: string }[];
  measured: { label: string; value: string; how: string }[];
};
