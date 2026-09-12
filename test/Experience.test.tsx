import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Experience } from '../src/components/Experience'
import { LanguageProvider } from '../src/i18n/LanguageContext'

test('shows a readable summary and keeps technical details collapsed', () => {
  render(
    <LanguageProvider>
      <Experience />
    </LanguageProvider>,
  )

  expect(screen.getByText(/Üretim tesisinin ağ ve sistem altyapısını/)).toBeInTheDocument()
  expect(screen.getAllByText('$ teknik detayları göster')).toHaveLength(3)
  expect(screen.getAllByRole('list')[0]).toBeInTheDocument()
})

test('reveals technical details on demand', async () => {
  render(
    <LanguageProvider>
      <Experience />
    </LanguageProvider>,
  )

  await userEvent.click(screen.getAllByText('$ teknik detayları göster')[0])
  expect(screen.getByText(/Üretim tesisinin ağ ve internet erişimini/)).toBeInTheDocument()
})
