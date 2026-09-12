import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { ContentProvider } from '../src/content/ContentContext'
import { LanguageProvider } from '../src/i18n/LanguageContext'
import { ExpertisePage } from '../src/pages/ExpertisePage'
import { defaultContent } from '../src/data/content'

function renderAt(slug = defaultContent.expertisePages[0].slug) {
  return render(
    <MemoryRouter initialEntries={[`/uzmanlik/${slug}`]}>
      <LanguageProvider>
        <ContentProvider>
          <Routes>
            <Route path="/uzmanlik/:slug" element={<ExpertisePage />} />
            <Route path="/" element={<div>home</div>} />
          </Routes>
        </ContentProvider>
      </LanguageProvider>
    </MemoryRouter>,
  )
}

test('renders expertise summary, body and related project links', () => {
  renderAt()
  expect(screen.getByRole('heading', { level: 1, name: 'BT Altyapı ve Sistem Yönetimi' })).toBeInTheDocument()
  expect(screen.getByText(/Üretim ortamlarında ağ, sunucu/)).toBeInTheDocument()
  expect(screen.getByText('Bilgi İşlem Yönetim Sistemi')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /Pozisyonlar ve profesyonel iş birlikleri/ })).toBeInTheDocument()
})

test('redirects an unknown expertise slug to the home route', () => {
  renderAt('missing-expertise')
  expect(screen.getByText('home')).toBeInTheDocument()
})
