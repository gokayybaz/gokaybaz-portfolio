import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { MobileMenu } from '../src/components/MobileMenu'
import { LanguageProvider } from '../src/i18n/LanguageContext'

const LINKS = [
  { id: 'about', label: 'Hakkımda' },
  { id: 'projects', label: 'Projeler' },
]

function renderMenu(props: Parameters<typeof MobileMenu>[0]) {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <MobileMenu {...props} />
      </LanguageProvider>
    </MemoryRouter>,
  )
}

test('renders all links in overlay', () => {
  renderMenu({ links: LINKS, onNavigate: () => {}, onClose: () => {} })
  expect(screen.getByRole('dialog')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Hakkımda' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Projeler' })).toBeInTheDocument()
})

test('close button and Escape call onClose', async () => {
  const onClose = vi.fn()
  renderMenu({ links: LINKS, onNavigate: () => {}, onClose })
  await userEvent.click(screen.getByLabelText('Menüyü kapat'))
  expect(onClose).toHaveBeenCalledOnce()
  await userEvent.keyboard('{Escape}')
  expect(onClose).toHaveBeenCalledTimes(2)
})

test('link click calls onNavigate and onClose', async () => {
  const onNavigate = vi.fn()
  const onClose = vi.fn()
  renderMenu({ links: LINKS, onNavigate, onClose })
  await userEvent.click(screen.getByRole('button', { name: 'Projeler' }))
  expect(onNavigate).toHaveBeenCalledWith('projects')
  expect(onClose).toHaveBeenCalledOnce()
})

test('locks body scroll while open', () => {
  renderMenu({ links: LINKS, onNavigate: () => {}, onClose: () => {} })
  expect(document.body.style.overflow).toBe('hidden')
})

test('active link gets text-term class', () => {
  renderMenu({ links: LINKS, activeId: 'projects', onNavigate: () => {}, onClose: () => {} })
  expect(screen.getByRole('button', { name: 'Projeler' })).toHaveClass('text-term')
  expect(screen.getByRole('button', { name: 'Hakkımda' })).not.toHaveClass('text-term')
})

test('defaults active highlight to first link when nothing active', () => {
  renderMenu({ links: LINKS, onNavigate: () => {}, onClose: () => {} })
  expect(screen.getByRole('button', { name: 'Hakkımda' })).toHaveClass('text-term')
  expect(screen.getByRole('button', { name: 'Projeler' })).not.toHaveClass('text-term')
})
