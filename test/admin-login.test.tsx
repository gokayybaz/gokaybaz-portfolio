import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { AdminApp } from '../src/admin/AdminApp'
import { defaultContent } from '../src/data/content'

function renderAdmin() {
  return render(
    <MemoryRouter initialEntries={['/admin']}>
      <AdminApp />
    </MemoryRouter>,
  )
}

test('shows login form when session is missing', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ ok: false, status: 401, json: () => Promise.resolve({}) }),
  )
  renderAdmin()
  await waitFor(() => expect(screen.getByLabelText('Şifre')).toBeInTheDocument())
  vi.unstubAllGlobals()
})

test('successful login opens the admin layout', async () => {
  const doc = defaultContent
  vi.stubGlobal(
    'fetch',
    vi.fn((input: RequestInfo | URL) => {
      const url = String(input)
      if (url.endsWith('/api/admin/session'))
        return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ ok: true }) })
      if (url.endsWith('/api/admin/content'))
        return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(doc) })
      return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ ok: true }) })
    }),
  )
  renderAdmin()
  await waitFor(() => expect(screen.getByText('Admin Panel')).toBeInTheDocument())
  expect(screen.getByText('Projeler')).toBeInTheDocument()
  vi.unstubAllGlobals()
})
