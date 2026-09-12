import { slugify } from '../src/admin/slugify'

test('slugify transliterates turkish characters', () => {
  expect(slugify('Bilgi İşlem Yönetim Sistemi')).toBe('bilgi-islem-yonetim-sistemi')
})

test('slugify strips special characters and collapses dashes', () => {
  expect(slugify('  ERP -- Proxy & API!  ')).toBe('erp-proxy-api')
})

test('slugify handles empty text', () => {
  expect(slugify('')).toBe('')
})
