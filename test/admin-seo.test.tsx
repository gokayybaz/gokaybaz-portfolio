import { fireEvent, render, screen } from '@testing-library/react'
import { ArticlesEditor } from '../src/admin/sections/ArticlesEditor'
import { ExpertiseEditor } from '../src/admin/sections/ExpertiseEditor'
import { defaultContent } from '../src/data/content'
import { findMissingFields } from '../src/admin/validate'

test('validation accepts the drafted SEO content', () => {
  expect(findMissingFields(defaultContent)).toEqual([])
})

test('validation reports missing article SEO title and invalid project link', () => {
  const doc = structuredClone(defaultContent)
  doc.articles[0].seo.title.tr = ''
  doc.articles[0].relatedProjectSlugs = ['missing-project']
  const missing = findMissingFields(doc)
  expect(missing).toEqual(expect.arrayContaining([
    { section: 'Yazı 1', label: 'SEO başlığı (TR)' },
    { section: 'Yazı 1', label: 'İlgili proje slug' },
  ]))
})

test('validation reports duplicate public slugs', () => {
  const doc = structuredClone(defaultContent)
  doc.articles[1].slug = doc.articles[0].slug
  doc.expertisePages[1].slug = doc.expertisePages[0].slug
  const missing = findMissingFields(doc)
  expect(missing).toEqual(expect.arrayContaining([
    { section: 'Yazı 2', label: 'Tekrarlanan slug' },
    { section: 'Uzmanlık 2', label: 'Tekrarlanan slug' },
  ]))
})

test('expertise editor updates a bilingual title immutably', () => {
  const setDoc = vi.fn()
  render(<ExpertiseEditor doc={defaultContent} setDoc={setDoc} />)
  fireEvent.change(screen.getAllByLabelText('Başlık (TR)')[0], { target: { value: 'Güncel başlık' } })
  expect(setDoc).toHaveBeenCalledWith(expect.objectContaining({
    expertisePages: expect.arrayContaining([
      expect.objectContaining({ title: { tr: 'Güncel başlık', en: defaultContent.expertisePages[0].title.en } }),
    ]),
  }))
})

test('article editor updates a bilingual article body immutably', () => {
  const setDoc = vi.fn()
  render(<ArticlesEditor doc={defaultContent} setDoc={setDoc} />)
  fireEvent.change(screen.getAllByLabelText('İçerik (TR)')[0], { target: { value: '# Yeni içerik' } })
  expect(setDoc).toHaveBeenCalledWith(expect.objectContaining({
    articles: expect.arrayContaining([
      expect.objectContaining({ body: { tr: '# Yeni içerik', en: defaultContent.articles[0].body.en } }),
    ]),
  }))
})
