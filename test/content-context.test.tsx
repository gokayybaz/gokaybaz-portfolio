import { render, screen, waitFor } from '@testing-library/react'
import { ContentProvider, useContent } from '../src/content/ContentContext'
import { defaultContent } from '../src/data/content'

function Probe() {
  const content = useContent()
  return <p>{content.site.name}</p>
}

test('useContent falls back to defaultContent when API fails', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
  render(
    <ContentProvider>
      <Probe />
    </ContentProvider>,
  )
  expect(screen.getByText('Gökay Baz')).toBeInTheDocument()
  vi.unstubAllGlobals()
})

test('ContentProvider replaces content after a successful fetch', async () => {
  const apiContent = { ...defaultContent, site: { ...defaultContent.site, name: 'Düzenlenmiş İsim' } }
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(apiContent),
    }),
  )
  render(
    <ContentProvider>
      <Probe />
    </ContentProvider>,
  )
  await waitFor(() => expect(screen.getByText('Düzenlenmiş İsim')).toBeInTheDocument())
  vi.unstubAllGlobals()
})
