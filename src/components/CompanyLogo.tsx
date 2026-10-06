import { logos } from '../data';

/** Decorative: the company name is always rendered next to it. */
export default function CompanyLogo({ company, className = 'h-9' }: { company: string; className?: string }) {
  const src = logos[company];
  return src ? <img src={src} alt="" aria-hidden className={`w-auto select-none object-contain object-left ${className}`} /> : null;
}
