import { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CommaInput, DictInput, LinesInput } from '../src/admin/fields'
import type { Dict } from '../src/data/content'

function StatefulDict({ onChange }: { onChange: (v: Dict) => void }) {
  const [value, setValue] = useState<Dict>({ tr: 'eski', en: 'old' })
  return (
    <DictInput
      label="Başlık"
      value={value}
      onChange={(v) => {
        setValue(v)
        onChange(v)
      }}
    />
  )
}

test('DictInput edits both languages', async () => {
  const onChange = vi.fn()
  render(<StatefulDict onChange={onChange} />)
  await userEvent.type(screen.getByLabelText('Başlık (TR)'), 'x')
  expect(onChange).toHaveBeenLastCalledWith({ tr: 'eskix', en: 'old' })
  await userEvent.type(screen.getByLabelText('Başlık (EN)'), '!')
  expect(onChange).toHaveBeenLastCalledWith({ tr: 'eskix', en: 'old!' })
})

function StatefulLines({ onChange }: { onChange: (v: string[]) => void }) {
  const [value, setValue] = useState<string[]>(['bir'])
  return (
    <LinesInput
      label="Maddeler"
      value={value}
      onChange={(v) => {
        setValue(v)
        onChange(v)
      }}
    />
  )
}

test('LinesInput maps textarea lines to array', () => {
  const onChange = vi.fn()
  render(<StatefulLines onChange={onChange} />)
  fireEvent.change(screen.getByLabelText('Maddeler'), { target: { value: 'bir\niki' } })
  expect(onChange).toHaveBeenLastCalledWith(['bir', 'iki'])
  expect(screen.getByLabelText('Maddeler')).toHaveValue('bir\niki')
})

test('LinesInput drops empty lines', () => {
  const onChange = vi.fn()
  render(<StatefulLines onChange={onChange} />)
  fireEvent.change(screen.getByLabelText('Maddeler'), { target: { value: 'bir\n\niki\n' } })
  expect(onChange).toHaveBeenLastCalledWith(['bir', 'iki'])
})

function StatefulComma({ onChange }: { onChange: (v: string[]) => void }) {
  const [value, setValue] = useState<string[]>(['Go'])
  return (
    <CommaInput
      label="Stack"
      value={value}
      onChange={(v) => {
        setValue(v)
        onChange(v)
      }}
    />
  )
}

test('CommaInput maps comma separated text to array', () => {
  const onChange = vi.fn()
  render(<StatefulComma onChange={onChange} />)
  fireEvent.change(screen.getByLabelText('Stack'), { target: { value: 'Go, Next.js' } })
  expect(onChange).toHaveBeenLastCalledWith(['Go', 'Next.js'])
  expect(screen.getByLabelText('Stack')).toHaveValue('Go, Next.js')
})
