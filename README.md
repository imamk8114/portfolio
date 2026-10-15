# Imam Khan, portfolio

Source for my portfolio site: a streaming-service-style browser for my projects, skills and experience.
React 18, TypeScript, Vite, Tailwind CSS and Framer Motion.

## Projects shown

| Project | Live demo | Source |
|---|---|---|
| Syncboard, local-first collaborative kanban | https://syncboard-imamk8114.netlify.app/ | https://github.com/imamk8114/syncboard |
| Pulse, observability and incident console | https://pulse-imamk8114.netlify.app/ | https://github.com/imamk8114/pulse |
| Flowgraph, workflow editor with a debugger | https://flowgraph-imamk8114.netlify.app/ | https://github.com/imamk8114/flowgraph |
| Clinic Desk, front-desk PWA for clinics | https://clinic-desk-imamk8114.netlify.app/ | private repository |
| Clinic Protocol Assistant, retrieval-augmented Q&A over clinic protocols | https://clinic-rag-imamk8114.netlify.app/ | https://github.com/imamk8114/clinic-rag |
| A11y Kit, accessible React components | https://a11y-kit-imamk8114.netlify.app/ | https://github.com/imamk8114/a11y-kit |
| Pipeline, 50,000-deal sales table | https://pipeline4sales-demo.netlify.app/ | https://github.com/imamk8114/sales-pipeline |

## Run it

```bash
npm install
npm run dev     # http://localhost:5170
npm run build
```

## How it is put together

- `src/resume.json` is the single source for experience and skills. It feeds the visible sections, and `vite.config.ts` also writes a plain-HTML copy of the resume and `Person` structured data into `index.html`, so crawlers and applicant tracking systems that do not run JavaScript still read it.
- `src/generated/projects.json` and `public/shots/` are generated from each project's `PROJECT.json` by `scripts/sync.mjs`, and are committed. Without the sibling `projects/` folder (as on GitHub or Netlify) the sync step is skipped and the committed copies are used.
- Deployed demo and source links live in `src/data.ts` (`links`).

Company logos are trademarks of their owners and are used only to show where I have worked. The interface is inspired by streaming services and is not affiliated with any of them.
