import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promises as fs } from 'node:fs'
import bcrypt from 'bcryptjs'
import express from 'express'
import { createApp } from './app'
import { createStore } from './store'
import { getSeoMetadata } from '../src/seo/metadata'
import { renderSeoHead } from './seo'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')
const dataFile = process.env.CONTENT_FILE ?? path.join(__dirname, 'data', 'content.json')
const contentStore = createStore(dataFile)

const passwordHash =
  process.env.ADMIN_PASSWORD_HASH ?? bcrypt.hashSync(process.env.ADMIN_PASSWORD ?? 'admin', 10)

const app = createApp({
  dataFile,
  passwordHash,
  jwtSecret: process.env.JWT_SECRET ?? 'dev-secret-change-me',
  uploadsDir: path.join(__dirname, 'data', 'uploads'),
  contentStore,
})

app.use(express.static(distDir, { index: false }))
app.use(async (req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api')) return next()
  try {
    const [html, content] = await Promise.all([
      fs.readFile(path.join(distDir, 'index.html'), 'utf8'),
      contentStore.read(),
    ])
    const metadata = getSeoMetadata(req.path, content, process.env.SITE_URL ?? 'https://gokaybaz.com')
    res.type('html').send(renderSeoHead(html, metadata))
  } catch {
    res.sendFile(path.join(distDir, 'index.html'))
  }
})

const port = Number(process.env.PORT ?? 8787)
app.listen(port, () => {
  console.log(`server listening on :${port}`)
})
