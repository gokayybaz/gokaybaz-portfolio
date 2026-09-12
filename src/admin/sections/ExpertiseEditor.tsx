import type { ContentDocument, ExpertisePage } from '../../data/content'
import { ArrayControls, Checkbox, CommaInput, DictInput, Panel, TextInput } from '../fields'
import { MarkdownInput } from '../MarkdownInput'
import { slugify } from '../slugify'

function blankExpertise(): ExpertisePage {
  const empty = { tr: '', en: '' }
  return {
    slug: `yeni-uzmanlik-${Date.now()}`,
    title: empty,
    summary: empty,
    body: empty,
    seo: { title: empty, description: empty, excerpt: empty, updatedAt: new Date().toISOString().slice(0, 10) },
    relatedProjectSlugs: [],
    relatedArticleSlugs: [],
    updatedAt: new Date().toISOString().slice(0, 10),
  }
}

export function ExpertiseEditor({ doc, setDoc }: { doc: ContentDocument; setDoc: (doc: ContentDocument) => void }) {
  function update(index: number, patch: Partial<ExpertisePage>) {
    setDoc({ ...doc, expertisePages: doc.expertisePages.map((page, i) => (i === index ? { ...page, ...patch } : page)) })
  }

  function move(index: number, delta: -1 | 1) {
    const next = [...doc.expertisePages]
    const target = index + delta
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    setDoc({ ...doc, expertisePages: next })
  }

  return (
    <div className="space-y-4">
      <button type="button" onClick={() => setDoc({ ...doc, expertisePages: [...doc.expertisePages, blankExpertise()] })} className="border border-term bg-term/10 px-3 py-1.5 font-mono text-xs text-term hover:bg-term/20">
        + Yeni uzmanlık sayfası
      </button>
      {doc.expertisePages.map((page, index) => (
        <Panel key={page.slug} title={page.title.tr || page.slug}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <TextInput label="Slug" value={page.slug} onChange={(slug) => update(index, { slug })} />
              <button type="button" onClick={() => update(index, { slug: slugify(page.title.tr || page.title.en) })} className="mt-1 font-mono text-[10px] text-paper-dim hover:text-term">
                başlıktan üret ↻
              </button>
            </div>
            <div className="flex items-end justify-end">
              <ArrayControls
                onUp={index > 0 ? () => move(index, -1) : undefined}
                onDown={index < doc.expertisePages.length - 1 ? () => move(index, 1) : undefined}
                onRemove={() => setDoc({ ...doc, expertisePages: doc.expertisePages.filter((_, i) => i !== index) })}
              />
            </div>
          </div>
          <DictInput label="Başlık" value={page.title} onChange={(title) => update(index, { title })} />
          <DictInput label="Özet" value={page.summary} onChange={(summary) => update(index, { summary })} textarea rows={4} />
          <MarkdownInput label="İçerik (TR)" value={page.body.tr} rows={14} onChange={(tr) => update(index, { body: { ...page.body, tr } })} />
          <MarkdownInput label="İçerik (EN)" value={page.body.en} rows={14} onChange={(en) => update(index, { body: { ...page.body, en } })} />
          <DictInput label="SEO başlığı" value={page.seo.title} onChange={(title) => update(index, { seo: { ...page.seo, title } })} />
          <DictInput label="SEO açıklaması" value={page.seo.description} onChange={(description) => update(index, { seo: { ...page.seo, description } })} textarea rows={3} />
          <DictInput label="Kısa SEO özeti" value={page.seo.excerpt} onChange={(excerpt) => update(index, { seo: { ...page.seo, excerpt } })} textarea rows={3} />
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Güncelleme tarihi" value={page.updatedAt} onChange={(updatedAt) => update(index, { updatedAt, seo: { ...page.seo, updatedAt } })} />
            <Checkbox label="Arama motorlarından gizle" checked={page.seo.noindex ?? false} onChange={(noindex) => update(index, { seo: { ...page.seo, noindex: noindex || undefined } })} />
          </div>
          <CommaInput label="İlgili proje slug'ları" value={page.relatedProjectSlugs} onChange={(relatedProjectSlugs) => update(index, { relatedProjectSlugs })} />
          <CommaInput label="İlgili yazı slug'ları" value={page.relatedArticleSlugs} onChange={(relatedArticleSlugs) => update(index, { relatedArticleSlugs })} />
        </Panel>
      ))}
    </div>
  )
}
