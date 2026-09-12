import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { defaultContent, type ContentDocument } from '../data/content'

const ContentContext = createContext<ContentDocument | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentDocument>(defaultContent)

  useEffect(() => {
    fetch('/api/content')
      .then((res) => (res.ok ? res.json() : null))
      .then((doc) => {
        if (doc) setContent(doc as ContentDocument)
      })
      .catch(() => {})
  }, [])

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
}

export function useContent(): ContentDocument {
  return useContext(ContentContext) ?? defaultContent
}
