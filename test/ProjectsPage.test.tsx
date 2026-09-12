import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { ContentProvider } from '../src/content/ContentContext'
import { LanguageProvider } from '../src/i18n/LanguageContext'
import ProjectsPage from '../src/pages/ProjectsPage'

test('renders a crawlable project index with detail links', () => {
  render(
    <MemoryRouter initialEntries={['/projeler']}>
      <LanguageProvider>
        <ContentProvider>
          <Routes>
            <Route path="/projeler" element={<ProjectsPage />} />
          </Routes>
        </ContentProvider>
      </LanguageProvider>
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { level: 1, name: 'Projeler' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /Fabrika İç Portalı/ })).toHaveAttribute('href', '/projeler/factory-portal')
})
