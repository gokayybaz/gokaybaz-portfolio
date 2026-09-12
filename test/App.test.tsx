import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from '../src/App'
import { LanguageProvider } from '../src/i18n/LanguageContext'

test('home renders hero name and project sections', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </MemoryRouter>,
  )
  expect(screen.getByText('Gökay Baz')).toBeInTheDocument()
  expect(screen.getByText('BT Altyapı & Yazılım Uzmanı')).toBeInTheDocument()
  expect(screen.getByText('Fabrika İç Portalı')).toBeInTheDocument()
  expect(screen.getByText('bazNTMS')).toBeInTheDocument()
  expect(screen.getByText(/Teknik yetenekler/)).toBeInTheDocument()
  expect(screen.getByText('Çukurova Üniversitesi')).toBeInTheDocument()
  expect(screen.getByText('Üretim Tesisinde BT Altyapısı Yönetmek')).toBeInTheDocument()
  expect(screen.queryByText(/Referanslar/)).not.toBeInTheDocument()
  expect(screen.queryByText(/Vite \+ React ile/)).not.toBeInTheDocument()
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  expect(screen.getByRole('navigation', { name: 'Ana navigasyon' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'gokaybaz2000@gmail.com' })).toBeInTheDocument()
})
