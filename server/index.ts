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
