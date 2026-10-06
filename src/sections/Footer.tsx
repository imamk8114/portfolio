import { Linkedin, Mail } from 'lucide-react';
import { profile } from '../data';

const cols = [
  ['Browse', [['#projects', 'Projects'], ['#skills', 'Skills'], ['#experience', 'Experience'], ['#about', 'About']]],
  ['Reach me', [[`mailto:${profile.email}`, 'Email'], [profile.linkedin, 'LinkedIn']]],
] as const;

export default function Footer() {
  return (
    <footer id="contact" aria-labelledby="contact-h" className="mt-20 px-5 pb-16 text-sm text-[#808080] sm:px-12">
      <h2 id="contact-h" className="display text-4xl leading-none text-white sm:text-6xl">Ready to start watching?</h2>
      <p className="mt-4 max-w-lg text-base text-[#b3b3b3] sm:text-lg">I&apos;m open to senior frontend roles. Email is the quickest way to reach me, and I&apos;m on LinkedIn too.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={`mailto:${profile.email}`} className="btn bg-[#e50914] text-white hover:bg-[#c11119]"><Mail size={20} /> {profile.email}</a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-dim"><Linkedin size={20} /> LinkedIn</a>
      </div>
      <div className="mt-14 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
        {cols.map(([title, items]) => (
          <nav key={title} aria-label={title}>
            <p className="mb-2 text-white/80">{title}</p>
            <ul>{items.map(([href, label]) => <li key={label}><a className="inline-flex min-h-11 min-w-11 items-center underline-offset-2 hover:underline" href={href}>{label}</a></li>)}</ul>
          </nav>
        ))}
      </div>
      <p className="mt-10">© {new Date().getFullYear()} Imam Khan · {profile.location}</p>
      <p className="mt-2 text-xs text-[#595959]">Interface inspired by streaming services. Not affiliated with any streaming company.</p>
    </footer>
  );
}
