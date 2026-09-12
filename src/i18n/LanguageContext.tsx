import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { getLangFromPath, localizedPath, stripLocalePrefix } from '../routing/locale'

export type Lang = 'tr' | 'en'
export type Dict = { tr: string; en: string }

interface LanguageValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (dict: Dict) => string
}

const LanguageContext = createContext<LanguageValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const lang = getLangFromPath(location.pathname)

  const setLang = (l: Lang) => {
    localStorage.setItem('gk-lang', l)
    const { path } = stripLocalePrefix(location.pathname)
    navigate(localizedPath(l, path))
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
