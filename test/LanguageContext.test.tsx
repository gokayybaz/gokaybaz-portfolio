import { render, screen, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { LanguageProvider, useLanguage } from '../src/i18n/LanguageContext'

function Probe() {
  const { lang, setLang, t } = useLanguage()
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="text">{t({ tr: 'merhaba', en: 'hello' })}</span>
      <button onClick={() => setLang('en')}>switch</button>
    </div>
  )
}

test('defaults to tr and switches to en', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    </MemoryRouter>,
  )
  expect(screen.getByTestId('lang')).toHaveTextContent('tr')
  expect(screen.getByTestId('text')).toHaveTextContent('merhaba')
  act(() => {
    screen.getByText('switch').click()
  })
  expect(screen.getByTestId('lang')).toHaveTextContent('en')
  expect(screen.getByTestId('text')).toHaveTextContent('hello')
  expect(localStorage.getItem('gk-lang')).toBe('en')
})

test('keeps the canonical root URL Turkish regardless of localStorage', () => {
  localStorage.setItem('gk-lang', 'en')
  render(
    <MemoryRouter initialEntries={['/']}>
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    </MemoryRouter>,
  )
  expect(screen.getByTestId('lang')).toHaveTextContent('tr')
})

test('uses the browser URL as the language source', () => {
  render(
    <MemoryRouter initialEntries={['/en']}>
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    </MemoryRouter>,
  )
  expect(screen.getByTestId('lang')).toHaveTextContent('en')
  expect(document.documentElement.lang).toBe('en')
})
