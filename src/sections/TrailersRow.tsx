import Row from '../components/Row';
import { names, type Project } from '../data';

export default function TrailersRow({ projects, onOpen }: { projects: Project[]; onOpen: (p: Project, i: number) => void }) {
  return (
    <Row title="Trailers & More: Screenshots">
      {projects.flatMap((p) => p.screenshots.map((s, i) => (
        <li key={s.file} className="w-[64vw] shrink-0 snap-start sm:w-[280px]">
          <button onClick={() => onOpen(p, i)} aria-label={`${names[p.slug] ?? p.title}: ${s.caption}`}
            className="group relative block aspect-[16/10] w-full origin-center overflow-hidden rounded bg-black transition-transform duration-300 hover:z-20 hover:scale-110 focus-visible:scale-110">
            <img src={s.file} alt="" loading="lazy" className="h-full w-full object-contain" />
            <span className="sr-only">{names[p.slug] ?? p.title}</span>
          </button>
        </li>
      )))}
    </Row>
  );
}
