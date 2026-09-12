// @vitest-environment node
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import bcrypt from 'bcryptjs'
import request from 'supertest'
import { createApp, type AppConfig } from './app'
import { contentSchema, projectSchema } from './schema'
import { defaultContent } from '../src/data/content'

let PASSWORD_HASH: string

beforeAll(async () => {
  PASSWORD_HASH = await bcrypt.hash('password', 10)
})

async function makeApp() {
  const dir = await mkdtemp(path.join(tmpdir(), 'gk-'))
  const config: AppConfig = {
    dataFile: path.join(dir, 'content.json'),
    passwordHash: PASSWORD_HASH,
    jwtSecret: 'test-secret',
    uploadsDir: path.join(dir, 'uploads'),
  }
  return createApp(config)
}

test('GET /api/content seeds and returns default content', async () => {
  const app = await makeApp()
  const res = await request(app).get('/api/content')
  expect(res.status).toBe(200)
  expect(res.body.site.name).toBe('Gökay Baz')
  expect(res.body.projects).toHaveLength(5)
})

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
  const app = createApp({ dataFile, passwordHash, jwtSecret: 's', uploadsDir: path.join(dir, 'uploads') })
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

test('content schema accepts SEO pages and articles', () => {
  const extended = {
    ...defaultContent,
    expertisePages: [
      {
        slug: 'bt-altyapi',
        title: { tr: 'BT Altyapı', en: 'IT Infrastructure' },
        summary: { tr: 'Özet', en: 'Summary' },
        body: { tr: '## Kapsam', en: '## Scope' },
        seo: {
          title: { tr: 'BT Altyapı | Gökay Baz', en: 'IT Infrastructure | Gökay Baz' },
          description: { tr: 'Açıklama', en: 'Description' },
          excerpt: { tr: 'Kısa özet', en: 'Short summary' },
          updatedAt: '2026-09-12',
        },
        relatedProjectSlugs: ['factory-portal'],
        relatedArticleSlugs: ['first-article'],
        updatedAt: '2026-09-12',
      },
    ],
    articles: [
      {
        slug: 'first-article',
        title: { tr: 'İlk yazı', en: 'First article' },
        excerpt: { tr: 'Özet', en: 'Summary' },
        body: { tr: '# İçerik', en: '# Content' },
        category: { tr: 'BT', en: 'IT' },
        keywords: { tr: ['BT'], en: ['IT'] },
        seo: {
          title: { tr: 'İlk yazı | Gökay Baz', en: 'First article | Gökay Baz' },
          description: { tr: 'Açıklama', en: 'Description' },
          excerpt: { tr: 'Kısa özet', en: 'Short summary' },
          updatedAt: '2026-09-12',
        },
        publishedAt: '2026-09-12',
        updatedAt: '2026-09-12',
        relatedProjectSlugs: ['factory-portal'],
      },
    ],
  }

  expect(contentSchema.safeParse(extended).success).toBe(true)

  const invalid = structuredClone(extended)
  invalid.expertisePages[0].seo.title = undefined
  expect(contentSchema.safeParse(invalid).success).toBe(false)
})

test('content schema rejects unsafe public slugs', () => {
  expect(projectSchema.safeParse({ ...defaultContent.projects[0], slug: 'bad/slug' }).success).toBe(false)
  expect(projectSchema.safeParse({ ...defaultContent.projects[0], slug: 'Bad Slug' }).success).toBe(false)
})
