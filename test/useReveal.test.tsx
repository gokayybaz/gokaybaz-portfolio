import { render, screen } from '@testing-library/react'
import { Reveal } from '../src/components/Reveal'

test('Reveal renders children with hidden initial classes', () => {
  render(
    <Reveal>
      <span data-testid="child">x</span>
    </Reveal>,
  )
  const child = screen.getByTestId('child')
  const wrapper = child.parentElement!
  expect(wrapper.className).toContain('opacity-0')
  expect(wrapper.className).toContain('translate-y-6')
})
