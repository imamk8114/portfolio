import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Download, Linkedin, Mail, Repeat } from 'lucide-react';
import { profile } from '../data';
import type { ProfileChoice } from './ProfileGate';

const links = [['top', 'Home'], ['projects', 'Projects'], ['skills', 'Skills'], ['experience', 'Experience'], ['about', 'About'], ['contact', 'Contact']] as const;

export default function Nav({ viewer, onSwitch }: { viewer: ProfileChoice; onSwitch: () => void }) {
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState<'browse' | 'profile' | null>(null);
  const wrap = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onDown = (e: MouseEvent) => { if (!wrap.current?.contains(e.target as Node)) setMenu(null); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(null); };
    document.addEventListener('mousedown', onDown); document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [menu]);

  const Icon = viewer.icon;
  const item = 'flex min-h-11 items-center gap-3 px-4 py-2.5 text-sm text-white/90 hover:underline';
  return (
    <header ref={wrap} className="fixed inset-x-0 top-0 z-40 transition-colors duration-300"
      style={{ background: solid ? '#141414' : 'linear-gradient(180deg, rgba(0,0,0,.85) 10%, transparent)' }}>
      <div className="flex h-14 items-center gap-3 px-4 sm:h-[68px] sm:gap-6 sm:px-12">
        <a href="#top" className="display flex min-h-11 shrink-0 items-center whitespace-nowrap text-[1.45rem] leading-none tracking-[0.06em] text-[#e50914] sm:text-4xl sm:tracking-[0.08em]" aria-label="Imam Khan, home">IMAM KHAN</a>

        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex">
          {links.map(([id, label]) => <a key={id} href={`#${id}`} className="text-sm text-[#e5e5e5] transition-colors hover:text-[#b3b3b3]">{label}</a>)}
        </nav>
        <div className="relative lg:hidden">
          <button onClick={() => setMenu(menu === 'browse' ? null : 'browse')} aria-expanded={menu === 'browse'} className="flex min-h-11 items-center gap-1 pr-1 text-sm font-medium">
            Browse <ChevronDown size={16} />
          </button>
          {menu === 'browse' && (
            <div className="absolute left-0 top-11 w-52 border-t-2 border-white bg-black/90 py-2">
              {links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenu(null)} className={item}>{label}</a>)}
            </div>
          )}
        </div>

        <a href={profile.resumeUrl} download="Imam_Khan_Resume.pdf" aria-label="Download resume (PDF)" className="ml-auto flex h-11 min-w-11 items-center justify-center gap-2 rounded border border-white/40 px-2.5 text-sm font-medium transition-colors hover:bg-white hover:text-black sm:px-3"><Download size={16} /> <span className="hidden sm:inline">Resume</span></a>
        <div className="relative">
          <button onClick={() => setMenu(menu === 'profile' ? null : 'profile')} aria-expanded={menu === 'profile'} aria-label={`Profile menu, viewing as ${viewer.name}`} className="flex h-11 items-center gap-1 pl-1 pr-0.5">
            <span className="grid h-8 w-8 place-items-center rounded" style={{ background: viewer.color }}><Icon size={18} /></span>
            <ChevronDown size={16} className={`transition-transform ${menu === 'profile' ? 'rotate-180' : ''}`} />
          </button>
          {menu === 'profile' && (
            <div className="absolute right-0 top-11 w-56 border-t-2 border-white bg-black/90 py-2">
              <p className="px-4 pb-2 text-xs text-white/50">Viewing as {viewer.name}</p>
              <a className={item} href={`mailto:${profile.email}`}><Mail size={18} /> Email me</a>
              <a className={item} href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={18} /> LinkedIn</a>
              <button className={`${item} w-full border-t border-white/20`} onClick={() => { setMenu(null); onSwitch(); }}><Repeat size={18} /> Switch profile</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
