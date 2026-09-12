# Admin Panel + Dinamik İçerik Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Portfolyo sitesinin tüm içeriğini (`content.ts`'teki her şey) Express + JSON dosya depolamalı bir backend üzerinden yöneten, httpOnly cookie ile korunan `/admin` paneli eklemek.

**Architecture:** Express (TypeScript, `server/` altında) tek JSON dosyasını atomik yazarak saklar; `GET /api/content` herkese açık, admin endpoint'leri JWT httpOnly cookie ile korunur. Frontend yeni `ContentContext` ile API'den içerik çeker, API yoksa `content.ts`'teki gömülü veri fallback. Admin paneli aynı SPA'da `/admin/*` route'ları altında. Prod'da tek Docker container hem API'yi hem build edilmiş SPA'yı servis eder.

**Tech Stack:** Express 5, zod, bcryptjs, jsonwebtoken, cookie-parser (server); React 19 + React Router 8, Vite proxy (dev); Vitest + supertest + @testing-library (test); Docker multi-stage (deploy).

**Spec:** `docs/superpowers/specs/2026-09-12-admin-panel-design.md`

## Global Constraints

- Paket yöneticisi: **pnpm** (`pnpm add`, `pnpm test`, `pnpm build`, `pnpm lint`)
- Linter: oxlint (`pnpm lint`) — her task sonunda temiz olmalı
- Kodda **yorum satırı yok** (mevcut repo kuralı)
- Admin paneli UI metinleri **Türkçe** (site TR/EN ama panel tek dil)
- Mevcut testler (`pnpm test`) her task sonunda geçmeli
- `tsc -b` (`pnpm build`) her task sonunda hatasız olmalı
- Mevcut tema sınıfları kullanılmalı: `border-line`, `font-mono`, `text-term`, `text-amber`, `text-paper`, `text-paper-dim`, `bg-ink`, `bg-ink-soft`
- Server dosyaları `server/` altında; server `src/data/content.ts`'i import edebilir (saf TS, DOM bağımlılığı yok)
- tsx runtime olarak kullanılacak (`pnpm tsx`); server için ayrı tsc build YOK

## Dosya Haritası

```
server/
  index.ts          # env okuma, static servis, listen
  app.ts            # createApp() factory: tüm route'lar
  store.ts          # JSON dosya okuma/yazma (atomik) + seed
  schema.ts         # zod ContentDocument şeması
  auth.test.ts      # auth endpoint testleri
  content.test.ts   # content GET/PUT testleri
src/
  data/content.ts            # MODİFY: ContentDocument + defaultContent
  content/ContentContext.tsx # YENİ: içerik provider + useContent
  admin/AdminApp.tsx         # YENİ: admin shell (auth, layout, save)
  admin/LoginPage.tsx        # YENİ
  admin/fields.tsx           # YENİ: DictInput, LinesInput, CommaInput, ArrayControls
  admin/sections/
    ProjectsEditor.tsx
    ExperienceEditor.tsx
    SkillsEditor.tsx
    EducationEditor.tsx
    SiteEditor.tsx
    AboutEditor.tsx
  components/*.tsx           # MODİFY: useContent kullanımı
  pages/*.tsx                # MODİFY: useContent kullanımı
  App.tsx                    # MODİFY: /admin route
  main.tsx                   # MODİFY: ContentProvider
test/
  content-context.test.tsx   # YENİ
  admin-fields.test.tsx      # YENİ
  admin-login.test.tsx       # YENİ
Dockerfile                   # YENİ
docker-compose.yml           # YENİ
```

---

### Task 1: ContentDocument tipi + defaultContent

**Files:**
- Modify: `src/data/content.ts`
- Test: `test/content.test.ts` (mevcut dosyaya test eklenir)

**Interfaces:**
- Produces: `interface SiteContent`, `interface ContentDocument`, `export const defaultContent: ContentDocument` — sonraki tüm task'lar bunları kullanır.

- [ ] **Step 1: content.ts'e SiteContent interface'i ekle**

`Socials` interface'inin üstüne ekle:

```ts
export interface SiteContent {
  name: string
  avatarCandidates: string[]
  location: Dict
  availability: Dict
  phone: string
  title: Dict
  subtitle: Dict
  socials: Socials
}
```

- [ ] **Step 2: `site` sabitini tiplendir**

`export const site = {` satırını `export const site: SiteContent = {` yap.

- [ ] **Step 3: education bloğunun sonuna ContentDocument + defaultContent ekle**

Dosyanın sonuna (mevcut export'lardan sonra) ekle:

```ts
export interface ContentDocument {
  site: SiteContent
  profile: Dict
  aboutTags: string[]
  skillGroups: SkillGroup[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
}

export const defaultContent: ContentDocument = {
  site,
  profile,
  aboutTags,
  skillGroups,
  projects,
  experience,
  education,
}
```

- [ ] **Step 4: test/content.test.ts sonuna test ekle**

```ts
import { defaultContent } from '../src/data/content'

test('defaultContent mirrors the exported content', () => {
  expect(defaultContent.projects).toBe(projects)
  expect(defaultContent.experience).toBe(experience)
  expect(defaultContent.skillGroups).toBe(skillGroups)
  expect(defaultContent.education).toBe(education)
  expect(defaultContent.aboutTags).toBe(aboutTags)
  expect(defaultContent.profile).toBe(about)
  expect(defaultContent.site.name).toBe('Gökay Baz')
})
```

- [ ] **Step 5: Testleri çalıştır**

Run: `pnpm test`
Expected: PASS (yeni test dahil hepsi)

- [ ] **Step 6: Lint + typecheck**

Run: `pnpm lint && pnpm build`
Expected: hatasız

- [ ] **Step 7: Commit**

```bash
git add src/data/content.ts test/content.test.ts
git commit -m "feat: ContentDocument type and defaultContent export"
```

---

### Task 2: Server scaffold — Express + JSON store + GET /api/content

**Files:**
- Create: `server/store.ts`
- Create: `server/app.ts`
- Create: `server/index.ts`
- Test: `server/content.test.ts`

**Interfaces:**
- Consumes: `defaultContent`, `ContentDocument` (Task 1)
- Produces: `createStore(dataFile)` → `{ read(): Promise<ContentDocument>; write(doc): Promise<void> }`; `createApp(config: { dataFile: string; passwordHash: string; jwtSecret: string })` → Express app; `pnpm dev:server` script.

- [ ] **Step 1: Dependency'leri kur**

```bash
pnpm add express bcryptjs jsonwebtoken zod cookie-parser tsx
pnpm add -D supertest @types/express @types/jsonwebtoken @types/cookie-parser @types/supertest
```

Not: `bcryptjs` v3 kendi tipleriyle gelir; `@types/bcryptjs` gerekmez.

- [ ] **Step 2: server/store.ts yaz**

```ts
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { defaultContent, type ContentDocument } from '../src/data/content'

export function createStore(dataFile: string) {
  let cache: ContentDocument | null = null

  async function write(doc: ContentDocument): Promise<void> {
    await fs.mkdir(path.dirname(dataFile), { recursive: true })
    const tmp = `${dataFile}.tmp`
    await fs.writeFile(tmp, JSON.stringify(doc, null, 2), 'utf8')
    await fs.rename(tmp, dataFile)
    cache = doc
  }

  async function read(): Promise<ContentDocument> {
    if (cache) return cache
    try {
      cache = JSON.parse(await fs.readFile(dataFile, 'utf8')) as ContentDocument
      return cache
    } catch {
      await write(defaultContent)
      return defaultContent
    }
  }

  return { read, write }
}

export type ContentStore = ReturnType<typeof createStore>
```

- [ ] **Step 3: Failing test yaz — server/content.test.ts**

```ts
// @vitest-environment node
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import request from 'supertest'
import { createApp } from './app'
import { createStore } from './store'

const PASSWORD_HASH = '$2a$10$CwTycUXWue0Thq9StjUM0uJ8DsAMd4xM8pTn5tS6kZBk4G3wG1nVe' // 'password'
```

Not: bu hash placeholder'dır; test kurulumunda gerçek hash üretilecek (Step 5'teki `beforeAll`). App factory şimdi yazılır:

```ts
async function makeApp() {
  const dir = await mkdtemp(path.join(tmpdir(), 'gk-'))
  return createApp({
    dataFile: path.join(dir, 'content.json'),
    passwordHash: PASSWORD_HASH,
    jwtSecret: 'test-secret',
  })
}

test('GET /api/content seeds and returns default content', async () => {
  const app = await makeApp()
  const res = await request(app).get('/api/content')
  expect(res.status).toBe(200)
  expect(res.body.site.name).toBe('Gökay Baz')
  expect(res.body.projects).toHaveLength(5)
})
```

- [ ] **Step 4: Testin fail ettiğini doğrula**

Run: `pnpm test server/content.test.ts`
Expected: FAIL — `createApp` tanımlı değil

- [ ] **Step 5: server/app.ts yaz (şimdilik auth'suz content route)**

```ts
import express from 'express'
import cookieParser from 'cookie-parser'
import { createStore } from './store'

export interface AppConfig {
  dataFile: string
  passwordHash: string
  jwtSecret: string
}

export function createApp(config: AppConfig) {
  const store = createStore(config.dataFile)
  const app = express()
  app.use(express.json({ limit: '2mb' }))
  app.use(cookieParser())

  app.get('/api/content', async (_req, res) => {
    try {
      res.json(await store.read())
    } catch {
      res.status(500).json({ error: 'content read failed' })
    }
  })

  return app
}
```

Testte hash gerçek olmalı — test dosyasına `beforeAll` ile üretim ekle (Step 3'teki sabiti sil, yerine):

```ts
import bcrypt from 'bcryptjs'

let PASSWORD_HASH: string
beforeAll(async () => {
  PASSWORD_HASH = await bcrypt.hash('password', 10)
})
```

- [ ] **Step 6: server/index.ts yaz**

```ts
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import bcrypt from 'bcryptjs'
import express from 'express'
import { createApp } from './app'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')

const passwordHash =
  process.env.ADMIN_PASSWORD_HASH ?? bcrypt.hashSync(process.env.ADMIN_PASSWORD ?? 'admin', 10)

const app = createApp({
  dataFile: process.env.CONTENT_FILE ?? path.join(__dirname, 'data', 'content.json'),
  passwordHash,
  jwtSecret: process.env.JWT_SECRET ?? 'dev-secret-change-me',
})

app.use(express.static(distDir))
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api')) return next()
  res.sendFile(path.join(distDir, 'index.html'))
})

const port = Number(process.env.PORT ?? 8787)
app.listen(port, () => {
  console.log(`server listening on :${port}`)
})
```

- [ ] **Step 7: package.json script'leri ekle**

```json
"dev:server": "tsx watch server/index.ts",
"start": "tsx server/index.ts"
```

- [ ] **Step 8: Testleri çalıştır**

Run: `pnpm test server/content.test.ts`
Expected: PASS

- [ ] **Step 9: Manuel smoke test**

Run: `pnpm dev:server` (arka planda) + `curl localhost:8787/api/content | head -c 200`
Expected: `{"site":{"name":"Gökay Baz"...` — ve `server/data/content.json` oluşur. Sonrasında server'ı durdur ve `server/data/content.json`'ı sil (test artefaktı, commit edilmez — `.gitignore`'a `server/data/` ekle).

- [ ] **Step 10: Lint + typecheck + tüm testler**

Run: `pnpm lint && pnpm build && pnpm test`
Expected: hepsi PASS. Not: `tsc -b` root tsconfig'i server'ı kapsamıyorsa `pnpm build` yine de geçmeli; server tsconfig'i bu task'ta gerekmiyor (tsx runtime).

- [ ] **Step 11: Commit**

```bash
git add server src package.json .gitignore
git commit -m "feat: express server with JSON content store and public GET /api/content"
```

---

### Task 3: Auth endpoint'leri — login / logout / session

**Files:**
- Modify: `server/app.ts`
- Test: `server/auth.test.ts`

**Interfaces:**
- Consumes: `createApp(config)` (Task 2)
- Produces: `POST /api/admin/login` (body `{ password }` → 200 + `admin_token` httpOnly cookie; 401 yanlış şifre; 429 rate limit), `POST /api/admin/logout` (cookie temizler), `GET /api/admin/session` (cookie → `{ ok: true }`; cookie yok → 401).

- [ ] **Step 1: Failing test yaz — server/auth.test.ts**

```ts
// @vitest-environment node
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import bcrypt from 'bcryptjs'
import request from 'supertest'
import { createApp } from './app'

let app: ReturnType<typeof createApp>
let agent: request.Agent

beforeAll(async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'gk-auth-'))
  const passwordHash = await bcrypt.hash('s3cret-pass', 10)
  app = createApp({
    dataFile: path.join(dir, 'content.json'),
    passwordHash,
    jwtSecret: 'test-secret',
  })
  agent = request.agent(app)
})

test('login rejects wrong password with 401', async () => {
  const res = await agent.post('/api/admin/login').send({ password: 'wrong' })
  expect(res.status).toBe(401)
  expect(res.headers['set-cookie']).toBeUndefined()
})

test('login sets httpOnly cookie on success', async () => {
  const res = await agent.post('/api/admin/login').send({ password: 's3cret-pass' })
  expect(res.status).toBe(200)
  const cookie = res.headers['set-cookie'][0]
  expect(cookie).toContain('admin_token=')
  expect(cookie).toContain('HttpOnly')
  expect(cookie).toContain('SameSite=Strict')
})

test('session requires cookie', async () => {
  const res = await request(app).get('/api/admin/session')
  expect(res.status).toBe(401)
})

test('session accepts valid cookie', async () => {
  const res = await agent.get('/api/admin/session')
  expect(res.status).toBe(200)
  expect(res.body).toEqual({ ok: true })
})

test('logout clears the session', async () => {
  await agent.post('/api/admin/login').send({ password: 's3cret-pass' })
  await agent.post('/api/admin/logout')
  const res = await agent.get('/api/admin/session')
  expect(res.status).toBe(401)
})

test('login rate limits after 5 failures', async () => {
  const fresh = request.agent(app)
  for (let i = 0; i < 5; i++) {
    await fresh.post('/api/admin/login').send({ password: 'wrong' })
  }
  const res = await fresh.post('/api/admin/login').send({ password: 's3cret-pass' })
  expect(res.status).toBe(429)
})
```

Not: rate limit testi aynı IP'den 5 başarısız sonrası 429 döner; diğer testler farklı agent'larda olsa da aynı app instance'ında sayaç paylaşılır — bu yüzden rate limit testi sonda.

- [ ] **Step 2: Testin fail ettiğini doğrula**

Run: `pnpm test server/auth.test.ts`
Expected: FAIL — 404'ler (route'lar yok)

- [ ] **Step 3: app.ts'e auth middleware ve route'ları ekle**

`server/app.ts`'te import'lara ekle:

```ts
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import type { NextFunction, Request, Response } from 'express'
```

`createApp` içine, content route'undan sonra ekle:

```ts
  const COOKIE = 'admin_token'
  const loginAttempts = new Map<string, { count: number; resetAt: number }>()

  function rateLimited(ip: string): boolean {
    const now = Date.now()
    const entry = loginAttempts.get(ip)
    if (!entry || entry.resetAt < now) {
      loginAttempts.set(ip, { count: 1, resetAt: now + 60_000 })
      return false
    }
    entry.count += 1
    return entry.count > 5
  }

  function requireAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.[COOKIE]
    if (!token) return res.status(401).json({ error: 'unauthorized' })
    try {
      jwt.verify(token, config.jwtSecret)
      next()
    } catch {
      res.status(401).json({ error: 'unauthorized' })
    }
  }

  app.post('/api/admin/login', async (req, res) => {
    const ip = req.ip ?? 'unknown'
    if (rateLimited(ip)) return res.status(429).json({ error: 'too many attempts' })
    const password = typeof req.body?.password === 'string' ? req.body.password : ''
    const ok = await bcrypt.compare(password, config.passwordHash)
    if (!ok) return res.status(401).json({ error: 'wrong password' })
    const token = jwt.sign({ role: 'admin' }, config.jwtSecret, { expiresIn: '12h' })
    res.cookie(COOKIE, token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 12 * 60 * 60 * 1000,
    })
    res.json({ ok: true })
  })

  app.post('/api/admin/logout', (_req, res) => {
    res.clearCookie(COOKIE)
    res.json({ ok: true })
  })

  app.get('/api/admin/session', requireAuth, (_req, res) => {
    res.json({ ok: true })
  })
```

- [ ] **Step 4: Testleri çalıştır**

Run: `pnpm test server/auth.test.ts`
Expected: PASS (6 test)

- [ ] **Step 5: Tüm testler + lint + build**

Run: `pnpm test && pnpm lint && pnpm build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add server/app.ts server/auth.test.ts
git commit -m "feat: admin auth with bcrypt, JWT httpOnly cookie and login rate limit"
```

---

### Task 4: PUT /api/admin/content — zod doğrulamalı güncelleme

**Files:**
- Create: `server/schema.ts`
- Modify: `server/app.ts`
- Test: `server/content.test.ts` (test eklenir)

**Interfaces:**
- Consumes: `ContentDocument` (Task 1), `createApp` (Task 2), auth middleware (Task 3)
- Produces: `contentSchema` (zod ZodType<ContentDocument>); `PUT /api/admin/content` (auth gerekli; body geçerli doküman → 200 + yazılmış doküman döner; geçersiz → 400).

- [ ] **Step 1: server/schema.ts yaz**

```ts
import { z } from 'zod'

export const dictSchema = z.object({ tr: z.string(), en: z.string() })
export const biSchema = z.object({ tr: z.array(z.string()), en: z.array(z.string()) })

export const siteSchema = z.object({
  name: z.string(),
  avatarCandidates: z.array(z.string()),
  location: dictSchema,
  availability: dictSchema,
  phone: z.string(),
  title: dictSchema,
  subtitle: dictSchema,
  socials: z.object({
    github: z.string(),
    linkedin: z.string(),
    x: z.string(),
    email: z.string(),
    phone: z.string(),
    medium: z.string(),
  }),
})

export const projectSchema = z.object({
  slug: z.string().min(1),
  title: dictSchema,
  period: dictSchema,
  description: dictSchema,
  detail: dictSchema.optional(),
  highlights: biSchema.optional(),
  stack: z.array(z.string()),
  github: z.string().optional(),
  demo: z.string().optional(),
  featured: z.boolean().optional(),
  metric: dictSchema.optional(),
})

export const experienceSchema = z.object({
  period: dictSchema,
  company: z.string(),
  role: dictSchema,
  points: biSchema,
})

export const skillGroupSchema = z.object({
  title: dictSchema,
  items: z.array(z.string()),
})

export const educationSchema = z.object({
  institution: z.string(),
  program: dictSchema,
  period: z.string(),
  status: dictSchema.optional(),
})

export const contentSchema = z.object({
  site: siteSchema,
  profile: dictSchema,
  aboutTags: z.array(z.string()),
  skillGroups: z.array(skillGroupSchema),
  projects: z.array(projectSchema),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
})
```

- [ ] **Step 2: Failing test ekle — server/content.test.ts sonuna**

```ts
import bcrypt from 'bcryptjs'

test('PUT /api/admin/content requires auth', async () => {
  const app = await makeApp()
  const res = await request(app).put('/api/admin/content').send({})
  expect(res.status).toBe(401)
})

test('PUT /api/admin/content rejects invalid body', async () => {
  const app = await makeApp()
  const agent = request.agent(app)
  await agent.post('/api/admin/login').send({ password: 'password' })
  const res = await agent.put('/api/admin/content').send({ site: 'nope' })
  expect(res.status).toBe(400)
})

test('PUT /api/admin/content persists a valid document', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'gk-put-'))
  const dataFile = path.join(dir, 'content.json')
  const passwordHash = await bcrypt.hash('password', 10)
  const app = createApp({ dataFile, passwordHash, jwtSecret: 's' })
  const agent = request.agent(app)
  await agent.post('/api/admin/login').send({ password: 'password' })

  const original = (await agent.get('/api/content')).body
  const updated = { ...original, aboutTags: ['React', 'Go'] }
  const res = await agent.put('/api/admin/content').send(updated)
  expect(res.status).toBe(200)
  expect(res.body.aboutTags).toEqual(['React', 'Go'])

  const reread = await request(app).get('/api/content')
  expect(reread.body.aboutTags).toEqual(['React', 'Go'])
})
```

Not: mevcut `makeApp`'i kullanmayan üçüncü test kendi dosya yolunu kullanır (kalıcılığı dosyadan doğrulamak için). `bcrypt` ve `path`/`tmpdir`/`mkdtemp` import'ları dosyanın üstüne eklenecek.

- [ ] **Step 3: Testin fail ettiğini doğrula**

Run: `pnpm test server/content.test.ts`
Expected: yeni testler FAIL (PUT route'u yok → 404/401 farkı)

- [ ] **Step 4: app.ts'e PUT route'u ekle**

Import'lara ekle:

```ts
import { contentSchema } from './schema'
```

`session` route'undan sonra ekle:

```ts
  app.get('/api/admin/content', requireAuth, async (_req, res) => {
    res.json(await store.read())
  })

  app.put('/api/admin/content', requireAuth, async (req, res) => {
    const parsed = contentSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: 'invalid content document', issues: parsed.error.issues })
    }
    await store.write(parsed.data)
    res.json(parsed.data)
  })
```

- [ ] **Step 5: Testleri çalıştır**

Run: `pnpm test server/`
Expected: PASS

- [ ] **Step 6: Tüm testler + lint + build**

Run: `pnpm test && pnpm lint && pnpm build`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add server
git commit -m "feat: PUT /api/admin/content with zod-validated full document writes"
```

---

### Task 5: ContentContext + bileşenlerin dinamik içeriğe geçirilmesi

**Files:**
- Create: `src/content/ContentContext.tsx`
- Modify: `src/main.tsx`, `vite.config.ts`
- Modify: `src/components/Hero.tsx`, `About.tsx`, `Projects.tsx`, `Experience.tsx`, `Skills.tsx`, `Education.tsx`, `BlogTeaser.tsx`, `Footer.tsx`
- Modify: `src/pages/ProjectDetailPage.tsx`
- Test: `test/content-context.test.tsx`

**Interfaces:**
- Consumes: `defaultContent` (Task 1), `GET /api/content` (Task 2)
- Produces: `ContentProvider`, `useContent(): ContentDocument` (provider yoksa `defaultContent` döner — bileşenler asla crash etmez)

- [ ] **Step 1: Failing test yaz — test/content-context.test.tsx**

```tsx
import { render, screen, waitFor } from '@testing-library/react'
import { ContentProvider, useContent } from '../src/content/ContentContext'

function Probe() {
  const content = useContent()
  return <p>{content.site.name}</p>
}

test('useContent falls back to defaultContent when API fails', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
  render(
    <ContentProvider>
      <Probe />
    </ContentProvider>,
  )
  expect(screen.getByText('Gökay Baz')).toBeInTheDocument()
  vi.unstubAllGlobals()
})

test('ContentProvider replaces content after a successful fetch', async () => {
  const apiContent = { ...defaultContent, site: { ...defaultContent.site, name: 'Düzenlenmiş İsim' } }
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(apiContent),
  }))
  render(
    <ContentProvider>
      <Probe />
    </ContentProvider>,
  )
  await waitFor(() => expect(screen.getByText('Düzenlenmiş İsim')).toBeInTheDocument())
  vi.unstubAllGlobals()
})
```

Not: test dosyasının üstünde `import { defaultContent } from '../src/data/content'` da olmalı.

- [ ] **Step 2: Testin fail ettiğini doğrula**

Run: `pnpm test test/content-context.test.tsx`
Expected: FAIL — modül bulunamadı

- [ ] **Step 3: src/content/ContentContext.tsx yaz**

```tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { defaultContent, type ContentDocument } from '../data/content'

const ContentContext = createContext<ContentDocument | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentDocument>(defaultContent)

  useEffect(() => {
    fetch('/api/content')
      .then((res) => (res.ok ? res.json() : null))
      .then((doc) => {
        if (doc) setContent(doc as ContentDocument)
      })
      .catch(() => {})
  }, [])

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
}

export function useContent(): ContentDocument {
  return useContext(ContentContext) ?? defaultContent
}
```

- [ ] **Step 4: main.tsx'e provider ekle**

```tsx
import { ContentProvider } from './content/ContentContext'
```

JSX'te `LanguageProvider`'ın içine sar:

```tsx
<LanguageProvider>
  <ContentProvider>
    <App />
  </ContentProvider>
</LanguageProvider>
```

- [ ] **Step 5: vite.config.ts'e dev proxy ekle**

`defineConfig` içinde `test` bloğunun yanına:

```ts
server: {
  proxy: {
    '/api': 'http://localhost:8787',
  },
},
```

- [ ] **Step 6: Bileşenleri refactor et**

Her bileşende aynı desen: direkt import silinir, `useContent()` çağrılır. Örnek — `src/components/Projects.tsx`:

```tsx
import { useContent } from '../content/ContentContext'
```

```tsx
const { projects } = useContent()
```

(`const { t } = useLanguage()` satırının altına ekle; `import { projects } from '../data/content'` silinir.)

Diğer dosyalarda değişen import → hook çiftleri:

| Dosya | Silinen import | Yeni |
|---|---|---|
| `Hero.tsx` | `site` | `const { site } = useContent()` |
| `About.tsx` | `about, aboutTags` | `const { profile: about, aboutTags } = useContent()` |
| `Projects.tsx` | `projects` | `const { projects } = useContent()` |
| `Experience.tsx` | `experience` | `const { experience } = useContent()` |
| `Skills.tsx` | `skillGroups` | `const { skillGroups } = useContent()` |
| `Education.tsx` | `education` | `const { education } = useContent()` |
| `BlogTeaser.tsx` | `site` | `const { site } = useContent()` |
| `Footer.tsx` | `site` | `const { site } = useContent()` |
| `ProjectDetailPage.tsx` | `projects` | `const { projects } = useContent()` |

`About.tsx`'te `about` ismi kullanılmaya devam ediyor (mevcut JSX değişmez). `useLanguage` import'ları kalır.

- [ ] **Step 7: Testleri çalıştır**

Run: `pnpm test`
Expected: PASS — mevcut testler (App.test, vs.) fallback sayesinde provider'sız da çalışır (`useContent` provider yoksa `defaultContent` döner)

- [ ] **Step 8: Lint + build**

Run: `pnpm lint && pnpm build`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add src vite.config.ts test/content-context.test.tsx
git commit -m "feat: ContentContext with API fetch and defaultContent fallback"
```

---

### Task 6: Admin shell — routing, layout, auth akışı, login sayfası, kaydet

**Files:**
- Create: `src/admin/AdminApp.tsx`
- Create: `src/admin/LoginPage.tsx`
- Create: `src/admin/api.ts`
- Modify: `src/App.tsx`
- Test: `test/admin-login.test.tsx`

**Interfaces:**
- Consumes: `ContentDocument`, `defaultContent` (Task 1); `POST /api/admin/login`, `GET /api/admin/session`, `GET/PUT /api/admin/content` (Task 3-4)
- Produces: `AdminApp` component (`/admin/*` route'unda); `src/admin/api.ts` → `adminFetch(path, init?)`, `login(password)`, `fetchAdminContent(): Promise<ContentDocument>`, `saveContent(doc): Promise<ContentDocument>`; `type AdminSection = 'projects' | 'experience' | 'skills' | 'education' | 'site' | 'about'`

- [ ] **Step 1: Failing test yaz — test/admin-login.test.tsx**

```tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { AdminApp } from '../src/admin/AdminApp'

function renderAdmin() {
  return render(
    <MemoryRouter initialEntries={['/admin']}>
      <AdminApp />
    </MemoryRouter>,
  )
}

test('shows login form when session is missing', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 401, json: () => Promise.resolve({}) }))
  renderAdmin()
  await waitFor(() => expect(screen.getByLabelText('Şifre')).toBeInTheDocument())
  vi.unstubAllGlobals()
})

test('successful login opens the admin layout', async () => {
  const doc = defaultContent
  vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL) => {
    const url = String(input)
    if (url.endsWith('/api/admin/session')) return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ ok: true }) })
    if (url.endsWith('/api/admin/content')) return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(doc) })
    return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ ok: true }) })
  }))
  renderAdmin()
  await waitFor(() => expect(screen.getByText('Admin Panel')).toBeInTheDocument())
  expect(screen.getByText('Projeler')).toBeInTheDocument()
  vi.unstubAllGlobals()
})
```

Not: `userEvent` import'u sonraki adımlarda kullanılmıyor — bu task'ta iki test yeterli; import satırını ekleme. `defaultContent` için `import { defaultContent } from '../src/data/content'` ekle.

- [ ] **Step 2: Testin fail ettiğini doğrula**

Run: `pnpm test test/admin-login.test.tsx`
Expected: FAIL — modül yok

- [ ] **Step 3: src/admin/api.ts yaz**

```ts
import type { ContentDocument } from '../data/content'

export async function adminFetch(path: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(path, {
    credentials: 'include',
    headers: init?.body ? { 'Content-Type': 'application/json' } : undefined,
    ...init,
  })
  return res
}

export async function login(password: string): Promise<boolean> {
  const res = await adminFetch('/api/admin/login', { method: 'POST', body: JSON.stringify({ password }) })
  return res.ok
}

export async function fetchAdminContent(): Promise<ContentDocument> {
  const res = await adminFetch('/api/admin/content')
  if (!res.ok) throw new Error('content fetch failed')
  return (await res.json()) as ContentDocument
}

export async function saveContent(doc: ContentDocument): Promise<ContentDocument> {
  const res = await adminFetch('/api/admin/content', { method: 'PUT', body: JSON.stringify(doc) })
  if (!res.ok) throw new Error('save failed')
  return (await res.json()) as ContentDocument
}
```

- [ ] **Step 4: src/admin/LoginPage.tsx yaz**

```tsx
import { useState, type FormEvent } from 'react'
import { login } from './api'

export function LoginPage({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const ok = await login(password)
    if (ok) {
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border border-line bg-ink-soft p-8">
        <p className="font-mono text-xs text-term">$ ssh admin@gokaybaz.com</p>
        <h1 className="mt-2 text-xl font-bold text-paper">Admin Giriş</h1>
        <label htmlFor="admin-password" className="mt-6 block font-mono text-xs text-paper-dim">
          Şifre
        </label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setError(false)
          }}
          className="mt-2 w-full border border-line bg-ink px-3 py-2 font-mono text-sm text-paper outline-none focus:border-term"
        />
        {error && <p className="mt-2 font-mono text-xs text-red-400">Şifre hatalı. Erişim reddedildi.</p>}
        <button
          type="submit"
          className="mt-6 w-full border border-term bg-term/10 px-3 py-2 font-mono text-sm text-term transition-colors hover:bg-term/20"
        >
          Giriş yap
        </button>
      </form>
    </div>
  )
}
```

- [ ] **Step 5: src/admin/AdminApp.tsx yaz (kayıt akışı + section navigation; editörler placeholder)**

```tsx
import { useEffect, useState } from 'react'
import { NavLink, Navigate, Route, Routes, useNavigate } from 'react-router'
import { defaultContent, type ContentDocument } from '../data/content'
import { fetchAdminContent, saveContent } from './api'
import { LoginPage } from './LoginPage'

const SECTIONS = [
  { id: 'projects', label: 'Projeler' },
  { id: 'experience', label: 'Deneyim' },
  { id: 'skills', label: 'Yetenekler' },
  { id: 'education', label: 'Eğitim' },
  { id: 'site', label: 'Site Bilgileri' },
  { id: 'about', label: 'Hakkımda' },
] as const

export type AdminSection = (typeof SECTIONS)[number]['id']

function Placeholder({ section }: { section: string }) {
  return <p className="font-mono text-sm text-paper-dim">{section} editörü bu task'ta ekleniyor.</p>
}

export function AdminApp() {
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [doc, setDoc] = useState<ContentDocument>(defaultContent)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/admin/session', { credentials: 'include' })
      .then((res) => setAuthed(res.ok))
      .catch(() => setAuthed(false))
  }, [])

  useEffect(() => {
    if (authed) {
      fetchAdminContent()
        .then(setDoc)
        .catch(() => setMessage('İçerik yüklenemedi.'))
    }
  }, [authed])

  if (authed === null) {
    return <div className="min-h-screen bg-ink" />
  }
  if (!authed) {
    return (
      <LoginPage
        onSuccess={() => {
          setAuthed(true)
          navigate('/admin/projects')
        }}
      />
    )
  }

  async function handleSave() {
    setSaving(true)
    setMessage(null)
    try {
      const saved = await saveContent(doc)
      setDoc(saved)
      setMessage('Kaydedildi.')
    } catch {
      setMessage('Kaydedilemedi.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-ink text-paper">
      <header className="sticky top-0 z-10 border-b border-line bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-6 py-4">
          <span className="font-mono text-sm text-term">~/gokaybaz/admin</span>
          <nav className="flex flex-wrap gap-3 font-mono text-xs">
            {SECTIONS.map((s) => (
              <NavLink
                key={s.id}
                to={`/admin/${s.id}`}
                className={({ isActive }) =>
                  isActive ? 'text-term underline underline-offset-4' : 'text-paper-dim hover:text-term'
                }
              >
                {s.label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            {message && <span className="font-mono text-xs text-amber">{message}</span>}
            <button
              onClick={handleSave}
              disabled={saving}
              className="border border-term bg-term/10 px-3 py-1.5 font-mono text-xs text-term transition-colors hover:bg-term/20 disabled:opacity-50"
            >
              {saving ? 'Kaydediliyor…' : 'Kaydet'}
            </button>
            <a href="/" className="font-mono text-xs text-paper-dim hover:text-term">
              Siteye dön ↗
            </a>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-2xl font-bold text-paper">Admin Panel</h1>
        <Routes>
          <Route index element={<Navigate to="projects" replace />} />
          {SECTIONS.map((s) => (
            <Route key={s.id} path={s.id} element={<Placeholder section={s.label} />} />
          ))}
        </Routes>
      </main>
    </div>
  )
}
```

- [ ] **Step 6: App.tsx'e admin route ekle**

```tsx
import { AdminApp } from './admin/AdminApp'
```

Routes içine:

```tsx
<Route path="/admin/*" element={<AdminApp />} />
```

- [ ] **Step 7: Testleri çalıştır**

Run: `pnpm test test/admin-login.test.tsx`
Expected: PASS (iki test)

- [ ] **Step 8: Tüm testler + lint + build**

Run: `pnpm test && pnpm lint && pnpm build`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add src/admin src/App.tsx test/admin-login.test.tsx
git commit -m "feat: admin shell with session check, login page and save flow"
```

---

### Task 7: Admin form alanı bileşenleri (fields.tsx)

**Files:**
- Create: `src/admin/fields.tsx`
- Test: `test/admin-fields.test.tsx`

**Interfaces:**
- Produces (sonraki editör task'ları bunları kullanır):
  - `DictInput({ label, value: Dict, onChange: (Dict) => void, textarea?: boolean, rows?: number })`
  - `TextInput({ label, value: string, onChange: (string) => void })`
  - `LinesInput({ label, value: string[], onChange: (string[]) => void, placeholder? })` — textarea, satır başına bir öğe
  - `CommaInput({ label, value: string[], onChange: (string[]) => void })` — virgülle ayrılmış
  - `Checkbox({ label, checked, onChange })`
  - `ArrayControls({ onUp?, onDown?, onRemove })`
  - `Panel({ title, children })` — `<details>` tabanlı katlanır kart

- [ ] **Step 1: Failing test yaz — test/admin-fields.test.tsx**

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CommaInput, DictInput, LinesInput } from '../src/admin/fields'

test('DictInput edits both languages', async () => {
  const onChange = vi.fn()
  render(<DictInput label="Başlık" value={{ tr: 'eski', en: 'old' }} onChange={onChange} />)
  await userEvent.type(screen.getByLabelText('Başlık (TR)'), 'x')
  expect(onChange).toHaveBeenCalledWith({ tr: 'eskix', en: 'old' })
  await userEvent.type(screen.getByLabelText('Başlık (EN)'), '!')
  expect(onChange).toHaveBeenLastCalledWith({ tr: 'eski', en: 'old!' })
})

test('LinesInput maps textarea lines to array', async () => {
  const onChange = vi.fn()
  render(<LinesInput label="Maddeler" value={['bir']} onChange={onChange} />)
  await userEvent.type(screen.getByLabelText('Maddeler'), ' iki')
  expect(onChange).toHaveBeenCalledWith(['bir', 'iki'])
})

test('CommaInput maps comma separated text to array', async () => {
  const onChange = vi.fn()
  render(<CommaInput label="Stack" value={['Go']} onChange={onChange} />)
  await userEvent.type(screen.getByLabelText('Stack'), ', Next.js')
  expect(onChange).toHaveBeenCalledWith(['Go', 'Next.js'])
})
```

- [ ] **Step 2: Testin fail ettiğini doğrula**

Run: `pnpm test test/admin-fields.test.tsx`
Expected: FAIL — modül yok

- [ ] **Step 3: src/admin/fields.tsx yaz**

```tsx
import type { ReactNode } from 'react'
import type { Dict } from '../data/content'

const inputClass =
  'mt-1 w-full border border-line bg-ink px-3 py-2 font-mono text-sm text-paper outline-none focus:border-term'
const labelClass = 'block font-mono text-xs text-paper-dim'

export function TextInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    </label>
  )
}

export function DictInput({
  label,
  value,
  onChange,
  textarea,
  rows = 4,
}: {
  label: string
  value: Dict
  onChange: (v: Dict) => void
  textarea?: boolean
  rows?: number
}) {
  const shared = { className: inputClass, rows }
  return (
    <fieldset className="block">
      <legend className={labelClass}>{label}</legend>
      <div className="grid gap-3 md:grid-cols-2">
        <label>
          <span className="font-mono text-[10px] text-term">TR</span>
          {textarea ? (
            <textarea
              {...shared}
              aria-label={`${label} (TR)`}
              value={value.tr}
              onChange={(e) => onChange({ ...value, tr: e.target.value })}
            />
          ) : (
            <input
              className={inputClass}
              aria-label={`${label} (TR)`}
              value={value.tr}
              onChange={(e) => onChange({ ...value, tr: e.target.value })}
            />
          )}
        </label>
        <label>
          <span className="font-mono text-[10px] text-amber">EN</span>
          {textarea ? (
            <textarea
              {...shared}
              aria-label={`${label} (EN)`}
              value={value.en}
              onChange={(e) => onChange({ ...value, en: e.target.value })}
            />
          ) : (
            <input
              className={inputClass}
              aria-label={`${label} (EN)`}
              value={value.en}
              onChange={(e) => onChange({ ...value, en: e.target.value })}
            />
          )}
        </label>
      </div>
    </fieldset>
  )
}

export function LinesInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string[]
  onChange: (v: string[]) => void
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <textarea
        aria-label={label}
        rows={value.length + 1}
        placeholder={placeholder}
        className={inputClass}
        value={value.join('\n')}
        onChange={(e) => onChange(e.target.value.split('\n').filter((line) => line.trim() !== ''))}
      />
    </label>
  )
}

export function CommaInput({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input
        aria-label={label}
        className={inputClass}
        value={value.join(', ')}
        onChange={(e) => onChange(e.target.value.split(',').map((s) => s.trim()).filter((s) => s !== ''))}
      />
    </label>
  )
}

export function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 font-mono text-xs text-paper-dim">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  )
}

export function ArrayControls({ onUp, onDown, onRemove }: { onUp?: () => void; onDown?: () => void; onRemove: () => void }) {
  return (
    <span className="flex gap-1">
      {onUp && (
        <button type="button" onClick={onUp} aria-label="Yukarı taşı" className="border border-line px-2 py-0.5 font-mono text-xs text-paper-dim hover:text-term">
          ↑
        </button>
      )}
      {onDown && (
        <button type="button" onClick={onDown} aria-label="Aşağı taşı" className="border border-line px-2 py-0.5 font-mono text-xs text-paper-dim hover:text-term">
          ↓
        </button>
      )}
      <button type="button" onClick={onRemove} aria-label="Sil" className="border border-line px-2 py-0.5 font-mono text-xs text-red-400 hover:border-red-400">
        ✕
      </button>
    </span>
  )
}

export function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="border border-line bg-ink-soft">
      <summary className="cursor-pointer px-4 py-3 font-mono text-sm text-term">{title}</summary>
      <div className="space-y-4 border-t border-line px-4 py-4">{children}</div>
    </details>
  )
}
```

- [ ] **Step 4: Testleri çalıştır**

Run: `pnpm test test/admin-fields.test.tsx`
Expected: PASS

- [ ] **Step 5: Tüm testler + lint + build**

Run: `pnpm test && pnpm lint && pnpm build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/admin/fields.tsx test/admin-fields.test.tsx
git commit -m "feat: admin form field components for dict, list and array controls"
```

---

### Task 8: ProjectsEditor

**Files:**
- Create: `src/admin/sections/ProjectsEditor.tsx`
- Modify: `src/admin/AdminApp.tsx` (placeholder yerine editör)

**Interfaces:**
- Consumes: `Panel, DictInput, TextInput, LinesInput, CommaInput, Checkbox, ArrayControls` (Task 7); `Project`, `ContentDocument` (Task 1)
- Produces: `ProjectsEditor({ doc, setDoc }: { doc: ContentDocument; setDoc: (doc: ContentDocument) => void })` — AdminApp bu imzayla monteler.

- [ ] **Step 1: src/admin/sections/ProjectsEditor.tsx yaz**

```tsx
import type { ContentDocument, Project } from '../../data/content'
import { ArrayControls, Checkbox, CommaInput, DictInput, LinesInput, Panel, TextInput } from '../fields'

function blankProject(): Project {
  return {
    slug: `yeni-proje-${Date.now()}`,
    title: { tr: '', en: '' },
    period: { tr: '', en: '' },
    description: { tr: '', en: '' },
    stack: [],
  }
}

export function ProjectsEditor({ doc, setDoc }: { doc: ContentDocument; setDoc: (doc: ContentDocument) => void }) {
  const projects = doc.projects

  function update(index: number, patch: Partial<Project>) {
    setDoc({ ...doc, projects: projects.map((p, i) => (i === index ? { ...p, ...patch } : p)) })
  }

  function move(index: number, delta: -1 | 1) {
    const next = [...projects]
    const target = index + delta
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    setDoc({ ...doc, projects: next })
  }

  function remove(index: number) {
    setDoc({ ...doc, projects: projects.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setDoc({ ...doc, projects: [...projects, blankProject()] })}
        className="border border-term bg-term/10 px-3 py-1.5 font-mono text-xs text-term hover:bg-term/20"
      >
        + Yeni proje
      </button>
      {projects.map((project, index) => (
        <Panel key={project.slug} title={`${project.featured ? '★ ' : ''}${project.title.tr || project.slug}`}>
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Slug" value={project.slug} onChange={(v) => update(index, { slug: v })} />
            <div className="flex items-end justify-between gap-2">
              <Checkbox label="Öne çıkan" checked={project.featured ?? false} onChange={(v) => update(index, { featured: v || undefined })} />
              <ArrayControls onUp={index > 0 ? () => move(index, -1) : undefined} onDown={index < projects.length - 1 ? () => move(index, 1) : undefined} onRemove={() => remove(index)} />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <DictInput label="Başlık" value={project.title} onChange={(v) => update(index, { title: v })} />
            <DictInput label="Dönem" value={project.period} onChange={(v) => update(index, { period: v })} />
          </div>
          <DictInput label="Açıklama" value={project.description} onChange={(v) => update(index, { description: v })} />
          <DictInput label="Detay metni (opsiyonel)" value={project.detail ?? { tr: '', en: '' }} textarea rows={6} onChange={(v) => update(index, { detail: v.tr || v.en ? v : undefined })} />
          <DictInput label="Metrik (opsiyonel)" value={project.metric ?? { tr: '', en: '' }} onChange={(v) => update(index, { metric: v.tr || v.en ? v : undefined })} />
          <LinesInput label="Öne çıkanlar — satır başına bir madde (opsiyonel)" value={project.highlights?.tr ?? []} placeholder={'Modbus veri toplama\nERP senkronizasyonu'} onChange={(tr) => update(index, { highlights: { tr, en: project.highlights?.en ?? [] } })} />
          <LinesInput label="Highlights — one per line (EN, opsiyonel)" value={project.highlights?.en ?? []} onChange={(en) => update(index, { highlights: { tr: project.highlights?.tr ?? [], en } })} />
          <div className="grid gap-4 md:grid-cols-2">
            <CommaInput label="Stack" value={project.stack} onChange={(stack) => update(index, { stack })} />
            <div className="grid gap-4">
              <TextInput label="GitHub URL (opsiyonel)" value={project.github ?? ''} onChange={(v) => update(index, { github: v || undefined })} />
              <TextInput label="Demo URL (opsiyonel)" value={project.demo ?? ''} onChange={(v) => update(index, { demo: v || undefined })} />
            </div>
          </div>
        </Panel>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: AdminApp'te placeholder'ı değiştir**

`AdminApp.tsx`'te:

```tsx
import { ProjectsEditor } from './sections/ProjectsEditor'
```

`Placeholder` fonksiyonunu ve kullanımını sil; projects route'unu güncelle:

```tsx
<Route path="projects" element={<ProjectsEditor doc={doc} setDoc={setDoc} />} />
```

Diğer section'lar placeholder olarak kalsın — `SECTIONS`'tan projects çıkarılıp ayrı yazılır:

```tsx
const OTHER_SECTIONS = [
  { id: 'experience', label: 'Deneyim' },
  { id: 'skills', label: 'Yetenekler' },
  { id: 'education', label: 'Eğitim' },
  { id: 'site', label: 'Site Bilgileri' },
  { id: 'about', label: 'Hakkımda' },
] as const
```

Nav'da `[{ id: 'projects', label: 'Projeler' }, ...OTHER_SECTIONS]` döngüsü, Routes'ta projects ayrı + `OTHER_SECTIONS.map(...)` placeholder.

- [ ] **Step 3: Tüm testler + lint + build**

Run: `pnpm test && pnpm lint && pnpm build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/admin
git commit -m "feat: projects editor with reorder, add and remove"
```

---

### Task 9: Experience, Skills, Education editörleri

**Files:**
- Create: `src/admin/sections/ExperienceEditor.tsx`, `SkillsEditor.tsx`, `EducationEditor.tsx`
- Modify: `src/admin/AdminApp.tsx`

**Interfaces:**
- Consumes: Task 7 field'ları, Task 1 tipleri
- Produces: `ExperienceEditor({ doc, setDoc })`, `SkillsEditor({ doc, setDoc })`, `EducationEditor({ doc, setDoc })` — hepsi Task 8'deki `ProjectsEditor` ile aynı imza.

- [ ] **Step 1: ExperienceEditor yaz**

```tsx
import type { ContentDocument, Experience } from '../../data/content'
import { ArrayControls, DictInput, LinesInput, Panel, TextInput } from '../fields'

function blankExperience(): Experience {
  return { period: { tr: '', en: '' }, company: '', role: { tr: '', en: '' }, points: { tr: [], en: [] } }
}

export function ExperienceEditor({ doc, setDoc }: { doc: ContentDocument; setDoc: (doc: ContentDocument) => void }) {
  const items = doc.experience

  function update(index: number, patch: Partial<Experience>) {
    setDoc({ ...doc, experience: items.map((e, i) => (i === index ? { ...e, ...patch } : e)) })
  }

  function move(index: number, delta: -1 | 1) {
    const next = [...items]
    const target = index + delta
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    setDoc({ ...doc, experience: next })
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setDoc({ ...doc, experience: [...items, blankExperience()] })}
        className="border border-term bg-term/10 px-3 py-1.5 font-mono text-xs text-term hover:bg-term/20"
      >
        + Yeni deneyim
      </button>
      {items.map((item, index) => (
        <Panel key={`${item.company}-${index}`} title={item.company || `Deneyim ${index + 1}`}>
          <div className="grid gap-4 md:grid-cols-2">
            <DictInput label="Dönem" value={item.period} onChange={(v) => update(index, { period: v })} />
            <TextInput label="Şirket" value={item.company} onChange={(v) => update(index, { company: v })} />
          </div>
          <DictInput label="Pozisyon" value={item.role} onChange={(v) => update(index, { role: v })} />
          <LinesInput label="Maddeler (TR) — satır başına bir tane" value={item.points.tr} onChange={(tr) => update(index, { points: { ...item.points, tr } })} />
          <LinesInput label="Points (EN) — one per line" value={item.points.en} onChange={(en) => update(index, { points: { ...item.points, en } })} />
          <div className="flex justify-end">
            <ArrayControls onUp={index > 0 ? () => move(index, -1) : undefined} onDown={index < items.length - 1 ? () => move(index, 1) : undefined} onRemove={() => setDoc({ ...doc, experience: items.filter((_, i) => i !== index) })} />
          </div>
        </Panel>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: SkillsEditor yaz**

```tsx
import type { ContentDocument, SkillGroup } from '../../data/content'
import { ArrayControls, CommaInput, DictInput, Panel } from '../fields'

function blankGroup(): SkillGroup {
  return { title: { tr: '', en: '' }, items: [] }
}

export function SkillsEditor({ doc, setDoc }: { doc: ContentDocument; setDoc: (doc: ContentDocument) => void }) {
  const groups = doc.skillGroups

  function update(index: number, patch: Partial<SkillGroup>) {
    setDoc({ ...doc, skillGroups: groups.map((g, i) => (i === index ? { ...g, ...patch } : g)) })
  }

  function move(index: number, delta: -1 | 1) {
    const next = [...groups]
    const target = index + delta
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    setDoc({ ...doc, skillGroups: next })
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setDoc({ ...doc, skillGroups: [...groups, blankGroup()] })}
        className="border border-term bg-term/10 px-3 py-1.5 font-mono text-xs text-term hover:bg-term/20"
      >
        + Yeni grup
      </button>
      {groups.map((group, index) => (
        <Panel key={`${group.title.tr}-${index}`} title={group.title.tr || `Grup ${index + 1}`}>
          <DictInput label="Grup başlığı" value={group.title} onChange={(title) => update(index, { title })} />
          <CommaInput label="Öğeler" value={group.items} onChange={(items) => update(index, { items })} />
          <div className="flex justify-end">
            <ArrayControls onUp={index > 0 ? () => move(index, -1) : undefined} onDown={index < groups.length - 1 ? () => move(index, 1) : undefined} onRemove={() => setDoc({ ...doc, skillGroups: groups.filter((_, i) => i !== index) })} />
          </div>
        </Panel>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: EducationEditor yaz**

```tsx
import type { ContentDocument, Education } from '../../data/content'
import { ArrayControls, DictInput, TextInput } from '../fields'

function blankEducation(): Education {
  return { institution: '', program: { tr: '', en: '' }, period: '' }
}

export function EducationEditor({ doc, setDoc }: { doc: ContentDocument; setDoc: (doc: ContentDocument) => void }) {
  const items = doc.education

  function update(index: number, patch: Partial<Education>) {
    setDoc({ ...doc, education: items.map((e, i) => (i === index ? { ...e, ...patch } : e)) })
  }

  function move(index: number, delta: -1 | 1) {
    const next = [...items]
    const target = index + delta
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    setDoc({ ...doc, education: next })
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setDoc({ ...doc, education: [...items, blankEducation()] })}
        className="border border-term bg-term/10 px-3 py-1.5 font-mono text-xs text-term hover:bg-term/20"
      >
        + Yeni eğitim kaydı
      </button>
      {items.map((item, index) => (
        <Panel key={`${item.institution}-${index}`} title={item.institution || `Eğitim ${index + 1}`}>
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Kurum" value={item.institution} onChange={(v) => update(index, { institution: v })} />
            <TextInput label="Dönem" value={item.period} onChange={(v) => update(index, { period: v })} />
          </div>
          <DictInput label="Program" value={item.program} onChange={(v) => update(index, { program: v })} />
          <DictInput label="Durum (opsiyonel)" value={item.status ?? { tr: '', en: '' }} onChange={(v) => update(index, { status: v.tr || v.en ? v : undefined })} />
          <div className="flex justify-end">
            <ArrayControls onUp={index > 0 ? () => move(index, -1) : undefined} onDown={index < items.length - 1 ? () => move(index, 1) : undefined} onRemove={() => setDoc({ ...doc, education: items.filter((_, i) => i !== index) })} />
          </div>
        </Panel>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: AdminApp'te mount et**

```tsx
import { ExperienceEditor } from './sections/ExperienceEditor'
import { SkillsEditor } from './sections/SkillsEditor'
import { EducationEditor } from './sections/EducationEditor'
```

Routes:

```tsx
<Route path="experience" element={<ExperienceEditor doc={doc} setDoc={setDoc} />} />
<Route path="skills" element={<SkillsEditor doc={doc} setDoc={setDoc} />} />
<Route path="education" element={<EducationEditor doc={doc} setDoc={setDoc} />} />
```

`site` ve `about` placeholder olarak kalır.

- [ ] **Step 5: Tüm testler + lint + build**

Run: `pnpm test && pnpm lint && pnpm build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/admin
git commit -m "feat: experience, skills and education editors"
```

---

### Task 10: Site ve About editörleri

**Files:**
- Create: `src/admin/sections/SiteEditor.tsx`, `AboutEditor.tsx`
- Modify: `src/admin/AdminApp.tsx` — `Placeholder` tamamen silinir

**Interfaces:**
- Consumes: Task 7 field'ları, Task 1 tipleri
- Produces: `SiteEditor({ doc, setDoc })`, `AboutEditor({ doc, setDoc })`

- [ ] **Step 1: SiteEditor yaz**

```tsx
import type { ContentDocument, Socials } from '../../data/content'
import { CommaInput, DictInput, TextInput } from '../fields'

export function SiteEditor({ doc, setDoc }: { doc: ContentDocument; setDoc: (doc: ContentDocument) => void }) {
  const site = doc.site

  function update(patch: Partial<typeof site>) {
    setDoc({ ...doc, site: { ...site, ...patch } })
  }

  function updateSocials(patch: Partial<Socials>) {
    update({ socials: { ...site.socials, ...patch } })
  }

  return (
    <div className="space-y-6">
      <section className="space-y-4 border border-line bg-ink-soft p-6">
        <h2 className="font-mono text-sm text-term">## Kimlik</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput label="İsim" value={site.name} onChange={(name) => update({ name })} />
          <TextInput label="Telefon (tel: linki)" value={site.phone} onChange={(phone) => update({ phone })} />
        </div>
        <DictInput label="Unvan" value={site.title} onChange={(title) => update({ title })} />
        <DictInput label="Alt başlık" value={site.subtitle} onChange={(subtitle) => update({ subtitle })} />
        <DictInput label="Konum" value={site.location} onChange={(location) => update({ location })} />
        <DictInput label="Uygunluk notu" value={site.availability} onChange={(availability) => update({ availability })} />
        <CommaInput label="Avatar aday dosyaları" value={site.avatarCandidates} onChange={(avatarCandidates) => update({ avatarCandidates })} />
      </section>
      <section className="space-y-4 border border-line bg-ink-soft p-6">
        <h2 className="font-mono text-sm text-term">## Sosyal linkler</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput label="GitHub" value={site.socials.github} onChange={(github) => updateSocials({ github })} />
          <TextInput label="LinkedIn" value={site.socials.linkedin} onChange={(linkedin) => updateSocials({ linkedin })} />
          <TextInput label="X" value={site.socials.x} onChange={(x) => updateSocials({ x })} />
          <TextInput label="Medium" value={site.socials.medium} onChange={(medium) => updateSocials({ medium })} />
          <TextInput label="Email (mailto:)" value={site.socials.email} onChange={(email) => updateSocials({ email })} />
          <TextInput label="Telefon (socials)" value={site.socials.phone} onChange={(phone) => updateSocials({ phone })} />
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: AboutEditor yaz**

```tsx
import type { ContentDocument } from '../../data/content'
import { CommaInput, DictInput } from '../fields'

export function AboutEditor({ doc, setDoc }: { doc: ContentDocument; setDoc: (doc: ContentDocument) => void }) {
  return (
    <div className="space-y-6">
      <section className="border border-line bg-ink-soft p-6">
        <h2 className="font-mono text-sm text-term">## Hakkımda metni</h2>
        <p className="mt-1 font-mono text-xs text-paper-dim">Paragraflar boş satır ile ayrılır.</p>
        <div className="mt-4">
          <DictInput label="Profil" value={doc.profile} textarea rows={8} onChange={(profile) => setDoc({ ...doc, profile })} />
        </div>
      </section>
      <section className="border border-line bg-ink-soft p-6">
        <h2 className="font-mono text-sm text-term">## Stack etiketleri</h2>
        <div className="mt-4">
          <CommaInput label="Etiketler" value={doc.aboutTags} onChange={(aboutTags) => setDoc({ ...doc, aboutTags })} />
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 3: AdminApp'te mount et ve Placeholder'ı sil**

```tsx
import { SiteEditor } from './sections/SiteEditor'
import { AboutEditor } from './sections/AboutEditor'
```

```tsx
<Route path="site" element={<SiteEditor doc={doc} setDoc={setDoc} />} />
<Route path="about" element={<AboutEditor doc={doc} setDoc={setDoc} />} />
```

`Placeholder` fonksiyonu dosyadan tamamen kaldırılır.

- [ ] **Step 4: Tüm testler + lint + build**

Run: `pnpm test && pnpm lint && pnpm build`
Expected: PASS

- [ ] **Step 5: Manuel smoke test (tüm panel)**

Ayrı terminallerde: `pnpm dev:server` ve `pnpm dev`. Tarayıcıda `http://localhost:5173/#/admin` → `admin` şifresiyle giriş → projeleri düzenle → Kaydet → ana sayfada değişikliği doğrula.

- [ ] **Step 6: Commit**

```bash
git add src/admin
git commit -m "feat: site and about editors, complete admin panel"
```

---

### Task 11: Docker + compose + README

**Files:**
- Create: `Dockerfile`, `docker-compose.yml`, `.dockerignore`
- Modify: `README.md`, `.gitignore` (zaten Task 2'de `server/data/` eklendi)

- [ ] **Step 1: Dockerfile yaz**

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:22-alpine
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY --from=build /app/dist ./dist
COPY server ./server
COPY src ./src
COPY tsconfig.json tsconfig.app.json ./
ENV NODE_ENV=production
EXPOSE 3000
CMD ["pnpm", "start"]
```

Not: `tsx` runtime'da gerekli olduğu için prod install'da devDependency'ler düşürülmemeli — `--prod` yerine tam install kullan:

```dockerfile
RUN pnpm install --frozen-lockfile
```

(İkinci stage'de `--prod` satırı bununla değiştirilir.)

- [ ] **Step 2: .dockerignore yaz**

```
node_modules
dist
server/data
.git
test
docs
```

- [ ] **Step 3: docker-compose.yml yaz**

```yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - ADMIN_PASSWORD_HASH=${ADMIN_PASSWORD_HASH:?set ADMIN_PASSWORD_HASH in .env}
      - JWT_SECRET=${JWT_SECRET:?set JWT_SECRET in .env}
    volumes:
      - ./server/data:/app/server/data
    restart: unless-stopped
```

Not: hash üretmek için: `node -e "console.log(require('bcryptjs').hashSync(process.argv[1],10))" 'SIFRENIZ'`. VPS'te `.env` dosyasına `ADMIN_PASSWORD_HASH` ve `JWT_SECRET` yazılır (`chmod 600 .env`).

- [ ] **Step 4: README.md güncelle**

README'ye şu bölümü ekle:

```markdown
## Admin Panel & Dinamik İçerik

Site içeriği (`/admin`) panelinden yönetilir. Panelde projeler, deneyim, yetenekler,
eğitim, site bilgileri, hakkımda metni ve sosyal linkler düzenlenebilir.

### Lokal geliştirme

```bash
pnpm dev:server   # API :8787 (varsayılan şifre: admin)
pnpm dev          # Vite :5173, /api proxy'si :8787'e
```

Panel: `http://localhost:5173/#/admin` — şifre env'den gelir
(`ADMIN_PASSWORD` veya `ADMIN_PASSWORD_HASH` yoksa `admin`).

### Üretim (Docker)

```bash
node -e "console.log(require('bcryptjs').hashSync('SIFRENIZ',10))"  # hash üret
echo "ADMIN_PASSWORD_HASH=<hash>" >> .env
echo "JWT_SECRET=<rastgele-uzun-dizgi>" >> .env
docker compose up -d --build
```

Site `:3000`'de servis edilir; içerik `server/data/content.json`'da kalıcıdır
(volume mount). API erişilemezse site bundle'a gömülü varsayılan içerikle çalışır.
```

- [ ] **Step 5: Lint + test + build**

Run: `pnpm lint && pnpm test && pnpm build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add Dockerfile docker-compose.yml .dockerignore README.md
git commit -m "feat: docker deployment for server and admin panel"
```

---

### Task 12: Final doğrulama

**Files:** yok (yalnızca doğrulama)

- [ ] **Step 1: Tam test + lint + typecheck + build**

Run: `pnpm lint && pnpm test && pnpm build`
Expected: hepsi PASS

- [ ] **Step 2: Prod smoke test**

```bash
pnpm build
ADMIN_PASSWORD=deneme123 pnpm start &
sleep 2
curl -s localhost:8787/api/content | head -c 120
curl -s -X POST localhost:8787/api/admin/login -H 'Content-Type: application/json' -d '{"password":"deneme123"}' -i | head -12
```

Expected: ilk curl JSON döner; ikincisi `200` + `Set-Cookie: admin_token=...; HttpOnly`. Sonra server'ı durdur.

- [ ] **Step 3: Docker build (lokalde)**

Run: `docker build -t gokaybaz-portfolio .`
Expected: hatasız tamamlanır (Docker kuruluysa; kurulu değilse bu adım atlanır ve kullanıcıya not edilir)

- [ ] **Step 4: git status temiz mi kontrol et**

Run: `git status`
Expected: çalışma dizini temiz (tüm task'lar commit'lenmiş)

---

## Self-Review Notları

- **Spec coverage:** content.ts'teki her alan (site, profile, aboutTags, skillGroups, projects, experience, education) → Task 1 (tip) + Task 8-10 (editörler). Auth (bcrypt+JWT+cookie+rate limit) → Task 3. Zod validasyon → Task 4. Fallback → Task 5. Docker → Task 11. Hepsi karşılanıyor.
- **Placeholder scan:** Task 6'daki `Placeholder` bileşeni geçici bir UI öğesidir (Task 8-10'da gerçek editörlerle değiştirilir) — plan eksik bırakma değil, kademeli geliştirme adımı.
- **Type consistency:** `AdminSection` tipi tanımlı ama kullanılmıyor olabilir; editör imzaları `{ doc, setDoc }` olarak tüm task'larda tutarlı. `createApp(config)` Task 2'de tanımlanır, Task 3-4 aynı imzayla genişletir.
