import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { ContentProvider } from '../src/content/ContentContext'
import { LanguageProvider } from '../src/i18n/LanguageContext'
import { ArticlePage } from '../src/pages/ArticlePage'
import { defaultContent } from '../src/data/content'

test('renders an article with dates, markdown content and related projects', () => {
  const article = defaultContent.articles[0]
  render(
    <MemoryRouter initialEntries={[`/yazilar/${article.slug}`]}>
      <LanguageProvider>
        <ContentProvider>
          <Routes>
            <Route path="/yazilar/:slug" element={<ArticlePage />} />
          </Routes>
        </ContentProvider>
      </LanguageProvider>
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { level: 1, name: article.title.tr })).toBeInTheDocument()
  expect(screen.getByText(article.publishedAt)).toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 2, name: 'Önceliklendirme' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Bilgi İşlem Yönetim Sistemi' })).toBeInTheDocument()
})
