import type { ContentDocument } from '../../data/content'
import { CommaInput, DictInput } from '../fields'

export function AboutEditor({ doc, setDoc }: { doc: ContentDocument; setDoc: (doc: ContentDocument) => void }) {
  return (
    <div className="space-y-6">
      <section className="border border-line bg-ink-soft p-6">
        <h2 className="font-mono text-sm text-term">## Hakkımda metni</h2>
        <p className="mt-1 font-mono text-xs text-paper-dim">Paragraflar boş satır ile ayrılır.</p>
        <div className="mt-4">
          <DictInput
            label="Profil"
            value={doc.profile}
            textarea
            rows={8}
            onChange={(profile) => setDoc({ ...doc, profile })}
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
