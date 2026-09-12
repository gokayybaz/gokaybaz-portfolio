import { promises as fs } from 'node:fs'
import path from 'node:path'
import { defaultContent, type ContentDocument } from '../src/data/content'

export function createStore(dataFile: string) {
  let cache: ContentDocument | null = null

  async function write(doc: ContentDocument): Promise<void> {
    await fs.mkdir(path.dirname(dataFile), { recursive: true })
    const tmp = `${dataFile}.tmp`
    await fs.writeFile(tmp, JSON.stringify(doc, null, 2), 'utf8')
    await fs.rename(tmp, dataFile)
    cache = doc
  }

  async function read(): Promise<ContentDocument> {
    if (cache) return cache
    try {
      cache = JSON.parse(await fs.readFile(dataFile, 'utf8')) as ContentDocument
      return cache
    } catch {
      await write(defaultContent)
      return defaultContent
    }
  }

  return { read, write }
}

export type ContentStore = ReturnType<typeof createStore>
