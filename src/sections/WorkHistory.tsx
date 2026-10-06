import CompanyLogo from '../components/CompanyLogo';
import { experience, skills } from '../data';

// Plain, semantic, resume-style markup (standard headings, one fact per line) so applicant tracking
// systems and crawlers can parse it. The same data also drives the carousel and the static HTML in index.html.
export default function WorkHistory() {
  return (
    <section id="work-experience" aria-labelledby="work-h" className="px-5 pb-6 pt-16 sm:px-12 sm:pt-24">
      <h2 id="work-h" className="text-lg font-semibold text-[#e5e5e5] sm:text-2xl">Work Experience</h2>
      <div className="mt-6 grid max-w-4xl gap-10">
        {experience.map((e) => (
          <article key={e.company} className="border-l-2 border-[#e50914] pl-5 sm:pl-7">
            <CompanyLogo company={e.company} className="mb-3 h-8" />
            <h3 className="text-xl font-semibold sm:text-2xl">{e.title}, {e.company}</h3>
            <p className="mt-1 text-sm text-[#b3b3b3]">{e.location} · {e.period}</p>
            <p className="mt-4 text-sm leading-relaxed text-[#b3b3b3]">{e.about}</p>
            <p className="mt-3 leading-relaxed text-[#e5e5e5]">{e.summary}</p>
            <h4 className="mt-5 text-sm font-semibold uppercase tracking-wider text-white/70">Key achievements</h4>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#d2d2d2]">
              {e.points.map((pt) => <li key={pt}>{pt}</li>)}
            </ul>
            <p className="mt-5 text-sm leading-relaxed"><span className="font-semibold text-white/70">Technologies: </span><span className="text-[#d2d2d2]">{e.tech.join(', ')}</span></p>
          </article>
        ))}
      </div>

      <h2 className="mt-16 text-lg font-semibold text-[#e5e5e5] sm:text-2xl">Technical Skills</h2>
      <dl className="mt-4 max-w-4xl space-y-2 text-sm leading-relaxed">
        {skills.map((s) => (
          <div key={s.name}><dt className="inline font-semibold text-white/70">{s.name}: </dt><dd className="inline text-[#d2d2d2]">{s.items.join(', ')}</dd></div>
        ))}
      </dl>
    </section>
  );
}
