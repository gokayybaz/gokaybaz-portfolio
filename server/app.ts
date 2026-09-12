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
