import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useContent } from '../content/ContentContext'
import { getSeoMetadata } from '../seo/metadata'

const SITE_URL = 'https://gokaybaz.com'

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    element.dataset.seoManaged = 'true'
    document.head.appendChild(element)
  }
  element.content = content
}

function setLink(rel: string, href: string, attributes: Record<string, string> = {}) {
  const selector = Object.entries(attributes)
    .map(([key, value]) => `[${key}="${value}"]`)
    .join('')
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]${selector}`)
  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value)
    element.dataset.seoManaged = 'true'
    document.head.appendChild(element)
  }
  element.href = href
}

export function SeoHead() {
  const location = useLocation()
  const content = useContent()

  useEffect(() => {
    const metadata = getSeoMetadata(location.pathname, content, SITE_URL)
    document.documentElement.lang = metadata.lang
    document.title = metadata.title
    setMeta('name', 'description', metadata.description)
    setMeta('name', 'robots', metadata.robots)
    setMeta('property', 'og:title', metadata.title)
    setMeta('property', 'og:description', metadata.description)
    setMeta('property', 'og:type', metadata.ogType)
    setMeta('property', 'og:url', metadata.canonical)
    setMeta('property', 'og:image', metadata.ogImage)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setLink('canonical', metadata.canonical)

    document.head.querySelectorAll('link[data-seo-managed="true"][rel="alternate"]').forEach((element) => element.remove())
    for (const alternate of metadata.alternateUrls) {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = alternate.lang
      link.href = alternate.url
      link.dataset.seoManaged = 'true'
      document.head.appendChild(link)
    }

    document.head.querySelector('script[data-seo-managed="true"]')?.remove()
    if (metadata.jsonLd.length > 0) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.seoManaged = 'true'
      script.textContent = JSON.stringify(metadata.jsonLd)
      document.head.appendChild(script)
    }
  }, [content, location.pathname])

  return null
}
