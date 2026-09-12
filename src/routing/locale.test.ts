import { getLangFromPath, localizedPath, stripLocalePrefix } from './locale'

test('resolves English only from the /en URL prefix', () => {
  expect(getLangFromPath('/')).toBe('tr')
  expect(getLangFromPath('/hakkimda')).toBe('tr')
  expect(getLangFromPath('/en')).toBe('en')
  expect(getLangFromPath('/en/projeler/factory-portal')).toBe('en')
  expect(getLangFromPath('/english')).toBe('tr')
})

test('builds localized public paths without hash fragments', () => {
  expect(localizedPath('tr', '/projeler/factory-portal')).toBe('/projeler/factory-portal')
  expect(localizedPath('en', '/projeler/factory-portal')).toBe('/en/projeler/factory-portal')
  expect(localizedPath('en', '/')).toBe('/en')
})

test('strips the English prefix before route matching', () => {
  expect(stripLocalePrefix('/')).toEqual({ lang: 'tr', path: '/' })
  expect(stripLocalePrefix('/en')).toEqual({ lang: 'en', path: '/' })
  expect(stripLocalePrefix('/en/yazilar')).toEqual({ lang: 'en', path: '/yazilar' })
})
