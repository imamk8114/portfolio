import { useEffect, useRef } from 'react';
import { Briefcase, Code2, Eye, User, type LucideIcon } from 'lucide-react';

export type ProfileChoice = { name: string; color: string; icon: LucideIcon };

export const profiles: ProfileChoice[] = [
  { name: 'Recruiter', color: '#0071eb', icon: User },
  { name: 'Hiring Manager', color: '#e50914', icon: Briefcase },
  { name: 'Engineer', color: '#1db954', icon: Code2 },
  { name: 'Guest', color: '#f5a623', icon: Eye },
];

export default function ProfileGate({ onChoose }: { onChoose: (p: ProfileChoice) => void }) {
  const first = useRef<HTMLButtonElement>(null);
  useEffect(() => { first.current?.focus(); }, []);
  return (
    <div role="dialog" aria-modal="true" aria-label="Who's watching?" className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#141414] px-5">
      <span className="display absolute left-5 top-5 text-3xl tracking-[0.08em] text-[#e50914] sm:left-12 sm:top-8 sm:text-5xl">IMAM KHAN</span>
      <h1 className="text-center text-3xl font-medium sm:text-5xl">Who&apos;s watching?</h1>
      <ul className="mt-10 grid grid-cols-2 gap-6 sm:mt-14 sm:flex sm:gap-8">
        {profiles.map((p, i) => {
          const Icon = p.icon;
          return (
            <li key={p.name}>
              <button ref={i === 0 ? first : undefined} onClick={() => onChoose(p)} className="group flex w-[120px] flex-col items-center gap-3 sm:w-[10vw] sm:min-w-[120px] sm:max-w-[170px]">
                <span className="grid aspect-square w-full place-items-center rounded-md border-2 border-transparent transition-colors group-hover:border-white group-focus-visible:border-white" style={{ background: p.color }}>
                  <Icon size={56} strokeWidth={1.5} />
                </span>
                <span className="text-base text-[#808080] transition-colors group-hover:text-white group-focus-visible:text-white sm:text-xl">{p.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-12 max-w-sm text-center text-sm text-[#808080]">Every profile sees the same portfolio. Pick whichever fits.</p>
    </div>
  );
}
