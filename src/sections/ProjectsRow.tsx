import { ArrowRight } from 'lucide-react';
import Row from '../components/Row';
import ProjectLinks from '../components/ProjectLinks';
import { categories, names, type Project } from '../data';

export default function ProjectsRow({ projects, onOpen }: { projects: Project[]; onOpen: (p: Project, i: number) => void }) {
  return (
    <Row id="projects" title="Featured Projects">
      {projects.map((p) => (
        <li key={p.slug} className="w-[80vw] shrink-0 snap-start sm:w-[360px] lg:w-[420px]">
          <div className="flex h-full origin-center flex-col overflow-hidden rounded bg-[#1f1f1f] transition-transform duration-300 hover:z-20 hover:scale-[1.03] focus-within:z-20">
          <button onClick={() => onOpen(p, 0)} aria-label={`Open ${names[p.slug] ?? p.title} case study`}
            className="group block w-full flex-1 text-left">
            <img src={p.screenshots[0]?.file} alt="" loading="lazy" className="aspect-[16/10] w-full bg-black object-contain" />
            <span className="block p-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#46d369]">{categories[p.slug]}</span>
              <span className="display mt-1 block text-3xl leading-none">{names[p.slug] ?? p.title}</span>
              <span className="mt-2 line-clamp-3 block text-sm leading-snug text-[#d2d2d2]">{p.tagline}</span>
              <span className="mt-3 flex flex-wrap gap-1">
                {p.stack.slice(0, 4).map((t) => <span key={t} className="rounded-sm bg-white/10 px-1.5 py-0.5 text-[11px] text-white/80">{t}</span>)}
              </span>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white group-hover:underline">View case study <ArrowRight size={16} /></span>
            </span>
          </button>
          <ProjectLinks slug={p.slug} className="px-4 pb-4" />
          </div>
        </li>
      ))}
    </Row>
  );
}
