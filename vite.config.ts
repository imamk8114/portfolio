import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { profile } from './src/data';
import resume from './src/resume.json';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Injects a plain-HTML copy of the resume into #root (React replaces it on mount) and JSON-LD into <head>,
 * so applicant tracking systems and crawlers that do not run JavaScript still read the content. One source: resume.json. */
function atsFriendlyHtml(): Plugin {
  const summary = 'Software Developer with over 6 years of experience in building user friendly, responsive and scalable applications using JavaScript, TypeScript, React and Node. Specialises in low-code platforms, design systems, accessibility (WCAG 2.1) and data-heavy interfaces.';
  const jobs = resume.experience.map((e) => `
    <article>
      <h3>${esc(e.title)}, ${esc(e.company)}</h3>
      <p>${esc(e.location)} | ${esc(e.period)}</p>
      <p>${esc(e.about)}</p>
      <p>${esc(e.summary)}</p>
      <ul>${e.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
      <p>Technologies: ${esc(e.tech.join(', '))}</p>
    </article>`).join('');
  const skills = resume.skills.map((s) => `<li>${esc(s.name)}: ${esc(s.items.join(', '))}</li>`).join('');
  const body = `
  <main class="ats-prerender">
    <h1>${esc(profile.name)}, ${esc(profile.role)}</h1>
    <p>${esc(profile.location)} | <a href="mailto:${profile.email}">${esc(profile.email)}</a> | <a href="${profile.linkedin}">LinkedIn</a> | <a href="${profile.resumeUrl}">Download resume (PDF)</a></p>
    <h2>Professional Summary</h2><p>${esc(summary)}</p>
    <h2>Work Experience</h2>${jobs}
    <h2>Technical Skills</h2><ul>${skills}</ul>
  </main>`;
  const ld = {
    '@context': 'https://schema.org', '@type': 'Person', name: profile.name, jobTitle: profile.role,
    email: `mailto:${profile.email}`, url: profile.linkedin, sameAs: [profile.linkedin],
    address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru', addressCountry: 'IN' },
    worksFor: { '@type': 'Organization', name: 'Salesforce' },
    knowsAbout: resume.skills.flatMap((s) => s.items),
    description: summary,
  };
  return {
    name: 'ats-friendly-html',
    transformIndexHtml(html) {
      return html
        .replace('<!--ats-head-->', `<style>html,body{background:#141414}.ats-prerender{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}</style><script type="application/ld+json">${JSON.stringify(ld)}</script>`)
        .replace('<!--ats-body-->', body);
    },
  };
}

export default defineConfig({ plugins: [react(), atsFriendlyHtml()], resolve: { dedupe: ['react', 'react-dom'] } });
