import { ExternalLink, Github } from 'lucide-react';
import { links, names } from '../data';

/** "Live demo" and "Source" buttons for a project; renders nothing if it has neither. */
export default function ProjectLinks({ slug, className = '' }: { slug: string; className?: string }) {
  const l = links[slug];
  if (!l) return null;
  const label = names[slug] ?? slug;
  const base = 'inline-flex min-h-11 items-center gap-2 rounded px-4 text-sm font-semibold transition-colors';
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {l.live && <a href={l.live} target="_blank" rel="noopener noreferrer" aria-label={`${label}: open live demo (new tab)`} className={`${base} bg-[#e50914] text-white hover:bg-[#c11119]`}><ExternalLink size={16} /> Live demo</a>}
      {l.repo && <a href={l.repo} target="_blank" rel="noopener noreferrer" aria-label={`${label}: view source on GitHub (new tab)`} className={`${base} border border-white/35 text-white hover:bg-white hover:text-black`}><Github size={16} /> Source</a>}
    </div>
  );
}
