import type { ContentDocument, Socials } from '../../data/content'
import { CommaInput, DictInput, TextInput } from '../fields'
import { ImageField } from '../ImageField'

export function SiteEditor({ doc, setDoc }: { doc: ContentDocument; setDoc: (doc: ContentDocument) => void }) {
  const site = doc.site

  function update(patch: Partial<typeof site>) {
    setDoc({ ...doc, site: { ...site, ...patch } })
  }

  function updateSocials(patch: Partial<Socials>) {
    update({ socials: { ...site.socials, ...patch } })
  }

  return (
    <div className="space-y-6">
      <section className="space-y-4 border border-line bg-ink-soft p-6">
        <h2 className="font-mono text-sm text-term">## Kimlik</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput label="İsim" value={site.name} onChange={(name) => update({ name })} />
          <TextInput label="Telefon (tel: linki)" value={site.phone} onChange={(phone) => update({ phone })} />
        </div>
        <DictInput label="Unvan" value={site.title} onChange={(title) => update({ title })} />
        <DictInput label="Alt başlık" value={site.subtitle} onChange={(subtitle) => update({ subtitle })} />
        <DictInput label="Konum" value={site.location} onChange={(location) => update({ location })} />
        <DictInput label="Uygunluk notu" value={site.availability} onChange={(availability) => update({ availability })} />
        <CommaInput
          label="Avatar aday dosyaları"
          value={site.avatarCandidates}
          onChange={(avatarCandidates) => update({ avatarCandidates })}
        />
        <ImageField
          label="Avatar yükle (yüklenen görsel aday listesine eklenir)"
          value=""
          onChange={(url) => {
            if (url && !site.avatarCandidates.includes(url)) {
              update({ avatarCandidates: [url, ...site.avatarCandidates] })
            }
          }}
        />
      </section>
      <section className="space-y-4 border border-line bg-ink-soft p-6">
        <h2 className="font-mono text-sm text-term">## Sosyal linkler</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput label="GitHub" value={site.socials.github} onChange={(github) => updateSocials({ github })} />
          <TextInput
            label="LinkedIn"
            value={site.socials.linkedin}
            onChange={(linkedin) => updateSocials({ linkedin })}
          />
          <TextInput label="X" value={site.socials.x} onChange={(x) => updateSocials({ x })} />
          <TextInput label="Medium" value={site.socials.medium} onChange={(medium) => updateSocials({ medium })} />
          <TextInput label="Email (mailto:)" value={site.socials.email} onChange={(email) => updateSocials({ email })} />
          <TextInput label="Telefon (socials)" value={site.socials.phone} onChange={(phone) => updateSocials({ phone })} />
        </div>
      </section>
    </div>
  )
}
