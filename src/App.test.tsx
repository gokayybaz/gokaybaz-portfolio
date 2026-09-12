import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router'
import App from './App'

test('renders placeholder', () => {
  render(
    <HashRouter>
      <App />
    </HashRouter>,
  )
  expect(screen.getByText('gokaybaz')).toBeInTheDocument()
})
