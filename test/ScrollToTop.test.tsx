import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router'
import { ScrollToTop } from '../src/components/ScrollToTop'

function NavigationProbe() {
  const navigate = useNavigate()
  return <button onClick={() => navigate('/project/factory-portal')}>open project</button>
}

test('scrolls to the top after navigation', () => {
  const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)

  render(
    <MemoryRouter initialEntries={['/']}>
      <ScrollToTop />
      <NavigationProbe />
      <Routes>
        <Route path="/" element={<span>home</span>} />
        <Route path="/project/:slug" element={<span>project</span>} />
      </Routes>
    </MemoryRouter>,
  )

  expect(scrollTo).toHaveBeenCalledWith(0, 0)
  fireEvent.click(screen.getByText('open project'))
  expect(scrollTo).toHaveBeenCalledTimes(2)

  scrollTo.mockRestore()
})
