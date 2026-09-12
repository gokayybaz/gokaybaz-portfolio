import type { SeoMetadata } from '../src/seo/metadata'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function headTags(metadata: SeoMetadata): string {
  const alternates = metadata.alternateUrls
    .map(
      ({ lang, url }) =>
        `<link rel="alternate" hreflang="${escapeHtml(lang)}" href="${escapeHtml(url)}" data-seo-managed="true" />`,
    )
    .join('')
  const jsonLd = JSON.stringify(metadata.jsonLd).replace(/<\//g, '<\\/')
  return [
    `<meta name="robots" content="${escapeHtml(metadata.robots)}" data-seo-managed="true" />`,
    `<link rel="canonical" href="${escapeHtml(metadata.canonical)}" data-seo-managed="true" />`,
    `<meta property="og:title" content="${escapeHtml(metadata.title)}" data-seo-managed="true" />`,
    `<meta property="og:description" content="${escapeHtml(metadata.description)}" data-seo-managed="true" />`,
    `<meta property="og:type" content="${escapeHtml(metadata.ogType)}" data-seo-managed="true" />`,
    `<meta property="og:url" content="${escapeHtml(metadata.canonical)}" data-seo-managed="true" />`,
    `<meta property="og:image" content="${escapeHtml(metadata.ogImage)}" data-seo-managed="true" />`,
    `<meta name="twitter:card" content="summary_large_image" data-seo-managed="true" />`,
    alternates,
    `<script type="application/ld+json" data-seo-managed="true">${jsonLd}</script>`,
  ].join('')
}

export function renderSeoHead(html: string, metadata: SeoMetadata): string {
  const withLang = html.replace(/<html(?:\s+lang="[^"]*")?/, `<html lang="${escapeHtml(metadata.lang)}"`)
  const withTitle = withLang.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(metadata.title)}</title>`)
  const withDescription = withTitle.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>(\s*)/i,
    `<meta name="description" content="${escapeHtml(metadata.description)}" />$1`,
  )
  const withoutManagedTags = withDescription.replace(/\s*<[^>]+data-seo-managed="true"[^>]*>/g, '')
  return withoutManagedTags.replace('</head>', `${headTags(metadata)}</head>`)
}
