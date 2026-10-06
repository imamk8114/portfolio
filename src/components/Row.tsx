import { useId, useRef, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Row({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const headingId = useId();
  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.85, behavior: 'smooth' });
  const arrow = 'absolute top-8 bottom-8 z-30 hidden w-12 place-items-center bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 focus-visible:opacity-100 group-hover/row:opacity-100 md:grid';
  return (
    <section id={id} aria-labelledby={headingId} className="group/row relative pt-6 sm:pt-10">
      <h2 id={headingId} className="px-5 text-lg font-semibold text-[#e5e5e5] sm:px-12 sm:text-2xl">{title}</h2>
      <div className="relative">
        <button className={`${arrow} left-0`} onClick={() => scroll(-1)} aria-label={`Scroll ${title} left`}><ChevronLeft size={34} /></button>
        <ul ref={ref} className="scrollbar-none flex snap-x scroll-px-5 gap-2 overflow-x-auto px-5 py-8 sm:scroll-px-12 sm:px-12">{children}</ul>
        <button className={`${arrow} right-0`} onClick={() => scroll(1)} aria-label={`Scroll ${title} right`}><ChevronRight size={34} /></button>
      </div>
    </section>
  );
}
