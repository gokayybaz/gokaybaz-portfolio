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
  expect(screen.getByText('bazntms')).toBeInTheDocument()
  expect(screen.getByText('Binboğa e-Commerce')).toBeInTheDocument()
})
