// Collects ../projects/*/PROJECT.json + screenshots into src/generated and public/shots.
import { readdirSync, readFileSync, existsSync, mkdirSync, copyFileSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const projectsDir = join(root, '..', 'projects');
const shotsDir = join(root, 'public', 'shots');
// The generated data and screenshots are committed, so a checkout without the sibling projects/ folder
// (GitHub, Netlify) builds from them as-is.
if (!existsSync(projectsDir)) { console.log('No ../projects folder: using the committed generated data.'); process.exit(0); }
rmSync(shotsDir, { recursive: true, force: true });
mkdirSync(join(root, 'src', 'generated'), { recursive: true });
// Projects kept on disk but not shown on the site.
const hidden = new Set(['flow-studio', 'freight-desk']);
const order = ['syncboard', 'pulse', 'flowgraph', 'clinic-desk', 'a11y-kit', 'pipeline'];
const projects = [];
for (const dir of readdirSync(projectsDir)) {
  const file = join(projectsDir, dir, 'PROJECT.json');
  if (!existsSync(file)) continue;
  const p = JSON.parse(readFileSync(file, 'utf8'));
  if (hidden.has(p.slug)) continue;
  p.screenshots = p.screenshots.filter(s => existsSync(join(projectsDir, dir, s.file))).map(s => {
    const out = join(shotsDir, p.slug); mkdirSync(out, { recursive: true });
    copyFileSync(join(projectsDir, dir, s.file), join(out, basename(s.file)));
    return { ...s, file: `/shots/${p.slug}/${basename(s.file)}` };
  });
  projects.push(p);
}
projects.sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
writeFileSync(join(root, 'src', 'generated', 'projects.json'), JSON.stringify(projects, null, 2));
console.log(`synced ${projects.length} projects:`, projects.map(p => p.slug).join(', '));
