import Modal from './components/Modal';
import CompanyLogo from './components/CompanyLogo';
import { formatTenure, tenureMonths } from './data';
import type { Job } from './sections/ExperienceRow';

export default function ExperienceModal({ job, onClose }: { job: Job; onClose: () => void }) {
  return (
    <Modal label={`${job.company} experience`} onClose={onClose}>
      <div className="relative bg-gradient-to-br from-[#3a3a3a] to-[#1a1a1a] px-5 pb-8 pt-16 sm:px-10">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#181818] to-transparent" />
        <CompanyLogo company={job.company} className="relative mb-5 h-12 max-w-[60%]" />
        <h3 className="display relative text-5xl leading-none sm:text-7xl">{job.company}</h3>
        <p className="relative mt-2 text-lg text-[#d2d2d2]">{job.title}</p>
        <p className="relative mt-1 text-sm text-[#b3b3b3]">{job.location} · {job.period} · {formatTenure(tenureMonths(job.start, job.end))}</p>
      </div>
      <section className="px-5 pb-6 pt-2 sm:px-10" aria-label="Company and role">
        <p className="text-sm leading-relaxed text-[#b3b3b3]">{job.about}</p>
        <p className="mt-3 leading-relaxed text-[#e5e5e5]">{job.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
          {job.tech.map((t) => <li key={t} className="rounded-sm bg-white/10 px-2 py-1 text-xs text-white/85">{t}</li>)}
        </ul>
      </section>
      <section className="px-5 pb-10 pt-2 sm:px-10" aria-label="What I did">
        <h4 className="text-2xl font-semibold">Key achievements</h4>
        <ol className="mt-3">
          {job.points.map((pt, k) => (
            <li key={pt} className="flex gap-4 border-b border-[#404040] py-4 last:border-0 sm:gap-6">
              <span className="text-2xl text-[#d2d2d2] sm:text-3xl" aria-hidden>{k + 1}</span>
              <p className="text-sm leading-relaxed text-[#d2d2d2]">{pt}</p>
            </li>
          ))}
        </ol>
      </section>
    </Modal>
  );
}
