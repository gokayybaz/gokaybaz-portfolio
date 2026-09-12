import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router'
import App from './App'
import { LanguageProvider } from './i18n/LanguageContext'

test('renders placeholder', () => {
  render(
    <HashRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </HashRouter>,
  )
  expect(screen.getByText('Gökay Baz')).toBeInTheDocument()
})
