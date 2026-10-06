import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

type Props = { label: string; onClose: () => void; children: ReactNode; onArrow?: (dir: 1 | -1) => void };

export default function Modal({ label, onClose, children, onArrow }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; opener?.focus?.(); };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onArrow?.(1);
      else if (e.key === 'ArrowLeft') onArrow?.(-1);
      else if (e.key === 'Tab' && root.current) {
        const els = root.current.querySelectorAll<HTMLElement>('button, a[href]');
        const first = els[0], last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, onArrow]);

  return (
    <div ref={root} role="dialog" aria-modal="true" aria-label={label} onClick={onClose}
      className="fixed inset-0 z-[60] overflow-y-auto bg-black/75 px-0 py-0 sm:px-4 sm:py-8">
      <div onClick={(e) => e.stopPropagation()} className="relative mx-auto min-h-full max-w-[880px] overflow-hidden bg-[#181818] shadow-2xl sm:min-h-0 sm:rounded-md">
        <button ref={closeRef} onClick={onClose} aria-label="Close"
          className="absolute right-3 top-3 z-20 grid h-11 w-11 place-items-center rounded-full bg-[#181818] text-white hover:bg-[#2a2a2a]"><X size={20} /></button>
        {children}
      </div>
    </div>
  );
}
