import { fireEvent, render, screen } from '@testing-library/react'
import { Avatar } from '../src/components/Hero'

test('uses the first available profile image extension', () => {
  render(<Avatar />)

  const image = screen.getByRole('img', { name: 'Gökay Baz' })
  expect(image).toHaveAttribute('src', '/profile.png')

  fireEvent.error(image)
  expect(screen.getByRole('img', { name: 'Gökay Baz' })).toHaveAttribute('src', '/profile.jpg')
})
