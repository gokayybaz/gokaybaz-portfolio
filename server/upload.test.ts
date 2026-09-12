// @vitest-environment node
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import bcrypt from 'bcryptjs'
import request from 'supertest'
import { createApp } from './app'

let passwordHash: string
let dir: string

beforeAll(async () => {
  dir = await mkdtemp(path.join(tmpdir(), 'gk-upload-'))
  passwordHash = await bcrypt.hash('password', 10)
})

function makeAgent() {
  const agent = request.agent(
    createApp({
      dataFile: path.join(dir, 'content.json'),
      passwordHash,
      jwtSecret: 's',
      uploadsDir: path.join(dir, 'uploads'),
    }),
  )
  return agent
}

function pngBuffer(): Buffer {
  return Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64',
  )
}

test('upload requires auth', async () => {
  const res = await request(
    createApp({
      dataFile: path.join(dir, 'c.json'),
      passwordHash,
      jwtSecret: 's',
      uploadsDir: path.join(dir, 'uploads'),
    }),
  ).post('/api/admin/upload')
  expect(res.status).toBe(401)
})

test('upload accepts png and returns public url', async () => {
  const agent = makeAgent()
  await agent.post('/api/admin/login').send({ password: 'password' })
  const res = await agent
    .post('/api/admin/upload')
    .attach('file', pngBuffer(), { filename: 'test.png', contentType: 'image/png' })
  expect(res.status).toBe(200)
  expect(res.body.url).toMatch(/^\/uploads\/[a-f0-9-]+\.webp$/)

  const served = await agent.get(res.body.url)
  expect(served.status).toBe(200)
  expect(served.headers['content-type']).toContain('image/webp')
})

test('upload rejects non-image types', async () => {
  const agent = makeAgent()
  await agent.post('/api/admin/login').send({ password: 'password' })
  const res = await agent
    .post('/api/admin/upload')
    .attach('file', Buffer.from('hello'), { filename: 'x.txt', contentType: 'text/plain' })
  expect(res.status).toBe(400)
})

test('upload rejects files over 5MB', async () => {
  const agent = makeAgent()
  await agent.post('/api/admin/login').send({ password: 'password' })
  const big = Buffer.alloc(5 * 1024 * 1024 + 1, 0)
  const res = await agent
    .post('/api/admin/upload')
    .attach('file', big, { filename: 'big.png', contentType: 'image/png' })
  expect(res.status).toBe(413)
})
