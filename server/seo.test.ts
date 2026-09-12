// @vitest-environment node
import { defaultContent } from '../src/data/content'
import { buildJsonLd, getSeoMetadata } from '../src/seo/metadata'
import { renderSeoHead } from './seo'

const SITE_URL = 'https://gokaybaz.com'

test('builds project metadata without hash URLs', () => {
  const metadata = getSeoMetadata('/projeler/factory-portal', defaultContent, SITE_URL)
  expect(metadata.title).toContain('Fabrika İç Portalı')
  expect(metadata.canonical).toBe(`${SITE_URL}/projeler/factory-portal`)
  expect(metadata.canonical).not.toContain('#')
})

test('builds article JSON-LD with person and breadcrumb entities', () => {
  const articlePath = '/yazilar/erp-entegrasyonunda-guvenilirlik'
  const nodes = buildJsonLd(articlePath, defaultContent, SITE_URL)
  expect(nodes.some((node) => node['@type'] === 'Article')).toBe(true)
  expect(nodes.some((node) => node['@type'] === 'Person')).toBe(true)
  expect(nodes.some((node) => node['@type'] === 'BreadcrumbList')).toBe(true)
})

test('uses editable SEO titles and honors expertise noindex', () => {
  const content = structuredClone(defaultContent)
  content.expertisePages[0].seo.title.tr = 'Özel BT Altyapı Başlığı'
  content.expertisePages[0].seo.noindex = true
  const metadata = getSeoMetadata('/uzmanlik/bt-altyapi', content, SITE_URL)
  expect(metadata.title).toBe('Özel BT Altyapı Başlığı')
  expect(metadata.robots).toBe('noindex, nofollow')
  expect(metadata.jsonLd).toEqual([])
})

test('canonicalizes legacy project routes to /projeler', () => {
  const metadata = getSeoMetadata('/project/factory-portal', defaultContent, SITE_URL)
  expect(metadata.canonical).toBe(`${SITE_URL}/projeler/factory-portal`)
})

test('injects escaped metadata and JSON-LD into the HTML shell', () => {
  const metadata = getSeoMetadata('/', defaultContent, SITE_URL)
  const html = renderSeoHead(
    '<html lang="__LANG__"><head><title>Fallback</title><meta name="description" content="Fallback" /></head></html>',
    metadata,
  )
  expect(html).toContain('<html lang="tr">')
  expect(html).toContain(`<title>${metadata.title}</title>`)
  expect(html).toContain('application/ld+json')
  expect(html).toContain('canonical')
})
