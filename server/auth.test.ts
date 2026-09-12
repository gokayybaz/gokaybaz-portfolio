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
    uploadsDir: path.join(dir, 'uploads'),
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
