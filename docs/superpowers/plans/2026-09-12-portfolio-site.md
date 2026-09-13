# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Gökay Baz's personal portfolio site (terminal/infra aesthetic, TR/EN toggle, project detail pages) with Vite + React + TypeScript.

**Architecture:** Single-page home with scroll sections + hash-routed project detail pages. All content lives in one typed data file with TR/EN dictionaries. A LanguageContext provides translations; Tailwind v4 handles styling with a custom dark theme.

**Tech Stack:** Vite, React 19, TypeScript, Tailwind CSS v4, React Router v7 (HashRouter), Vitest + @testing-library/react

**Spec:** `docs/superpowers/specs/2026-09-12-portfolio-site-design.md`

## Global Constraints

- Package manager: pnpm (check availability; fall back to npm if pnpm missing)
- All user-facing strings exist in both `tr` and `en` | no hardcoded copy in components
- Accent colors: terminal green `#4ade80`, amber secondary, on dark ground `#0a0e14`
- Fonts: Space Grotesk (headings), JetBrains Mono (mono accents) via Google Fonts
- Router: `HashRouter` from react-router v7
- Every task ends with passing tests + `build` before commit
- Design tokens defined once in `index.css` `@theme` block (Tailwind v4 style), never inline hex in components

## File Structure

```
src/
  main.tsx                    # entry: HashRouter, LanguageProvider
  App.tsx                     # routes: / and /project/:slug
  index.css                   # Tailwind import, @theme tokens, base styles
  i18n/
    LanguageContext.tsx       # context: lang, setLang, t(dict)
  data/
    content.ts                # all TR/EN content + typed Project/Experience interfaces
  hooks/
    useReveal.ts              # IntersectionObserver reveal-on-scroll hook
  components/
    Header.tsx
    Hero.tsx
    NetworkCanvas.tsx         # canvas particle/network hero effect
    About.tsx
    Projects.tsx
    ProjectCard.tsx
    Experience.tsx
    BlogTeaser.tsx
    Footer.tsx
    Reveal.tsx                # wrapper div applying useReveal
  pages/
    HomePage.tsx              # assembles all sections
    ProjectDetailPage.tsx     # /project/:slug
test/
  setup.ts
  LanguageContext.test.tsx
  ProjectDetailPage.test.tsx
  App.test.tsx
```

---

### Task 1: Scaffold Vite + React + TS project with Tailwind v4, Vitest, React Router

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `test/setup.ts`
- Modify: `package.json` (test script)

**Interfaces:**
- Produces: runnable app skeleton; `App.tsx` renders `<Routes>` with a placeholder home route; test infrastructure (`npm test`) working

- [ ] **Step 1: Scaffold with Vite**

```bash
pnpm create vite . --template react-ts   # if pnpm missing: npm create vite@latest . -- --template react-ts
pnpm install
```

Run in the project root (only `.agents/`, `docs/`, `test/`-adjacent files exist; Vite scaffolds into non-empty dir | confirm overwrite prompts are skipped; if Vite refuses non-empty dir, scaffold into a temp dir and move files in).

- [ ] **Step 2: Install dependencies**

```bash
pnpm add react-router tailwindcss @tailwindcss/vite
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom @types/react @types/react-dom
```

- [ ] **Step 3: Configure Vite + Tailwind + Vitest**

`vite.config.ts`:

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    globals: true,
  },
})
```

`test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 4: Theme tokens in index.css**

Replace `src/index.css`:

```css
@import "tailwindcss";

@theme {
  --color-ink: #0a0e14;
  --color-ink-soft: #11161d;
  --color-paper: #e6e1d5;
  --color-paper-dim: #8a8578;
  --color-term: #4ade80;
  --color-amber: #fbbf24;
  --color-line: #1e2630;
  --font-display: "Space Grotesk", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

body {
  @apply bg-ink text-paper font-display antialiased;
}
```

- [ ] **Step 5: Fonts + placeholder routes**

In `index.html` `<head>` add Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

`src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
```

`src/App.tsx` (placeholder until Task 4):

```tsx
import { Routes, Route } from 'react-router'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div>gokaybaz</div>} />
    </Routes>
  )
}
```

Delete `src/App.css` and any Vite boilerplate assets referenced from App.

- [ ] **Step 6: Smoke test + build verification**

`src/App.test.tsx` (colocated for now; moved in Task 8):

```tsx
import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router'
import App from './App'

test('renders placeholder', () => {
  render(<HashRouter><App /></HashRouter>)
  expect(screen.getByText('gokaybaz')).toBeInTheDocument()
})
```

Run: `npx vitest run && npm run build`
Expected: test PASS, build succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: scaffold vite+react+ts with tailwind v4, vitest, react router"
```

---

### Task 2: LanguageContext (TR/EN toggle)

**Files:**
- Create: `src/i18n/LanguageContext.tsx`, `test/LanguageContext.test.tsx`
- Modify: `src/main.tsx` (wrap with provider)

**Interfaces:**
- Produces: `useLanguage(): { lang: 'tr' | 'en', setLang: (l) => void, t: (dict: { tr: string; en: string }) => string }`. Persists to `localStorage['gk-lang']`, defaults `'tr'`.

- [ ] **Step 1: Write the failing test**

`test/LanguageContext.test.tsx`:

```tsx
import { render, screen, act } from '@testing-library/react'
import { LanguageProvider, useLanguage } from '../src/i18n/LanguageContext'

function Probe() {
  const { lang, setLang, t } = useLanguage()
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="text">{t({ tr: 'merhaba', en: 'hello' })}</span>
      <button onClick={() => setLang('en')}>switch</button>
    </div>
  )
}

test('defaults to tr and switches to en', () => {
  render(<LanguageProvider><Probe /></LanguageProvider>)
  expect(screen.getByTestId('lang')).toHaveTextContent('tr')
  expect(screen.getByTestId('text')).toHaveTextContent('merhaba')
  act(() => { screen.getByText('switch').click() })
  expect(screen.getByTestId('lang')).toHaveTextContent('en')
  expect(screen.getByTestId('text')).toHaveTextContent('hello')
  expect(localStorage.getItem('gk-lang')).toBe('en')
})

test('restores lang from localStorage', () => {
  localStorage.setItem('gk-lang', 'en')
  render(<LanguageProvider><Probe /></LanguageProvider>)
  expect(screen.getByTestId('lang')).toHaveTextContent('en')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/LanguageContext.test.tsx`
Expected: FAIL | module not found.

- [ ] **Step 3: Implement LanguageContext**

`src/i18n/LanguageContext.tsx`:

```tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'tr' | 'en'
type Dict = { tr: string; en: string }

interface LanguageValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (dict: Dict) => string
}

const LanguageContext = createContext<LanguageValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('gk-lang')
    return saved === 'en' || saved === 'tr' ? saved : 'tr'
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('gk-lang', l)
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t = (dict: Dict) => dict[lang]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run test/LanguageContext.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Wire provider into main.tsx**

Wrap `<App />` inside `<LanguageProvider>` (inside HashRouter).

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: language context with tr/en toggle and localStorage persistence"
```

---

### Task 3: Content data file with projects, experience, translations

**Files:**
- Create: `src/data/content.ts`
- Test: `test/content.test.ts`

**Interfaces:**
- Produces:
  - `projects: Project[]` (5 items: bazntms featured, binoga-ecommerce featured, baz-eshop, valorant-app, filmgezegeni) each with `slug`, `title`, `description: Dict`, `detail?: Dict`, `highlights?: { tr: string[]; en: string[] }`, `stack: string[]`, `github?`, `demo?`, `featured?`
  - `experience: Experience[]` (3 items: Kavukluca, React Staj, Binboğa Bal) each with `period: string`, `role: Dict`, `company: string`, `points: { tr: string[]; en: string[] }`
  - `site` object: name, title/untitle Dicts, socials (`github`, `linkedin`, `x`, `email`, `medium` URLs), `about: Dict`, `aboutTags: string[]`

- [ ] **Step 1: Write the failing test**

`test/content.test.ts`:

```ts
import { projects, experience } from '../src/data/content'

test('every project has unique slug and bilingual text', () => {
  const slugs = projects.map((p) => p.slug)
  expect(new Set(slugs).size).toBe(slugs.length)
  for (const p of projects) {
    expect(p.description.tr).toBeTruthy()
    expect(p.description.en).toBeTruthy()
    expect(p.stack.length).toBeGreaterThan(0)
  }
})

test('featured projects include detail content', () => {
  for (const p of projects.filter((p) => p.featured)) {
    expect(p.detail).toBeTruthy()
    expect(p.highlights?.tr.length).toBeGreaterThan(0)
  }
})

test('experience entries have points in both languages', () => {
  for (const e of experience) {
    expect(e.points.tr.length).toBeGreaterThan(0)
    expect(e.points.en.length).toBeGreaterThan(0)
  }
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/content.test.ts`
Expected: FAIL | module not found.

- [ ] **Step 3: Implement content.ts**

Full data from the research summary (see spec). Key content (write full Turkish and English text, this is the real copy):

- **site**: name "Gökay Baz"; title `{ tr: "Sistem Uzmanı & Full-Stack Yazılımcı", en: "IT Specialist & Full-Stack Developer" }`; socials: github `https://github.com/gokayybaz`, linkedin `https://www.linkedin.com/in/gokayybaz/`, x `https://x.com/gokayybaz1`, email `mailto:gokaybaz2000@gmail.com`, medium `https://medium.com/@gokaybaz2000`
- **about** (TR): IT teknisyenliğinden başlayıp React ile web'e, oradan Next.js/Prisma ile full-stack'e ve bugün Go + eBPF/microVM gibi düşük seviye sistemlere uzanan "her zaman bir katman derine" hikayesi. Kendi altyapısını kendisi kurma felsefesi (Proxmox, Dokploy, WireGuard). (EN: same story in English.)
- **aboutTags**: `["TypeScript", "React", "Next.js", "Node.js", "Go", "PostgreSQL", "Prisma", "Proxmox VE", "Docker", "Dokploy", "WireGuard", "FortiGate"]`
- **projects**:
  - `bazntms` (featured, github `https://github.com/gokayybaz/bazntms`): Ağ trafiği izleme sistemi; hub + 5.000'e kadar agent, eBPF/ETW/pcap paket yakalama, NetFlow/IPFIX/sFlow, SNMPv3, mTLS, RBAC, SIEM konektörleri (Splunk/QRadar), 5651 log imzalama. Stack: `["Go", "React", "SQLite", "PostgreSQL", "NATS", "Docker"]`. Highlights: tek binary dağıtım, self-hosted mimari, ISO 27001 uyum haritalaması.
  - `binoga-ecommerce` (featured, no public repo | `demo` yok, github yok; case-study kartı): Binboğa Bal için solo geliştirilen kurumsal e-ticaret: Next.js + Node.js + PostgreSQL + Prisma + Amazon SES; QNBpay ödeme, DİA ERP entegrasyonu (WireGuard üzerinden özel Proxy API), DHL kargo, admin panel, RBAC + 2FA + audit log, Telegram log uyarıları, Dokploy ile kendi sunucusunda deploy. Stack: `["Next.js", "Node.js", "PostgreSQL", "Prisma", "Amazon SES", "Dokploy", "WireGuard"]`.
  - `baz-eshop` (github + demo `https://baz-e-shop.netlify.app`): giyim e-ticaret vitrini. Stack: `["React", "Redux", "React Router", "Tailwind", "Vite"]`
  - `valorant-app` (github `https://github.com/gokayybaz/baz_valorant_app`): Valorant rehber uygulaması. Stack: `["React", "Vite", "Axios"]`
  - `filmgezegeni` (github `https://github.com/gokayybaz/filmgezegeni`): film keşif uygulaması. Stack: `["React", "Vite", "pnpm"]`
- **experience**:
  - Kavukluca Bilgi Teknolojileri, `2022 – 2024`, IT Teknisyeni: saha + uzaktan destek, donanım/Windows/ağ/yazıcı/backup işlemleri.
  - React Staj (reactstaj.com), `Şub 2024`, Stajyer: modern React ekosistemi eğitimi + değerlendirme projesi.
  - Binboğa Bal, `Tem 2024 – Devam`, Sistem Uzmanı & Full-Stack Yazılımcı: e-ticaret platformu (solo), IT Management System + FortiGate modülü, Proxmox VE altyapı migrasyonu, Passbolt kurulumu.

Define interfaces explicitly and export them.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run test/content.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: bilingual content data with projects and experience"
```

---

### Task 4: Layout primitives | Reveal wrapper + useReveal hook

**Files:**
- Create: `src/hooks/useReveal.ts`, `src/components/Reveal.tsx`
- Test: `test/useReveal.test.tsx`

**Interfaces:**
- Produces: `useReveal<T extends HTMLElement>(): { ref: RefObject<T | null>, visible: boolean }` | sets `visible=true` once when the element enters viewport (threshold 0.15, unobserve after). `Reveal` component: `<Reveal delay?: number>` wrapper div with classes `opacity-0 translate-y-6` → `opacity-100 translate-y-0 transition-all duration-700`, `style={{ transitionDelay: delay + 'ms' }}`.

- [ ] **Step 1: Write the failing test**

`test/useReveal.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { Reveal } from '../src/components/Reveal'

test('Reveal renders children with hidden initial classes', () => {
  render(<Reveal><span data-testid="child">x</span></Reveal>)
  const child = screen.getByTestId('child')
  const wrapper = child.parentElement!
  expect(wrapper.className).toContain('opacity-0')
  expect(wrapper.className).toContain('translate-y-6')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/useReveal.test.tsx`
Expected: FAIL | module not found.

- [ ] **Step 3: Implement hook + component**

`src/hooks/useReveal.ts`:

```ts
import { useEffect, useRef, useState } from 'react'

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return { ref, visible }
}
```

`src/components/Reveal.tsx`:

```tsx
import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run test/useReveal.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: reveal-on-scroll primitive with IntersectionObserver"
```

---

### Task 5: Header + Hero (with NetworkCanvas)

**Files:**
- Create: `src/components/Header.tsx`, `src/components/Hero.tsx`, `src/components/NetworkCanvas.tsx`
- Modify: `src/pages/HomePage.tsx` (create), `src/App.tsx` (route to HomePage)

**Interfaces:**
- Consumes: `useLanguage`, `site` from content, `Reveal`
- Produces: `Header` | fixed top bar with `~/gokaybaz` path accent, nav links (anchors `#about #projects #experience #contact`), TR/EN toggle button, green status dot + `open to work` label. `NetworkCanvas` | full-bleed canvas, ~60 drifting particles connected by lines when closer than 120px, colors from `#4ade80` at low alpha, respects `prefers-reduced-motion`. `Hero` | `$ whoami` typed-text animation (simple interval typing), large name in mono, title Dict, social icon links (inline SVGs), scroll hint.

- [ ] **Step 1: NetworkCanvas implementation**

Canvas sizing via `ResizeObserver` on parent; `requestAnimationFrame` loop; clear + draw. No test (visual-only; verified by build + manual run).

```tsx
import { useEffect, useRef } from 'react'

export function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf = 0
    let w = 0
    let h = 0

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      w = canvas.width = rect.width
      h = canvas.height = rect.height
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement!)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const N = 60
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        if (!reduced) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
        }
        ctx.fillStyle = 'rgba(74, 222, 128, 0.5)'
        ctx.fillRect(p.x - 1, p.y - 1, 2, 2)
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.hypot(dx, dy)
          if (d < 120) {
            ctx.strokeStyle = `rgba(74, 222, 128, ${0.14 * (1 - d / 120)})`
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-40" aria-hidden="true" />
}
```

- [ ] **Step 2: Header**

```tsx
import { useLanguage } from '../i18n/LanguageContext'
import { site } from '../data/content'

export function Header() {
  const { lang, setLang, t } = useLanguage()
  const links = [
    { href: '#about', label: t({ tr: 'Hakkımda', en: 'About' }) },
    { href: '#projects', label: t({ tr: 'Projeler', en: 'Projects' }) },
    { href: '#experience', label: t({ tr: 'Deneyim', en: 'Experience' }) },
    { href: '#contact', label: t({ tr: 'İletişim', en: 'Contact' }) },
  ]
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a href="#/" className="font-mono text-sm text-term">~/gokaybaz<span className="animate-pulse">_</span></a>
        <nav className="hidden gap-6 font-mono text-sm text-paper-dim md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-term transition-colors">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 font-mono text-xs text-paper-dim sm:flex">
            <span className="h-2 w-2 rounded-full bg-term animate-pulse" />
            {t({ tr: 'açık işe', en: 'open to work' })}
          </span>
          <button
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            className="border border-line px-2 py-1 font-mono text-xs text-term hover:border-term transition-colors"
          >
            {lang === 'tr' ? 'EN' : 'TR'}
          </button>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Hero with typing effect + socials**

Implement `Hero.tsx`: typed `$ whoami` (interval 80ms appending chars), then name appears with `terminal cursor`. Uses `site` socials with inline SVG icons (github/linkedin/x/mail). Layout: min-h-screen, NetworkCanvas behind, centered column.

- [ ] **Step 4: HomePage assembly + route**

Create `src/pages/HomePage.tsx` rendering `<Header />` and `<Hero />` (later tasks append sections). Update `App.tsx` route `/` → `<HomePage />`.

- [ ] **Step 5: Verify + commit**

Run: `npx vitest run && npm run build`
Expected: all PASS, build OK.
```bash
git add -A && git commit -m "feat: header and hero with network canvas and typing effect"
```

---

### Task 6: About, Projects grid, Experience timeline, Blog teaser, Footer

**Files:**
- Create: `src/components/About.tsx`, `src/components/Projects.tsx`, `src/components/ProjectCard.tsx`, `src/components/Experience.tsx`, `src/components/BlogTeaser.tsx`, `src/components/Footer.tsx`
- Modify: `src/pages/HomePage.tsx`

**Interfaces:**
- Consumes: `useLanguage`, `site`, `projects`, `experience` from content; `Reveal`; react-router `Link`
- Produces: `ProjectCard` renders `Link to={'/project/' + p.slug}` (clickable title + "detail →" link). Section headings styled consistently: mono prefix `##`, e.g. `## projects` in term green.

- [ ] **Step 1: About section**

Two-column: left = about paragraphs (Reveal-wrapped), right = `aboutTags` as bordered mono chips. Section id `about`.

- [ ] **Step 2: ProjectCard + Projects grid**

`ProjectCard`:

```tsx
import { Link } from 'react-router'
import type { Project } from '../data/content'

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage()
  return (
    <Link
      to={`/project/${project.slug}`}
      className={`group border border-line bg-ink-soft p-6 transition-colors hover:border-term ${project.featured ? 'md:col-span-2' : ''}`}
    >
      <h3 className="font-mono text-lg text-paper group-hover:text-term transition-colors">{project.title}</h3>
      <p className="mt-2 text-sm text-paper-dim">{t(project.description)}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span key={s} className="border border-line px-2 py-0.5 font-mono text-xs text-paper-dim">{s}</span>
        ))}
      </div>
      <span className="mt-4 inline-block font-mono text-xs text-term">{t({ tr: 'detay →', en: 'detail →' })}</span>
    </Link>
  )
}
```

`Projects`: featured projects first, grid `grid-cols-1 md:grid-cols-2`, featured spanning 2 cols. External github/demo icons: keep on detail page only (cards stay clean). Section id `projects`.

- [ ] **Step 3: Experience timeline**

Vertical line (border-l) with dot markers per entry; `period` in mono term-green; role + company; points as bullet list. Section id `experience`.

- [ ] **Step 4: BlogTeaser + Footer**

BlogTeaser: bordered box, mono text `{ tr: 'blog yakında...', en: 'blog coming soon...' }` + Medium link. Footer (id `contact`): email CTA large mono link, social links row, signature line `{ tr: 'Vite + React ile yapıldı, tarafımdan deploy edildi', en: 'Built with Vite + React, deployed by me' }`.

- [ ] **Step 5: Assemble HomePage**

Order: Header, Hero, About, Projects, Experience, BlogTeaser, Footer | each section wrapped in `<Reveal>` with incremental delay, `max-w-5xl mx-auto px-6 py-24`.

- [ ] **Step 6: Verify + commit**

Run: `npx vitest run && npm run build`
Expected: PASS + build OK.
```bash
git add -A && git commit -m "feat: about, projects grid, experience timeline, blog teaser, footer sections"
```

---

### Task 7: ProjectDetailPage with slug routing

**Files:**
- Create: `src/pages/ProjectDetailPage.tsx`
- Test: `test/ProjectDetailPage.test.tsx`
- Modify: `src/App.tsx` (add route)

**Interfaces:**
- Consumes: `projects`, `useLanguage`, react-router `useParams`, `Link`
- Produces: route `/project/:slug`. Renders title, mono path breadcrumb (`~/gokaybaz/projects/<slug>`), full detail text, highlights list, stack chips, GitHub/demo external links. Unknown slug → `<Navigate to="/" replace />`.

- [ ] **Step 1: Write the failing test**

`test/ProjectDetailPage.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router'
import { Routes, Route } from 'react-router'
import ProjectDetailPage from '../src/pages/ProjectDetailPage'
import { LanguageProvider } from '../src/i18n/LanguageContext'
import { projects } from '../src/data/content'

function renderAt(slug?: string) {
  return render(
    <LanguageProvider>
      <HashRouter initialEntries={slug ? [`/project/${slug}`] : ['/project/unknown-slug']}>
        <Routes>
          <Route path="/project/:slug" element={<ProjectDetailPage />} />
          <Route path="/" element={<div>home</div>} />
        </Routes>
      </HashRouter>
    </LanguageProvider>,
  )
}

test('renders project detail for known slug', () => {
  renderAt(projects[0].slug)
  expect(screen.getByText(projects[0].title)).toBeInTheDocument()
  expect(screen.getByText(projects[0].stack[0])).toBeInTheDocument()
})

test('redirects unknown slug to home', () => {
  renderAt(undefined)
  expect(screen.getByText('home')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/ProjectDetailPage.test.tsx`
Expected: FAIL | module not found.

- [ ] **Step 3: Implement ProjectDetailPage**

```tsx
import { Link, Navigate, useParams } from 'react-router'
import { projects } from '../data/content'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal } from '../components/Reveal'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const { t } = useLanguage()
  const project = projects.find((p) => p.slug === slug)

  if (!project) return <Navigate to="/" replace />

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-6 py-24">
      <Link to="/" className="font-mono text-sm text-paper-dim hover:text-term transition-colors">
        ← {t({ tr: 'geri', en: 'back' })}
      </Link>
      <p className="mt-8 font-mono text-xs text-term">~/gokaybaz/projects/{project.slug}</p>
      <h1 className="mt-2 text-4xl font-bold">{project.title}</h1>
      <Reveal>
        <p className="mt-6 text-paper-dim">{t(project.description)}</p>
        {project.detail && <p className="mt-4 leading-relaxed text-paper-dim">{t(project.detail)}</p>}
        {project.highlights && (
          <ul className="mt-8 space-y-2">
            {project.highlights[t === undefined ? 'tr' : document.documentElement.lang === 'en' ? 'en' : 'tr'].map((h) => (
              <li key={h} className="font-mono text-sm text-paper-dim">
                <span className="text-term">$ </span>{h}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="border border-line px-2 py-0.5 font-mono text-xs text-paper-dim">{s}</span>
          ))}
        </div>
        <div className="mt-8 flex gap-4">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="font-mono text-sm text-term hover:underline">GitHub ↗</a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="font-mono text-sm text-term hover:underline">{t({ tr: 'canlı demo ↗', en: 'live demo ↗' })}</a>
          )}
        </div>
      </Reveal>
    </div>
  )
}
```

NOTE: the highlights line above is intentionally awkward | implement cleanly instead: use `const { lang, t } = useLanguage()` and `project.highlights[lang].map(...)`. Do not copy that expression verbatim.

- [ ] **Step 4: Add route**

`App.tsx`:

```tsx
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import ProjectDetailPage from './pages/ProjectDetailPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/project/:slug" element={<ProjectDetailPage />} />
    </Routes>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run test/ProjectDetailPage.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 6: Full verify + commit**

Run: `npx vitest run && npm run build`
Expected: all PASS, build OK.
```bash
git add -A && git commit -m "feat: project detail pages with slug routing and 404 redirect"
```

---

### Task 8: Test cleanup + final verification

**Files:**
- Modify: move `src/App.test.tsx` → `test/App.test.tsx`; update its import to render full app through `main`-equivalent tree (LanguageProvider + HashRouter already inside App if Task 5 wired them | assert section anchors render)
- Modify: `README.md` | brief run/test instructions

**Interfaces:**
- Consumes: everything prior. No new APIs.

- [ ] **Step 1: Ensure App test reflects real structure**

Update `test/App.test.tsx` so it renders `<App />` inside `HashRouter` (App no longer contains router) and asserts: home renders hero name "Gökay Baz" and projects section anchor `#projects` exists in DOM.

- [ ] **Step 2: README**

Brief README: project intro, `pnpm install`, `pnpm dev`, `pnpm test`, `pnpm build`, content editing pointer to `src/data/content.ts`.

- [ ] **Step 3: Full verification**

Run: `npx vitest run && npm run build`
Expected: all tests PASS, build succeeds with no type errors.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: test cleanup, readme, final verification"
```

---

## Self-Review

- **Spec coverage:** TR/EN toggle (T2), terminal/infra theme tokens (T1), all sections (T5–T6), project detail pages w/ HashRouter (T7), content data w/ live demos + featured flag (T3), reveal animations (T4), hero network effect (T5), unknown-slug redirect (T7), blog placeholder (T6), tests + build (all). Deploy: out of scope per spec. ✓
- **Placeholder scan:** Task 5 Step 3 and Task 6 Steps 1/3/4 describe layouts without full code | these are visual components where the plan gives precise structure + class conventions; executor has tokens, data shapes, and one fully-coded exemplar (ProjectCard) to follow. Task 7 Step 3 includes a deliberate anti-pattern warning with the correct approach stated. Acceptable.
- **Type consistency:** `useLanguage()` returns `{ lang, setLang, t }` used identically everywhere; `Project.detail?: Dict` consumed in T7; `ProjectCard` imports `Project` type; `highlights[lang]` pattern corrected in T7. ✓
