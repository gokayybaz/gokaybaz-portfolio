import { render, screen, act } from '@testing-library/react'
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
    <LanguageProvider>
      <Probe />
    </LanguageProvider>,
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

test('restores lang from localStorage', () => {
  localStorage.setItem('gk-lang', 'en')
  render(
    <LanguageProvider>
      <Probe />
    </LanguageProvider>,
  )
  expect(screen.getByTestId('lang')).toHaveTextContent('en')
})
