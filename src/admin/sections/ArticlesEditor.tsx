import type { Article, ContentDocument } from '../../data/content'
import { ArrayControls, Checkbox, CommaInput, DictInput, Panel, TextInput } from '../fields'
import { MarkdownInput } from '../MarkdownInput'
import { slugify } from '../slugify'

function blankArticle(): Article {
  const empty = { tr: '', en: '' }
  const today = new Date().toISOString().slice(0, 10)
  return {
    slug: `yeni-yazi-${Date.now()}`,
    title: empty,
    excerpt: empty,
    body: empty,
    category: empty,
    keywords: { tr: [], en: [] },
    seo: { title: empty, description: empty, excerpt: empty, updatedAt: today },
    publishedAt: today,
    updatedAt: today,
    relatedProjectSlugs: [],
  }
}

export function ArticlesEditor({ doc, setDoc }: { doc: ContentDocument; setDoc: (doc: ContentDocument) => void }) {
  function update(index: number, patch: Partial<Article>) {
    setDoc({ ...doc, articles: doc.articles.map((article, i) => (i === index ? { ...article, ...patch } : article)) })
  }

  function move(index: number, delta: -1 | 1) {
    const next = [...doc.articles]
    const target = index + delta
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    setDoc({ ...doc, articles: next })
  }

  return (
    <div className="space-y-4">
      <button type="button" onClick={() => setDoc({ ...doc, articles: [...doc.articles, blankArticle()] })} className="border border-term bg-term/10 px-3 py-1.5 font-mono text-xs text-term hover:bg-term/20">
        + Yeni yazı
      </button>
      {doc.articles.map((article, index) => (
        <Panel key={article.slug} title={article.title.tr || article.slug}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <TextInput label="Slug" value={article.slug} onChange={(slug) => update(index, { slug })} />
              <button type="button" onClick={() => update(index, { slug: slugify(article.title.tr || article.title.en) })} className="mt-1 font-mono text-[10px] text-paper-dim hover:text-term">
                başlıktan üret ↻
              </button>
            </div>
            <div className="flex items-end justify-end">
              <ArrayControls
                onUp={index > 0 ? () => move(index, -1) : undefined}
                onDown={index < doc.articles.length - 1 ? () => move(index, 1) : undefined}
                onRemove={() => setDoc({ ...doc, articles: doc.articles.filter((_, i) => i !== index) })}
              />
            </div>
          </div>
          <DictInput label="Başlık" value={article.title} onChange={(title) => update(index, { title })} />
          <DictInput label="Özet" value={article.excerpt} onChange={(excerpt) => update(index, { excerpt })} textarea rows={4} />
          <DictInput label="Kategori" value={article.category} onChange={(category) => update(index, { category })} />
          <MarkdownInput label="İçerik (TR)" value={article.body.tr} rows={14} onChange={(tr) => update(index, { body: { ...article.body, tr } })} />
          <MarkdownInput label="İçerik (EN)" value={article.body.en} rows={14} onChange={(en) => update(index, { body: { ...article.body, en } })} />
          <DictInput label="SEO başlığı" value={article.seo.title} onChange={(title) => update(index, { seo: { ...article.seo, title } })} />
          <DictInput label="SEO açıklaması" value={article.seo.description} onChange={(description) => update(index, { seo: { ...article.seo, description } })} textarea rows={3} />
          <DictInput label="Kısa SEO özeti" value={article.seo.excerpt} onChange={(excerpt) => update(index, { seo: { ...article.seo, excerpt } })} textarea rows={3} />
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Yayın tarihi" value={article.publishedAt} onChange={(publishedAt) => update(index, { publishedAt })} />
            <TextInput label="Güncelleme tarihi" value={article.updatedAt} onChange={(updatedAt) => update(index, { updatedAt, seo: { ...article.seo, updatedAt } })} />
          </div>
          <Checkbox label="Arama motorlarından gizle" checked={article.seo.noindex ?? false} onChange={(noindex) => update(index, { seo: { ...article.seo, noindex: noindex || undefined } })} />
          <CommaInput label="Anahtar kelimeler TR" value={article.keywords.tr} onChange={(tr) => update(index, { keywords: { ...article.keywords, tr } })} />
          <CommaInput label="Keywords EN" value={article.keywords.en} onChange={(en) => update(index, { keywords: { ...article.keywords, en } })} />
          <CommaInput label="İlgili proje slug'ları" value={article.relatedProjectSlugs} onChange={(relatedProjectSlugs) => update(index, { relatedProjectSlugs })} />
        </Panel>
      ))}
    </div>
  )
}
