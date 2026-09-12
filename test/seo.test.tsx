import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { ContentProvider } from '../src/content/ContentContext'
import { SeoHead } from '../src/components/SeoHead'

function renderHead(pathname: string) {
  return render(
    <MemoryRouter initialEntries={[pathname]}>
      <ContentProvider>
        <SeoHead />
      </ContentProvider>
    </MemoryRouter>,
  )
}

test('sets Turkish home metadata and canonical URL', () => {
  renderHead('/')
  expect(document.title).toBe('Gökay Baz | BT Altyapı ve Sistem Uzmanı')
  expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://gokaybaz.com/')
  expect(document.documentElement.lang).toBe('tr')
})

test('sets English metadata from the /en URL', () => {
  renderHead('/en')
  expect(document.title).toBe('Gökay Baz | IT Infrastructure and Systems Specialist')
  expect(document.querySelector('link[rel="alternate"][hreflang="tr"]')).toHaveAttribute(
    'href',
    'https://gokaybaz.com/',
  )
  expect(document.documentElement.lang).toBe('en')
})
