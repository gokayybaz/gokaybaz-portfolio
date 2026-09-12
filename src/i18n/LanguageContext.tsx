import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'tr' | 'en'
export type Dict = { tr: string; en: string }

interface LanguageValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (dict: Dict) => string
}

const LanguageContext = createContext<LanguageValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('gk-lang')
    return saved === 'en' || saved === 'tr' ? saved : 'tr'
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('gk-lang', l)
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t = (dict: Dict) => dict[lang]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
