import type { Article, ContentDocument, Lang, Project } from '../data/content'
import { localizedPath, stripLocalePrefix } from '../routing/locale'

export interface AlternateUrl {
  lang: Lang
  url: string
}

export interface SeoMetadata {
  title: string
  description: string
  canonical: string
  lang: Lang
  ogType: 'website' | 'article'
  ogImage: string
  robots: string
  alternateUrls: AlternateUrl[]
  jsonLd: Record<string, unknown>[]
}

const HOME_TITLE: Record<Lang, string> = {
  tr: 'Gökay Baz | BT Altyapı ve Sistem Uzmanı',
  en: 'Gökay Baz | IT Infrastructure and Systems Specialist',
}

const HOME_DESCRIPTION: Record<Lang, string> = {
  tr: 'Gökay Baz; üretim ortamlarında BT altyapısı, IT/OT, ERP entegrasyonu ve platform geliştirme sorumluluğu alan uzman.',
  en: 'Gökay Baz is a specialist who owns IT infrastructure, IT/OT, ERP integration and platform development in manufacturing environments.',
}

function absoluteUrl(siteUrl: string, path: string): string {
  return `${siteUrl.replace(/\/$/, '')}${path === '/' ? '/' : path}`
}

function normalizePublicPath(path: string): string {
  const legacyProject = path.match(/^\/project\/([^/]+)$/)?.[1]
  return legacyProject ? `/projeler/${legacyProject}` : path
}

function localizedTitle(title: { tr: string; en: string }, lang: Lang): string {
  return `${title[lang]} | Gökay Baz`
}

function getRouteTitle(path: string, content: ContentDocument, lang: Lang): string {
  if (path === '/') return HOME_TITLE[lang]
  if (path === '/hakkimda') return lang === 'tr' ? 'Hakkımda | Gökay Baz' : 'About | Gökay Baz'
  if (path === '/deneyim') return lang === 'tr' ? 'Deneyim | Gökay Baz' : 'Experience | Gökay Baz'
  if (path === '/iletisim') return lang === 'tr' ? 'İletişim | Gökay Baz' : 'Contact | Gökay Baz'
  if (path === '/projeler') return lang === 'tr' ? 'Projeler | Gökay Baz' : 'Projects | Gökay Baz'
  if (path === '/yazilar') return lang === 'tr' ? 'Teknik Yazılar | Gökay Baz' : 'Technical Articles | Gökay Baz'

  const projectSlug = path.match(/^\/(?:projeler|project)\/([^/]+)$/)?.[1]
  if (projectSlug) {
    const project = content.projects.find((item) => item.slug === projectSlug)
    if (project) return localizedTitle(project.title, lang)
  }

  const expertiseSlug = path.match(/^\/uzmanlik\/([^/]+)$/)?.[1]
  if (expertiseSlug) {
    const page = content.expertisePages.find((item) => item.slug === expertiseSlug)
    if (page) return page.seo.title[lang]
  }

  const articleSlug = path.match(/^\/yazilar\/([^/]+)$/)?.[1]
  if (articleSlug) {
    const article = content.articles.find((item) => item.slug === articleSlug)
    if (article) return article.seo.title[lang]
  }

  return HOME_TITLE[lang]
}

function getRouteDescription(path: string, content: ContentDocument, lang: Lang): string {
  if (path === '/') return HOME_DESCRIPTION[lang]
  if (path === '/hakkimda') return content.profile[lang].split('\n')[0]
  if (path === '/deneyim') {
    return lang === 'tr'
      ? 'Üretim tesisinde BT altyapısı, sistem işletimi ve dijitalleşme deneyimi.'
      : 'Experience operating IT infrastructure, systems and digitalization in a manufacturing site.'
  }
  if (path === '/iletisim') {
    return lang === 'tr'
      ? 'Pozisyonlar ve profesyonel iş birlikleri için Gökay Baz ile iletişime geçin.'
      : 'Contact Gökay Baz for positions and professional collaborations.'
  }
  if (path === '/projeler') {
    return lang === 'tr'
      ? 'Üretim, ERP, BT operasyonu ve platform geliştirme projelerinden gerçek vaka çalışmaları.'
      : 'Real case studies across manufacturing, ERP, IT operations and platform development.'
  }
  if (path === '/yazilar') {
    return lang === 'tr'
      ? 'BT altyapısı, IT/OT, üretim dijitalleşmesi ve güvenilir yazılım işletimi üzerine teknik yazılar.'
      : 'Technical articles about IT infrastructure, IT/OT, manufacturing digitalization and reliable software operations.'
  }

  const projectSlug = path.match(/^\/(?:projeler|project)\/([^/]+)$/)?.[1]
  if (projectSlug) {
    const project = content.projects.find((item) => item.slug === projectSlug)
    if (project) return project.description[lang]
  }

  const expertiseSlug = path.match(/^\/uzmanlik\/([^/]+)$/)?.[1]
  if (expertiseSlug) {
    const page = content.expertisePages.find((item) => item.slug === expertiseSlug)
    if (page) return page.seo.description[lang]
  }

  const articleSlug = path.match(/^\/yazilar\/([^/]+)$/)?.[1]
  if (articleSlug) {
    const article = content.articles.find((item) => item.slug === articleSlug)
    if (article) return article.seo.description[lang]
  }

  return HOME_DESCRIPTION[lang]
}

function getPageLabel(path: string, content: ContentDocument, lang: Lang): string {
  const projectSlug = path.match(/^\/(?:projeler|project)\/([^/]+)$/)?.[1]
  const project = projectSlug && content.projects.find((item) => item.slug === projectSlug)
  if (project) return project.title[lang]

  const expertiseSlug = path.match(/^\/uzmanlik\/([^/]+)$/)?.[1]
  const expertise = expertiseSlug && content.expertisePages.find((item) => item.slug === expertiseSlug)
  if (expertise) return expertise.title[lang]

  const articleSlug = path.match(/^\/yazilar\/([^/]+)$/)?.[1]
  const article = articleSlug ? content.articles.find((item) => item.slug === articleSlug) : undefined
  if (article) return article.title[lang]

  const labels: Record<string, Record<Lang, string>> = {
    '/hakkimda': { tr: 'Hakkımda', en: 'About' },
    '/deneyim': { tr: 'Deneyim', en: 'Experience' },
    '/iletisim': { tr: 'İletişim', en: 'Contact' },
    '/projeler': { tr: 'Projeler', en: 'Projects' },
    '/yazilar': { tr: 'Yazılar', en: 'Articles' },
  }
  return labels[path]?.[lang] ?? HOME_TITLE[lang]
}

function personJsonLd(content: ContentDocument, siteUrl: string, lang: Lang): Record<string, unknown> {
  return {
    '@type': 'Person',
    '@id': `${siteUrl.replace(/\/$/, '')}/#person`,
    name: content.site.name,
    url: absoluteUrl(siteUrl, localizedPath(lang, '/')),
    image: absoluteUrl(siteUrl, content.site.avatarCandidates[0]),
    jobTitle: content.site.title[lang],
    description: HOME_DESCRIPTION[lang],
    sameAs: Object.values(content.site.socials).filter((value) => value.startsWith('http')),
    address: { '@type': 'PostalAddress', addressLocality: content.site.location[lang], addressCountry: 'TR' },
  }
}

function breadcrumbJsonLd(path: string, content: ContentDocument, siteUrl: string, lang: Lang): Record<string, unknown> {
  const items: Record<string, unknown>[] = [
    { '@type': 'ListItem', position: 1, name: 'Gökay Baz', item: absoluteUrl(siteUrl, localizedPath(lang, '/')) },
  ]
  if (path !== '/') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: getPageLabel(path, content, lang),
      item: absoluteUrl(siteUrl, localizedPath(lang, path)),
    })
  }
  return { '@type': 'BreadcrumbList', itemListElement: items }
}

export function buildJsonLd(pathname: string, content: ContentDocument, siteUrl: string): Record<string, unknown>[] {
  const { lang, path } = stripLocalePrefix(pathname)
  const nodes: Record<string, unknown>[] = [
    personJsonLd(content, siteUrl, lang),
    {
      '@type': 'WebSite',
      '@id': `${siteUrl.replace(/\/$/, '')}/#website`,
      name: 'Gökay Baz',
      url: absoluteUrl(siteUrl, localizedPath(lang, '/')),
      inLanguage: lang,
      publisher: { '@id': `${siteUrl.replace(/\/$/, '')}/#person` },
    },
  ]

  const projectSlug = path.match(/^\/(?:projeler|project)\/([^/]+)$/)?.[1]
  const project = projectSlug && content.projects.find((item) => item.slug === projectSlug)
  if (project) {
    nodes.push(projectJsonLd(project, siteUrl, lang))
  } else {
    const articleSlug = path.match(/^\/yazilar\/([^/]+)$/)?.[1]
    const article = articleSlug && content.articles.find((item) => item.slug === articleSlug)
    if (article) nodes.push(articleJsonLd(article, siteUrl, lang))
    else if (path === '/' || ['/hakkimda', '/deneyim'].includes(path)) {
      nodes.push({
        '@type': 'ProfilePage',
        '@id': absoluteUrl(siteUrl, localizedPath(lang, path)),
        url: absoluteUrl(siteUrl, localizedPath(lang, path)),
        name: getRouteTitle(path, content, lang),
        mainEntity: { '@id': `${siteUrl.replace(/\/$/, '')}/#person` },
      })
    }
  }

  if (path !== '/') nodes.push(breadcrumbJsonLd(path, content, siteUrl, lang))
  return nodes
}

function projectJsonLd(project: Project, siteUrl: string, lang: Lang): Record<string, unknown> {
  return {
    '@type': 'CreativeWork',
    '@id': absoluteUrl(siteUrl, localizedPath(lang, `/projeler/${project.slug}`)),
    name: project.title[lang],
    description: project.description[lang],
    url: absoluteUrl(siteUrl, localizedPath(lang, `/projeler/${project.slug}`)),
    creator: { '@id': `${siteUrl.replace(/\/$/, '')}/#person` },
    keywords: project.stack,
  }
}

function articleJsonLd(article: Article, siteUrl: string, lang: Lang): Record<string, unknown> {
  return {
    '@type': 'Article',
    '@id': absoluteUrl(siteUrl, localizedPath(lang, `/yazilar/${article.slug}`)),
    headline: article.title[lang],
    description: article.seo.description[lang],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    url: absoluteUrl(siteUrl, localizedPath(lang, `/yazilar/${article.slug}`)),
    author: { '@id': `${siteUrl.replace(/\/$/, '')}/#person` },
    isPartOf: { '@id': `${siteUrl.replace(/\/$/, '')}/#website` },
    keywords: article.keywords[lang],
  }
}

export function getSeoMetadata(pathname: string, content: ContentDocument, siteUrl: string): SeoMetadata {
  const { lang, path: rawPath } = stripLocalePrefix(pathname)
  const path = normalizePublicPath(rawPath)
  const canonical = absoluteUrl(siteUrl, localizedPath(lang, path))
  const articleSlug = path.match(/^\/yazilar\/([^/]+)$/)?.[1]
  const article = articleSlug ? content.articles.find((item) => item.slug === articleSlug) : undefined
  const expertiseSlug = path.match(/^\/uzmanlik\/([^/]+)$/)?.[1]
  const expertise = expertiseSlug ? content.expertisePages.find((item) => item.slug === expertiseSlug) : undefined
  const noindex = rawPath.startsWith('/admin') || Boolean(article?.seo.noindex) || Boolean(expertise?.seo.noindex)

  return {
    title: getRouteTitle(path, content, lang),
    description: getRouteDescription(path, content, lang),
    canonical,
    lang,
    ogType: article ? 'article' : 'website',
    ogImage: absoluteUrl(siteUrl, content.site.avatarCandidates[0]),
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    alternateUrls: [
      { lang: 'tr', url: absoluteUrl(siteUrl, localizedPath('tr', path)) },
      { lang: 'en', url: absoluteUrl(siteUrl, localizedPath('en', path)) },
    ],
    jsonLd: noindex ? [] : buildJsonLd(localizedPath(lang, path), content, siteUrl),
  }
}
