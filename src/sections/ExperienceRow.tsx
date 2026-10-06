import Row from '../components/Row';
import { experience, formatTenure, logos, tenureMonths } from '../data';

export type Job = (typeof experience)[number];

export default function ExperienceRow({ onOpen }: { onOpen: (j: Job) => void }) {
  const months = experience.map((e) => tenureMonths(e.start, e.end));
  const longest = Math.max(...months);
  return (
    <Row id="experience" title="Continue Watching: My Experience">
      {experience.map((e, i) => (
        <li key={e.company} className="w-[72vw] shrink-0 snap-start sm:w-[320px]">
          <button onClick={() => onOpen(e)} aria-label={`${e.company}, ${e.title}, ${e.period}`}
            className="block w-full origin-center overflow-hidden rounded bg-[#2f2f2f] text-left transition-transform duration-300 hover:z-20 hover:scale-105 focus-visible:scale-105">
            <span className="relative flex aspect-video flex-col justify-end overflow-hidden bg-gradient-to-br from-[#2e2e2e] to-[#141414] p-4">
              <span className="pointer-events-none absolute inset-x-5 bottom-[40%] top-4 flex items-center justify-center">
                <img src={logos[e.company]} alt="" aria-hidden className="max-h-full max-w-full select-none object-contain opacity-50" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-t from-[#141414]/85 via-transparent to-transparent" />
              <span className="relative display text-3xl leading-[0.95]">{e.company}</span>
              <span className="relative mt-1 text-sm text-[#d2d2d2]">{e.title}</span>
            </span>
            <span className="block px-4 pb-4 pt-3">
              <span className="block h-1 w-full rounded bg-white/25">
                <span className="block h-full rounded bg-[#e50914]" style={{ width: `${(months[i] / longest) * 100}%` }} />
              </span>
              <span className="mt-2 flex justify-between text-xs text-[#b3b3b3]"><span>{e.period}</span><span>{formatTenure(months[i])}</span></span>
            </span>
          </button>
        </li>
      ))}
    </Row>
  );
}
