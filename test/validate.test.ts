import { defaultContent } from '../src/data/content'
import { findMissingFields } from '../src/admin/validate'

test('complete document has no missing fields', () => {
  expect(findMissingFields(defaultContent)).toEqual([])
})

test('detects empty required fields', () => {
  const doc = {
    ...defaultContent,
    projects: [
      {
        ...defaultContent.projects[0],
        slug: '',
        title: { tr: '', en: '' },
        description: { tr: 'x', en: 'y' },
      },
      ...defaultContent.projects.slice(1),
    ],
    experience: [
      { ...defaultContent.experience[0], company: '' },
      ...defaultContent.experience.slice(1),
    ],
  }
  const missing = findMissingFields(doc)
  expect(missing).toContainEqual({ section: 'Proje 1', label: 'Slug' })
  expect(missing).toContainEqual({ section: 'Proje 1', label: 'Başlık' })
  expect(missing).toContainEqual({ section: 'Deneyim 1', label: 'Şirket' })
  expect(missing).not.toContainEqual({ section: 'Proje 1', label: 'Açıklama' })
})
