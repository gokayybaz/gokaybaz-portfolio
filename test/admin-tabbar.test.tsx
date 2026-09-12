import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { AdminTabBar } from '../src/admin/AdminTabBar'

const SECTIONS = [
  { id: 'projects', label: 'Projeler' },
  { id: 'about', label: 'Hakkımda' },
]

function renderBar() {
  return render(
    <MemoryRouter initialEntries={['/admin/projects']}>
      <AdminTabBar sections={SECTIONS} />
    </MemoryRouter>,
  )
}

test('renders all section links', () => {
  renderBar()
  expect(screen.getByText('Projeler')).toBeInTheDocument()
  expect(screen.getByText('Hakkımda')).toBeInTheDocument()
})

test('marks active section', () => {
  renderBar()
  expect(screen.getByText('Projeler').className).toContain('text-term')
})
