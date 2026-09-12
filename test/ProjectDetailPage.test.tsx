import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router'
import ProjectDetailPage from '../src/pages/ProjectDetailPage'
import { LanguageProvider } from '../src/i18n/LanguageContext'
import { projects } from '../src/data/content'

function renderAt(slug?: string) {
  return render(
    <LanguageProvider>
      <MemoryRouter initialEntries={slug ? [`/project/${slug}`] : ['/project/unknown-slug']}>
        <Routes>
          <Route path="/project/:slug" element={<ProjectDetailPage />} />
          <Route path="/" element={<div>home</div>} />
        </Routes>
      </MemoryRouter>
    </LanguageProvider>,
  )
}

test('renders project detail for known slug', () => {
  renderAt(projects[0].slug)
  expect(screen.getByText(projects[0].title.tr)).toBeInTheDocument()
  expect(screen.getByText(projects[0].period.tr)).toBeInTheDocument()
  expect(screen.getByText(projects[0].metric!.tr)).toBeInTheDocument()
  expect(screen.getByText(projects[0].stack[0])).toBeInTheDocument()
})

test('redirects unknown slug to home', () => {
  renderAt(undefined)
  expect(screen.getByText('home')).toBeInTheDocument()
})
