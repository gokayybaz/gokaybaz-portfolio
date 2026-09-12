import { useRef, useState } from 'react'
import { uploadImage } from './api'

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (url: string) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(false)

  async function handleFile(file: File) {
    setUploading(true)
    setError(false)
    try {
      onChange(await uploadImage(file))
    } catch {
      setError(true)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <span className="block font-mono text-xs text-paper-dim">{label}</span>
      <div className="flex items-center gap-3">
        {value ? (
          <img src={value} alt={label} className="h-16 w-16 border border-line object-cover" />
        ) : (
          <span className="flex h-16 w-16 items-center justify-center border border-dashed border-line font-mono text-[10px] text-paper-dim">
            yok
          </span>
        )}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
            className="border border-term bg-term/10 px-3 py-1.5 font-mono text-xs text-term hover:bg-term/20 disabled:opacity-50"
          >
            {uploading ? 'Yükleniyor…' : 'Görsel yükle'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="border border-line px-3 py-1.5 font-mono text-xs text-red-400 hover:border-red-400"
            >
              Kaldır
            </button>
          )}
        </div>
      </div>
      <input
        aria-label={`${label} URL`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/uploads/... veya https://..."
        className="w-full border border-line bg-ink px-3 py-2 font-mono text-xs text-paper outline-none focus:border-term"
      />
      {error && <p className="font-mono text-xs text-red-400">Yükleme başarısız. Tekrar deneyin.</p>}
      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) void handleFile(file)
          e.target.value = ''
        }}
      />
    </div>
  )
}
