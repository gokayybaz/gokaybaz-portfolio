// @vitest-environment node
import { mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { defaultContent } from '../src/data/content'
import { createStore } from './store'

test('migrates persisted content that predates SEO collections', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'gk-store-'))
  const dataFile = path.join(dir, 'content.json')
  const legacy = { ...defaultContent }
  delete (legacy as Partial<typeof legacy>).expertisePages
  delete (legacy as Partial<typeof legacy>).articles
  await writeFile(dataFile, JSON.stringify(legacy), 'utf8')

  const content = await createStore(dataFile).read()
  expect(content.expertisePages).toEqual(defaultContent.expertisePages)
  expect(content.articles).toEqual(defaultContent.articles)
})

test('falls back to validated defaults when persisted content is malformed', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'gk-store-invalid-'))
  const dataFile = path.join(dir, 'content.json')
  await writeFile(dataFile, JSON.stringify({ site: { name: 'broken' } }), 'utf8')

  const content = await createStore(dataFile).read()
  expect(content.site.name).toBe(defaultContent.site.name)
  expect(content.articles.length).toBe(defaultContent.articles.length)
})
