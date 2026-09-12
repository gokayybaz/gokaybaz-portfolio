import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import express, { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { contentSchema } from './schema'
import { createStore } from './store'

export interface AppConfig {
  dataFile: string
  passwordHash: string
  jwtSecret: string
  uploadsDir: string
}

const IMAGE_MIMES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif']

export function createApp(config: AppConfig) {
  const store = createStore(config.dataFile)
  const app = express()
  app.use(express.json({ limit: '2mb' }))
  app.use(cookieParser())

  const upload = multer({
    storage: multer.diskStorage({
      destination: config.uploadsDir,
      filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase() || '.png'
        cb(null, `${randomUUID()}${ext}`)
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      if (IMAGE_MIMES.includes(file.mimetype)) return cb(null, true)
      cb(new Error('INVALID_TYPE'))
    },
  })

  app.use('/uploads', express.static(config.uploadsDir, { fallthrough: false }))

  app.get('/api/content', async (_req, res) => {
    try {
      res.json(await store.read())
    } catch {
      res.status(500).json({ error: 'content read failed' })
    }
  })

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

  app.post('/api/admin/upload', requireAuth, (req, res) => {
    upload.single('file')(req, res, (err) => {
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ error: 'file too large' })
      }
      if (err) return res.status(400).json({ error: 'invalid file' })
      const file = req.file
      if (!file) return res.status(400).json({ error: 'no file provided' })
      res.json({ url: `/uploads/${file.filename}` })
    })
  })

  return app
}
