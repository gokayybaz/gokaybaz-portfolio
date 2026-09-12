import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router'
import App from '../src/App'
import { LanguageProvider } from '../src/i18n/LanguageContext'

test('home renders hero name and project sections', () => {
  render(
    <HashRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </HashRouter>,
  )
  expect(screen.getByText('Gökay Baz')).toBeInTheDocument()
  expect(screen.getByText('BT Altyapı & Yazılım Uzmanı')).toBeInTheDocument()
  expect(screen.getByText('Fabrika İç Portalı')).toBeInTheDocument()
  expect(screen.getByText('bazNTMS')).toBeInTheDocument()
  expect(screen.getByText(/Teknik yetenekler/)).toBeInTheDocument()
  expect(screen.getByText('Çukurova Üniversitesi')).toBeInTheDocument()
  expect(screen.getByText(/Referanslar/)).toBeInTheDocument()
  expect(screen.queryByText(/Vite \+ React ile/)).not.toBeInTheDocument()
})
