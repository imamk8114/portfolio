import { useState } from 'react';
import projectsJson from './generated/projects.json';
import type { Project } from './data';
import Nav from './components/Nav';
import ProfileGate, { profiles, type ProfileChoice } from './components/ProfileGate';
import Billboard from './sections/Billboard';
import ProjectsRow from './sections/ProjectsRow';
import SkillsRow from './sections/SkillsRow';
import ExperienceRow, { type Job } from './sections/ExperienceRow';
import TrailersRow from './sections/TrailersRow';
import About from './sections/About';
import WorkHistory from './sections/WorkHistory';
import Footer from './sections/Footer';
import ProjectModal from './ProjectModal';
import ExperienceModal from './ExperienceModal';

const projects = projectsJson as Project[];

const stored = (): ProfileChoice | null => {
  try { const n = sessionStorage.getItem('viewer'); return profiles.find((p) => p.name === n) ?? null; } catch { return null; }
};

export default function App() {
  const [viewer, setViewer] = useState<ProfileChoice | null>(stored);
  const [project, setProject] = useState<{ p: Project; i: number } | null>(null);
  const [job, setJob] = useState<Job | null>(null);

  const choose = (p: ProfileChoice) => { setViewer(p); try { sessionStorage.setItem('viewer', p.name); } catch { /* ignore */ } };
  const openProject = (p: Project, i: number) => setProject({ p, i });

  return (
    <div className="min-h-screen overflow-x-clip bg-[#141414]">
      {!viewer && <ProfileGate onChoose={choose} />}
      {viewer && (
        <>
          <a href="#projects" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[80] focus:bg-white focus:px-3 focus:py-2 focus:text-black">Skip to content</a>
          <Nav viewer={viewer} onSwitch={() => { try { sessionStorage.removeItem('viewer'); } catch { /* ignore */ } setViewer(null); }} />
          <main>
            <Billboard projects={projects} onOpen={openProject} />
            <div className="relative z-10">
              <ProjectsRow projects={projects} onOpen={openProject} />
              <SkillsRow />
              <ExperienceRow onOpen={setJob} />
              <TrailersRow projects={projects} onOpen={openProject} />
              <About />
              <WorkHistory />
            </div>
          </main>
          <Footer />
          {project && <ProjectModal project={project.p} start={project.i} onClose={() => setProject(null)} />}
          {job && <ExperienceModal job={job} onClose={() => setJob(null)} />}
        </>
      )}
    </div>
  );
}
