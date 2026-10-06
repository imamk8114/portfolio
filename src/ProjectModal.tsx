import { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, ZoomIn, ZoomOut } from 'lucide-react';
import Modal from './components/Modal';
import ProjectLinks from './components/ProjectLinks';
import { categories, names, type Project } from './data';

export default function ProjectModal({ project: p, start = 0, onClose }: { project: Project; start?: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  const [zoom, setZoom] = useState(false);
  const n = p.screenshots.length;
  const go = (d: number) => { setZoom(false); setI((x) => (x + d + n) % n); };
  const s = p.screenshots[i];
  const title = names[p.slug] ?? p.title;
  const arrow = 'absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white hover:bg-black/85';
  return (
    <Modal label={`${title} details`} onClose={onClose} onArrow={go}>
      <div className="relative bg-black pt-16 sm:pt-0">
        <div className={`${zoom ? 'overflow-x-auto' : 'overflow-hidden'} scrollbar-none`} tabIndex={zoom ? 0 : undefined} aria-label={zoom ? 'Zoomed screenshot, scroll to pan' : undefined}>
          <img src={s.file} alt={s.caption} className={`block max-h-[78vh] object-contain ${zoom ? 'h-auto w-[230%] max-h-none max-w-none sm:w-full' : 'mx-auto w-full'}`} />
        </div>
        {!zoom && <>
          <button onClick={() => go(-1)} aria-label="Previous screenshot" className={`${arrow} left-3`}><ChevronLeft /></button>
          <button onClick={() => go(1)} aria-label="Next screenshot" className={`${arrow} right-3`}><ChevronRight /></button>
        </>}
        <button onClick={() => setZoom((z) => !z)} aria-pressed={zoom} aria-label={zoom ? 'Fit screenshot to screen' : 'Zoom screenshot'}
          className="absolute bottom-3 right-3 z-10 flex h-11 items-center gap-2 rounded-full bg-black/75 px-4 text-sm font-medium text-white hover:bg-black sm:hidden">
          {zoom ? <ZoomOut size={18} /> : <ZoomIn size={18} />}{zoom ? 'Fit' : 'Zoom'}
        </button>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-4 px-5 pt-5 sm:px-10">
        <div className="min-w-0">
          <h3 className="display text-5xl leading-none sm:text-7xl">{title}</h3>
          <p className="mt-2 text-sm text-white/85" aria-live="polite">{s.caption} <span className="text-white/50">({i + 1}/{n})</span></p>
        </div>
        <a href={s.file} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 text-sm text-[#b3b3b3] underline-offset-4 hover:text-white hover:underline">View full size <ExternalLink size={14} /></a>
      </div>
      <ProjectLinks slug={p.slug} className="px-5 pt-1 sm:px-10" />

      <div className="grid gap-8 px-5 pb-8 pt-4 sm:grid-cols-[2fr_1fr] sm:px-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#46d369]">{categories[p.slug]}</p>
          <p className="mt-2 text-lg font-medium leading-snug">{p.tagline}</p>
          <p className="mt-3 leading-relaxed text-[#d2d2d2]">{p.summary}</p>
        </div>
        <dl className="space-y-3 text-sm">
          <div><dt className="text-[#777]">Role:</dt><dd>{p.role}</dd></div>
          <div><dt className="text-[#777]">Built with:</dt><dd>{p.stack.join(', ')}</dd></div>
        </dl>
      </div>

      <section className="px-5 pb-8 sm:px-10" aria-label="Highlights">
        <h4 className="text-2xl font-semibold">Highlights</h4>
        <ol className="mt-3">
          {p.highlights.map((h, k) => (
            <li key={h} className="flex gap-4 border-b border-[#404040] py-4 last:border-0 sm:gap-6">
              <span className="text-2xl text-[#d2d2d2] sm:text-3xl" aria-hidden>{k + 1}</span>
              <p className="text-sm leading-relaxed text-[#d2d2d2]">{h}</p>
            </li>
          ))}
        </ol>
      </section>

      {p.measured.length > 0 && (
        <section className="px-5 pb-8 sm:px-10" aria-label="Measured results">
          <h4 className="text-2xl font-semibold">By the numbers</h4>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            {p.measured.map((m) => (
              <div key={m.label} className="rounded bg-[#2f2f2f] p-4">
                <dt className="font-semibold">{m.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-[#b3b3b3]">{m.label}. {m.how}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="px-5 pb-10 sm:px-10" aria-label="Screenshots">
        <h4 className="text-2xl font-semibold">Screenshots</h4>
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {p.screenshots.map((t, k) => (
            <li key={t.file}>
              <button onClick={() => { setZoom(false); setI(k); document.querySelector('[role=dialog]')?.scrollTo({ top: 0, behavior: 'smooth' }); }}
                aria-label={`Show screenshot ${k + 1}: ${t.caption}`} aria-current={k === i}
                className={`block w-full overflow-hidden rounded bg-[#2f2f2f] text-left ${k === i ? 'ring-2 ring-white' : 'opacity-80 hover:opacity-100'}`}>
                <img src={t.file} alt="" loading="lazy" className="aspect-[16/10] w-full bg-black object-contain" />
                <span className="block p-2 text-xs leading-snug text-[#b3b3b3]">{t.caption}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </Modal>
  );
}
