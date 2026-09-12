import { useState } from "react"
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MarkdownInput } from '../src/admin/MarkdownInput'

function Stateful({ onChange }: { onChange?: (v: string) => void }) {
  const [value, setValue] = useState('merhaba')
  return (
    <MarkdownInput
      label="Metin"
      value={value}
      onChange={(v) => {
        setValue(v)
        onChange?.(v)
      }}
    />
  )
}


test('typing updates the value', async () => {
  const onChange = vi.fn()
  render(<Stateful onChange={onChange} />)
  await userEvent.type(screen.getByLabelText('Metin'), ' dünya')
  expect(onChange).toHaveBeenLastCalledWith('merhaba dünya')
})

test('bold wraps selection', () => {
  render(<Stateful />)
  const area = screen.getByLabelText('Metin') as HTMLTextAreaElement
  area.focus()
  area.setSelectionRange(0, 7)
  fireEvent.click(screen.getByLabelText('Kalın'))
  expect(area).toHaveValue('**merhaba**')
})

test('heading prefix inserts at line start', () => {
  render(<Stateful />)
  const area = screen.getByLabelText('Metin') as HTMLTextAreaElement
  area.focus()
  area.setSelectionRange(0, 0)
  fireEvent.click(screen.getByLabelText('Başlık 2'))
  expect(area).toHaveValue('## merhaba')
})

test('link wraps selection', () => {
  render(<Stateful />)
  const area = screen.getByLabelText('Metin') as HTMLTextAreaElement
  area.focus()
  area.setSelectionRange(0, 7)
  fireEvent.click(screen.getByLabelText('Link'))
  expect(area).toHaveValue('[merhaba](https://)')
})

test('preview tab renders markdown', async () => {
  render(<Stateful />)
  fireEvent.click(screen.getByRole('tab', { name: 'Önizleme' }))
  await waitFor(() => expect(screen.getByTestId('md-preview')).toBeInTheDocument())
  expect(screen.getByTestId('md-preview').textContent).toContain('merhaba')
})

test('shows character count', () => {
  render(<Stateful />)
  expect(screen.getByText('7 karakter')).toBeInTheDocument()
})
