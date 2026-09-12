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

  return missing
}
