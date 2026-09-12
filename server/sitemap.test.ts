// @vitest-environment node
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import bcrypt from 'bcryptjs'
import request from 'supertest'
import { defaultContent } from '../src/data/content'
import { createApp } from './app'
import { getCanonicalUrls, renderLlms, renderRobots, renderSitemap } from './sitemap'

const SITE_URL = 'https://gokaybaz.com'

test('canonical URL list contains public Turkish and English routes', () => {
  const urls = getCanonicalUrls(defaultContent, SITE_URL)
  expect(urls).toContain(`${SITE_URL}/`)
  expect(urls).toContain(`${SITE_URL}/en`)
  expect(urls).toContain(`${SITE_URL}/projeler/factory-portal`)
  expect(urls).toContain(`${SITE_URL}/en/projeler/factory-portal`)
  expect(urls).toContain(`${SITE_URL}/uzmanlik/bt-altyapi`)
  expect(urls).toContain(`${SITE_URL}/yazilar/erp-entegrasyonunda-guvenilirlik`)
  expect(urls.some((url) => url.includes('#'))).toBe(false)
})

test('sitemap escapes URLs and never emits hash routes', () => {
  const xml = renderSitemap([`${SITE_URL}/a?x=1&y=2`, `${SITE_URL}/#/old`])
  expect(xml).toContain('a?x=1&amp;y=2')
  expect(xml).not.toContain('#/old')
  expect(xml).toContain('<urlset')
})

test('robots and llms output expose the intended crawl boundaries', () => {
  const robots = renderRobots(SITE_URL)
  expect(robots).toContain('Disallow: /admin')
  expect(robots).toContain(`${SITE_URL}/sitemap.xml`)

  const llms = renderLlms(defaultContent, SITE_URL)
  expect(llms).toContain('Gökay Baz')
  expect(llms).toContain(`${SITE_URL}/uzmanlik/bt-altyapi`)
  expect(llms).toContain(`${SITE_URL}/yazilar/erp-entegrasyonunda-guvenilirlik`)
})

test('crawler endpoints are public and return the correct content types', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'gk-seo-'))
  const app = createApp({
    dataFile: path.join(dir, 'content.json'),
    passwordHash: await bcrypt.hash('password', 10),
    jwtSecret: 'test-secret',
    uploadsDir: path.join(dir, 'uploads'),
  })

  const sitemap = await request(app).get('/sitemap.xml')
  const robots = await request(app).get('/robots.txt')
  const llms = await request(app).get('/llms.txt')
  expect(sitemap.type).toBe('application/xml')
  expect(robots.type).toBe('text/plain')
  expect(llms.type).toBe('text/plain')
})
