import type { Lang } from '../data/content'

export function getLangFromPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'tr'
}

export function stripLocalePrefix(pathname: string): { lang: Lang; path: string } {
  if (getLangFromPath(pathname) === 'en') {
    const path = pathname.slice(3)
    return { lang: 'en', path: path || '/' }
  }
  return { lang: 'tr', path: pathname || '/' }
}

export function localizedPath(lang: Lang, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (lang === 'tr') return normalized === '/en' ? '/' : normalized.replace(/^\/en(?=\/|$)/, '') || '/'
  const withoutLocale = normalized.replace(/^\/en(?=\/|$)/, '') || '/'
  return withoutLocale === '/' ? '/en' : `/en${withoutLocale}`
}
