import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Info, Play } from 'lucide-react';
import ProjectLinks from '../components/ProjectLinks';
import { categories, names, profile, type Project } from '../data';

const INTERVAL = 6500;

export default function Billboard({ projects, onOpen }: { projects: Project[]; onOpen: (p: Project, i: number) => void }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const p = projects[i];
  const shot = p.screenshots[0];

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % projects.length), INTERVAL);
    return () => clearInterval(t);
  }, [paused, projects.length]);

  return (
    <section id="top" aria-label="Introduction and featured projects" className="relative flex min-h-[100svh] items-center bg-gradient-to-b from-black via-[#141414] to-[#141414] pb-16 pt-24 sm:pt-28">
      <div className="grid w-full items-center gap-10 px-5 sm:px-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6.5fr)] lg:gap-14">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80 sm:text-sm"><span className="text-[#e50914]">|</span> Senior Frontend Engineer</p>
          <h1 className="display mt-3 text-[clamp(4.5rem,11vw,9rem)] leading-[0.85]">Imam Khan</h1>
          <p className="mt-5 max-w-xl text-base leading-snug text-white sm:text-xl">{profile.heroBlurb}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#projects" className="btn-light"><Play size={22} fill="currentColor" /> View projects</a>
            <a href="#about" className="btn-dim"><Info size={22} /> About me</a>
          </div>
        </motion.div>

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Now featuring</p>
          <button onClick={() => onOpen(p, 0)} aria-label={`Open ${names[p.slug] ?? p.title} case study`}
            className="relative block aspect-[16/10] w-full overflow-hidden rounded-md border border-white/15 bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] transition-transform duration-300 hover:scale-[1.01]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img key={shot.file} src={shot.file} alt={shot.caption} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
                className="absolute inset-0 h-full w-full object-contain" />
            </AnimatePresence>
          </button>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 max-w-xl" aria-live="polite">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#46d369]">{categories[p.slug]}</p>
              <h2 className="display mt-1 text-4xl leading-none sm:text-5xl">{names[p.slug] ?? p.title}</h2>
              <p className="mt-2 text-sm leading-snug text-[#d2d2d2] sm:text-base">{p.tagline}</p>
            </div>
            <button onClick={() => onOpen(p, 0)} className="btn min-h-11 bg-white !px-4 !text-sm text-black hover:bg-white/80">Case study <ArrowRight size={16} /></button>
          </div>
          <ProjectLinks slug={p.slug} className="mt-3" />
          <div className="flex gap-1" role="group" aria-label="Choose featured project">
            {projects.map((q, k) => (
              <button key={q.slug} onClick={() => setI(k)} aria-label={`Show ${names[q.slug] ?? q.title}`} aria-current={k === i}
                className="group flex h-11 flex-1 items-center"><span className={`block h-1.5 w-full rounded-full transition-colors ${k === i ? 'bg-[#e50914]' : 'bg-white/25 group-hover:bg-white/50'}`} /></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
