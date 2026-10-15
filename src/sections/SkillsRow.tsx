import Row from '../components/Row';
import { skills } from '../data';

export default function SkillsRow() {
  return (
    <Row id="skills" title={`Top ${skills.length} Skills`}>
      {skills.map((s, i) => (
        <li key={s.name} className="flex shrink-0 snap-start items-end">
          <span aria-hidden className="outline-num display -mr-5 select-none text-[11rem] leading-[0.8] sm:text-[13rem]">{i + 1}</span>
          <article className="relative z-10 flex h-[310px] w-[210px] flex-col overflow-hidden rounded bg-gradient-to-b from-[#2b2b2b] to-[#171717] p-4 transition-transform duration-300 hover:scale-105 sm:w-[230px]">
            <h3 className="display text-[1.7rem] leading-[0.95]"><span className="sr-only">{i + 1}. </span>{s.name}</h3>
            <p className="mt-3 text-[13px] leading-snug text-[#d2d2d2]">{s.description}</p>
            <ul className="mt-auto flex flex-wrap gap-1 pt-3">
              {s.items.map((it) => <li key={it} className="rounded-sm bg-white/10 px-1.5 py-0.5 text-[10.5px] text-white/85">{it}</li>)}
            </ul>
          </article>
        </li>
      ))}
    </Row>
  );
}
