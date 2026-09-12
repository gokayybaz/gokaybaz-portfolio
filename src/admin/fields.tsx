import type { ReactNode } from 'react'
import type { Dict } from '../data/content'

const inputClass =
  'mt-1 w-full border border-line bg-ink px-3 py-2 font-mono text-sm text-paper outline-none focus:border-term'
const labelClass = 'block font-mono text-xs text-paper-dim'

export function TextInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    </label>
  )
}

export function DictInput({
  label,
  value,
  onChange,
  textarea,
  rows = 4,
}: {
  label: string
  value: Dict
  onChange: (v: Dict) => void
  textarea?: boolean
  rows?: number
}) {
  return (
    <fieldset className="block">
      <legend className={labelClass}>{label}</legend>
      <div className="grid gap-3 md:grid-cols-2">
        <label>
          <span className="font-mono text-[10px] text-term">TR</span>
          {textarea ? (
            <textarea
              className={inputClass}
              rows={rows}
              aria-label={`${label} (TR)`}
              value={value.tr}
              onChange={(e) => onChange({ ...value, tr: e.target.value })}
            />
          ) : (
            <input
              className={inputClass}
              aria-label={`${label} (TR)`}
              value={value.tr}
              onChange={(e) => onChange({ ...value, tr: e.target.value })}
            />
          )}
        </label>
        <label>
          <span className="font-mono text-[10px] text-amber">EN</span>
          {textarea ? (
            <textarea
              className={inputClass}
              rows={rows}
              aria-label={`${label} (EN)`}
              value={value.en}
              onChange={(e) => onChange({ ...value, en: e.target.value })}
            />
          ) : (
            <input
              className={inputClass}
              aria-label={`${label} (EN)`}
              value={value.en}
              onChange={(e) => onChange({ ...value, en: e.target.value })}
            />
          )}
        </label>
      </div>
    </fieldset>
  )
}

export function LinesInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string[]
  onChange: (v: string[]) => void
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <textarea
        aria-label={label}
        rows={value.length + 1}
        placeholder={placeholder}
        className={inputClass}
        value={value.join('\n')}
        onChange={(e) => onChange(e.target.value.split('\n').filter((line) => line.trim() !== ''))}
      />
    </label>
  )
}

export function CommaInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: string[]
  onChange: (v: string[]) => void
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input
        aria-label={label}
        className={inputClass}
        value={value.join(', ')}
        onChange={(e) =>
          onChange(e.target.value.split(',').map((s) => s.trim()).filter((s) => s !== ''))
        }
      />
    </label>
  )
}

export function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex items-center gap-2 font-mono text-xs text-paper-dim">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  )
}

export function ArrayControls({
  onUp,
  onDown,
  onRemove,
}: {
  onUp?: () => void
  onDown?: () => void
  onRemove: () => void
}) {
  return (
    <span className="flex gap-1">
      {onUp && (
        <button
          type="button"
          onClick={onUp}
          aria-label="Yukarı taşı"
          className="flex min-h-11 min-w-11 items-center justify-center border border-line px-2 font-mono text-xs text-paper-dim hover:text-term"
        >
          ↑
        </button>
      )}
      {onDown && (
        <button
          type="button"
          onClick={onDown}
          aria-label="Aşağı taşı"
          className="flex min-h-11 min-w-11 items-center justify-center border border-line px-2 font-mono text-xs text-paper-dim hover:text-term"
        >
          ↓
        </button>
      )}
      <button
        type="button"
        onClick={onRemove}
        aria-label="Sil"
        className="flex min-h-11 min-w-11 items-center justify-center border border-line px-2 font-mono text-xs text-red-400 hover:border-red-400"
      >
        ✕
      </button>
    </span>
  )
}

export function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="border border-line bg-ink-soft">
      <summary className="cursor-pointer px-4 py-3 font-mono text-sm text-term">{title}</summary>
      <div className="space-y-4 border-t border-line px-4 py-4">{children}</div>
    </details>
  )
}
