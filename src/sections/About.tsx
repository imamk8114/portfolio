import { stats, profile } from '../data';

const details: [string, string][] = [
  ['Based in', profile.location],
  ['Currently', 'Member of Technical Staff, Salesforce (OmniStudio Builder)'],
  ['Genres', 'Low-code platforms · Design systems · Data-heavy UIs · Accessibility'],
  ['This profile is', 'Detail-oriented · Performance-minded · Team-first'],
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-h" className="px-5 pb-10 pt-16 sm:px-12 sm:pt-24">
      <h2 id="about-h" className="text-lg font-semibold text-[#e5e5e5] sm:text-2xl">About Imam Khan</h2>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="max-w-2xl text-lg leading-relaxed text-white sm:text-xl">{profile.aboutParagraph}</p>
          <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="border-l-2 border-[#e50914] pl-3">
                <dt className="display text-4xl leading-none">{s.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-[#b3b3b3]">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <dl className="space-y-3 text-sm leading-relaxed">
          {details.map(([k, v]) => (
            <div key={k}><dt className="inline text-[#777]">{k}: </dt><dd className="inline text-white">{v}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}
