import { useRef, useState } from 'react'
import Markdown from 'react-markdown'
import { uploadImage } from './api'

const areaClass =
  'w-full border border-line bg-ink px-3 py-2 font-mono text-sm text-paper outline-none focus:border-term'

interface Action {
  label: string
  title: string
  before: string
  after?: string
  block?: boolean
}

const ACTIONS: Action[] = [
  { label: 'B', title: 'Kalın', before: '**', after: '**' },
  { label: 'I', title: 'İtalik', before: '*', after: '*' },
  { label: '`', title: 'Kod', before: '`', after: '`' },
  { label: 'H2', title: 'Başlık 2', before: '## ', block: true },
  { label: 'H3', title: 'Başlık 3', before: '### ', block: true },
  { label: '•', title: 'Liste', before: '- ', block: true },
  { label: '1.', title: 'Sıralı liste', before: '1. ', block: true },
  { label: '❝', title: 'Alıntı', before: '> ', block: true },
  { label: '</>', title: 'Kod bloğu', before: '```\n', after: '\n```', block: true },
  { label: '🔗', title: 'Link', before: '[', after: '](https://)' },
]

export function MarkdownInput({
  label,
  value,
  onChange,
  rows = 10,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
}) {
  const [tab, setTab] = useState<'write' | 'preview'>('write')
  const [uploading, setUploading] = useState(false)
  const areaRef = useRef<HTMLTextAreaElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function applyAction(action: Action) {
    const area = areaRef.current
    if (!area) return
    const start = area.selectionStart
    const end = area.selectionEnd
    const selected = value.slice(start, end)
    let next: string
    let cursor: number
    if (action.block) {
      const lineStart = value.lastIndexOf('\n', start - 1) + 1
      next = value.slice(0, lineStart) + action.before + value.slice(lineStart)
      cursor = start + action.before.length
    } else {
      const wrapped = `${action.before}${selected}${action.after ?? ''}`
      next = value.slice(0, start) + wrapped + value.slice(end)
      cursor = start + action.before.length + selected.length
    }
    onChange(next)
    requestAnimationFrame(() => {
      area.focus()
      area.setSelectionRange(cursor, cursor)
    })
  }

  async function handleImageUpload(file: File) {
    setUploading(true)
    try {
      const url = await uploadImage(file)
      const area = areaRef.current
      const pos = area ? area.selectionStart : value.length
      const snippet = `\n![görsel](${url})\n`
      onChange(value.slice(0, pos) + snippet + value.slice(pos))
    } finally {
      setUploading(false)
    }
  }

  return (
    <fieldset className="block">
      <legend className="font-mono text-xs text-paper-dim">{label}</legend>
      <div className="flex items-center gap-1 border border-line border-b-0 bg-ink-soft px-2 py-1">
        {ACTIONS.map((action) => (
          <button
            key={action.title}
            type="button"
            aria-label={action.title}
            title={action.title}
            onClick={() => applyAction(action)}
            className="px-1.5 py-0.5 font-mono text-xs text-paper-dim transition-colors hover:text-term"
          >
            {action.label}
          </button>
        ))}
        <button
          type="button"
          aria-label="Görsel ekle"
          title="Görsel ekle"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className="ml-auto px-1.5 py-0.5 font-mono text-xs text-paper-dim transition-colors hover:text-term disabled:opacity-50"
        >
          {uploading ? '…' : '🖼'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) void handleImageUpload(file)
            e.target.value = ''
          }}
        />
        <span className="flex border border-line font-mono text-[10px]">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'write'}
            onClick={() => setTab('write')}
            className={`px-2 py-0.5 ${tab === 'write' ? 'bg-term/10 text-term' : 'text-paper-dim'}`}
          >
            Yaz
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'preview'}
            onClick={() => setTab('preview')}
            className={`px-2 py-0.5 ${tab === 'preview' ? 'bg-term/10 text-term' : 'text-paper-dim'}`}
          >
            Önizleme
          </button>
        </span>
      </div>
      {tab === 'write' ? (
        <textarea
          ref={areaRef}
          aria-label={label}
          rows={rows}
          className={areaClass}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div
          data-testid="md-preview"
          className="md-content min-h-[120px] border border-line bg-ink px-3 py-2"
        >
          <Markdown>{value || '*boş*'}</Markdown>
        </div>
      )}
      <p className="mt-1 text-right font-mono text-[10px] text-paper-dim">{value.length} karakter</p>
    </fieldset>
  )
}
