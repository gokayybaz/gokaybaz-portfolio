import type { ContentDocument } from '../../data/content'
import { CommaInput } from '../fields'
import { MarkdownInput } from '../MarkdownInput'

export function AboutEditor({ doc, setDoc }: { doc: ContentDocument; setDoc: (doc: ContentDocument) => void }) {
  return (
    <div className="space-y-6">
      <section className="border border-line bg-ink-soft p-6">
        <h2 className="font-mono text-sm text-term">## Hakkımda metni</h2>
        <p className="mt-1 font-mono text-xs text-paper-dim">Markdown destekler. Paragraflar boş satır ile ayrılır.</p>
        <div className="mt-4 space-y-4">
          <MarkdownInput
            label="Profil (TR, markdown)"
            value={doc.profile.tr}
            rows={10}
            onChange={(tr) => setDoc({ ...doc, profile: { ...doc.profile, tr } })}
          />
          <MarkdownInput
            label="Profile (EN, markdown)"
            value={doc.profile.en}
            rows={10}
            onChange={(en) => setDoc({ ...doc, profile: { ...doc.profile, en } })}
          />
        </div>
      </section>
      <section className="border border-line bg-ink-soft p-6">
        <h2 className="font-mono text-sm text-term">## Stack etiketleri</h2>
        <div className="mt-4">
          <CommaInput label="Etiketler" value={doc.aboutTags} onChange={(aboutTags) => setDoc({ ...doc, aboutTags })} />
        </div>
      </section>
    </div>
  )
}
