import type { ContentDocument, Project } from '../data/content'

export interface MissingField {
  section: string
  label: string
}

const REQUIRED_PROJECT_FIELDS: Array<[keyof Project, string]> = [
  ['slug', 'Slug'],
  ['title', 'Başlık'],
  ['description', 'Açıklama'],
]

function isEmpty(value: unknown): boolean {
  if (typeof value === 'string') return value.trim() === ''
  if (value == null) return true
  if (Array.isArray(value)) return false
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>
    return 'tr' in record && typeof record.tr === 'string' && record.tr.trim() === ''
  }
  return false
}

export function findMissingFields(doc: ContentDocument): MissingField[] {
  const missing: MissingField[] = []

  for (const [field, label] of REQUIRED_PROJECT_FIELDS) {
    doc.projects.forEach((project, i) => {
      if (isEmpty(project[field])) missing.push({ section: `Proje ${i + 1}`, label })
    })
  }

  doc.experience.forEach((e, i) => {
    if (!e.company.trim()) missing.push({ section: `Deneyim ${i + 1}`, label: 'Şirket' })
    if (!e.period.tr.trim() || !e.period.en.trim()) missing.push({ section: `Deneyim ${i + 1}`, label: 'Dönem' })
  })

  doc.skillGroups.forEach((g, i) => {
    if (!g.title.tr.trim() || !g.title.en.trim()) missing.push({ section: `Grup ${i + 1}`, label: 'Grup başlığı' })
  })

  doc.education.forEach((e, i) => {
    if (!e.institution.trim()) missing.push({ section: `Eğitim ${i + 1}`, label: 'Kurum' })
    if (!e.program.tr.trim()) missing.push({ section: `Eğitim ${i + 1}`, label: 'Program' })
  })

  if (!doc.site.name.trim()) missing.push({ section: 'Site Bilgileri', label: 'İsim' })
  if (!doc.profile.tr.trim()) missing.push({ section: 'Hakkımda', label: 'Profil metni' })

  const projectSlugs = new Set(doc.projects.map((project) => project.slug))
  const articleSlugs = new Set(doc.articles.map((article) => article.slug))

  function addDuplicateSlugFields(items: { slug: string }[], label: string) {
    const seen = new Set<string>()
    items.forEach((item, index) => {
      if (seen.has(item.slug) && item.slug.trim()) missing.push({ section: `${label} ${index + 1}`, label: 'Tekrarlanan slug' })
      seen.add(item.slug)
    })
  }

  addDuplicateSlugFields(doc.projects, 'Proje')
  addDuplicateSlugFields(doc.expertisePages, 'Uzmanlık')
  addDuplicateSlugFields(doc.articles, 'Yazı')

  doc.expertisePages.forEach((page, i) => {
    const section = `Uzmanlık ${i + 1}`
    if (!page.slug.trim()) missing.push({ section, label: 'Slug' })
    if (!page.title.tr.trim() || !page.title.en.trim()) missing.push({ section, label: 'Başlık' })
    if (!page.summary.tr.trim() || !page.summary.en.trim()) missing.push({ section, label: 'Özet' })
    if (!page.body.tr.trim() || !page.body.en.trim()) missing.push({ section, label: 'İçerik' })
    if (!page.seo.title.tr.trim()) missing.push({ section, label: 'SEO başlığı (TR)' })
    if (!page.seo.title.en.trim()) missing.push({ section, label: 'SEO başlığı (EN)' })
    if (!page.seo.description.tr.trim() || !page.seo.description.en.trim()) missing.push({ section, label: 'SEO açıklaması' })
    for (const slug of page.relatedProjectSlugs) {
      if (!projectSlugs.has(slug)) missing.push({ section, label: 'İlgili proje slug' })
    }
    for (const slug of page.relatedArticleSlugs) {
      if (!articleSlugs.has(slug)) missing.push({ section, label: 'İlgili yazı slug' })
    }
  })

  doc.articles.forEach((article, i) => {
    const section = `Yazı ${i + 1}`
    if (!article.slug.trim()) missing.push({ section, label: 'Slug' })
    if (!article.title.tr.trim() || !article.title.en.trim()) missing.push({ section, label: 'Başlık' })
    if (!article.excerpt.tr.trim() || !article.excerpt.en.trim()) missing.push({ section, label: 'Özet' })
    if (!article.body.tr.trim() || !article.body.en.trim()) missing.push({ section, label: 'İçerik' })
    if (!article.seo.title.tr.trim()) missing.push({ section, label: 'SEO başlığı (TR)' })
    if (!article.seo.title.en.trim()) missing.push({ section, label: 'SEO başlığı (EN)' })
    if (!article.seo.description.tr.trim() || !article.seo.description.en.trim()) missing.push({ section, label: 'SEO açıklaması' })
    if (!article.publishedAt.trim()) missing.push({ section, label: 'Yayın tarihi' })
    if (!article.updatedAt.trim()) missing.push({ section, label: 'Güncelleme tarihi' })
    for (const slug of article.relatedProjectSlugs) {
      if (!projectSlugs.has(slug)) missing.push({ section, label: 'İlgili proje slug' })
    }
  })

  return missing
}
