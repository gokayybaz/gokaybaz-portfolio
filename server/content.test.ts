// @vitest-environment node
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import bcrypt from 'bcryptjs'
import request from 'supertest'
import { createApp, type AppConfig } from './app'

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
